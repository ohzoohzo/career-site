/* =========================================================
   자주 묻는 질문 — 데이터 + 검색·필터·아코디언·질문 상자
   fetch 없이 동작합니다. (파일을 더블클릭해서 열어도 OK)
   ========================================================= */

/* ---------- 분류 ---------- */
const FAQ_ROLES = {
  all: '전체',
  common: '공통',
  dev: '개발',
  design: '디자인',
  po: 'PO',
  marketing: '마케팅',
};

const FAQ_TOPICS = {
  career:    { label: '직무 고민', color: 'yellow' },
  docs:      { label: '서류 준비', color: 'green' },
  interview: { label: '면접',     color: 'pink' },
  mind:      { label: '마음 관리', color: 'blue' },
};

const ROLES_LINK = { href: '../roles/index.html', text: '직무 사전 보러 가기' };
const JOBS_LINK = { href: '../jobs/index.html', text: '채용 공고 둘러보기' };

/* ---------- 질문 데이터 (공통 12 + 직군별 5개씩) ---------- */
const FAQ_ITEMS = [
  // ── 공통 · 직무 고민
  {
    role: 'common', topic: 'career',
    q: '희망 직무를 아직 정하지 못했어요',
    a: [
      '아직 정하지 못해도 괜찮아요. 많은 분이 같은 자리에서 출발해요.',
      '좋아했던 일, 잘했던 경험, 오래 해도 지치지 않았던 일을 각각 세 개씩 적어 보세요. 겹치는 낱말이 나에게 맞는 일의 힌트가 돼요.',
      '직무 사전에서 네 직군이 하는 일을 비교해 보며 범위를 좁혀 봐요.',
    ],
    link: ROLES_LINK,
  },
  {
    role: 'common', topic: 'career',
    q: '전공과 다른 직무에 지원해도 괜찮을까요?',
    a: [
      '물론이에요. 전공보다 "이 일을 왜 하고 싶은지, 그걸 위해 무엇을 해 봤는지"를 더 궁금해하는 곳이 많아요.',
      '전공에서 얻은 힘(글쓰기, 분석, 사람 이해 등)이 새 직무에서 어떻게 쓰일지 연결해서 설명해 보세요.',
    ],
  },
  {
    role: 'common', topic: 'career',
    q: '관련 경험이 없어도 지원할 수 있나요?',
    a: [
      '지원할 수 있어요. 신입에게는 완벽한 경력보다 배우는 속도와 태도를 봐요.',
      '작은 개인 프로젝트, 스터디, 공모전, 동아리 활동도 충분히 경험이 돼요. "무엇을 했고, 무엇을 배웠는지" 한 줄로 정리해 두세요.',
    ],
  },
  // ── 공통 · 서류 준비
  {
    role: 'common', topic: 'docs',
    q: '서류 준비는 어디서부터 시작하나요?',
    a: [
      '먼저 지금까지의 경험을 날짜순으로 모두 적은 "경험 목록"을 만들어 보세요.',
      '그다음 관심 있는 공고 3개를 골라 자주 나오는 낱말을 표시하고, 그 낱말과 맞닿은 경험을 골라 이력서에 옮기면 돼요.',
    ],
    link: JOBS_LINK,
  },
  {
    role: 'common', topic: 'docs',
    q: '이력서와 자기소개서는 어떻게 다른가요?',
    a: [
      '이력서는 "무엇을 했는지"를 짧고 빠르게 보여 주는 목록이에요.',
      '자기소개서는 "왜 했고, 어떻게 했고, 무엇을 느꼈는지"를 이야기로 풀어 나를 보여 주는 글이에요. 같은 경험이라도 쓰는 방식이 달라요.',
    ],
  },
  {
    role: 'common', topic: 'docs',
    q: '지원하는 곳마다 서류를 다르게 써야 하나요?',
    a: [
      '뼈대는 같아도 괜찮지만, 첫 문단과 강조하는 경험은 공고에 맞춰 바꾸는 걸 추천해요.',
      '공고의 "이런 분과 함께하고 싶어요" 부분을 읽고, 그와 맞는 경험을 앞쪽으로 옮겨 보세요.',
    ],
  },
  // ── 공통 · 면접
  {
    role: 'common', topic: 'interview',
    q: '면접에서 인공지능 활용 경험을 물어보면?',
    a: [
      '어떤 도구를 썼는지보다 "어떤 문제를 풀려고 썼고, 결과를 어떻게 확인했는지"를 말해 주세요.',
      '인공지능이 낸 답을 그대로 쓰지 않고 직접 검토하고 고친 경험이 있다면 좋은 이야깃거리예요.',
    ],
  },
  {
    role: 'common', topic: 'interview',
    q: '1분 자기소개는 어떻게 준비하나요?',
    a: [
      '"나는 어떤 사람인지 → 그걸 보여 주는 경험 하나 → 이 회사에서 하고 싶은 일" 순서로 짜 보세요.',
      '외우기보다 핵심 낱말 세 개만 기억하고 소리 내어 여러 번 말해 보는 연습이 더 자연스러워요.',
    ],
  },
  {
    role: 'common', topic: 'interview',
    q: '마지막에 "궁금한 점 있나요?"라고 물으면요?',
    a: [
      '나의 관심을 보여 줄 좋은 기회예요. 팀이 일하는 방식, 신입이 처음 맡는 일, 함께 일하는 직군 등을 물어보세요.',
      '미리 질문 두세 개를 준비해 두면 마음이 한결 편해요.',
    ],
  },
  // ── 공통 · 마음 관리
  {
    role: 'common', topic: 'mind',
    q: '불합격 소식에 마음이 지쳐요',
    a: [
      '그동안 애쓴 만큼 속상한 게 당연해요. 오늘은 잠시 쉬어도 괜찮아요.',
      '마음이 조금 가라앉으면 "다음에 바꿔 볼 것 한 가지"만 적어 보세요. 불합격은 내 가치가 아니라 그 자리와의 타이밍일 때가 많아요.',
    ],
  },
  {
    role: 'common', topic: 'mind',
    q: '다른 사람과 자꾸 비교하게 돼요',
    a: [
      '남의 결과는 보이지만 과정은 잘 보이지 않아서 더 그렇게 느껴져요.',
      '비교할 대상을 "어제의 나"로 바꿔 보세요. 일주일에 한 번, 이번 주에 해낸 일을 적어 보면 쌓인 것들이 눈에 들어와요.',
    ],
  },
  {
    role: 'common', topic: 'mind',
    q: '공백기가 길어져서 걱정돼요',
    a: [
      '공백기 자체보다 그 시간을 어떻게 설명하는지가 더 중요해요.',
      '공부, 프로젝트, 쉼과 회복 등 그 시간에 한 일을 솔직하게 정리하고, 지금은 어떤 준비가 되어 있는지로 이야기를 이어 가 보세요.',
    ],
  },

  // ── 개발
  {
    role: 'dev', topic: 'career',
    q: '프론트엔드와 백엔드 중 무엇을 고를까요?',
    a: [
      '눈에 보이는 화면과 사용자의 손끝 반응이 즐겁다면 프론트엔드, 데이터 흐름과 서버 구조를 설계하는 게 즐겁다면 백엔드가 잘 맞을 수 있어요.',
      '작은 프로젝트를 하나 끝까지 만들어 보며 어느 쪽에서 시간이 빨리 갔는지 느껴 보세요.',
    ],
    link: ROLES_LINK,
  },
  {
    role: 'dev', topic: 'docs',
    q: '깃허브는 꼭 관리해야 하나요?',
    a: [
      '꼭 화려할 필요는 없지만, 내가 만든 코드를 보여 줄 수 있는 곳이 있으면 좋아요.',
      '대표 저장소 두세 개에 README(무엇을, 왜, 어떻게 만들었는지)를 잘 정리해 두는 것만으로도 충분히 도움이 돼요.',
    ],
  },
  {
    role: 'dev', topic: 'docs',
    q: '개인 프로젝트와 팀 프로젝트 중 무엇이 더 중요할까요?',
    a: [
      '둘 다 의미가 있어요. 개인 프로젝트는 혼자 끝까지 만드는 힘을, 팀 프로젝트는 협업과 소통하는 힘을 보여 줘요.',
      '팀 프로젝트라면 "내가 맡은 부분"과 "함께 풀었던 문제"를 구분해서 적어 주세요.',
    ],
  },
  {
    role: 'dev', topic: 'interview',
    q: '코딩 테스트는 어느 정도 준비해야 하나요?',
    a: [
      '지원하는 곳마다 난이도가 달라서, 먼저 기본 자료구조와 자주 나오는 유형(정렬, 탐색, 문자열 등)을 꾸준히 풀어 보세요.',
      '하루에 많이보다 매일 조금씩, 그리고 푼 문제를 다시 설명해 보는 연습이 오래 남아요.',
    ],
  },
  {
    role: 'dev', topic: 'interview',
    q: '기술 면접에서 모르는 질문이 나오면요?',
    a: [
      '모르는 건 솔직하게 말해도 괜찮아요. 다만 "아는 데까지는 이렇게 생각한다"며 추론 과정을 보여 주면 좋아요.',
      '면접이 끝난 뒤 그 질문을 꼭 찾아 정리해 두면 다음 면접의 든든한 무기가 돼요.',
    ],
  },

  // ── 디자인
  {
    role: 'design', topic: 'career',
    q: 'UX 디자이너와 UI 디자이너는 어떻게 다른가요?',
    a: [
      'UX 디자이너는 사용자가 겪는 흐름과 문제를 살피고 해결 방향을 설계해요. UI 디자이너는 그 흐름을 눈에 보이는 화면과 요소로 다듬어요.',
      '실제로는 두 가지를 함께 하는 곳도 많으니, 공고에서 맡는 일을 꼭 읽어 보세요.',
    ],
    link: ROLES_LINK,
  },
  {
    role: 'design', topic: 'career',
    q: '비전공자도 디자이너가 될 수 있을까요?',
    a: [
      '될 수 있어요. 디자이너에게는 전공보다 문제를 바라보는 시선과 그걸 풀어 낸 과정이 더 중요해요.',
      '작은 서비스 하나를 골라 불편한 점을 찾고 개선안을 만들어 보는 것부터 시작해 보세요.',
    ],
  },
  {
    role: 'design', topic: 'docs',
    q: '포트폴리오는 몇 개가 적당할까요?',
    a: [
      '개수보다 깊이가 중요해요. 과정까지 잘 보여 주는 프로젝트 3~4개면 충분한 경우가 많아요.',
      '가장 자신 있는 작업을 맨 앞에 두고, 지원하는 직무와 가까운 작업 위주로 골라 주세요.',
    ],
  },
  {
    role: 'design', topic: 'docs',
    q: '결과 화면만 보여 주면 안 되나요?',
    a: [
      '예쁜 결과 화면도 중요하지만, 보는 사람은 "왜 이렇게 디자인했는지"를 더 궁금해해요.',
      '문제 정의 → 조사 → 아이디어 → 시안 → 결과 흐름으로, 고민했던 선택의 이유를 짧게라도 적어 주세요.',
    ],
  },
  {
    role: 'design', topic: 'interview',
    q: '디자인 과제 전형은 어떻게 준비하나요?',
    a: [
      '주어진 시간 안에 "무엇을 먼저 해결할지" 정하는 게 핵심이에요. 처음에 문제와 사용자를 한 줄로 정리하고 시작해 보세요.',
      '평소에 1~2시간짜리 짧은 과제를 스스로 내서 연습해 두면 실제 과제에서 덜 긴장돼요.',
    ],
  },

  // ── PO
  {
    role: 'po', topic: 'career',
    q: 'PO와 PM은 무엇이 다른가요?',
    a: [
      '곳마다 쓰는 뜻이 조금씩 달라요. 보통 PO는 한 제품(또는 기능)의 방향과 우선순위를 정하고, PM은 더 넓은 범위에서 제품 전략과 일정을 함께 살피는 경우가 많아요.',
      '이름보다 공고에 적힌 "맡게 될 일"을 보고 판단하는 게 정확해요.',
    ],
    link: ROLES_LINK,
  },
  {
    role: 'po', topic: 'career',
    q: '개발을 몰라도 PO가 될 수 있나요?',
    a: [
      '직접 코드를 짤 줄 몰라도 괜찮아요. 다만 개발자와 대화할 수 있을 만큼 기본 흐름(화면, 서버, 데이터)을 이해하면 큰 도움이 돼요.',
      '간단한 웹 서비스가 어떻게 동작하는지 한 번 따라 만들어 보는 것도 좋은 공부예요.',
    ],
  },
  {
    role: 'po', topic: 'docs',
    q: '신입 PO는 어떤 경험을 보여 주면 좋을까요?',
    a: [
      '문제를 발견하고, 이유를 찾고, 해결책을 정해 실행해 본 경험이면 무엇이든 좋아요. 동아리 운영이나 작은 서비스 개선도 포함돼요.',
      '"무엇이 문제였고, 무엇을 기준으로 우선순위를 정했는지"를 꼭 적어 주세요.',
    ],
  },
  {
    role: 'po', topic: 'docs',
    q: '데이터는 어느 정도 다룰 줄 알아야 하나요?',
    a: [
      '처음부터 전문가일 필요는 없어요. 숫자를 보고 "왜 이렇게 됐을까?"를 묻고, 간단한 표나 그래프로 정리할 수 있으면 좋은 출발이에요.',
      '스프레드시트로 작은 데이터를 정리해 보고, 거기서 찾은 점 하나를 서류에 담아 보세요.',
    ],
  },
  {
    role: 'po', topic: 'interview',
    q: '서비스 개선 과제 면접은 어떻게 준비하나요?',
    a: [
      '평소 쓰는 서비스 하나를 골라 "누가, 어떤 상황에서, 무엇이 불편한지"를 정리하는 연습을 해 보세요.',
      '해결책보다 문제 정의와 우선순위의 이유를 탄탄하게 말하는 게 더 좋은 인상을 줘요.',
    ],
  },

  // ── 마케팅
  {
    role: 'marketing', topic: 'career',
    q: '퍼포먼스 마케팅과 브랜드 마케팅은 어떻게 다른가요?',
    a: [
      '퍼포먼스 마케팅은 광고 성과를 숫자로 보며 빠르게 고쳐 나가는 일이 많고, 브랜드 마케팅은 사람들이 브랜드를 어떻게 느끼고 기억할지 오래 쌓아 가는 일이 많아요.',
      '두 가지 모두 사람을 이해하는 게 출발점이라는 점은 같아요.',
    ],
    link: ROLES_LINK,
  },
  {
    role: 'marketing', topic: 'docs',
    q: '마케팅 포트폴리오에는 무엇을 넣나요?',
    a: [
      '내가 기획하거나 실행해 본 캠페인, 콘텐츠, 채널 운영 경험을 넣어요.',
      '"목표 → 한 일 → 결과 → 배운 점" 순서로 정리하고, 결과는 가능한 한 숫자(조회 수, 참여 수 등)로 보여 주세요.',
    ],
  },
  {
    role: 'marketing', topic: 'docs',
    q: '운영해 본 채널이 없어도 괜찮을까요?',
    a: [
      '괜찮아요. 지금부터 작은 채널을 하나 열어 한 달만 꾸준히 운영해 봐도 이야기할 거리가 생겨요.',
      '팔로워 수보다 "무엇을 실험했고, 어떤 반응을 보고 무엇을 바꿨는지"가 더 중요해요.',
    ],
  },
  {
    role: 'marketing', topic: 'interview',
    q: '마케팅 면접에서는 어떤 과제가 나오나요?',
    a: [
      '가상의 제품을 알리는 캠페인 기획, 광고 성과 표 읽기, 경쟁 서비스 비교 같은 과제가 자주 나와요.',
      '평소 눈에 띄는 광고를 보면 "누구에게, 무엇을, 왜 이렇게 말했을까?"를 짧게 메모해 두면 좋은 연습이 돼요.',
    ],
  },
  {
    role: 'marketing', topic: 'mind',
    q: '숫자에 약한데 마케터가 될 수 있을까요?',
    a: [
      '될 수 있어요. 마케터에게 필요한 건 어려운 계산보다 숫자가 말하는 이야기를 읽는 힘이에요.',
      '클릭률, 전환율 같은 기본 지표 몇 가지부터 익혀 보세요. 하나씩 알아 가다 보면 숫자가 생각보다 친근해져요.',
    ],
  },
];

