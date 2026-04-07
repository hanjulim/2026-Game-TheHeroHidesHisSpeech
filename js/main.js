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
// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const PIXEL = 4;

// ─── SPRITE DATA ─────────────────────────────────────────────────────────────
const SPRITES = {};

// HERO (16×20) – blue knight
SPRITES.hero_idle = {
  w:16, h:20,
  pal:['transparent','#fdbcb4','#3d2000','#4a7fc1','#2d5a9e','#c0c0c0','#ffd700','#8B4513'],
  data:[
    [0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0],
    [0,0,0,0,2,6,6,6,6,6,6,2,0,0,0,0],
    [0,0,0,0,2,3,3,3,3,3,3,2,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,0,2,1,2,1,1,2,1,2,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,5,3,4,4,4,4,4,4,3,5,0,0,0],
    [0,0,5,5,3,4,4,4,4,4,4,3,5,5,0,0],
    [0,0,0,5,3,4,4,4,4,4,4,3,5,0,0,0],
    [0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0],
    [0,0,0,0,4,4,3,4,4,3,4,4,0,0,0,0],
    [0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0],
    [0,0,0,0,3,4,4,4,4,4,4,3,0,0,0,0],
    [0,0,0,0,3,4,4,4,4,4,4,3,0,0,0,0],
    [0,0,0,0,4,3,0,0,0,0,3,4,0,0,0,0],
    [0,0,0,0,3,3,0,0,0,0,3,3,0,0,0,0],
    [0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,0],
    [0,0,0,0,3,3,0,0,0,0,3,3,0,0,0,0],
    [0,0,0,3,4,4,3,0,0,3,4,4,3,0,0,0],
    [0,0,3,4,4,4,3,0,0,3,4,4,4,3,0,0],
  ]
};
SPRITES.hero_attack = {
  w:16, h:20,
  pal:['transparent','#fdbcb4','#3d2000','#4a7fc1','#2d5a9e','#c0c0c0','#ffd700','#8B4513'],
  data:[
    [0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0],
    [0,0,0,0,2,6,6,6,6,6,6,2,0,0,0,0],
    [0,0,0,0,2,3,3,3,3,3,3,2,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,0,2,1,2,1,1,2,1,2,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,1,2,0,0,0,0],
    [0,5,5,5,3,4,4,4,4,4,4,3,0,0,0,0],
    [5,5,5,5,3,4,4,4,4,4,4,3,0,0,0,0],
    [0,0,0,5,3,4,4,4,4,4,4,3,0,0,0,0],
    [0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0],
    [0,0,0,0,4,4,3,4,4,3,4,4,0,0,0,0],
    [0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0],
    [0,0,0,0,3,4,4,4,4,4,4,3,0,0,0,0],
    [0,0,0,3,4,4,3,4,4,4,4,3,0,0,0,0],
    [0,0,3,3,4,3,0,0,0,3,4,3,0,0,0,0],
    [0,0,0,3,3,3,0,0,0,3,3,3,0,0,0,0],
    [0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,0],
    [0,0,0,0,3,3,0,0,0,0,3,3,0,0,0,0],
    [0,0,0,3,4,4,3,0,0,3,4,4,3,0,0,0],
    [0,0,3,4,4,4,3,0,0,3,4,4,4,3,0,0],
  ]
};
SPRITES.hero_hurt = {
  w:16, h:20,
  pal:['transparent','#fdbcb4','#3d2000','#4a7fc1','#2d5a9e','#c0c0c0','#ffd700','#8B4513'],
  data:[
    [0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0],
    [0,0,0,2,2,6,6,6,6,6,2,0,0,0,0,0],
    [0,0,0,2,2,3,3,3,3,3,2,0,0,0,0,0],
    [0,0,0,2,2,1,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,2,2,1,2,1,1,2,2,0,0,0,0,0],
    [0,0,0,2,2,1,1,1,1,1,2,0,0,0,0,0],
    [0,0,0,0,3,4,4,4,4,4,4,3,5,0,0,0],
    [0,0,0,0,3,4,4,4,4,4,4,3,5,5,0,0],
    [0,0,0,0,3,4,4,4,4,4,4,3,5,0,0,0],
    [0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0],
    [0,0,0,0,4,4,3,4,4,3,4,4,0,0,0,0],
    [0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0],
    [0,0,0,0,3,4,4,4,4,4,4,3,0,0,0,0],
    [0,0,0,0,3,4,4,4,4,4,4,3,0,0,0,0],
    [0,0,0,0,4,3,0,0,0,0,3,4,0,0,0,0],
    [0,0,0,0,3,3,0,0,0,0,3,3,0,0,0,0],
    [0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,0],
    [0,0,0,0,3,3,0,0,0,0,3,3,0,0,0,0],
    [0,0,0,3,4,4,3,0,0,3,4,4,3,0,0,0],
    [0,0,3,4,4,4,3,0,0,3,4,4,4,3,0,0],
  ]
};

// SLIME (14×10)
SPRITES.slime_a = {
  w:14, h:10,
  pal:['transparent','#4ade80','#166534','#bbf7d0','#ffffff','#000000'],
  data:[
    [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,1,3,3,3,3,3,3,3,3,1,0,0],
    [0,1,3,3,3,3,3,3,3,3,3,3,1,0],
    [0,1,1,3,3,4,3,3,4,3,3,1,1,0],
    [0,1,1,3,3,4,3,3,4,3,3,1,1,0],
    [0,1,1,3,3,3,3,2,3,3,3,1,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,1,1,1,1,1,1,1,1,1,1,2,1],
    [1,1,2,1,1,1,1,1,1,1,1,2,1,1],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  ]
};
SPRITES.slime_b = {
  w:14, h:10,
  pal:['transparent','#4ade80','#166534','#bbf7d0','#ffffff','#000000'],
  data:[
    [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,3,3,3,3,3,3,1,1,0,0],
    [0,1,3,3,3,3,3,3,3,3,3,3,1,0],
    [0,1,1,3,3,4,3,3,4,3,3,1,1,0],
    [0,1,1,3,3,4,3,3,4,3,3,1,1,0],
    [0,1,1,3,3,3,3,2,3,3,3,1,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,2,1,1,1,1,1,1,1,1,2,1,1],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
  ]
};
SPRITES.slime_hurt = {
  w:14, h:10,
  pal:['transparent','#4ade80','#166534','#ffffff','#ffffff','#000000'],
  data:SPRITES.slime_a.data
};

