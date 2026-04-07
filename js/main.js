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
  onStartBattle: startBattle,
  drawTargetGesture: renderer.drawTargetGesture,
  getActiveGesture,
});
const inputController = createInputController({
  state: GS,
  displayEl: gestureDetectDisplay,
  gestureKeys: GESTURE_KEYS,
  gestureNames: GESTURE_NAMES,
  gestureColors: GESTURE_COLORS,
  onRetryBattle: retryBattle,
  onRestartGame: restartGame,
  onAdvanceInput: () => cutsceneController.handleAdvanceInput(),
});

inputController.bind();

function getActiveGesture() {
  return inputController.getActiveGesture();
}

// ─── GAME FLOW ────────────────────────────────────────────────────────────────
function retryBattle() {
  if (!GS.gameOverVisible) return;
  document.getElementById('gameover-overlay').classList.remove('visible');
  Object.assign(GS, resetBattleState(GS, STAGES[GS.stageIdx], performance.now()));
  inputController.reset();
}

function restartGame() {
  Object.assign(GS, resetRunState());
  document.getElementById('gameover-overlay').classList.remove('visible');
  document.getElementById('stage-clear-overlay').classList.remove('visible');
  document.getElementById('stage-title-overlay').classList.remove('visible');
  inputController.reset();
  cutsceneController.startCutscene('intro');
}

function startBattle() {
  document.getElementById('stage-title-overlay').classList.remove('visible');
  const stage = STAGES[GS.stageIdx];
  Object.assign(GS, createBattleStartState(stage, performance.now()));
}

function showGameOver() {
  GS.phase = 'gameover';
  GS.gameOverVisible = true;
  document.getElementById('gameover-overlay').classList.add('visible');
}

function showFeedback(text, color, duration=700) {
  GS.feedbackText = text;
  GS.feedbackColor = color;
  GS.feedbackTimer = duration;
}

// ─── BEAT LOGIC ───────────────────────────────────────────────────────────────
function processBeat(timestamp) {
  const stage = STAGES[GS.stageIdx];
  const seq = stage.sequence;
  if (GS.beatIdx >= seq.length) {
    // All beats done
    if (GS.enemyHp > 0) {
      // Enemy attacks remaining HP
      GS.heroHp = Math.max(0, GS.heroHp - 1);
      if (GS.heroHp <= 0) { showGameOver(); return; }
    }
    cutsceneController.showStageClear();
    return;
  }

  const expected = seq[GS.beatIdx];
  const actual = getActiveGesture();

  // Flash
  GS.beatPulse = 1.0;
  GS.flashAlpha = 0.15;

  if (actual === expected) {
    // HIT
    GS.combo++;
    const multiplier = Math.min(GS.combo, 5);
    GS.score += 100 * multiplier;
    GS.enemyHp--;
    // Hero attack anim
    GS.heroAnimState = 'attack';
    GS.heroAnimTimer = 300;
    GS.heroOffsetX = 30;
    setTimeout(()=>{ GS.heroOffsetX=0; }, 150);
    // Enemy hurt
    GS.enemyFlash = true;
    GS.enemyOffsetX = -15;
    setTimeout(()=>{ GS.enemyFlash=false; GS.enemyOffsetX=0; }, 300);
    const isCrit = GS.combo >= 5;
    showFeedback(isCrit ? '⚡ PERFECT!!' : GS.combo>=3 ? '🔥 GOOD!' : 'HIT!', isCrit?'#ffd700':'#4ade80');
    if (GS.enemyHp <= 0) {
      setTimeout(() => cutsceneController.showStageClear(), 600);
      GS.phase = 'battle_ending';
      return;
    }
  } else {
    // MISS
    GS.combo = 0;
    GS.heroHp--;
    GS.heroAnimState = 'hurt';
    GS.heroAnimTimer = 400;
    // Shake
    let shakes = 0;
    const shakeInt = setInterval(()=>{
      GS.heroOffsetX = shakes%2===0 ? -8 : 8;
      shakes++;
      if(shakes>6){clearInterval(shakeInt); GS.heroOffsetX=0; GS.heroAnimState='idle';}
    },60);
    // Enemy attack
    GS.enemyOffsetX = 20;
    setTimeout(()=>{ GS.enemyOffsetX=0; }, 300);
    showFeedback('MISS!', '#ef4444');
    if (GS.heroHp <= 0) {
      setTimeout(showGameOver, 600);
      GS.phase = 'battle_ending';
      return;
    }
  }

  GS.beatIdx++;
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
      processBeat(timestamp);
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

window.retryBattle = retryBattle;
window.restartGame = restartGame;

init();
