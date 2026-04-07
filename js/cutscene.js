export function createCutsceneController({
  state,
  stages,
  cutscenes,
  gestureNames,
  elements,
  onStartBattle,
  drawTargetGesture,
  getActiveGesture,
}) {
  function getCutsceneLines(type) {
    if (type === 'intro') return cutscenes.intro;
    if (type === 'boss_defeat') return cutscenes.bossDefeat;
    if (type === 'ending') return cutscenes.ending;
    return [];
  }

  function startStageTitle(idx) {
    state.stageIdx = idx;
    state.phase = 'stage_title';
    const stage = stages[idx];
    elements.stageTitleText.textContent = `${stage.name}: ${stage.location}`;
    elements.stageNarrative.textContent = stage.narrative;
    elements.stageTitleOverlay.classList.add('visible');
  }

  function endCutscene(type) {
    elements.dialogBox.classList.remove('visible');
    state.waitingGesture = null;
    if (type === 'intro') {
      startStageTitle(0);
    } else if (type === 'boss_defeat') {
      startCutscene('ending');
    } else if (type === 'ending') {
      state.phase = 'credits';
    }
  }

  function showDialogLine(type, idx) {
    const lines = getCutsceneLines(type);
    if (idx >= lines.length) {
      endCutscene(type);
      return;
    }
    const line = lines[idx];
    elements.dialogBox.classList.add('visible');
    elements.dialogSpeaker.textContent = line.speaker || '';
    elements.dialogText.textContent = '';
    elements.dialogContinue.style.display = 'block';

    if (line.waitGesture) {
      state.waitingGesture = line.waitGesture;
      elements.dialogGestureHint.style.display = 'block';
      elements.dialogGestureHint.textContent = `[ ${gestureNames[line.waitGesture]} 제스처를 해주세요! ]`;
      elements.dialogContinue.style.display = 'none';
    } else {
      state.waitingGesture = null;
      elements.dialogGestureHint.style.display = 'none';
    }

    state.typewriterFull = line.text;
    state.typewriterText = '';
    state.typewriterIdx = 0;
    state.typewriterTimer = 0;
    state.cutsceneLine = idx;
  }

  function startCutscene(type) {
    state.phase = 'cutscene';
    state.cutsceneType = type;
    state.cutsceneLine = 0;
    state.waitingGesture = null;
    state.inputLocked = false;
    showDialogLine(type, 0);
  }

  function nextStage() {
    elements.stageClearOverlay.classList.remove('visible');
    state.stageClearVisible = false;
    const nextIdx = state.stageIdx + 1;
    if (nextIdx >= stages.length) {
      startCutscene('boss_defeat');
    } else {
      startStageTitle(nextIdx);
    }
  }

  function showStageClear() {
    state.phase = 'stage_clear';
    state.stageClearVisible = true;
    const stage = stages[state.stageIdx];
    elements.clearSkill.textContent = stage.skillLearned || '';
    elements.clearAfter.textContent = stage.afterText || '';
    elements.clearScore.textContent = `SCORE: ${state.score}`;
    elements.stageClearOverlay.classList.add('visible');
  }

  function handleAdvanceInput() {
    if (state.phase === 'cutscene') {
      const lines = getCutsceneLines(state.cutsceneType);
      const line = lines[state.cutsceneLine];
      if (state.typewriterIdx < state.typewriterFull.length) {
        state.typewriterIdx = state.typewriterFull.length;
        state.typewriterText = state.typewriterFull;
        elements.dialogText.textContent = state.typewriterText;
        return;
      }
      if (line && line.waitGesture) return;
      showDialogLine(state.cutsceneType, state.cutsceneLine + 1);
    } else if (state.phase === 'stage_title') {
      onStartBattle();
    } else if (state.phase === 'stage_clear') {
      nextStage();
    }
  }

  function update(dt, timestamp) {
    if (state.phase === 'cutscene' && state.typewriterIdx < state.typewriterFull.length) {
      state.typewriterTimer += dt;
      while (state.typewriterTimer > 35 && state.typewriterIdx < state.typewriterFull.length) {
        state.typewriterTimer -= 35;
        state.typewriterIdx++;
        state.typewriterText = state.typewriterFull.substring(0, state.typewriterIdx);
        elements.dialogText.textContent = state.typewriterText;
      }
    }

    if (state.phase === 'cutscene' && state.waitingGesture) {
      const activeGesture = getActiveGesture();
      if (activeGesture === state.waitingGesture && state.typewriterIdx >= state.typewriterFull.length) {
        state.waitingGesture = null;
        elements.dialogGestureHint.style.display = 'none';
        elements.dialogContinue.style.display = 'block';
        setTimeout(() => {
          showDialogLine(state.cutsceneType, state.cutsceneLine + 1);
        }, 600);
      }

      const pulse = 0.5 + 0.5 * Math.sin(timestamp / 200);
      drawTargetGesture(state.waitingGesture, pulse);
    }
  }

  return {
    endCutscene,
    getCutsceneLines,
    handleAdvanceInput,
    nextStage,
    showDialogLine,
    showStageClear,
    startCutscene,
    startStageTitle,
    update,
  };
}