// GOBLIN (14×20)
SPRITES.goblin_idle = {
  w:14, h:20,
  pal:['transparent','#86efac','#166534','#7c2d12','#fbbf24','#ef4444','#f5f5dc'],
  data:[
    [0,0,0,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,4,4,1,1,4,4,1,1,0,0],
    [0,0,1,1,4,5,1,1,4,5,1,1,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,1,5,5,5,5,5,5,5,5,1,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,3,1,3,3,3,3,3,3,1,3,0,0],
    [0,3,3,3,3,3,3,3,3,3,3,3,3,0],
    [0,1,3,3,3,3,3,3,3,3,3,3,1,0],
    [0,1,3,3,3,3,3,3,3,3,3,3,1,0],
    [0,0,3,3,1,3,3,3,3,1,3,3,0,0],
    [0,0,3,3,3,3,3,3,3,3,3,3,0,0],
    [0,0,0,3,3,3,3,3,3,3,3,0,0,0],
    [0,0,0,2,2,3,3,3,3,2,2,0,0,0],
    [0,0,0,2,3,3,0,0,3,3,2,0,0,0],
    [0,0,0,2,2,0,0,0,0,2,2,0,0,0],
    [0,0,0,0,2,0,0,0,0,2,0,0,0,0],
    [0,0,0,0,2,0,0,0,0,2,0,0,0,0],
    [0,0,0,2,2,2,0,0,2,2,2,0,0,0],
    [0,0,2,2,2,2,0,0,2,2,2,2,0,0],
  ]
};

// ORC (18×22)
SPRITES.orc_idle = {
  w:18, h:22,
  pal:['transparent','#a3e635','#4d7c0f','#92400e','#fbbf24','#ef4444','#ffffff','#f5f5dc'],
  data:[
    [0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,1,4,4,1,1,4,4,1,1,1,0,0,0,0],
    [0,0,0,0,1,4,5,1,1,4,5,1,1,1,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,1,5,5,5,5,5,5,5,5,1,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0],
    [0,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,0],
    [0,1,1,3,3,3,3,3,3,3,3,3,3,3,1,1,1,0],
    [0,1,1,3,3,3,3,3,3,3,3,3,3,3,1,1,1,0],
    [0,0,1,3,3,1,3,3,3,3,1,3,3,3,3,1,0,0],
    [0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0],
    [0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0],
    [0,0,0,3,2,3,3,3,3,3,3,3,2,3,3,0,0,0],
    [0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0],
    [0,0,0,2,3,3,3,3,3,3,3,3,3,3,2,0,0,0],
    [0,0,0,2,2,3,0,0,0,0,0,3,2,2,0,0,0,0],
    [0,0,0,0,2,2,0,0,0,0,0,2,2,0,0,0,0,0],
    [0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0],
    [0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0],
    [0,0,0,2,2,2,3,0,0,0,3,2,2,2,0,0,0,0],
    [0,0,2,2,2,2,3,0,0,0,3,2,2,2,2,0,0,0],
  ]
};

// DEMON GUARD (18×24)
SPRITES.demon_idle = {
  w:18, h:24,
  pal:['transparent','#7c3aed','#4c1d95','#dc2626','#fbbf24','#1e1b4b','#f5f5dc','#ffffff'],
  data:[
    [0,0,3,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0],
    [0,3,3,3,0,0,0,0,0,0,0,0,0,3,3,3,0,0],
    [0,0,3,0,2,2,2,2,2,2,2,2,2,0,3,0,0,0],
    [0,0,0,2,4,4,2,2,2,4,4,2,2,2,0,0,0,0],
    [0,0,0,2,4,5,2,2,2,4,5,2,2,2,0,0,0,0],
    [0,0,0,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0],
    [0,0,0,2,3,3,3,3,3,3,3,3,3,2,0,0,0,0],
    [0,0,0,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0],
    [0,0,1,5,1,1,1,1,1,1,1,1,1,5,1,0,0,0],
    [0,1,1,5,1,1,1,1,1,1,1,1,1,5,1,1,0,0],
    [0,1,5,5,1,1,1,1,1,1,1,1,1,5,5,1,0,0],
    [0,0,1,5,1,1,1,1,1,1,1,1,1,5,1,0,0,0],
    [0,0,0,1,1,1,5,1,1,1,5,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,5,1,1,1,1,1,1,1,1,1,5,0,0,0,0],
    [0,0,0,5,5,1,0,0,0,0,0,1,5,5,0,0,0,0],
    [0,0,0,0,5,5,0,0,0,0,0,5,5,0,0,0,0,0],
    [0,0,0,0,5,0,0,0,0,0,0,0,5,0,0,0,0,0],
    [0,0,0,0,5,0,0,0,0,0,0,0,5,0,0,0,0,0],
    [0,0,7,0,5,5,0,0,0,0,0,5,5,0,0,7,0,0],
    [0,7,7,0,5,0,0,0,0,0,0,0,5,0,7,7,0,0],
    [7,7,7,0,5,0,0,0,0,0,0,0,5,0,7,7,7,0],
    [0,7,7,0,5,5,1,0,0,0,1,5,5,0,7,7,0,0],
    [0,0,7,5,5,5,1,0,0,0,1,5,5,5,7,0,0,0],
  ]
};

// DEMON LORD (22×28)
SPRITES.demonlord_idle = {
  w:22, h:28,
  pal:['transparent','#7c3aed','#4c1d95','#dc2626','#ffd700','#1e1b4b','#f97316','#ffffff','#9333ea'],
  data:[
    [0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0],
    [0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0],
    [0,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,0],
    [0,0,3,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,3,0,0],
    [0,0,0,0,2,2,4,4,4,4,2,2,4,4,4,4,2,2,0,0,0,0],
    [0,0,0,0,2,4,4,7,2,2,4,4,4,2,7,4,4,2,0,0,0,0],
    [0,0,0,0,2,4,4,4,2,2,4,2,2,4,4,4,4,2,0,0,0,0],
    [0,0,0,0,2,2,4,4,4,4,3,4,4,4,4,2,2,2,0,0,0,0],
    [0,0,0,0,2,2,2,4,6,6,6,6,4,2,2,2,2,2,0,0,0,0],
    [0,0,0,0,2,3,3,3,3,3,3,3,3,3,3,2,2,2,0,0,0,0],
    [0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0],
    [0,0,1,5,5,5,1,1,1,1,1,1,1,1,1,1,5,5,5,1,0,0],
    [0,1,1,5,5,1,1,1,1,1,1,1,1,1,1,1,5,5,1,1,1,0],
    [1,1,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,1,1,1],
    [1,1,5,5,1,1,1,6,1,1,1,1,6,1,1,1,1,5,5,1,1,1],
    [0,1,1,5,5,1,1,1,1,1,1,1,1,1,1,1,5,5,1,1,1,0],
    [0,0,1,5,5,5,1,1,1,1,1,1,1,1,1,5,5,5,1,0,0,0],
    [0,0,0,1,5,5,1,1,5,1,1,1,5,1,1,5,5,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,5,1,1,1,1,1,1,1,1,1,1,1,1,1,5,0,0,0,0],
    [0,0,0,5,5,1,1,0,0,0,0,0,0,0,1,1,5,5,0,0,0,0],
    [0,0,0,0,5,5,0,0,0,0,0,0,0,0,0,5,5,0,0,0,0,0],
    [0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0],
    [0,0,6,0,5,0,0,0,0,0,0,0,0,0,0,0,5,0,6,0,0,0],
    [0,6,6,0,5,5,0,0,0,0,0,0,0,0,0,5,5,0,6,6,0,0],
    [6,6,6,0,5,0,0,0,0,0,0,0,0,0,0,0,5,0,6,6,6,0],
    [0,6,6,5,5,5,1,1,0,0,0,0,1,1,5,5,5,6,6,0,0,0],
    [0,0,5,5,5,5,1,1,0,0,0,0,1,1,5,5,5,5,0,0,0,0],
  ]
};

