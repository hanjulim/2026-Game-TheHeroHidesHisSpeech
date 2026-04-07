export const GESTURE_COLORS = {
  fist: '#f97316',
  open_hand: '#4ade80',
  pointing: '#60a5fa',
  peace: '#a78bfa',
  ok_sign: '#fbbf24',
  thumb_up: '#f472b6',
};

export const GESTURE_NAMES = {
  fist: '✊ PUNCH',
  open_hand: '✋ GUARD',
  pointing: '☝️ SLASH',
  peace: '✌️ COMBO',
  ok_sign: '👌 SPECIAL',
  thumb_up: '👍 YES!',
};

export const GESTURE_KEYS = {
  a: 'fist',
  s: 'open_hand',
  d: 'pointing',
  f: 'peace',
  g: 'ok_sign',
  h: 'thumb_up',
};

export const STAGES = [
  {
    id: 1, name: 'STAGE 1', location: '초원', bgType: 'meadow',
    enemy: 'slime', enemyName: '슬라임', enemyEmoji: '🟢', enemyHp: 3,
    bpm: 58,
    narrative: '왕성을 나선 용사는 초원에서 슬라임을 만났다!',
    sequence: ['fist', 'fist', 'fist', 'fist', 'fist', 'fist', 'fist', 'fist',
               'fist', 'fist', 'fist', 'fist', 'fist', 'fist', 'fist', 'fist'],
    skillLearned: 'PUNCH(✊) 스킬을 익혔다!',
    afterText: '슬라임을 물리쳤다! 용사는 주먹 공격법을 터득했다.',
  },
  {
    id: 2, name: 'STAGE 2', location: '어두운 숲', bgType: 'forest',
    enemy: 'goblin', enemyName: '고블린', enemyEmoji: '👺', enemyHp: 4,
    bpm: 62,
    narrative: '숲 속에서 사나운 고블린이 나타났다!',
    sequence: ['open_hand', 'fist', 'pointing', 'open_hand', 'fist', 'pointing', 'fist', 'fist', 'pointing', 'open_hand',
               'open_hand', 'fist', 'pointing', 'open_hand', 'fist', 'pointing', 'fist', 'fist', 'pointing', 'open_hand'],
    skillLearned: 'GUARD(✋), SLASH(☝️) 스킬을 익혔다!',
    afterText: '고블린을 물리쳤다! 용사는 방어와 베기를 익혔다.',
  },
  {
    id: 3, name: 'STAGE 3', location: '동굴', bgType: 'cave',
    enemy: 'orc', enemyName: '오크 전사', enemyEmoji: '👹', enemyHp: 5,
    bpm: 65,
    narrative: '동굴 속 오크 전사가 길을 막아섰다!',
    sequence: ['fist', 'open_hand', 'pointing', 'fist', 'open_hand', 'pointing', 'peace', 'fist',
               'pointing', 'open_hand', 'fist', 'peace',
               'fist', 'open_hand', 'pointing', 'fist', 'open_hand', 'pointing', 'peace', 'fist',
               'pointing', 'open_hand', 'fist', 'peace'],
    skillLearned: 'COMBO(✌️) 스킬을 익혔다!',
    afterText: '오크를 물리쳤다! 용사는 콤보 기술도 터득했다.',
  },
  {
    id: 4, name: 'STAGE 4', location: '마왕성 입구', bgType: 'castle',
    enemy: 'demon', enemyName: '악마 근위대', enemyEmoji: '😈', enemyHp: 5,
    bpm: 65,
    narrative: '마왕성 문 앞! 악마 근위대가 막아섰다!',
    sequence: ['fist', 'pointing', 'open_hand', 'peace', 'ok_sign', 'fist', 'pointing', 'peace',
               'open_hand', 'ok_sign', 'fist', 'pointing', 'peace', 'open_hand', 'ok_sign', 'fist',
               'fist', 'pointing', 'open_hand', 'peace', 'ok_sign', 'fist', 'pointing', 'peace',
               'open_hand', 'ok_sign', 'fist', 'pointing', 'peace', 'open_hand', 'ok_sign', 'fist'],
    skillLearned: 'SPECIAL(👌) 스킬을 익혔다!',
    afterText: '근위대를 물리쳤다! 마왕성 문이 열렸다!',
  },
  {
    id: 5, name: 'STAGE 5', location: '마왕의 왕좌', bgType: 'throne',
    enemy: 'demonlord', enemyName: '마왕 다크로드', enemyEmoji: '👿', enemyHp: 9,
    bpm: 60,
    narrative: '드디어 마왕과 마주쳤다!! 모든 기술을 써라!!!',
    sequence: [
      'fist', 'peace', 'pointing', 'open_hand', 'ok_sign', 'fist', 'peace', 'pointing',
      'fist', 'peace', 'pointing', 'open_hand', 'ok_sign', 'fist', 'peace', 'pointing',
      'ok_sign', 'fist', 'peace', 'pointing', 'open_hand', 'fist', 'ok_sign', 'peace', 'pointing', 'fist',
      'ok_sign', 'fist', 'peace', 'pointing', 'open_hand', 'fist', 'ok_sign', 'peace', 'pointing', 'fist',
      'fist', 'peace', 'pointing', 'open_hand', 'ok_sign', 'fist', 'peace', 'pointing',
      'ok_sign', 'fist', 'peace', 'pointing', 'open_hand', 'fist', 'ok_sign', 'peace',
    ],
    skillLearned: '',
    afterText: '마왕을 물리쳤다!!!',
    isBoss: true,
  },
];

export const CUTSCENE_INTRO = [
  { speaker: '👑 왕', text: '오, 용사여! 마왕이 우리 왕국에 쳐들어와 공주님을 납치해 갔소! 부탁이오, 공주님을 구해주시오!' },
  { speaker: '👑 왕', text: '용사여... 지금 바로 떠날 의향이 있소?', waitGesture: 'thumb_up' },
  { speaker: '👑 왕', text: '역시 믿음직스럽소! 부디 건강히 돌아오시오...' },
];

export const CUTSCENE_BOSS_DEFEAT = [
  { speaker: '👿 마왕', text: '으아아아!!! 내가... 패배하다니...! [서서히 사라진다...]' },
  { speaker: '👸 공주', text: '용사님!! 저를 구해주셔서 감사해요! 💕' },
];

export const CUTSCENE_ENDING = [
  { speaker: '👑 왕', text: '돌아왔군! 세상에, 정말로 마왕을 물리쳤소!! 용사여, 무엇이든 원하는 것을 말하시오!' },
  { speaker: '👑 왕', text: '그대의 대답을 듣고 싶소...', waitGesture: 'peace' },
  { speaker: '👑 왕', text: '하하하! 역시 말이 없어도 뜻은 통하는구나! 이 나라 최고의 훈장을 용사에게 수여하오!! 만세!!' },
  { speaker: '🎉 THE END', text: '용사가 손가락을 숨기며 세계를 구했다... 전설이 되다.' },
];
