/* B안 1분 자기소개: A안(interview/index.html)의 데이터와 동작을 Montage 마크업에 맞게 옮겼어요. */
(function () {
'use strict';

/* ---------- 사례 데이터 (모두 가상이에요) ---------- */
const ROLES = [
  { id: 'dev', name: '개발',
    icon: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
    apply: '모눈랩 · 프론트엔드 개발자',
    title: '불편을 코드로 줄이는 사람',
    parts: [
      '안녕하세요, 작은 불편을 코드로 줄이는 걸 좋아하는 지원자입니다.',
      '동아리에서 매주 손으로 하던 출석 집계를 웹 페이지로 바꿔, 집계 시간을 30분에서 5분으로 줄였습니다. 부원들 의견을 받아 세 번 고치면서, 좋은 코드는 쓰는 사람이 편한 코드라는 걸 배웠습니다.',
      '모눈랩에서도 사용자가 느끼는 작은 불편부터 찾아 해결하는 프론트엔드 개발자가 되겠습니다.'
    ],
    good: ['첫 문장에 "어떤 개발자인지"가 바로 나와요.', '전과 후를 숫자(30분 → 5분)로 보여 줘요.', '경험에서 배운 점이 마지막 다짐과 이어져요.'] },
  { id: 'design', name: '디자인',
    icon: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
    apply: '여백스튜디오 · 주니어 프로덕트 디자이너',
    title: '관찰에서 시작하는 사람',
    parts: [
      '안녕하세요, 관찰에서 디자인을 시작하는 지원자입니다.',
      '학교 도서관 좌석 예약 화면에서 친구들이 같은 곳에서 자꾸 멈추는 걸 보고, 다섯 명을 인터뷰해 화면 흐름을 다시 그렸습니다. 바꾼 시안으로 다시 시험해 보니 예약을 끝까지 마친 사람이 다섯 명 중 두 명에서 다섯 명으로 늘었습니다.',
      '여백스튜디오에서도 사용자가 멈칫하는 순간을 먼저 찾아내는 디자이너가 되겠습니다.'
    ],
    good: ['"예쁘게"가 아니라 "문제를 찾는 방식"을 보여 줘요.', '인터뷰 → 시안 → 다시 시험의 과정이 짧게 담겨 있어요.', '작은 규모라도 결과를 숫자로 말해요.'] },
  { id: 'po', name: 'PO',
    icon: 'M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z',
    apply: '한걸음컴퍼니 · 주니어 PO',
    title: '무엇보다 왜를 먼저 묻는 사람',
    parts: [
      '안녕하세요, 근거를 모아 우선순위를 정하는 지원자입니다.',
      '교내 중고거래 앱 프로젝트에서 기능 아이디어가 열 개 넘게 나왔을 때, 60명 설문 결과를 바탕으로 "거래 장소 추천" 하나에 먼저 집중하자고 팀을 설득했습니다. 출시 한 달 뒤, 약속을 잡고도 거래가 취소되는 일이 눈에 띄게 줄었습니다.',
      '한걸음컴퍼니에서도 무엇을 만들지보다 왜 만드는지를 먼저 묻는 PO가 되겠습니다.'
    ],
    good: ['여러 선택지 중 하나를 고른 "판단"이 드러나요.', '설득의 근거(설문 60명)가 구체적이에요.', 'PO가 하는 일을 한 문장 다짐으로 정리했어요.'] },
  { id: 'mkt', name: '마케팅',
    icon: 'M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z',
    apply: '다음페이지 · 콘텐츠 마케터',
    title: '사람이 멈춰 서는 이유를 찾는 사람',
    parts: [
      '안녕하세요, 사람들이 왜 멈춰서 보는지 궁금해하는 지원자입니다.',
      '동네 책방 SNS를 석 달 동안 맡아, 책 표지 사진 대신 손님이 남긴 한 줄 메모를 소개하는 방식으로 바꿨습니다. 게시물당 저장 수가 평균 4개에서 25개로 늘었고, 메모를 보고 찾아왔다는 손님도 생겼습니다.',
      '다음페이지에서도 숫자와 사람 이야기를 함께 보는 콘텐츠 마케터가 되겠습니다.'
    ],
    good: ['무엇을 바꿨는지(표지 → 손님 메모)가 한눈에 보여요.', '숫자 결과와 사람 반응을 같이 말해요.', '마지막 문장이 자기 강점을 한 번 더 정리해 줘요.'] }
];

const $ = (id) => document.getElementById(id);
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const ICON_CHECK = 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z';
const ICON_PLAY = 'M8 5v14l11-7z';
const svg = (d) => `<svg class="mi" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;

/* ---------- 직군 칩과 사례 ---------- */
let currentRole = ROLES[0].id;
const partsHTML = (r) => r.parts.map((t, i) => `<span class="s${i + 1}">${t}</span>`).join(' ');
function renderChips() {
  $('roleChips').innerHTML = ROLES.map(r => `
    <button type="button" class="chip" data-role="${r.id}" aria-pressed="${r.id === currentRole}">${svg(r.icon)}${r.name}</button>`).join('');
}
function renderExample() {
  const r = ROLES.find(x => x.id === currentRole);
  $('examplePanel').innerHTML = `
    <article class="card example" aria-labelledby="ex-${r.id}">
      <div>
        <div class="meta t-label1"><span class="tag tag-${r.id}">${r.name}</span>지원: ${r.apply}</div>
        <h3 id="ex-${r.id}" class="t-heading2">${r.title}</h3>
        <div class="ex-box"><p class="manuscript">${partsHTML(r)}</p></div>
        <ul class="legend t-caption1" aria-label="표시 설명">
          <li><i class="k1"></i>나는 누구</li>
          <li><i class="k2"></i>근거 경험</li>
          <li><i class="k3"></i>왜 이 직무</li>
        </ul>
      </div>
      <div class="why">
        <h4 class="t-headline1">이래서 잘됐어요</h4>
        <ul class="t-body2">${r.good.map(g => `<li>${svg(ICON_CHECK)}<span>${g}</span></li>`).join('')}</ul>
        <button type="button" class="btn btn-primary" data-use="${r.id}">${svg(ICON_PLAY)}이 사례로 연습하기</button>
      </div>
    </article>`;
}
function selectRole(id, focus) {
  currentRole = id; renderChips(); renderExample();
  if (focus) document.querySelector(`#roleChips [data-role="${id}"]`).focus();
}
$('roleChips').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-role]');
  if (b) selectRole(b.dataset.role, true);
});
$('roleChips').addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  e.preventDefault();
  const i = ROLES.findIndex(r => r.id === currentRole);
  selectRole(ROLES[(i + (e.key === 'ArrowRight' ? 1 : -1) + ROLES.length) % ROLES.length].id, true);
});