// PRINCESS (14×20)
SPRITES.princess_idle = {
  w:14, h:20,
  pal:['transparent','#fdbcb4','#fbbf24','#ec4899','#a855f7','#dc2626','#ffffff'],
  data:[
    [0,0,0,0,2,2,2,2,2,2,0,0,0,0],
    [0,0,0,2,2,2,2,2,2,2,2,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,2,0,0,0],
    [0,0,0,2,1,5,1,1,5,1,2,0,0,0],
    [0,0,0,2,1,1,1,1,1,1,2,0,0,0],
    [0,0,0,2,1,3,3,3,3,1,2,0,0,0],
    [0,0,0,0,3,3,3,3,3,3,0,0,0,0],
    [0,0,3,3,3,3,3,3,3,3,3,3,0,0],
    [0,3,3,3,3,3,3,3,3,3,3,3,3,0],
    [0,3,4,3,3,3,3,3,3,3,3,4,3,0],
    [0,3,3,3,3,3,3,3,3,3,3,3,3,0],
    [0,0,3,3,4,3,3,3,3,4,3,3,0,0],
    [0,0,3,3,3,3,3,3,3,3,3,3,0,0],
    [0,0,3,3,3,3,3,3,3,3,3,3,0,0],
    [0,0,0,3,3,6,3,3,6,3,3,0,0,0],
    [0,0,0,0,3,6,0,0,6,3,0,0,0,0],
    [0,0,0,0,3,0,0,0,0,3,0,0,0,0],
    [0,0,0,0,3,0,0,0,0,3,0,0,0,0],
    [0,0,0,3,3,3,0,0,3,3,3,0,0,0],
    [0,0,3,3,3,3,0,0,3,3,3,3,0,0],
  ]
};

// KING (14×22)
SPRITES.king_idle = {
  w:14, h:22,
  pal:['transparent','#fdbcb4','#f59e0b','#7c3aed','#ffd700','#dc2626','#ffffff'],
  data:[
    [0,0,0,4,4,4,4,4,4,4,4,0,0,0],
    [0,0,4,4,4,4,4,4,4,4,4,4,0,0],
    [0,0,2,2,2,2,2,2,2,2,2,2,0,0],
    [0,0,2,1,1,1,1,1,1,1,1,2,0,0],
    [0,0,2,1,5,1,2,2,1,5,1,2,0,0],
    [0,0,2,1,1,1,1,1,1,1,1,2,0,0],
    [0,0,2,1,2,2,2,2,2,2,1,2,0,0],
    [0,0,2,2,2,2,2,2,2,2,2,2,0,0],
    [0,3,3,3,3,3,3,3,3,3,3,3,3,0],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [0,3,3,3,5,3,3,3,3,5,3,3,3,0],
    [0,3,3,3,3,3,3,3,3,3,3,3,3,0],
    [0,3,3,3,3,3,3,3,3,3,3,3,3,0],
    [0,0,3,3,5,3,3,3,3,5,3,3,0,0],
    [0,0,3,3,3,3,3,3,3,3,3,3,0,0],
    [0,0,3,3,3,3,3,3,3,3,3,3,0,0],
    [0,0,3,5,3,3,0,0,3,3,5,3,0,0],
    [0,0,0,5,3,0,0,0,0,3,5,0,0,0],
    [0,0,0,5,0,0,0,0,0,0,5,0,0,0],
    [0,0,0,5,0,0,0,0,0,0,5,0,0,0],
    [0,0,3,3,3,3,0,0,3,3,3,3,0,0],
    [0,3,3,3,3,3,0,0,3,3,3,3,3,0],
  ]
};

// ─── GESTURE HAND ICONS (40×40 pixel units) ──────────────────────────────────
const HAND_ICONS = {};

// Each is a 40×40 array of color indices
// Palette per icon: 0=transparent, 1=skin, 2=dark_outline, 3=highlight
function makeHandBase40() {
  return Array.from({length:40}, ()=>new Array(40).fill(0));
}

// FIST ✊
(function(){
  const d = makeHandBase40();
  const fill=(r1,c1,r2,c2,v)=>{for(let r=r1;r<=r2;r++)for(let c=c1;c<=c2;c++)d[r][c]=v;};
  // palm base
  fill(20,8,36,30,1);
  // knuckle bumps
  fill(16,8,20,12,1); fill(16,12,20,16,1); fill(16,16,20,20,1); fill(16,20,20,24,1);
  // top finger row - folded fist
  fill(13,8,17,26,1);
  // thumb side
  fill(22,4,28,10,1);
  // outline
  fill(12,7,12,27,2); fill(36,7,36,31,2);
  fill(12,7,37,7,2); fill(12,31,37,31,2);
  // knuckle dividers
  for(let r=13;r<=16;r++){d[r][13]=2;d[r][17]=2;d[r][21]=2;d[r][25]=2;}
  HAND_ICONS.fist = {w:40,h:40,pal:['transparent','#fdbcb4','#8B4513','#fff5f0'],data:d};
})();

// OPEN HAND ✋
(function(){
  const d = makeHandBase40();
  const fill=(r1,c1,r2,c2,v)=>{for(let r=r1;r<=r2;r++)for(let c=c1;c<=c2;c++)d[r][c]=v;};
  // thumb
  fill(20,4,35,10,1);
  // index
  fill(8,10,30,14,1);
  // middle (tallest)
  fill(5,15,30,19,1);
  // ring
  fill(8,20,30,24,1);
  // pinky
  fill(12,25,30,29,1);
  // palm
  fill(30,4,38,29,1);
  // outlines
  for(let c=10;c<=13;c++){d[7][c]=2;d[31][c]=2;}
  for(let c=15;c<=18;c++){d[4][c]=2;}
  for(let c=20;c<=23;c++){d[7][c]=2;}
  for(let c=25;c<=28;c++){d[11][c]=2;}
  HAND_ICONS.open_hand = {w:40,h:40,pal:['transparent','#fdbcb4','#8B4513','#fff5f0'],data:d};
})();

// POINTING ☝️
(function(){
  const d = makeHandBase40();
  const fill=(r1,c1,r2,c2,v)=>{for(let r=r1;r<=r2;r++)for(let c=c1;c<=c2;c++)d[r][c]=v;};
  // palm + closed fingers
  fill(22,8,37,30,1);
  // folded fingers
  fill(18,12,24,30,1);
  fill(15,16,22,28,1);
  // index pointing up
  fill(5,12,22,18,1);
  // thumb
  fill(24,4,30,12,1);
  // nail tip
  fill(5,13,7,17,3);
  HAND_ICONS.pointing = {w:40,h:40,pal:['transparent','#fdbcb4','#8B4513','#fff0f0'],data:d};
})();