/* =========================================================
   화면 그리기
   ========================================================= */
const $ = (id) => document.getElementById(id);
const els = {
  search: $('faq-search'),
  clear: $('faq-search-clear'),
  topics: $('faq-topics'),
  roles: $('faq-roles'),
  list: $('faq-list'),
  count: $('faq-count'),
  empty: $('faq-empty'),
  reset: $('faq-reset'),
  title: $('board-title'),
};

FAQ_ITEMS.forEach((item, i) => { item.id = 'faq-' + (i + 1); });

/* 같은 색 포스트잇이 몰리지 않게, 직군 안에서 주제를 번갈아 보여 줌 */
(function interleaveTopics() {
  const roleKeys = Object.keys(FAQ_ROLES);
  const topicKeys = Object.keys(FAQ_TOPICS);
  const seen = {};
  FAQ_ITEMS.forEach((item) => {
    const key = item.role + '/' + item.topic;
    const rank = seen[key] = (seen[key] || 0) + 1;
    item.order = roleKeys.indexOf(item.role) * 1000 + rank * 10 + topicKeys.indexOf(item.topic);
  });
  FAQ_ITEMS.sort((a, b) => a.order - b.order);
})();

const state = {
  role: 'all',
  topic: 'all',
  query: '',
  open: new Set([FAQ_ITEMS[0].id]), // 첫 질문은 열어 둠
};

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function matchesQuery(item, query) {
  if (!query) return true;
  const hay = [item.q, ...item.a, FAQ_ROLES[item.role], FAQ_TOPICS[item.topic].label].join(' ');
  return normalize(hay).includes(query);
}

