export function createBattleController({
  state,
  stages,
  createBattleStartState,
  resetBattleState,
  getActiveGesture,
  elements,
  onInputReset,
  onShowStageClear,
}) {
  function showGameOver() {
    state.phase = 'gameover';
    state.gameOverVisible = true;
    elements.gameoverOverlay.classList.add('visible');
  }

  function showFeedback(text, color, duration = 700) {
    state.feedbackText = text;
    state.feedbackColor = color;
    state.feedbackTimer = duration;
  }

  function retryBattle() {
    if (!state.gameOverVisible) return;
    elements.gameoverOverlay.classList.remove('visible');
    Object.assign(state, resetBattleState(state, stages[state.stageIdx], performance.now()));
    onInputReset();
  }

  function startBattle() {
    elements.stageTitleOverlay.classList.remove('visible');
    const stage = stages[state.stageIdx];
    Object.assign(state, createBattleStartState(stage, performance.now()));
  }

  function processBeat() {
    const stage = stages[state.stageIdx];
    const seq = stage.sequence;
    if (state.beatIdx >= seq.length) {
      if (state.enemyHp > 0) {
        state.heroHp = Math.max(0, state.heroHp - 1);
        if (state.heroHp <= 0) {
          showGameOver();
          return;
        }
      }
      onShowStageClear();
      return;
    }

    const expected = seq[state.beatIdx];
    const actual = getActiveGesture();

    state.beatPulse = 1.0;
    state.flashAlpha = 0.15;

    if (actual === expected) {
      state.combo++;
      const multiplier = Math.min(state.combo, 5);
      state.score += 100 * multiplier;
      state.enemyHp--;
      state.heroAnimState = 'attack';
      state.heroAnimTimer = 300;
      state.heroOffsetX = 30;
      setTimeout(() => { state.heroOffsetX = 0; }, 150);
      state.enemyFlash = true;
      state.enemyOffsetX = -15;
      setTimeout(() => { state.enemyFlash = false; state.enemyOffsetX = 0; }, 300);
      const isCrit = state.combo >= 5;
      showFeedback(isCrit ? '⚡ PERFECT!!' : state.combo >= 3 ? '🔥 GOOD!' : 'HIT!', isCrit ? '#ffd700' : '#4ade80');
      if (state.enemyHp <= 0) {
        setTimeout(() => onShowStageClear(), 600);
        state.phase = 'battle_ending';
        return;
      }
    } else {
      state.combo = 0;
      state.heroHp--;
      state.heroAnimState = 'hurt';
      state.heroAnimTimer = 400;
      let shakes = 0;
      const shakeInt = setInterval(() => {
        state.heroOffsetX = shakes % 2 === 0 ? -8 : 8;
        shakes++;
        if (shakes > 6) {
          clearInterval(shakeInt);
          state.heroOffsetX = 0;
          state.heroAnimState = 'idle';
        }
      }, 60);
      state.enemyOffsetX = 20;
      setTimeout(() => { state.enemyOffsetX = 0; }, 300);
      showFeedback('MISS!', '#ef4444');
      if (state.heroHp <= 0) {
        setTimeout(showGameOver, 600);
        state.phase = 'battle_ending';
        return;
      }
    }

    state.beatIdx++;
  }

  return {
    processBeat,
    retryBattle,
    showGameOver,
    startBattle,
  };
}
