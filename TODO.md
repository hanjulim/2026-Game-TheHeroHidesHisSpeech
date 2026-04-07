# Refactor Checklist

기준 구조

```text
2026-Game-TheHeroHidesHisFingers/
├─ index.html
├─ styles.css
├─ js/
│  ├─ main.js
│  ├─ state.js
│  ├─ data.js
│  ├─ input.js
│  ├─ mediapipe.js
│  ├─ render.js
│  ├─ battle.js
│  ├─ cutscene.js
│  ├─ sprites.js
│  └─ utils.js
├─ assets/
│  ├─ sprites/
│  ├─ gestures/
│  └─ audio/
└─ TODO.md
```

작업 원칙

- [ ] JavaScript 분리는 브라우저 기본 `ES module` 방식으로 진행한다.
- [ ] 매 단계마다 게임이 실제로 실행되는지 확인한다.
- [ ] 한 단계에서는 가능하면 "한 종류의 책임"만 분리한다.
- [ ] 구조 분리 단계에서는 동작 변경을 최소화한다.
- [ ] 기능 추가는 구조 분리가 안정된 뒤에 진행한다.

실행 방법

- [ ] `ES module` 구조이므로 `file://` 직접 실행 대신 Live Server 또는 로컬 서버로 연다.
- [ ] 기본 실행 주소 예시: `http://127.0.0.1:5500/` 또는 `http://localhost:8000/`
- [ ] 브라우저 실행 확인 항목은 반드시 서버 환경 기준으로 체크한다.

## Phase 0. 작업 준비

- [x] `js/` 폴더 생성
- [x] `assets/` 폴더 생성
- [x] `assets/sprites/` 폴더 생성
- [x] `assets/gestures/` 폴더 생성
- [x] `assets/audio/` 폴더 생성
- [x] 현재 `index.html` 기준 동작 보존용 체크 포인트 정리
- [x] 첫 리팩터링 기준 파일 백업 또는 git 상태 확인

Phase 0 기준 체크 포인트

- [x] 첫 진입 시 로딩 화면이 보인 뒤 인트로 컷신으로 넘어간다.
- [x] 인트로 컷신은 왕 대사와 제스처 대기(`thumb_up`)를 포함한다.
- [x] 화면은 좌측 게임 캔버스, 우측 웹캠/제스처 패널 2단 구조다.
- [x] 키보드 대체 입력 `A/S/D/F/G/H`가 표시되어 있다.
- [x] 스테이지는 총 5개이며 마지막은 보스전(`마왕 다크로드`)이다.
- [x] 게임오버 시 재시도(`SPACE`)와 처음부터(`R`)가 가능하다.
- [x] 최종 흐름은 `인트로 → 스테이지 진행 → 보스 격파 컷신 → 엔딩 → 크레딧`이다.

Phase 0 기준 상태 메모

- [x] git 기준 상태 확인: `## main...origin/main`
- [x] 현재 미추적 파일: `TODO.md`

## Phase 1. 스타일 분리

- [x] `styles.css` 생성
- [x] `index.html`의 `<style>` 내용을 `styles.css`로 이동
- [x] `index.html`에 stylesheet 링크 연결
- [ ] 스타일 분리 후 화면 레이아웃이 기존과 같은지 확인

Phase 1 메모

- [x] `index.html`에서 `<style>` 블록 제거 확인
- [x] `index.html`에 `styles.css` 링크 연결 확인
- [ ] 브라우저 실기동으로 레이아웃 최종 확인

## Phase 2. 전체 JS 분리

- [x] `js/` 폴더 생성
- [x] `js/main.js` 생성
- [x] `index.html`의 inline script 전체를 우선 `js/main.js`로 이동
- [x] `index.html`에서 inline script를 제거하고 `<script type="module">` 연결
- [ ] JS를 한 파일로 옮긴 뒤에도 기존 게임이 동일하게 동작하는지 확인
- [x] 이 단계에서는 로직 분해 없이 "위치만 이동"하는 것을 원칙으로 한다

Phase 2 메모

- [x] `index.html`의 일반 inline `<script>` 블록 제거 확인
- [x] `index.html`에 `type="module"`로 `js/main.js` 연결 확인
- [x] inline `onclick` 유지용으로 `window.retryBattle`, `window.restartGame` 노출
- [ ] 브라우저 실기동으로 모듈 로딩/게임 동작 최종 확인

## Phase 3. 데이터와 상수 분리

- [x] `js/data.js` 생성
- [x] `STAGES` 데이터 이동
- [x] `CUTSCENE_INTRO`, `CUTSCENE_BOSS_DEFEAT`, `CUTSCENE_ENDING` 이동
- [x] `GESTURE_NAMES`, `GESTURE_COLORS`, `GESTURE_KEYS` 이동
- [x] 필요한 export/import 연결
- [ ] 데이터 분리 후 컷신, 스테이지 표기, 입력명이 정상인지 확인

Phase 3 메모

- [x] 데이터와 상수를 `js/data.js`로 분리
- [x] `js/main.js`에서 `import`로 참조하도록 연결
- [ ] 브라우저 실기동으로 컷신, 스테이지 정보, 입력 라벨 최종 확인

## Phase 4. 스프라이트와 아트 코드 분리