function filterItems({ role = state.role, topic = state.topic, query = state.query } = {}) {
  return FAQ_ITEMS.filter((item) =>
    (role === 'all' || item.role === role) &&
    (topic === 'all' || item.topic === topic) &&
    matchesQuery(item, query)
  );
}

/* 검색어를 <mark>로 감싸 text를 el에 넣기 (innerHTML 안 씀) */
function fillHighlighted(el, text, query) {
  el.textContent = '';
  if (!query) { el.textContent = text; return; }
  const lower = text.toLowerCase();
  let from = 0;
  let at = lower.indexOf(query, from);
  while (at !== -1) {
    if (at > from) el.append(text.slice(from, at));
    const mark = document.createElement('mark');
    mark.textContent = text.slice(at, at + query.length);
    el.append(mark);
    from = at + query.length;
    at = lower.indexOf(query, from);
  }
  el.append(text.slice(from));
}

/* 주제 칩 */
function renderTopics() {
  els.topics.textContent = '';
  const entries = [['all', { label: '모두', color: '' }], ...Object.entries(FAQ_TOPICS)];
  entries.forEach(([key, { label, color }]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chip' + (color ? ' chip--' + color : '');
    btn.textContent = label;
    btn.setAttribute('aria-pressed', String(state.topic === key));
    btn.addEventListener('click', () => {
      state.topic = key;
      render();
    });
    els.topics.append(btn);
  });
}