/* 사례로 연습하기 / 내 자기소개 쓰기 */
$('examplePanel').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-use]');
  if (!b) return;
  const r = ROLES.find(x => x.id === b.dataset.use);
  $('exHeading').textContent = `${r.name} 사례로 연습해요`;
  $('exSub').textContent = `지원: ${r.apply}`;
  $('exBody').innerHTML = partsHTML(r);
  $('writeView').hidden = true;
  $('exampleView').hidden = false;
  resetTimer();
  $('practice').scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth' });
  $('exTitle').focus({ preventScroll: true });
});
$('backWrite').addEventListener('click', () => {
  $('exampleView').hidden = true;
  $('writeView').hidden = false;
  $('writeTitle').focus();
});

/* ---------- 내 자기소개: 글자 수 + 이 브라우저에 저장 (A안과 다른 키) ---------- */
const KEY = 'career-site-b:interview:intro';
const fields = ['w1', 'w2', 'w3'].map($);
function updateCount() {
  const n = fields.map(f => f.value.trim()).join(' ').trim().length;
  $('count').textContent = `지금 ${n}자`;
}
try {
  const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
  if (Array.isArray(saved)) fields.forEach((f, i) => { if (typeof saved[i] === 'string') f.value = saved[i]; });
} catch (e) {}
fields.forEach(f => f.addEventListener('input', () => {
  updateCount();
  try { localStorage.setItem(KEY, JSON.stringify(fields.map(x => x.value))); } catch (e) {}
}));
updateCount();