// PEACE ✌️
(function(){
  const d = makeHandBase40();
  const fill=(r1,c1,r2,c2,v)=>{for(let r=r1;r<=r2;r++)for(let c=c1;c<=c2;c++)d[r][c]=v;};
  // palm
  fill(24,8,38,30,1);
  // ring+pinky folded
  fill(18,20,26,30,1);
  fill(14,24,24,30,1);
  // thumb
  fill(26,4,32,12,1);
  // index
  fill(5,10,26,16,1);
  // middle
  fill(5,18,26,24,1);
  // nail tips
  fill(5,11,7,15,3);
  fill(5,19,7,23,3);
  HAND_ICONS.peace = {w:40,h:40,pal:['transparent','#fdbcb4','#8B4513','#fff0f0'],data:d};
})();

// OK SIGN 👌
(function(){
  const d = makeHandBase40();
  const fill=(r1,c1,r2,c2,v)=>{for(let r=r1;r<=r2;r++)for(let c=c1;c<=c2;c++)d[r][c]=v;};
  // palm
  fill(20,10,37,32,1);
  // middle, ring, pinky up
  fill(7,16,22,20,1);
  fill(7,21,22,25,1);
  fill(10,26,22,30,1);
  // thumb forms circle with index
  fill(10,8,24,14,1);
  // index curves
  fill(8,13,22,17,1);
  // circle gap
  fill(18,10,24,16,0);
  // inside circle fill
  fill(14,11,18,15,0);
  // nail tips
  fill(7,17,9,19,3); fill(7,22,9,24,3);
  HAND_ICONS.ok_sign = {w:40,h:40,pal:['transparent','#fdbcb4','#8B4513','#fff0f0'],data:d};
})();

// THUMB UP 👍
(function(){
  const d = makeHandBase40();
  const fill=(r1,c1,r2,c2,v)=>{for(let r=r1;r<=r2;r++)for(let c=c1;c<=c2;c++)d[r][c]=v;};
  // fist base (horizontal)
  fill(22,8,36,30,1);
  // thumb pointing up
  fill(8,6,24,14,1);
  // knuckles
  fill(18,12,22,30,1);
  // thumbnail
  fill(8,7,12,13,3);
  HAND_ICONS.thumb_up = {w:40,h:40,pal:['transparent','#fdbcb4','#8B4513','#fff0f0'],data:d};
})();