/* 왼쪽 직군 목록 (숫자는 현재 주제·검색어 기준) */
function renderRoles() {
  els.roles.textContent = '';
  Object.entries(FAQ_ROLES).forEach(([key, label]) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'side__btn';
    btn.setAttribute('aria-pressed', String(state.role === key));

    const name = document.createElement('span');
    name.textContent = label;
    const count = document.createElement('span');
    count.className = 'side__count';
    count.textContent = filterItems({ role: key }).length;
    count.setAttribute('aria-label', count.textContent + '개');

    btn.append(name, count);
    btn.addEventListener('click', () => {
      state.role = key;
      saveHash();
      render();
    });
    li.append(btn);
    els.roles.append(li);
  });
}

/* 포스트잇 질문 하나 */
function createNote(item, query) {
  const topic = FAQ_TOPICS[item.topic];
  const isOpen = state.open.has(item.id);
  const panelId = item.id + '-a';

  const li = document.createElement('li');
  const note = document.createElement('article');
  note.className = 'note note--' + topic.color;

  const h3 = document.createElement('h3');
  h3.className = 'note__h';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'note__btn';
  btn.setAttribute('aria-expanded', String(isOpen));
  btn.setAttribute('aria-controls', panelId);

  const qMark = document.createElement('span');
  qMark.className = 'note__q';
  qMark.setAttribute('aria-hidden', 'true');
  qMark.textContent = '?';

  const body = document.createElement('span');
  const meta = document.createElement('span');
  meta.className = 'note__meta';
  meta.textContent = FAQ_ROLES[item.role] + ' · ' + topic.label;
  const text = document.createElement('span');
  text.className = 'note__text';
  fillHighlighted(text, item.q, query);
  body.append(meta, text);

  const toggle = document.createElement('span');
  toggle.className = 'note__toggle';
  toggle.setAttribute('aria-hidden', 'true');

  btn.append(qMark, body, toggle);
  h3.append(btn);

  const panel = document.createElement('div');
  panel.className = 'note__panel';
  panel.id = panelId;
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-labelledby', item.id + '-btn');
  btn.id = item.id + '-btn';
  panel.hidden = !isOpen;

  item.a.forEach((line) => {
    const p = document.createElement('p');
    fillHighlighted(p, line, query);
    panel.append(p);
  });
  if (item.link) {
    const a = document.createElement('a');
    a.className = 'note__link';
    a.href = item.link.href;
    a.textContent = item.link.text + ' →';
    panel.append(a);
  }

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    if (open) state.open.add(item.id); else state.open.delete(item.id);
  });

  note.append(h3, panel);
  li.append(note);
  return li;
}

