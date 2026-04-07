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

const inputController = createInputController({
  state: GS,
  displayEl: gestureDetectDisplay,
  gestureKeys: GESTURE_KEYS,
  gestureNames: GESTURE_NAMES,
  gestureColors: GESTURE_COLORS,
  onRetryBattle: retryBattle,
  onRestartGame: restartGame,
  onAdvanceInput: handleAdvanceInput,
});

inputController.bind();
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
  startCutscene('intro');
}

function startCutscene(type) {
  GS.phase = 'cutscene';
  GS.cutsceneType = type;
  GS.cutsceneLine = 0;
  GS.waitingGesture = null;
  GS.inputLocked = false;
  showDialogLine(type, 0);
}

function getCutsceneLines(type) {
  if (type==='intro') return CUTSCENE_INTRO;
  if (type==='boss_defeat') return CUTSCENE_BOSS_DEFEAT;
  if (type==='ending') return CUTSCENE_ENDING;
  return [];
}

function showDialogLine(type, idx) {
  const lines = getCutsceneLines(type);
  if (idx >= lines.length) {
    endCutscene(type);
    return;
  }
  const line = lines[idx];
  const db = document.getElementById('dialog-box');
  db.classList.add('visible');
  document.getElementById('dialog-speaker').textContent = line.speaker || '';
  document.getElementById('dialog-text').textContent = '';
  document.getElementById('dialog-continue').style.display = 'block';
  const gh = document.getElementById('dialog-gesture-hint');
  if (line.waitGesture) {
    GS.waitingGesture = line.waitGesture;
    gh.style.display = 'block';
    gh.textContent = `[ ${GESTURE_NAMES[line.waitGesture]} 제스처를 해주세요! ]`;
    document.getElementById('dialog-continue').style.display = 'none';
  } else {
    GS.waitingGesture = null;
    gh.style.display = 'none';
  }
  // Typewriter
  GS.typewriterFull = line.text;
  GS.typewriterText = '';
  GS.typewriterIdx = 0;
  GS.typewriterTimer = 0;
  GS.cutsceneLine = idx;
}

function endCutscene(type) {
  document.getElementById('dialog-box').classList.remove('visible');
  GS.waitingGesture = null;
  if (type==='intro') {
    startStageTitle(0);
  } else if (type==='boss_defeat') {
    startCutscene('ending');
  } else if (type==='ending') {
    GS.phase = 'credits';
  }
}

function handleAdvanceInput() {
  if (GS.phase === 'cutscene') {
    const lines = getCutsceneLines(GS.cutsceneType);
    const line = lines[GS.cutsceneLine];
    // If typewriter still going, complete it
    if (GS.typewriterIdx < GS.typewriterFull.length) {
      GS.typewriterIdx = GS.typewriterFull.length;
      GS.typewriterText = GS.typewriterFull;
      document.getElementById('dialog-text').textContent = GS.typewriterText;
      return;
    }
    if (line && line.waitGesture) return; // must gesture
    // Advance
    showDialogLine(GS.cutsceneType, GS.cutsceneLine + 1);
  } else if (GS.phase === 'stage_title') {
    startBattle();
  } else if (GS.phase === 'stage_clear') {
    nextStage();
  }
}

function startStageTitle(idx) {
  GS.stageIdx = idx;
  GS.phase = 'stage_title';
  const stage = STAGES[idx];
  const sto = document.getElementById('stage-title-overlay');
  document.getElementById('stage-title-text').textContent = `${stage.name}: ${stage.location}`;
  document.getElementById('stage-narrative').textContent = stage.narrative;
  sto.classList.add('visible');
}

function startBattle() {
  document.getElementById('stage-title-overlay').classList.remove('visible');
  const stage = STAGES[GS.stageIdx];
  Object.assign(GS, createBattleStartState(stage, performance.now()));
}

function nextStage() {
  document.getElementById('stage-clear-overlay').classList.remove('visible');
  GS.stageClearVisible = false;
  const nextIdx = GS.stageIdx + 1;
  if (nextIdx >= STAGES.length) {
    startCutscene('boss_defeat');
  } else {
    startStageTitle(nextIdx);
  }
}

function showStageClear() {
  GS.phase = 'stage_clear';
  GS.stageClearVisible = true;
  const stage = STAGES[GS.stageIdx];
  const sco = document.getElementById('stage-clear-overlay');
  document.getElementById('clear-skill').textContent = stage.skillLearned || '';
  document.getElementById('clear-after').textContent = stage.afterText || '';
  document.getElementById('clear-score').textContent = `SCORE: ${GS.score}`;
  sco.classList.add('visible');
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
    showStageClear();
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
      setTimeout(showStageClear, 600);
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

  // Typewriter
  if (GS.phase === 'cutscene' && GS.typewriterIdx < GS.typewriterFull.length) {
    GS.typewriterTimer += dt;
    while (GS.typewriterTimer > 35 && GS.typewriterIdx < GS.typewriterFull.length) {
      GS.typewriterTimer -= 35;
      GS.typewriterIdx++;
      GS.typewriterText = GS.typewriterFull.substring(0, GS.typewriterIdx);
      document.getElementById('dialog-text').textContent = GS.typewriterText;
    }
  }

  // Waiting gesture check (cutscene)
  if (GS.phase === 'cutscene' && GS.waitingGesture) {
    const ag = getActiveGesture();
    if (ag === GS.waitingGesture) {
      // also check typewriter done
      if (GS.typewriterIdx >= GS.typewriterFull.length) {
        GS.waitingGesture = null;
        document.getElementById('dialog-gesture-hint').style.display = 'none';
        document.getElementById('dialog-continue').style.display = 'block';
        setTimeout(()=>{
          showDialogLine(GS.cutsceneType, GS.cutsceneLine + 1);
        }, 600);
      }
    }
    // Draw target gesture pulsing
    const pulse = 0.5 + 0.5 * Math.sin(timestamp / 200);
    renderer.drawTargetGesture(GS.waitingGesture, pulse);
  }

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
    startCutscene('intro');
  }, 1500);
  requestAnimationFrame(gameLoop);
}

window.retryBattle = retryBattle;
window.restartGame = restartGame;

init();