// ─── GAME STATE ──────────────────────────────────────────────────────────────
const GS = {
  phase: 'loading', // loading → intro_cutscene → stage_title → battle → stage_clear → boss_defeat_cutscene → ending_cutscene → credits
  stageIdx: 0,
  heroHp: 5,
  heroMaxHp: 5,
  score: 0,
  combo: 0,
  beatIdx: 0,
  beatTimer: 0,
  bpm: 58,
  beatInterval: 60000/58,
  lastBeatTime: 0,
  currentGesture: null,
  detectedGesture: null,
  heroX: 0, heroY: 0,
  heroAnimState: 'idle', // idle, attack, hurt, victory, defeat
  heroAnimTimer: 0,
  heroOffsetX: 0, heroOffsetY: 0,
  enemyAnimState: 'idle',
  enemyAnimTimer: 0,
  enemyOffsetX: 0, enemyOffsetY: 0,
  enemyFlash: false,
  enemyHp: 3, enemyMaxHp: 3,
  beatPulse: 0,
  feedbackTimer: 0,
  feedbackText: '',
  feedbackColor: '',
  idleWobble: 0,
  cutsceneIdx: 0,
  cutsceneLine: 0,
  typewriterText: '',
  typewriterFull: '',
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

// ─── CANVAS SETUP ─────────────────────────────────────────────────────────────
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const landmarkCanvas = document.getElementById('landmark-canvas');
const landmarkCtx = landmarkCanvas.getContext('2d');

const targetCanvas = document.getElementById('target-canvas');
const targetCtx = targetCanvas.getContext('2d');
targetCtx.imageSmoothingEnabled = false;

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

// ─── SPRITE RENDERER ─────────────────────────────────────────────────────────
function drawSprite(ctx, sprite, x, y, scale, flipX=false, tintWhite=false) {
  const ps = PIXEL * scale;
  for (let row = 0; row < sprite.h; row++) {
    for (let col = 0; col < sprite.w; col++) {
      const idx = sprite.data[row][col];
      if (idx === 0) continue;
      let color = sprite.pal[idx];
      if (tintWhite) color = '#ffffff';
      ctx.fillStyle = color;
      const dx = flipX ? x + (sprite.w - 1 - col) * ps : x + col * ps;
      ctx.fillRect(dx, y + row * ps, ps, ps);
    }
  }
}

function drawHandIcon(ctx, gestureName, x, y, scale, glowColor, glowAmt) {
  const icon = HAND_ICONS[gestureName];
  if (!icon) return;
  const ps = scale;
  if (glowAmt > 0) {
    ctx.save();
    ctx.shadowBlur = glowAmt;
    ctx.shadowColor = glowColor || GESTURE_COLORS[gestureName] || '#fff';
  }
  for (let row = 0; row < icon.h; row++) {
    for (let col = 0; col < icon.w; col++) {
      const idx = icon.data[row][col];
      if (idx === 0) continue;
      let color = icon.pal[idx];
      if (idx === 1) color = glowColor || GESTURE_COLORS[gestureName] || '#fdbcb4';
      if (idx === 2) color = '#3d1a00';
      if (idx === 3) color = '#fff5f0';
      ctx.fillStyle = color;
      ctx.fillRect(x + col * ps, y + row * ps, ps, ps);
    }
  }
  if (glowAmt > 0) ctx.restore();
}

// ─── BACKGROUND RENDERERS ────────────────────────────────────────────────────
function drawBg_meadow(ctx, w, h) {
  // Sky
  ctx.fillStyle='#87ceeb'; ctx.fillRect(0,0,w,h*0.6);
  // Clouds
  ctx.fillStyle='#ffffff';
  [[80,40,60,20],[200,30,80,25],[350,50,50,18],[w*0.6,35,70,22]].forEach(([cx,cy,cw,ch])=>{
    ctx.beginPath(); ctx.ellipse(cx,cy,cw,ch,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx+30,cy-8,cw*0.7,ch*0.8,0,0,Math.PI*2); ctx.fill();
  });
  // Ground
  ctx.fillStyle='#4ade80'; ctx.fillRect(0,h*0.6,w,h*0.4);
  ctx.fillStyle='#22c55e'; ctx.fillRect(0,h*0.65,w,h*0.05);
  // Flowers
  const fcolors=['#f87171','#fbbf24','#a78bfa','#f472b6'];
  for(let i=0;i<20;i++){
    const fx=50+i*(w-100)/20, fy=h*0.62+Math.sin(i)*8;
    ctx.fillStyle=fcolors[i%4]; ctx.fillRect(fx,fy,4,4);
    ctx.fillStyle='#166534'; ctx.fillRect(fx+1,fy+4,2,8);
  }
}
function drawBg_forest(ctx, w, h) {
  ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,w,h);
  ctx.fillStyle='#1e3a1e'; ctx.fillRect(0,h*0.55,w,h*0.45);
  // Tree silhouettes
  ctx.fillStyle='#0a1a0a';
  const trees=[[0,h*0.1,60,h*0.55],[w*0.1,h*0.05,70,h*0.55],[w*0.7,h*0.08,65,h*0.55],[w*0.85,h*0.12,55,h*0.5],[w-60,h*0.07,60,h*0.55]];
  trees.forEach(([tx,ty,tw,th])=>{
    // trunk
    ctx.fillRect(tx+tw/2-8,ty+th*0.7,16,th*0.3);
    // canopy
    ctx.beginPath();
    ctx.moveTo(tx,ty+th*0.7);ctx.lineTo(tx+tw/2,ty);ctx.lineTo(tx+tw,ty+th*0.7);
    ctx.fill();
  });
  // Mushrooms
  ctx.fillStyle='#ef4444';
  [[w*0.3,h*0.72],[w*0.55,h*0.75],[w*0.45,h*0.7]].forEach(([mx,my])=>{
    ctx.fillRect(mx,my,20,8); ctx.fillStyle='#7f1d1d'; ctx.fillRect(mx+8,my+8,4,12); ctx.fillStyle='#ef4444';
  });
  // Moon
  ctx.fillStyle='#fefce8'; ctx.beginPath(); ctx.arc(w*0.8,h*0.15,20,0,Math.PI*2); ctx.fill();
}
function drawBg_cave(ctx, w, h) {
  ctx.fillStyle='#1c1c1c'; ctx.fillRect(0,0,w,h);
  // Stone wall tiles
  ctx.fillStyle='#374151';
  for(let gy=0;gy<h;gy+=32) for(let gx=(gy/32%2)*16;gx<w;gx+=32){
    ctx.fillRect(gx,gy,30,30);
  }
  ctx.fillStyle='#4b5563';
  for(let gy=0;gy<h;gy+=32) for(let gx=(gy/32%2)*16;gx<w;gx+=32){
    ctx.fillRect(gx,gy,28,2); ctx.fillRect(gx,gy,2,30);
  }
  // Stalactites
  ctx.fillStyle='#6b7280';
  for(let si=0;si<10;si++){
    const sx=30+si*w/10, sh=20+Math.random()*30;
    ctx.beginPath(); ctx.moveTo(sx,0); ctx.lineTo(sx+10,0); ctx.lineTo(sx+5,sh); ctx.fill();
  }
  // Ground
  ctx.fillStyle='#374151'; ctx.fillRect(0,h*0.75,w,h*0.25);
  ctx.fillStyle='#1f2937'; ctx.fillRect(0,h*0.75,w,4);
  // Torches
  [w*0.15,w*0.85].forEach(tx=>{
    ctx.fillStyle='#92400e'; ctx.fillRect(tx,h*0.5,6,20);
    ctx.fillStyle='#fbbf24'; ctx.fillRect(tx-2,h*0.45,10,8);
    ctx.fillStyle='#ef4444'; ctx.fillRect(tx,h*0.43,6,6);
  });
}
function drawBg_castle(ctx, w, h) {
  // Red sky
  const grad=ctx.createLinearGradient(0,0,0,h*0.65);
  grad.addColorStop(0,'#1a0000'); grad.addColorStop(1,'#7f1d1d');
  ctx.fillStyle=grad; ctx.fillRect(0,0,w,h*0.65);
  // Castle wall
  ctx.fillStyle='#1c1917'; ctx.fillRect(0,h*0.55,w,h*0.45);
  ctx.fillStyle='#292524';
  for(let bx=0;bx<w;bx+=40){
    ctx.fillRect(bx,h*0.47,36,h*0.12);
    ctx.fillRect(bx+8,h*0.4,20,h*0.09);
  }
  // Arrow slits
  ctx.fillStyle='#0c0a09';
  for(let ax=20;ax<w;ax+=60){
    ctx.fillRect(ax,h*0.57,6,16);
  }
  // Torches on wall
  [w*0.2,w*0.5,w*0.8].forEach(tx=>{
    ctx.fillStyle='#92400e'; ctx.fillRect(tx,h*0.52,5,14);
    ctx.fillStyle='#fbbf24'; ctx.fillRect(tx-2,h*0.48,9,7);
    ctx.fillStyle='#ef4444'; ctx.fillRect(tx-1,h*0.46,7,5);
  });
  // Ground
  ctx.fillStyle='#1c1917'; ctx.fillRect(0,h*0.68,w,h*0.32);
  ctx.fillStyle='#0c0a09'; ctx.fillRect(0,h*0.68,w,4);
}
function drawBg_throne(ctx, w, h) {
  // Very dark
  ctx.fillStyle='#0a0014'; ctx.fillRect(0,0,w,h);
  // Purple glow from above
  const rgrad=ctx.createRadialGradient(w/2,0,0,w/2,0,h*0.7);
  rgrad.addColorStop(0,'rgba(124,58,237,0.3)'); rgrad.addColorStop(1,'transparent');
  ctx.fillStyle=rgrad; ctx.fillRect(0,0,w,h);
  // Floor tiles
  ctx.fillStyle='#1e1b4b';
  for(let gy=h*0.7;gy<h;gy+=20) for(let gx=0;gx<w;gx+=20){
    ctx.fillRect(gx,gy,18,18);
  }
  ctx.fillStyle='#312e81';
  for(let gy=h*0.7;gy<h;gy+=20) for(let gx=0;gx<w;gx+=20){
    ctx.fillRect(gx,gy,18,1); ctx.fillRect(gx,gy,1,18);
  }
  // Pillars
  [w*0.1,w*0.9-16].forEach(px=>{
    ctx.fillStyle='#1e1b4b'; ctx.fillRect(px,0,16,h*0.72);
    ctx.fillStyle='#312e81'; ctx.fillRect(px,0,4,h*0.72);
    // Pillar glow
    ctx.fillStyle='rgba(220,38,38,0.3)'; ctx.fillRect(px,h*0.3,16,8);
  });
  // Skull decorations
  const skullData=[[0,1,1,0],[1,0,0,1],[1,1,1,1],[0,1,1,0],[0,2,2,0]];
  [w*0.3,w*0.5,w*0.7].forEach(sx=>{
    skullData.forEach((row,ri)=>row.forEach((v,ci)=>{
      if(v===0)return;
      ctx.fillStyle=v===1?'#f5f5f5':'#1c1c1c';
      ctx.fillRect(sx+ci*6,h*0.05+ri*6,5,5);
    }));
  });
  // Throne silhouette
  ctx.fillStyle='#0f0c2a';
  ctx.fillRect(w/2-50,h*0.08,100,h*0.65);
  ctx.fillRect(w/2-65,h*0.08,16,h*0.4);
  ctx.fillRect(w/2+49,h*0.08,16,h*0.4);
  // Throne glow
  ctx.fillStyle='rgba(249,115,22,0.15)'; ctx.fillRect(w/2-60,0,120,h*0.7);
}