function render() {
  const items = filterItems();

  renderTopics();
  renderRoles();

  els.title.textContent = state.role === 'all' ? '전체 질문' : FAQ_ROLES[state.role] + ' 질문';
  els.count.textContent = '질문 ' + items.length + '개';

  els.list.textContent = '';
  items.forEach((item) => els.list.append(createNote(item, state.query)));
  els.list.hidden = items.length === 0;
  els.empty.hidden = items.length !== 0;
}

/* ---------- 검색 ---------- */
els.search.addEventListener('input', () => {
  state.query = normalize(els.search.value);
  els.clear.hidden = !els.search.value;
  render();
});
els.search.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && els.search.value) {
    els.search.value = '';
    els.search.dispatchEvent(new Event('input'));
  }
});
els.clear.addEventListener('click', () => {
  els.search.value = '';
  els.search.dispatchEvent(new Event('input'));
  els.search.focus();
});
els.reset.addEventListener('click', () => {
  state.role = 'all';
  state.topic = 'all';
  els.search.value = '';
  state.query = '';
  els.clear.hidden = true;
  saveHash();
  render();
  els.search.focus();
});

/* ---------- 주소(#dev 등)로 직군 열기 ---------- */
function readHash() {
  const key = decodeURIComponent(location.hash.slice(1));
  if (FAQ_ROLES[key]) state.role = key;
}
function saveHash() {
  try {
    history.replaceState(null, '', state.role === 'all' ? location.pathname : '#' + state.role);
  } catch (e) { /* file:// 등에서 막히면 그냥 넘어감 */ }
}
window.addEventListener('hashchange', () => { readHash(); render(); });

