export function updateDetectedGestureDisplay(displayEl, gestureName, gestureNames, gestureColors) {
  if (!displayEl) return;
  if (gestureName) {
    displayEl.textContent = `감지: ${gestureNames[gestureName] || gestureName}`;
    displayEl.style.color = gestureColors[gestureName] || '#4ade80';
    return;
  }

  displayEl.textContent = '감지: -';
  displayEl.style.color = '#4ade80';
}

export function createInputController({
  state,
  displayEl,
  gestureKeys,
  gestureNames,
  gestureColors,
  onRetryBattle,
  onRestartGame,
  onAdvanceInput,
}) {
  let keyGesture = null;

  function getDisplayGesture() {
    return keyGesture || state.detectedGesture;
  }

  function refreshDisplay() {
    updateDetectedGestureDisplay(displayEl, getDisplayGesture(), gestureNames, gestureColors);
  }

  function getActiveGesture() {
    return keyGesture || state.detectedGesture;
  }

  function reset() {
    keyGesture = null;
    refreshDisplay();
  }

  function bind() {
    document.addEventListener('keydown', e => {
      const k = e.key.toLowerCase();
      if (gestureKeys[k]) {
        keyGesture = gestureKeys[k];
        refreshDisplay();
      }

      if (state.gameOverVisible) {
        if (k === 'r') {
          onRestartGame();
          return;
        }
        if (k === ' ' || k === 'enter') {
          onRetryBattle();
          return;
        }
      }

      if ([' ', 'enter', 'arrowdown', 'arrowright'].includes(k)) {
        onAdvanceInput();
      }
    });

    document.addEventListener('keyup', e => {
      const k = e.key.toLowerCase();
      if (gestureKeys[k] && keyGesture === gestureKeys[k]) {
        keyGesture = null;
        refreshDisplay();
      }
    });
  }

  return {
    bind,
    getActiveGesture,
    refreshDisplay,
    reset,
  };
}