function drawBackground(bgType) {
  const w=canvas.width, h=canvas.height;
  switch(bgType){
    case 'meadow': drawBg_meadow(ctx,w,h); break;
    case 'forest': drawBg_forest(ctx,w,h); break;
    case 'cave':   drawBg_cave(ctx,w,h); break;
    case 'castle': drawBg_castle(ctx,w,h); break;
    case 'throne': drawBg_throne(ctx,w,h); break;
    default: ctx.fillStyle='#1a1a2e'; ctx.fillRect(0,0,w,h);
  }
}

function drawThroneRoomBg() {
  // For cutscenes, use the throne-like room
  const w=canvas.width, h=canvas.height;
  ctx.fillStyle='#1a0a0e'; ctx.fillRect(0,0,w,h);
  // Floor
  ctx.fillStyle='#2d1b0e';
  for(let gy=h*0.65;gy<h;gy+=24) for(let gx=0;gx<w;gx+=24){
    ctx.fillRect(gx,gy,22,22);
  }
  ctx.fillStyle='#3d2b1e';
  for(let gy=h*0.65;gy<h;gy+=24) for(let gx=0;gx<w;gx+=24){
    ctx.fillRect(gx,gy,22,1);ctx.fillRect(gx,gy,1,22);
  }
  // Tapestries
  ctx.fillStyle='#7c3aed'; ctx.fillRect(w*0.15,h*0.05,40,h*0.5);
  ctx.fillStyle='#ffd700'; ctx.fillRect(w*0.15+2,h*0.05+4,36,8);
  ctx.fillStyle='#7c3aed'; ctx.fillRect(w*0.75,h*0.05,40,h*0.5);
  ctx.fillStyle='#ffd700'; ctx.fillRect(w*0.75+2,h*0.05+4,36,8);
  // Throne
  ctx.fillStyle='#4c1d95'; ctx.fillRect(w/2-35,h*0.2,70,h*0.48);
  ctx.fillStyle='#7c3aed'; ctx.fillRect(w/2-40,h*0.15,80,16);
  ctx.fillStyle='#ffd700'; ctx.fillRect(w/2-38,h*0.15,76,4);
}

// ─── GROUND LINE ─────────────────────────────────────────────────────────────
function getGroundY(bgType) {
  const h = canvas.height;
  switch(bgType){
    case 'meadow': return h*0.62;
    case 'forest': return h*0.72;
    case 'cave':   return h*0.76;
    case 'castle': return h*0.70;
    case 'throne': return h*0.73;
    default:       return h*0.65;
  }
}

// ─── ENEMY SPRITE MAP ─────────────────────────────────────────────────────────
function getEnemySprite(enemyType, animState) {
  switch(enemyType){
    case 'slime':     return SPRITES[GS.idleWobble>0.5?'slime_b':'slime_a'];
    case 'goblin':    return SPRITES.goblin_idle;
    case 'orc':       return SPRITES.orc_idle;
    case 'demon':     return SPRITES.demon_idle;
    case 'demonlord': return SPRITES.demonlord_idle;
    default:          return SPRITES.slime_a;
  }
}

// ─── DRAW BATTLE SCENE ───────────────────────────────────────────────────────
function drawBattleScene(stage, timestamp) {
  const w=canvas.width, h=canvas.height;
  drawBackground(stage.bgType);

  const groundY = getGroundY(stage.bgType);

  // Hero
  const heroSprite = GS.heroAnimState==='attack' ? SPRITES.hero_attack
                   : GS.heroAnimState==='hurt'   ? SPRITES.hero_hurt
                   : SPRITES.hero_idle;
  const heroScale = 1.5;
  const heroW = heroSprite.w * PIXEL * heroScale;
  const heroH = heroSprite.h * PIXEL * heroScale;
  const baseHeroX = w * 0.15;
  const hx = baseHeroX + GS.heroOffsetX;
  const hy = groundY - heroH + GS.heroOffsetY + Math.sin(GS.idleWobble * Math.PI * 2) * 3;
  drawSprite(ctx, heroSprite, hx, hy, heroScale, false, false);

  // Enemy
  const enemySprite = getEnemySprite(stage.enemy);
  const enemyScale = stage.enemy==='demonlord' ? 2.0
                   : stage.enemy==='orc'||stage.enemy==='demon' ? 1.8
                   : 1.5;
  const enemyW = enemySprite.w * PIXEL * enemyScale;
  const enemyH = enemySprite.h * PIXEL * enemyScale;
  const baseEnemyX = w * 0.65;
  const ex = baseEnemyX + GS.enemyOffsetX;
  const ey = groundY - enemyH + GS.enemyOffsetY + Math.sin((GS.idleWobble + 0.5) * Math.PI * 2) * 2;
  drawSprite(ctx, enemySprite, ex, ey, enemyScale, true, GS.enemyFlash);

  // HP bars
  drawEnemyHpBar(ex, ey-20, enemyW, stage);
}

function drawThroneScene(charLeft, charRight) {
  // charLeft/Right: {sprite, scale, flipX}
  const w=canvas.width, h=canvas.height;
  drawThroneRoomBg();
  const groundY = h * 0.73;

  if (charLeft) {
    const sp = charLeft.sprite;
    const sc = charLeft.scale || 1.5;
    const cw = sp.w * PIXEL * sc;
    const ch = sp.h * PIXEL * sc;
    drawSprite(ctx, sp, w*0.2 - cw/2, groundY - ch, sc, charLeft.flipX||false);
  }
  if (charRight) {
    const sp = charRight.sprite;
    const sc = charRight.scale || 1.5;
    const cw = sp.w * PIXEL * sc;
    const ch = sp.h * PIXEL * sc;
    drawSprite(ctx, sp, w*0.7 - cw/2, groundY - ch, sc, charRight.flipX||false);
  }
}

