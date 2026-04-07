'use strict';

import {
  CUTSCENE_BOSS_DEFEAT,
  CUTSCENE_ENDING,
  CUTSCENE_INTRO,
  GESTURE_COLORS,
  GESTURE_KEYS,
  GESTURE_NAMES,
  STAGES,
} from './data.js';
import { createBattleController } from './battle.js';
import { createCutsceneController } from './cutscene.js';
import { createInputController } from './input.js';
import { initMediapipe } from './mediapipe.js';
import { createRenderer } from './render.js';
import { HAND_ICONS, SPRITES } from './sprites.js';
import {
  createBattleStartState,
  createInitialState,
  resetBattleState,
  resetRunState,
} from './state.js';
// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const PIXEL = 4;

// ─── GAME STATE ──────────────────────────────────────────────────────────────
const GS = createInitialState();

// ─── CANVAS SETUP ─────────────────────────────────────────────────────────────
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const landmarkCanvas = document.getElementById('landmark-canvas');
const landmarkCtx = landmarkCanvas.getContext('2d');

const targetCanvas = document.getElementById('target-canvas');
const targetCtx = targetCanvas.getContext('2d');
targetCtx.imageSmoothingEnabled = false;
const gestureDetectDisplay = document.getElementById('gesture-detect-display');
const hpDisplay = document.getElementById('hp-display');
const scoreDisplay = document.getElementById('score-display');
const comboDisplay = document.getElementById('combo-display');
const feedbackDisplay = document.getElementById('feedback-display');
const gestureNameText = document.getElementById('gesture-name-text');
const beatBarFill = document.getElementById('beat-bar-fill');
const upcomingCanvases = ['up1', 'up2', 'up3'].map(id => document.getElementById(id));
const dialogBox = document.getElementById('dialog-box');
const dialogSpeaker = document.getElementById('dialog-speaker');
const dialogText = document.getElementById('dialog-text');
const dialogGestureHint = document.getElementById('dialog-gesture-hint');
const dialogContinue = document.getElementById('dialog-continue');
const stageTitleOverlay = document.getElementById('stage-title-overlay');
const stageTitleText = document.getElementById('stage-title-text');
const stageNarrative = document.getElementById('stage-narrative');
const stageClearOverlay = document.getElementById('stage-clear-overlay');
const clearSkill = document.getElementById('clear-skill');
const clearAfter = document.getElementById('clear-after');
const clearScore = document.getElementById('clear-score');
const gameoverOverlay = document.getElementById('gameover-overlay');