/* =========================================================
   질문 상자 (연습용 · 이 브라우저에만 저장)
   ========================================================= */
const STORE_KEY = 'career-faq-my-questions';
const dialog = $('ask-dialog');
const form = $('ask-form');
const askText = $('ask-text');
const askRole = $('ask-role');
const askDone = $('ask-done');
const mine = $('ask-mine');
const mineList = $('ask-mine-list');

function loadMine() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
  catch (e) { return []; }
}
function saveMine(list) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); return true; }
  catch (e) { return false; }
}
function renderMine() {
  const list = loadMine();
  mineList.textContent = '';
  list.slice().reverse().forEach(({ role, text }) => {
    const li = document.createElement('li');
    li.textContent = '[' + FAQ_ROLES[role] + '] ' + text;
    mineList.append(li);
  });
  mine.hidden = list.length === 0;
}

$('ask-open').addEventListener('click', () => {
  askDone.textContent = '';
  renderMine();
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  askText.focus();
});
$('ask-cancel').addEventListener('click', () => dialog.close());

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = askText.value.trim();
  if (!text) { askText.focus(); return; }
  const list = loadMine();
  list.push({ role: askRole.value, text });
  const ok = saveMine(list);
  askDone.textContent = ok
    ? '질문이 상자에 담겼어요. 용기 내어 물어봐 줘서 고마워요!'
    : '질문을 받았어요. (이 브라우저는 저장을 막고 있어서 새로고침하면 사라져요.)';
  askText.value = '';
  renderMine();
});

/* ---------- 시작 ---------- */
readHash();
render();
