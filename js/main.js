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
import { getById, resizeCanvasToElement } from './utils.js';
// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const PIXEL = 4;

// ─── GAME STATE ──────────────────────────────────────────────────────────────
const GS = createInitialState();

const canvas = getById('game-canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const landmarkCanvas = getById('landmark-canvas');
const landmarkCtx = landmarkCanvas.getContext('2d');

const targetCanvas = getById('target-canvas');
const targetCtx = targetCanvas.getContext('2d');
targetCtx.imageSmoothingEnabled = false;
const leftPanel = getById('left-panel');
const webcamSection = getById('webcam-section');
const webcam = getById('webcam');
const gestureDetectDisplay = getById('gesture-detect-display');
const hpDisplay = getById('hp-display');
const scoreDisplay = getById('score-display');
const comboDisplay = getById('combo-display');
const feedbackDisplay = getById('feedback-display');
const gestureNameText = getById('gesture-name-text');
const beatBarFill = getById('beat-bar-fill');
const upcomingCanvases = ['up1', 'up2', 'up3'].map(getById);
const dialogBox = getById('dialog-box');
const dialogSpeaker = getById('dialog-speaker');
const dialogText = getById('dialog-text');
const dialogGestureHint = getById('dialog-gesture-hint');
const dialogContinue = getById('dialog-continue');
const stageTitleOverlay = getById('stage-title-overlay');
const stageTitleText = getById('stage-title-text');
const stageNarrative = getById('stage-narrative');
const stageClearOverlay = getById('stage-clear-overlay');
const clearSkill = getById('clear-skill');
const clearAfter = getById('clear-after');
const clearScore = getById('clear-score');
const gameoverOverlay = getById('gameover-overlay');

function resizeCanvas() {
  resizeCanvasToElement(canvas, leftPanel, ctx);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function resizeLandmark() {
  resizeCanvasToElement(landmarkCanvas, webcamSection);
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
  gameoverOverlay.classList.remove('visible');
  stageClearOverlay.classList.remove('visible');
  stageTitleOverlay.classList.remove('visible');
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
    videoEl: webcam,
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