/* ---------- 원형 타이머 ---------- */
const bar = $('ringBar');
const C = 2 * Math.PI * Number(bar.getAttribute('r'));
bar.style.strokeDasharray = C.toFixed(2);
let duration = 60, raf = 0, endAt = 0, running = false, soundOn = false, lastSec = -1;

/* left: 남은 비율 1(시작) ~ 0(끝) */
function setRing(left) {
  left = Math.min(1, Math.max(0, left));
  bar.style.strokeDashoffset = (C * (1 - left)).toFixed(2);
}
const fmt = (sec) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
function showTime(sec) {
  if (sec === lastSec) return;
  lastSec = sec;
  $('time').textContent = fmt(sec);
  $('time').setAttribute('aria-label', `남은 시간 ${sec}초`);
}

function tick(now) {
  const total = duration * 1000;
  const rem = Math.max(0, endAt - now);
  const sec = Math.ceil(rem / 1000);
  /* 움직임 줄이기 설정이면 1초 단위로만 줄어들어요 */
  setRing(reduce.matches ? sec / duration : rem / total);
  showTime(sec);
  if (rem <= 0) return finish();
  raf = requestAnimationFrame(tick);
}
function start() {
  if (running) return;
  running = true;
  $('doneNote').hidden = true;
  $('ring').classList.remove('is-done');
  $('ring').classList.add('is-run');
  $('startBtn').disabled = true;
  $('timeLabel').textContent = '말하는 중…';
  setRing(1);
  endAt = performance.now() + duration * 1000;
  raf = requestAnimationFrame(tick);
}
function finish() {
  running = false;
  cancelAnimationFrame(raf);
  setRing(0);
  showTime(0);
  $('ring').classList.remove('is-run');
  $('ring').classList.add('is-done');
  $('timeLabel').textContent = '끝!';
  $('startBtn').disabled = false;
  $('startBtn').querySelector('span').textContent = '한 번 더';
  $('doneNote').hidden = false;
  if (soundOn) ding();
}
function resetTimer() {
  running = false;
  cancelAnimationFrame(raf);
  lastSec = -1;
  setRing(1);
  showTime(duration);
  $('ring').classList.remove('is-run', 'is-done');
  $('doneNote').hidden = true;
  $('timeLabel').textContent = '남은 시간';
  $('startBtn').disabled = false;
  $('startBtn').querySelector('span').textContent = '시작';
}

const segBtns = document.querySelectorAll('.seg button');
segBtns.forEach(b => b.addEventListener('click', () => {
  segBtns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  duration = Number(b.dataset.sec);
  resetTimer();
}));
$('startBtn').addEventListener('click', start);
$('resetBtn').addEventListener('click', resetTimer);

/* 끝날 때 소리 (기본은 꺼져 있어요, Web Audio로 짧게 두 번) */
let audio;
$('soundBtn').addEventListener('click', () => {
  soundOn = !soundOn;
  $('soundBtn').setAttribute('aria-pressed', String(soundOn));
  $('soundText').textContent = soundOn ? '끝날 때 소리 켜짐' : '끝날 때 소리 꺼짐';
  $('soundOn').hidden = !soundOn; $('soundOff').hidden = soundOn;
  if (soundOn && !audio) { try { audio = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
  if (audio && audio.state === 'suspended') { try { audio.resume(); } catch (e) {} }
});
function ding() {
  if (!audio) return;
  try {
    [0, 0.28].forEach(t => {
      const o = audio.createOscillator(), v = audio.createGain();
      o.frequency.value = 880; o.connect(v); v.connect(audio.destination);
      const s = audio.currentTime + t;
      v.gain.setValueAtTime(0.0001, s);
      v.gain.exponentialRampToValueAtTime(0.25, s + 0.02);
      v.gain.exponentialRampToValueAtTime(0.0001, s + 0.25);
      o.start(s); o.stop(s + 0.26);
    });
  } catch (e) {}
}

renderChips(); renderExample(); resetTimer();
})();