- [x] `js/sprites.js` 생성
- [x] 픽셀 스프라이트 생성 코드 이동
- [x] 손 아이콘 생성 코드 이동
- [x] 스프라이트 초기화 진입점 정리
- [x] 렌더 함수가 새 모듈을 통해 스프라이트를 읽도록 연결
- [ ] 분리 후 캐릭터, 적, 손 아이콘이 기존처럼 보이는지 확인

Phase 4 메모

- [x] 스프라이트와 손 아이콘 데이터를 `js/sprites.js`로 분리
- [x] `js/main.js`에서 `SPRITES`, `HAND_ICONS`를 import하도록 연결
- [ ] 브라우저 실기동으로 캐릭터/적/손 아이콘 렌더 최종 확인

## Phase 5. 상태 관리 분리

- [x] `js/state.js` 생성
- [x] `GS` 초기 상태 정의 이동
- [x] `createInitialState()` 형태로 초기화 함수 정리
- [x] 전투 재시작용 상태 리셋 함수 정리
- [x] 전체 재시작용 상태 리셋 함수 정리
- [x] 상태 변경 책임이 흩어지지 않도록 진입 함수 이름 정리

Phase 5 메모

- [x] 기본 상태를 `createInitialState()`로 분리
- [x] 일반 전투 시작 상태를 `createBattleStartState()`로 분리
- [x] 재도전 상태를 `resetBattleState()`로 분리
- [x] 전체 재시작 상태를 `resetRunState()`로 분리
- [ ] 브라우저 실기동으로 재시작/재도전 흐름 최종 확인

## Phase 6. 입력 처리 분리

- [ ] `js/input.js` 생성
- [ ] 키보드 입력 처리 코드 이동
- [ ] `getActiveGesture()` 이동
- [ ] 키 입력과 진행 입력(`SPACE`, `ENTER`) 처리 경계 정리
- [ ] 입력 모듈이 상태와 DOM에 접근하는 방식 단순화
- [ ] 키보드만으로 처음부터 끝까지 진행 가능한지 확인

## Phase 7. MediaPipe 분리

- [ ] `js/mediapipe.js` 생성
- [ ] `classifyGesture()` 이동
- [ ] `initMediapipe()` 이동
- [ ] `onHandResults()` 이동
- [ ] 웹캠 캔버스 참조와 상태 갱신 방식 정리
- [ ] 웹캠 사용 시 제스처 감지가 기존처럼 동작하는지 확인
- [ ] 웹캠 실패 시 키보드 대체 입력이 유지되는지 확인

## Phase 8. 렌더링 분리

- [ ] `js/render.js` 생성
- [ ] 배경 렌더 함수 이동
- [ ] 캐릭터/적 렌더 함수 이동
- [ ] HUD 렌더 함수 이동
- [ ] 타깃 제스처/다음 제스처/비트 바 렌더 함수 이동
- [ ] 컷신/엔딩/오버레이 렌더 분기 이동
- [ ] `gameLoop()`에서 그리기 호출만 남도록 정리
- [ ] 렌더 분리 후 시각 연출 차이가 없는지 확인

## Phase 9. 컷신과 스테이지 흐름 분리

- [ ] `js/cutscene.js` 생성
- [ ] `startCutscene()` 이동
- [ ] `getCutsceneLines()` 이동
- [ ] `showDialogLine()` 이동
- [ ] `endCutscene()` 이동
- [ ] `handleAdvanceInput()` 중 컷신/타이틀/클리어 흐름 분리
- [ ] `startStageTitle()`, `showStageClear()`, `nextStage()` 이동
- [ ] 타입라이터 진행 책임 위치 정리
- [ ] 인트로부터 스테이지 진입까지 흐름이 끊기지 않는지 확인

## Phase 10. 전투 로직 분리

- [ ] `js/battle.js` 생성
- [ ] `startBattle()` 이동
- [ ] `processBeat()` 이동
- [ ] `retryBattle()` 이동
- [ ] `showGameOver()` 이동
- [ ] 점수, 콤보, HP, 적 HP 계산 책임 정리
- [ ] 전투 종료 후 `stage_clear` 또는 `gameover` 전환이 정상인지 확인

## Phase 11. 공통 유틸과 진입점 정리

- [ ] `js/utils.js` 생성
- [ ] 공통으로 재사용되는 작은 헬퍼만 이동
- [ ] DOM 참조 수집과 초기화 코드 정리
- [ ] 모듈 초기화 순서 정리
- [ ] `requestAnimationFrame(gameLoop)` 시작점을 `main.js`로 이동
- [ ] `main.js`가 진입점만 담당하고 나머지 모듈을 조립하도록 정리

## Phase 12. 리팩터링 검증

- [ ] 첫 화면 로딩 확인
- [ ] 컷신 진행 확인
- [ ] 스테이지 타이틀 표시 확인
- [ ] 키보드 입력 전투 확인
- [ ] 웹캠 제스처 인식 확인
- [ ] 스테이지 클리어 확인
- [ ] 게임오버 후 재시작 확인
- [ ] 엔딩과 크레딧 확인

## Phase 13. 구조 안정화 후 기능 추가

- [ ] 판정 구간(`perfect/good/miss`) 설계
- [ ] 타격음/비트음 최소 오디오 추가
- [ ] 1스테이지 튜토리얼 흐름 추가
- [ ] 적별 차별 규칙 1개씩 기획
- [ ] 최고 점수 또는 간단한 결과 화면 확장