function resizeCanvas() {
  const lp = document.getElementById('left-panel');
  canvas.width = lp.clientWidth;
  canvas.height = lp.clientHeight;
  ctx.imageSmoothingEnabled = false;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function resizeLandmark() {
  const ws = document.getElementById('webcam-section');
  landmarkCanvas.width = ws.clientWidth;
  landmarkCanvas.height = ws.clientHeight;
}
window.addEventListener('resize', resizeLandmark);
resizeLandmark();

const renderer = createRenderer({
  canvas,
  ctx,
  targetCanvas,
  targetCtx,
  state: GS,
  stages: STAGES,
  sprites: SPRITES,
  handIcons: HAND_ICONS,
  gestureColors: GESTURE_COLORS,
  gestureNames: GESTURE_NAMES,
  pixel: PIXEL,
  ui: {
    hpDisplay,
    scoreDisplay,
    comboDisplay,
    feedbackDisplay,
    gestureNameText,
    beatBarFill,
    upcomingCanvases,
  },
});
let battleController;
const cutsceneController = createCutsceneController({
  state: GS,
  stages: STAGES,
  cutscenes: {
    intro: CUTSCENE_INTRO,
    bossDefeat: CUTSCENE_BOSS_DEFEAT,
    ending: CUTSCENE_ENDING,
  },
  gestureNames: GESTURE_NAMES,
  elements: {
    dialogBox,
    dialogSpeaker,
    dialogText,
    dialogGestureHint,
    dialogContinue,
    stageTitleOverlay,
    stageTitleText,
    stageNarrative,
    stageClearOverlay,
    clearSkill,
    clearAfter,
    clearScore,
  },
  onStartBattle: () => battleController.startBattle(),
  drawTargetGesture: renderer.drawTargetGesture,
  getActiveGesture,
});
const inputController = createInputController({
  state: GS,
  displayEl: gestureDetectDisplay,
  gestureKeys: GESTURE_KEYS,
  gestureNames: GESTURE_NAMES,
  gestureColors: GESTURE_COLORS,
  onRetryBattle: () => battleController.retryBattle(),
  onRestartGame: restartGame,
  onAdvanceInput: () => cutsceneController.handleAdvanceInput(),
});
battleController = createBattleController({
  state: GS,
  stages: STAGES,
  createBattleStartState,
  resetBattleState,
  getActiveGesture,
  elements: {
    gameoverOverlay,
    stageTitleOverlay,
  },
  onInputReset: () => inputController.reset(),
  onShowStageClear: () => cutsceneController.showStageClear(),
});

inputController.bind();

function getActiveGesture() {
  return inputController.getActiveGesture();
}

function restartGame() {
  Object.assign(GS, resetRunState());
  document.getElementById('gameover-overlay').classList.remove('visible');
  document.getElementById('stage-clear-overlay').classList.remove('visible');
  document.getElementById('stage-title-overlay').classList.remove('visible');
  inputController.reset();
  cutsceneController.startCutscene('intro');
}

// ─── MAIN LOOP ────────────────────────────────────────────────────────────────
let lastTimestamp = 0;

function gameLoop(timestamp) {
  const dt = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  // Idle wobble
  GS.idleWobble = (timestamp / 800) % 1;

  // Beat pulse decay
  GS.beatPulse = Math.max(0, GS.beatPulse - dt / 300);
  GS.flashAlpha = Math.max(0, GS.flashAlpha - dt / 200);

  // Feedback timer
  if (GS.feedbackTimer > 0) GS.feedbackTimer -= dt;

  // Hero anim timer
  if (GS.heroAnimTimer > 0) {
    GS.heroAnimTimer -= dt;
    if (GS.heroAnimTimer <= 0) { GS.heroAnimState='idle'; }
  }

  cutsceneController.update(dt, timestamp);

  // Battle update
  if (GS.phase === 'battle') {
    const stage = STAGES[GS.stageIdx];
    const elapsed = timestamp - GS.lastBeatTime;
    const beatFrac = Math.min(1, elapsed / GS.beatInterval);
    renderer.updateBeatBar(beatFrac);

    // Draw current target
    const currentGesture = stage.sequence[GS.beatIdx];
    if (currentGesture) {
      renderer.drawTargetGesture(currentGesture, GS.beatPulse > 0.01 ? GS.beatPulse : 0.05 + 0.05 * Math.sin(timestamp / 400));
      renderer.drawUpcomingGestures(stage.sequence, GS.beatIdx);
    }

    if (elapsed >= GS.beatInterval) {
      GS.lastBeatTime = timestamp;
      battleController.processBeat();
    }
  }

  renderer.renderFrame();
  requestAnimationFrame(gameLoop);
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
function init() {
  // Show loading briefly, then start intro
  GS.phase = 'loading';
  initMediapipe({
    videoEl: document.getElementById('webcam'),
    landmarkCtx,
    landmarkCanvas,
    onGestureChange: gesture => {
      GS.detectedGesture = gesture;
      inputController.refreshDisplay();
    },
  });
  setTimeout(()=>{
    cutsceneController.startCutscene('intro');
  }, 1500);
  requestAnimationFrame(gameLoop);
}

window.retryBattle = () => battleController.retryBattle();
window.restartGame = restartGame;

init();