function drawEnemyHpBar(ex, ey, ew, stage) {
  const barW = Math.max(ew, 80);
  const barH = 10;
  const bx = ex;
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(bx, ey, barW, barH);
  const frac = Math.max(0, GS.enemyHp / GS.enemyMaxHp);
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

// ─── HUD ──────────────────────────────────────────────────────────────────────
function updateHud() {
  const hp = document.getElementById('hp-display');
  let hpStr = 'HP: ';
  for(let i=0;i<GS.heroMaxHp;i++) hpStr += i < GS.heroHp ? '❤️' : '🖤';
  hp.textContent = hpStr;
  document.getElementById('score-display').textContent = `SCORE: ${GS.score}`;
  // Combo
  const cd = document.getElementById('combo-display');
  if (GS.combo >= 3) {
    cd.textContent = `${GS.combo} COMBO!!`;
    cd.style.opacity = '1';
  } else {
    cd.style.opacity = '0';
  }
  // Feedback
  const fd = document.getElementById('feedback-display');
  if (GS.feedbackTimer > 0) {
    fd.textContent = GS.feedbackText;
    fd.style.color = GS.feedbackColor;
    fd.style.opacity = String(Math.min(1, GS.feedbackTimer / 300));
  } else {
    fd.style.opacity = '0';
  }
}

// ─── TARGET GESTURE DISPLAY ──────────────────────────────────────────────────
let lastDrawnGesture = null;
let pulseScale = 1.0;

function drawTargetGesture(gestureName, pulse) {
  const tc = targetCanvas;
  const tcx = targetCtx;
  tcx.clearRect(0, 0, tc.width, tc.height);

  if (!gestureName || !HAND_ICONS[gestureName]) return;

  const baseSize = 4; // 4px per unit = 40*4 = 160px
  const s = baseSize * (1 + pulse * 0.25);
  const icon = HAND_ICONS[gestureName];
  const drawW = icon.w * s;
  const drawH = icon.h * s;
  const ox = (tc.width - drawW) / 2;
  const oy = (tc.height - drawH) / 2;

  const glowAmt = 8 + pulse * 35;
  const color = GESTURE_COLORS[gestureName] || '#fff';
  drawHandIcon(tcx, gestureName, ox, oy, s, color, glowAmt);

  // Update name
  const gnt = document.getElementById('gesture-name-text');
  gnt.textContent = GESTURE_NAMES[gestureName] || gestureName;
  gnt.style.color = color;
  gnt.style.textShadow = `0 0 ${8+pulse*15}px ${color}`;
}

function drawUpcomingGestures(sequence, currentIdx) {
  const ids = ['up1','up2','up3'];
  for (let i=0;i<3;i++){
    const c = document.getElementById(ids[i]);
    const cx = c.getContext('2d');
    cx.imageSmoothingEnabled = false;
    cx.clearRect(0,0,c.width,c.height);
    const nextIdx = currentIdx + 1 + i;
    if (nextIdx < sequence.length) {
      const g = sequence[nextIdx];
      const color = GESTURE_COLORS[g] || '#fff';
      drawHandIcon(cx, g, 4, 4, 1, color, 5);
    }
  }
}

// ─── BEAT PROGRESS BAR ───────────────────────────────────────────────────────
function updateBeatBar(frac) {
  document.getElementById('beat-bar-fill').style.width = (frac*100)+'%';
}

// ─── GESTURE DETECTION (Mediapipe) ───────────────────────────────────────────
let mpHands = null;
let mpCamera = null;

// ─── 제스처 분류 (미러 모드 기준) ────────────────────────────────────────────
// 랜드마크 인덱스:
//   손목=0, 엄지=1~4, 검지=5~8, 중지=9~12, 약지=13~16, 새끼=17~20
//   tip: 4,8,12,16,20 / MCP(관절뿌리): 2,5,9,13,17
function classifyGesture(landmarks) {
  if (!landmarks || landmarks.length < 21) return null;
  const lm = landmarks;

  // 손가락 펴짐 판정: tip.y < MCP.y (tip이 관절뿌리보다 위쪽 = 펴짐)
  // MCP 기준이 PIP 기준보다 더 안정적
  function ext(tipIdx, mcpIdx) {
    return lm[tipIdx].y < lm[mcpIdx].y - 0.03;
  }

  // 엄지: 미러 모드에서 tip.x > IP.x 이면 옆으로 뻗은 것
  const thumbExt = lm[4].x > lm[3].x;
  const idxExt   = ext(8,  5);
  const midExt   = ext(12, 9);
  const rngExt   = ext(16, 13);
  const pkyExt   = ext(20, 17);

  // 엄지 끝 ↔ 검지 끝 거리 (ok_sign 판정용)
  const okDist = Math.hypot(lm[4].x - lm[8].x, lm[4].y - lm[8].y);

  // ① ok_sign (👌): 엄지+검지 끝이 가깝고, 중지 이상은 펴져 있음
  //    → 다른 패턴과 겹치기 전에 먼저 판정
  if (okDist < 0.07 && midExt) return 'ok_sign';

  // ② thumb_up (👍): 엄지 뻗음 + 나머지 4손가락 전부 접힘
  //    → fist 보다 반드시 먼저 체크 (조건이 fist에 포함되므로)
  if (thumbExt && !idxExt && !midExt && !rngExt && !pkyExt) return 'thumb_up';

  // ③ fist (✊): 4손가락 전부 접힘 (엄지 무관)
  if (!idxExt && !midExt && !rngExt && !pkyExt) return 'fist';

  // ④ open_hand (✋): 4손가락 전부 펴짐
  if (idxExt && midExt && rngExt && pkyExt) return 'open_hand';

  // ⑤ peace (✌️): 검지+중지만 펴짐
  if (idxExt && midExt && !rngExt && !pkyExt) return 'peace';

  // ⑥ pointing (☝️): 검지만 펴짐
  if (idxExt && !midExt && !rngExt && !pkyExt) return 'pointing';

  return null;
}

function initMediapipe() {
  const videoEl = document.getElementById('webcam');
  try {
    mpHands = new Hands({locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`});
    mpHands.setOptions({maxNumHands:1, modelComplexity:1, minDetectionConfidence:0.7, minTrackingConfidence:0.5});
    mpHands.onResults(onHandResults);
    mpCamera = new Camera(videoEl, {
      onFrame: async ()=>{ await mpHands.send({image:videoEl}); },
      width:320, height:240
    });
    mpCamera.start();
  } catch(e) {
    console.warn('Mediapipe failed:', e);
  }
}

function onHandResults(results) {
  landmarkCtx.clearRect(0, 0, landmarkCanvas.width, landmarkCanvas.height);
  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    const lm = results.multiHandLandmarks[0];
    // Draw landmarks
    drawConnectors(landmarkCtx, lm, HAND_CONNECTIONS, {color:'rgba(0,255,128,0.6)', lineWidth:1.5});
    drawLandmarks(landmarkCtx, lm, {color:'rgba(255,200,0,0.9)', lineWidth:1, radius:3});
    GS.detectedGesture = classifyGesture(lm);
  } else {
    GS.detectedGesture = null;
  }
  const dg = document.getElementById('gesture-detect-display');
  if (GS.detectedGesture) {
    dg.textContent = `감지: ${GESTURE_NAMES[GS.detectedGesture]||GS.detectedGesture}`;
    dg.style.color = GESTURE_COLORS[GS.detectedGesture] || '#4ade80';
  } else {
    dg.textContent = '감지: -';
    dg.style.color = '#4ade80';
  }
}

// ─── KEYBOARD INPUT ───────────────────────────────────────────────────────────
let keyGesture = null;
document.addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (GESTURE_KEYS[k]) {
    keyGesture = GESTURE_KEYS[k];
    // apply immediately as detected
    GS.detectedGesture = keyGesture;
    const dg = document.getElementById('gesture-detect-display');
    dg.textContent = `감지: ${GESTURE_NAMES[keyGesture]||keyGesture}`;
    dg.style.color = GESTURE_COLORS[keyGesture] || '#4ade80';
  }
  if (GS.gameOverVisible) {
    if (k === 'r') { restartGame(); return; }
    if (k === ' ' || k === 'enter') { retryBattle(); return; }
  }
  // Advance dialog/stage
  if ([' ','enter','arrowdown','arrowright'].includes(k)) {
    handleAdvanceInput();
  }
});
document.addEventListener('keyup', e=>{
  const k=e.key.toLowerCase();
  if (GESTURE_KEYS[k] && keyGesture===GESTURE_KEYS[k]) {
    keyGesture = null;
  }
});

function getActiveGesture() {
  return GS.detectedGesture || keyGesture;
}

// ─── GAME FLOW ────────────────────────────────────────────────────────────────
function retryBattle() {
  if (!GS.gameOverVisible) return;
  GS.gameOverVisible = false;
  document.getElementById('gameover-overlay').classList.remove('visible');
  // 현재 스테이지 재시작 (HP 회복, 점수 유지)
  GS.heroHp = GS.heroMaxHp;
  GS.combo = 0;
  GS.beatIdx = 0;
  GS.beatsProcessed = 0;
  GS.enemyOffsetX = 0; GS.enemyOffsetY = 0;
  GS.heroOffsetX = 0;
  GS.enemyFlash = false;
  GS.feedbackTimer = 0;
  GS.flashAlpha = 0;
  GS.bossPhase = 0;
  startBattle();
}

function restartGame() {
  GS.phase = 'intro_cutscene';
  GS.stageIdx = 0;
  GS.heroHp = 5;
  GS.heroMaxHp = 5;
  GS.score = 0;
  GS.combo = 0;
  GS.beatIdx = 0;
  GS.heroAnimState = 'idle';
  GS.heroOffsetX = 0; GS.heroOffsetY = 0;
  GS.enemyAnimState = 'idle';
  GS.enemyOffsetX = 0; GS.enemyOffsetY = 0;
  GS.enemyFlash = false;
  GS.feedbackTimer = 0;
  GS.gameOverVisible = false;
  GS.stageClearVisible = false;
  document.getElementById('gameover-overlay').classList.remove('visible');
  document.getElementById('stage-clear-overlay').classList.remove('visible');
  document.getElementById('stage-title-overlay').classList.remove('visible');
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
  GS.phase = 'battle';
  GS.beatIdx = 0;
  GS.beatsProcessed = 0;
  GS.bpm = stage.bpm;
  GS.beatInterval = 60000 / stage.bpm;
  GS.lastBeatTime = performance.now() + 500; // brief delay before first beat
  GS.enemyHp = stage.enemyHp;
  GS.enemyMaxHp = stage.enemyHp;
  GS.heroAnimState = 'idle';
  GS.enemyAnimState = 'idle';
  GS.enemyOffsetX = 0; GS.enemyOffsetY = 0;
  GS.heroOffsetX = 0; GS.heroOffsetY = 0;
  GS.bossPhase = 0;
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
    drawTargetGesture(GS.waitingGesture, pulse);
  }

  // Battle update
  if (GS.phase === 'battle') {
    const stage = STAGES[GS.stageIdx];
    const elapsed = timestamp - GS.lastBeatTime;
    const beatFrac = Math.min(1, elapsed / GS.beatInterval);
    updateBeatBar(beatFrac);

    // Draw current target
    const currentGesture = stage.sequence[GS.beatIdx];
    if (currentGesture) {
      const pulse = GS.beatPulse * Math.max(0, 1 - (timestamp - GS.lastBeatTime) / 150);
      drawTargetGesture(currentGesture, GS.beatPulse > 0.01 ? GS.beatPulse : 0.05 + 0.05*Math.sin(timestamp/400));
      drawUpcomingGestures(stage.sequence, GS.beatIdx);
    }

    if (elapsed >= GS.beatInterval) {
      GS.lastBeatTime = timestamp;
      processBeat(timestamp);
    }
  }

  // Draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (GS.phase === 'cutscene' || GS.phase === 'credits') {
    const ct = GS.cutsceneType;
    if (ct==='intro' || ct==='ending') {
      // Throne room with king + hero
      drawThroneScene(
        {sprite: SPRITES.king_idle, scale: 1.5, flipX: false},
        {sprite: SPRITES.hero_idle, scale: 1.5, flipX: true}
      );
    } else if (ct==='boss_defeat') {
      // Throne with princess + hero
      drawThroneScene(
        {sprite: SPRITES.princess_idle, scale: 1.5, flipX: false},
        {sprite: SPRITES.hero_idle, scale: 1.5, flipX: true}
      );
    } else {
      drawBackground('meadow');
    }
    // Credits
    if (GS.phase === 'credits') {
      const w=canvas.width, h=canvas.height;
      ctx.fillStyle='rgba(0,0,0,0.7)'; ctx.fillRect(0,0,w,h);
      ctx.fillStyle='#ffd700';
      ctx.font='20px "Press Start 2P"';
      ctx.textAlign='center';
      ctx.fillText('🎉 THE END 🎉', w/2, h*0.3);
      ctx.font='10px "Press Start 2P"';
      ctx.fillStyle='#fff';
      ctx.fillText('용사가 손가락을 숨김', w/2, h*0.45);
      ctx.fillStyle='rgba(255,255,255,0.5)';
      ctx.font='8px "Press Start 2P"';
      ctx.fillText(`FINAL SCORE: ${GS.score}`, w/2, h*0.55);
      ctx.fillStyle='rgba(255,255,255,0.3)';
      ctx.font='7px "Press Start 2P"';
      ctx.fillText('F5 키로 다시 시작', w/2, h*0.7);
      ctx.textAlign='left';
    }
  } else if (GS.phase === 'stage_title') {
    drawBackground(STAGES[GS.stageIdx].bgType);
  } else if (GS.phase === 'battle' || GS.phase === 'battle_ending') {
    const stage = STAGES[GS.stageIdx];
    drawBattleScene(stage, timestamp);
    // Edge flash on beat
    if (GS.flashAlpha > 0) {
      ctx.fillStyle = `rgba(255,255,255,${GS.flashAlpha})`;
      ctx.fillRect(0,0,canvas.width,4);
      ctx.fillRect(0,canvas.height-4,canvas.width,4);
      ctx.fillRect(0,0,4,canvas.height);
      ctx.fillRect(canvas.width-4,0,4,canvas.height);
    }
  } else if (GS.phase === 'stage_clear') {
    drawBackground(STAGES[GS.stageIdx].bgType);
  } else if (GS.phase === 'gameover') {
    drawBackground(STAGES[GS.stageIdx].bgType);
  } else if (GS.phase === 'loading') {
    const w=canvas.width, h=canvas.height;
    ctx.fillStyle='#0a0a0f'; ctx.fillRect(0,0,w,h);
    ctx.fillStyle='#ffd700';
    ctx.font='12px "Press Start 2P"';
    ctx.textAlign='center';
    ctx.fillText('용사가 손가락을 숨김', w/2, h/2 - 20);
    ctx.fillStyle='rgba(255,255,255,0.5)';
    ctx.font='8px "Press Start 2P"';
    ctx.fillText('로딩 중... 카메라 허용 필요', w/2, h/2 + 20);
    ctx.fillText('키보드: SPACE로 시작', w/2, h/2 + 40);
    ctx.textAlign='left';
  }

  updateHud();
  requestAnimationFrame(gameLoop);
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
function init() {
  // Show loading briefly, then start intro
  GS.phase = 'loading';
  initMediapipe();
  setTimeout(()=>{
    startCutscene('intro');
  }, 1500);
  requestAnimationFrame(gameLoop);
}

window.retryBattle = retryBattle;
window.restartGame = restartGame;

init();
