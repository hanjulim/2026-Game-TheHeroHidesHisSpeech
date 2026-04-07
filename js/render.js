export function createRenderer({
  canvas,
  ctx,
  targetCanvas,
  targetCtx,
  state,
  stages,
  sprites,
  handIcons,
  gestureColors,
  gestureNames,
  pixel,
  ui,
}) {
  function drawSprite(drawCtx, sprite, x, y, scale, flipX = false, tintWhite = false) {
    const ps = pixel * scale;
    for (let row = 0; row < sprite.h; row++) {
      for (let col = 0; col < sprite.w; col++) {
        const idx = sprite.data[row][col];
        if (idx === 0) continue;
        let color = sprite.pal[idx];
        if (tintWhite) color = '#ffffff';
        drawCtx.fillStyle = color;
        const dx = flipX ? x + (sprite.w - 1 - col) * ps : x + col * ps;
        drawCtx.fillRect(dx, y + row * ps, ps, ps);
      }
    }
  }

  function drawHandIcon(drawCtx, gestureName, x, y, scale, glowColor, glowAmt) {
    const icon = handIcons[gestureName];
    if (!icon) return;
    const ps = scale;
    if (glowAmt > 0) {
      drawCtx.save();
      drawCtx.shadowBlur = glowAmt;
      drawCtx.shadowColor = glowColor || gestureColors[gestureName] || '#fff';
    }
    for (let row = 0; row < icon.h; row++) {
      for (let col = 0; col < icon.w; col++) {
        const idx = icon.data[row][col];
        if (idx === 0) continue;
        let color = icon.pal[idx];
        if (idx === 1) color = glowColor || gestureColors[gestureName] || '#fdbcb4';
        if (idx === 2) color = '#3d1a00';
        if (idx === 3) color = '#fff5f0';
        drawCtx.fillStyle = color;
        drawCtx.fillRect(x + col * ps, y + row * ps, ps, ps);
      }
    }
    if (glowAmt > 0) drawCtx.restore();
  }

  function drawBgMeadow(w, h) {
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(0, 0, w, h * 0.6);
    ctx.fillStyle = '#ffffff';
    [[80, 40, 60, 20], [200, 30, 80, 25], [350, 50, 50, 18], [w * 0.6, 35, 70, 22]].forEach(([cx, cy, cw, ch]) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, cw, ch, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx + 30, cy - 8, cw * 0.7, ch * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(0, h * 0.6, w, h * 0.4);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(0, h * 0.65, w, h * 0.05);
    const flowerColors = ['#f87171', '#fbbf24', '#a78bfa', '#f472b6'];
    for (let i = 0; i < 20; i++) {
      const fx = 50 + i * (w - 100) / 20;
      const fy = h * 0.62 + Math.sin(i) * 8;
      ctx.fillStyle = flowerColors[i % 4];
      ctx.fillRect(fx, fy, 4, 4);
      ctx.fillStyle = '#166534';
      ctx.fillRect(fx + 1, fy + 4, 2, 8);
    }
  }

  function drawBgForest(w, h) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#1e3a1e';
    ctx.fillRect(0, h * 0.55, w, h * 0.45);
    ctx.fillStyle = '#0a1a0a';
    const trees = [[0, h * 0.1, 60, h * 0.55], [w * 0.1, h * 0.05, 70, h * 0.55], [w * 0.7, h * 0.08, 65, h * 0.55], [w * 0.85, h * 0.12, 55, h * 0.5], [w - 60, h * 0.07, 60, h * 0.55]];
    trees.forEach(([tx, ty, tw, th]) => {
      ctx.fillRect(tx + tw / 2 - 8, ty + th * 0.7, 16, th * 0.3);
      ctx.beginPath();
      ctx.moveTo(tx, ty + th * 0.7);
      ctx.lineTo(tx + tw / 2, ty);
      ctx.lineTo(tx + tw, ty + th * 0.7);
      ctx.fill();
    });
    ctx.fillStyle = '#ef4444';
    [[w * 0.3, h * 0.72], [w * 0.55, h * 0.75], [w * 0.45, h * 0.7]].forEach(([mx, my]) => {
      ctx.fillRect(mx, my, 20, 8);
      ctx.fillStyle = '#7f1d1d';
      ctx.fillRect(mx + 8, my + 8, 4, 12);
      ctx.fillStyle = '#ef4444';
    });
    ctx.fillStyle = '#fefce8';
    ctx.beginPath();
    ctx.arc(w * 0.8, h * 0.15, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawBgCave(w, h) {
    ctx.fillStyle = '#1c1c1c';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#374151';
    for (let gy = 0; gy < h; gy += 32) {
      for (let gx = (gy / 32 % 2) * 16; gx < w; gx += 32) {
        ctx.fillRect(gx, gy, 30, 30);
      }
    }
    ctx.fillStyle = '#4b5563';
    for (let gy = 0; gy < h; gy += 32) {
      for (let gx = (gy / 32 % 2) * 16; gx < w; gx += 32) {
        ctx.fillRect(gx, gy, 28, 2);
        ctx.fillRect(gx, gy, 2, 30);
      }
    }
    ctx.fillStyle = '#6b7280';
    for (let si = 0; si < 10; si++) {
      const sx = 30 + si * w / 10;
      const sh = 20 + Math.random() * 30;
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx + 10, 0);
      ctx.lineTo(sx + 5, sh);
      ctx.fill();
    }
    ctx.fillStyle = '#374151';
    ctx.fillRect(0, h * 0.75, w, h * 0.25);
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, h * 0.75, w, 4);
    [w * 0.15, w * 0.85].forEach(tx => {
      ctx.fillStyle = '#92400e';
      ctx.fillRect(tx, h * 0.5, 6, 20);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(tx - 2, h * 0.45, 10, 8);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(tx, h * 0.43, 6, 6);
    });
  }

  function drawBgCastle(w, h) {
    const grad = ctx.createLinearGradient(0, 0, 0, h * 0.65);
    grad.addColorStop(0, '#1a0000');
    grad.addColorStop(1, '#7f1d1d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h * 0.65);
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(0, h * 0.55, w, h * 0.45);
    ctx.fillStyle = '#292524';
    for (let bx = 0; bx < w; bx += 40) {
      ctx.fillRect(bx, h * 0.47, 36, h * 0.12);
      ctx.fillRect(bx + 8, h * 0.4, 20, h * 0.09);
    }
    ctx.fillStyle = '#0c0a09';
    for (let ax = 20; ax < w; ax += 60) {
      ctx.fillRect(ax, h * 0.57, 6, 16);
    }
    [w * 0.2, w * 0.5, w * 0.8].forEach(tx => {
      ctx.fillStyle = '#92400e';
      ctx.fillRect(tx, h * 0.52, 5, 14);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(tx - 2, h * 0.48, 9, 7);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(tx - 1, h * 0.46, 7, 5);
    });
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(0, h * 0.68, w, h * 0.32);
    ctx.fillStyle = '#0c0a09';
    ctx.fillRect(0, h * 0.68, w, 4);
  }

  function drawBgThrone(w, h) {
    ctx.fillStyle = '#0a0014';
    ctx.fillRect(0, 0, w, h);
    const rgrad = ctx.createRadialGradient(w / 2, 0, 0, w / 2, 0, h * 0.7);
    rgrad.addColorStop(0, 'rgba(124,58,237,0.3)');
    rgrad.addColorStop(1, 'transparent');
    ctx.fillStyle = rgrad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#1e1b4b';
    for (let gy = h * 0.7; gy < h; gy += 20) {
      for (let gx = 0; gx < w; gx += 20) {
        ctx.fillRect(gx, gy, 18, 18);
      }
    }
    ctx.fillStyle = '#312e81';
    for (let gy = h * 0.7; gy < h; gy += 20) {
      for (let gx = 0; gx < w; gx += 20) {
        ctx.fillRect(gx, gy, 18, 1);
        ctx.fillRect(gx, gy, 1, 18);
      }
    }
    [w * 0.1, w * 0.9 - 16].forEach(px => {
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(px, 0, 16, h * 0.72);
      ctx.fillStyle = '#312e81';
      ctx.fillRect(px, 0, 4, h * 0.72);
      ctx.fillStyle = 'rgba(220,38,38,0.3)';
      ctx.fillRect(px, h * 0.3, 16, 8);
    });
    const skullData = [[0,1,1,0],[1,0,0,1],[1,1,1,1],[0,1,1,0],[0,2,2,0]];
    [w * 0.3, w * 0.5, w * 0.7].forEach(sx => {
      skullData.forEach((row, ri) => row.forEach((v, ci) => {
        if (v === 0) return;
        ctx.fillStyle = v === 1 ? '#f5f5f5' : '#1c1c1c';
        ctx.fillRect(sx + ci * 6, h * 0.05 + ri * 6, 5, 5);
      }));
    });
    ctx.fillStyle = '#0f0c2a';
    ctx.fillRect(w / 2 - 50, h * 0.08, 100, h * 0.65);
    ctx.fillRect(w / 2 - 65, h * 0.08, 16, h * 0.4);
    ctx.fillRect(w / 2 + 49, h * 0.08, 16, h * 0.4);
    ctx.fillStyle = 'rgba(249,115,22,0.15)';
    ctx.fillRect(w / 2 - 60, 0, 120, h * 0.7);
  }

  function drawBackground(bgType) {
    const w = canvas.width;
    const h = canvas.height;
    switch (bgType) {
      case 'meadow': drawBgMeadow(w, h); break;
      case 'forest': drawBgForest(w, h); break;
      case 'cave': drawBgCave(w, h); break;
      case 'castle': drawBgCastle(w, h); break;
      case 'throne': drawBgThrone(w, h); break;
      default:
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, w, h);
    }
  }

  function drawThroneRoomBg() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#1a0a0e';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#2d1b0e';
    for (let gy = h * 0.65; gy < h; gy += 24) {
      for (let gx = 0; gx < w; gx += 24) {
        ctx.fillRect(gx, gy, 22, 22);
      }
    }
    ctx.fillStyle = '#3d2b1e';
    for (let gy = h * 0.65; gy < h; gy += 24) {
      for (let gx = 0; gx < w; gx += 24) {
        ctx.fillRect(gx, gy, 22, 1);
        ctx.fillRect(gx, gy, 1, 22);
      }
    }
    ctx.fillStyle = '#7c3aed';
    ctx.fillRect(w * 0.15, h * 0.05, 40, h * 0.5);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(w * 0.15 + 2, h * 0.05 + 4, 36, 8);
    ctx.fillStyle = '#7c3aed';
    ctx.fillRect(w * 0.75, h * 0.05, 40, h * 0.5);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(w * 0.75 + 2, h * 0.05 + 4, 36, 8);
    ctx.fillStyle = '#4c1d95';
    ctx.fillRect(w / 2 - 35, h * 0.2, 70, h * 0.48);
    ctx.fillStyle = '#7c3aed';
    ctx.fillRect(w / 2 - 40, h * 0.15, 80, 16);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(w / 2 - 38, h * 0.15, 76, 4);
  }

  function getGroundY(bgType) {
    const h = canvas.height;
    switch (bgType) {
      case 'meadow': return h * 0.62;
      case 'forest': return h * 0.72;
      case 'cave': return h * 0.76;
      case 'castle': return h * 0.70;
      case 'throne': return h * 0.73;
      default: return h * 0.65;
    }
  }

  function getEnemySprite(enemyType) {
    switch (enemyType) {
      case 'slime': return sprites[state.idleWobble > 0.5 ? 'slime_b' : 'slime_a'];
      case 'goblin': return sprites.goblin_idle;
      case 'orc': return sprites.orc_idle;
      case 'demon': return sprites.demon_idle;
      case 'demonlord': return sprites.demonlord_idle;
      default: return sprites.slime_a;
    }
  }

  function drawEnemyHpBar(ex, ey, ew, stage) {
    const barW = Math.max(ew, 80);
    const barH = 10;
    const bx = ex;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(bx, ey, barW, barH);
    const frac = Math.max(0, state.enemyHp / state.enemyMaxHp);
    const col = frac > 0.5 ? '#4ade80' : frac > 0.25 ? '#fbbf24' : '#ef4444';
    ctx.fillStyle = col;
    ctx.fillRect(bx, ey, barW * frac, barH);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.strokeRect(bx, ey, barW, barH);
    ctx.fillStyle = '#fff';
    ctx.font = '6px "Press Start 2P"';
    ctx.textAlign = 'left';
    ctx.fillText(stage.enemyName, bx, ey - 4);
  }

  function drawBattleScene(stage) {
    const w = canvas.width;
    drawBackground(stage.bgType);
    const groundY = getGroundY(stage.bgType);

    const heroSprite = state.heroAnimState === 'attack'
      ? sprites.hero_attack
      : state.heroAnimState === 'hurt'
        ? sprites.hero_hurt
        : sprites.hero_idle;
    const heroScale = 1.5;
    const heroH = heroSprite.h * pixel * heroScale;
    const baseHeroX = w * 0.15;
    const hx = baseHeroX + state.heroOffsetX;
    const hy = groundY - heroH + state.heroOffsetY + Math.sin(state.idleWobble * Math.PI * 2) * 3;
    drawSprite(ctx, heroSprite, hx, hy, heroScale, false, false);

    const enemySprite = getEnemySprite(stage.enemy);
    const enemyScale = stage.enemy === 'demonlord' ? 2.0
      : stage.enemy === 'orc' || stage.enemy === 'demon' ? 1.8
        : 1.5;
    const enemyW = enemySprite.w * pixel * enemyScale;
    const enemyH = enemySprite.h * pixel * enemyScale;
    const baseEnemyX = w * 0.65;
    const ex = baseEnemyX + state.enemyOffsetX;
    const ey = groundY - enemyH + state.enemyOffsetY + Math.sin((state.idleWobble + 0.5) * Math.PI * 2) * 2;
    drawSprite(ctx, enemySprite, ex, ey, enemyScale, true, state.enemyFlash);
    drawEnemyHpBar(ex, ey - 20, enemyW, stage);
  }

  function drawThroneScene(charLeft, charRight) {
    const w = canvas.width;
    const h = canvas.height;
    drawThroneRoomBg();
    const groundY = h * 0.73;

    if (charLeft) {
      const sp = charLeft.sprite;
      const sc = charLeft.scale || 1.5;
      const cw = sp.w * pixel * sc;
      const ch = sp.h * pixel * sc;
      drawSprite(ctx, sp, w * 0.2 - cw / 2, groundY - ch, sc, charLeft.flipX || false);
    }
    if (charRight) {
      const sp = charRight.sprite;
      const sc = charRight.scale || 1.5;
      const cw = sp.w * pixel * sc;
      const ch = sp.h * pixel * sc;
      drawSprite(ctx, sp, w * 0.7 - cw / 2, groundY - ch, sc, charRight.flipX || false);
    }
  }

  function updateHud() {
    let hpStr = 'HP: ';
    for (let i = 0; i < state.heroMaxHp; i++) hpStr += i < state.heroHp ? '❤️' : '🖤';
    ui.hpDisplay.textContent = hpStr;
    ui.scoreDisplay.textContent = `SCORE: ${state.score}`;
    if (state.combo >= 3) {
      ui.comboDisplay.textContent = `${state.combo} COMBO!!`;
      ui.comboDisplay.style.opacity = '1';
    } else {
      ui.comboDisplay.style.opacity = '0';
    }
    if (state.feedbackTimer > 0) {
      ui.feedbackDisplay.textContent = state.feedbackText;
      ui.feedbackDisplay.style.color = state.feedbackColor;
      ui.feedbackDisplay.style.opacity = String(Math.min(1, state.feedbackTimer / 300));
    } else {
      ui.feedbackDisplay.style.opacity = '0';
    }
  }

  function drawTargetGesture(gestureName, pulse) {
    targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
    if (!gestureName || !handIcons[gestureName]) return;
    const baseSize = 4;
    const s = baseSize * (1 + pulse * 0.25);
    const icon = handIcons[gestureName];
    const drawW = icon.w * s;
    const drawH = icon.h * s;
    const ox = (targetCanvas.width - drawW) / 2;
    const oy = (targetCanvas.height - drawH) / 2;
    const glowAmt = 8 + pulse * 35;
    const color = gestureColors[gestureName] || '#fff';
    drawHandIcon(targetCtx, gestureName, ox, oy, s, color, glowAmt);
    ui.gestureNameText.textContent = gestureNames[gestureName] || gestureName;
    ui.gestureNameText.style.color = color;
    ui.gestureNameText.style.textShadow = `0 0 ${8 + pulse * 15}px ${color}`;
  }

  function drawUpcomingGestures(sequence, currentIdx) {
    for (let i = 0; i < ui.upcomingCanvases.length; i++) {
      const c = ui.upcomingCanvases[i];
      const cx = c.getContext('2d');
      cx.imageSmoothingEnabled = false;
      cx.clearRect(0, 0, c.width, c.height);
      const nextIdx = currentIdx + 1 + i;
      if (nextIdx < sequence.length) {
        const g = sequence[nextIdx];
        const color = gestureColors[g] || '#fff';
        drawHandIcon(cx, g, 4, 4, 1, color, 5);
      }
    }
  }

  function updateBeatBar(frac) {
    ui.beatBarFill.style.width = `${frac * 100}%`;
  }

  function renderFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (state.phase === 'cutscene' || state.phase === 'credits') {
      const ct = state.cutsceneType;
      if (ct === 'intro' || ct === 'ending') {
        drawThroneScene(
          { sprite: sprites.king_idle, scale: 1.5, flipX: false },
          { sprite: sprites.hero_idle, scale: 1.5, flipX: true }
        );
      } else if (ct === 'boss_defeat') {
        drawThroneScene(
          { sprite: sprites.princess_idle, scale: 1.5, flipX: false },
          { sprite: sprites.hero_idle, scale: 1.5, flipX: true }
        );
      } else {
        drawBackground('meadow');
      }
      if (state.phase === 'credits') {
        const w = canvas.width;
        const h = canvas.height;
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#ffd700';
        ctx.font = '20px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('🎉 THE END 🎉', w / 2, h * 0.3);
        ctx.font = '10px "Press Start 2P"';
        ctx.fillStyle = '#fff';
        ctx.fillText('용사가 손가락을 숨김', w / 2, h * 0.45);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '8px "Press Start 2P"';
        ctx.fillText(`FINAL SCORE: ${state.score}`, w / 2, h * 0.55);
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '7px "Press Start 2P"';
        ctx.fillText('F5 키로 다시 시작', w / 2, h * 0.7);
        ctx.textAlign = 'left';
      }
    } else if (state.phase === 'stage_title') {
      drawBackground(stages[state.stageIdx].bgType);
    } else if (state.phase === 'battle' || state.phase === 'battle_ending') {
      const stage = stages[state.stageIdx];
      drawBattleScene(stage);
      if (state.flashAlpha > 0) {
        ctx.fillStyle = `rgba(255,255,255,${state.flashAlpha})`;
        ctx.fillRect(0, 0, canvas.width, 4);
        ctx.fillRect(0, canvas.height - 4, canvas.width, 4);
        ctx.fillRect(0, 0, 4, canvas.height);
        ctx.fillRect(canvas.width - 4, 0, 4, canvas.height);
      }
    } else if (state.phase === 'stage_clear') {
      drawBackground(stages[state.stageIdx].bgType);
    } else if (state.phase === 'gameover') {
      drawBackground(stages[state.stageIdx].bgType);
    } else if (state.phase === 'loading') {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ffd700';
      ctx.font = '12px "Press Start 2P"';
      ctx.textAlign = 'center';
      ctx.fillText('용사가 손가락을 숨김', w / 2, h / 2 - 20);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '8px "Press Start 2P"';
      ctx.fillText('로딩 중... 카메라 허용 필요', w / 2, h / 2 + 20);
      ctx.fillText('키보드: SPACE로 시작', w / 2, h / 2 + 40);
      ctx.textAlign = 'left';
    }

    updateHud();
  }

  return {
    drawTargetGesture,
    drawUpcomingGestures,
    renderFrame,
    updateBeatBar,
  };
}
