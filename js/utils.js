export function getById(id) {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error(`Missing element: #${id}`);
  }
  return el;
}

export function resizeCanvasToElement(canvas, hostEl, ctx) {
  canvas.width = hostEl.clientWidth;
  canvas.height = hostEl.clientHeight;
  if (ctx) {
    ctx.imageSmoothingEnabled = false;
  }
}
