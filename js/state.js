export function createInitialState() {
  return {
    phase: 'loading',
    stageIdx: 0,
    heroHp: 5,
    heroMaxHp: 5,
    score: 0,
    combo: 0,
    beatIdx: 0,
    beatTimer: 0,
    bpm: 58,
    beatInterval: 60000 / 58,
    lastBeatTime: 0,
    currentGesture: null,
    detectedGesture: null,
    heroX: 0,
    heroY: 0,
    heroAnimState: 'idle',
    heroAnimTimer: 0,
    heroOffsetX: 0,
    heroOffsetY: 0,
    enemyAnimState: 'idle',
    enemyAnimTimer: 0,
    enemyOffsetX: 0,
    enemyOffsetY: 0,
    enemyFlash: false,
    enemyHp: 3,
    enemyMaxHp: 3,
    beatPulse: 0,
    feedbackTimer: 0,
    feedbackText: '',
    feedbackColor: '',
    idleWobble: 0,
    cutsceneIdx: 0,
    cutsceneLine: 0,
    cutsceneType: null,
    typewriterText: '',
    typewriterFull: '',
    typewriterIdx: 0,
    typewriterTimer: 0,
    waitingGesture: null,
    gestureHeld: false,
    gestureHeldTimer: 0,
    beatsProcessed: 0,
    inputLocked: false,
    stageClearVisible: false,
    gameOverVisible: false,
    flashAlpha: 0,
    bossPhase: 0,
  };
}

export function createBattleStartState(stage, now = performance.now()) {
  return {
    phase: 'battle',
    beatIdx: 0,
    beatsProcessed: 0,
    bpm: stage.bpm,
    beatInterval: 60000 / stage.bpm,
    lastBeatTime: now + 500,
    enemyHp: stage.enemyHp,
    enemyMaxHp: stage.enemyHp,
    heroAnimState: 'idle',
    enemyAnimState: 'idle',
    heroOffsetX: 0,
    heroOffsetY: 0,
    enemyOffsetX: 0,
    enemyOffsetY: 0,
    enemyFlash: false,
    flashAlpha: 0,
    bossPhase: 0,
  };
}

export function resetBattleState(state, stage, now = performance.now()) {
  return {
    ...createBattleStartState(stage, now),
    heroHp: state.heroMaxHp,
    combo: 0,
    feedbackTimer: 0,
    gameOverVisible: false,
  };
}

export function resetRunState() {
  return createInitialState();
}
