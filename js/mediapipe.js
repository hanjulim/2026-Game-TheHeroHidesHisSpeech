export function classifyGesture(landmarks) {
  if (!landmarks || landmarks.length < 21) return null;
  const lm = landmarks;

  function ext(tipIdx, mcpIdx) {
    return lm[tipIdx].y < lm[mcpIdx].y - 0.03;
  }

  const thumbExt = lm[4].x > lm[3].x;
  const idxExt = ext(8, 5);
  const midExt = ext(12, 9);
  const rngExt = ext(16, 13);
  const pkyExt = ext(20, 17);
  const okDist = Math.hypot(lm[4].x - lm[8].x, lm[4].y - lm[8].y);

  if (okDist < 0.07 && midExt) return 'ok_sign';
  if (thumbExt && !idxExt && !midExt && !rngExt && !pkyExt) return 'thumb_up';
  if (!idxExt && !midExt && !rngExt && !pkyExt) return 'fist';
  if (idxExt && midExt && rngExt && pkyExt) return 'open_hand';
  if (idxExt && midExt && !rngExt && !pkyExt) return 'peace';
  if (idxExt && !midExt && !rngExt && !pkyExt) return 'pointing';

  return null;
}

export function initMediapipe({
  videoEl,
  landmarkCtx,
  landmarkCanvas,
  onGestureChange,
}) {
  let mpHands = null;
  let mpCamera = null;

  function onHandResults(results) {
    landmarkCtx.clearRect(0, 0, landmarkCanvas.width, landmarkCanvas.height);
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const lm = results.multiHandLandmarks[0];
      drawConnectors(landmarkCtx, lm, HAND_CONNECTIONS, { color: 'rgba(0,255,128,0.6)', lineWidth: 1.5 });
      drawLandmarks(landmarkCtx, lm, { color: 'rgba(255,200,0,0.9)', lineWidth: 1, radius: 3 });
      onGestureChange(classifyGesture(lm));
      return;
    }

    onGestureChange(null);
  }

  try {
    mpHands = new Hands({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}` });
    mpHands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: 0.7, minTrackingConfidence: 0.5 });
    mpHands.onResults(onHandResults);
    mpCamera = new Camera(videoEl, {
      onFrame: async () => {
        await mpHands.send({ image: videoEl });
      },
      width: 320,
      height: 240,
    });
    mpCamera.start();
  } catch (e) {
    console.warn('Mediapipe failed:', e);
  }

  return {
    classifyGesture,
  };
}
