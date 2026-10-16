/* 직무 사전 B안 — 데이터는 A안(roles/index.html)과 같아요. 화면만 Montage 스타일로 다시 그려요. */
(function () {
  "use strict";
  // 직군 이름과 아이콘 (홈의 직군 폴더와 같은 아이콘)
  const GROUPS = {
    dev: { name: "개발", icon: '<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>' },
    design: { name: "디자인", icon: '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>' },
    po: { name: "PO", icon: '<path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>' },
    marketing: { name: "마케팅", icon: '<path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z"/>' }
  };

  // 직군 소개 — 직군 태그를 고르면 카드 위에 나와요 (네 직군 같은 분량으로)
  const INTROS = {
    dev: {
      summary: "코드로 서비스를 만들고, 문제가 생기면 원인을 찾아 고쳐요. 사용자가 보는 화면부터 보이지 않는 서버까지 맡는 영역이 넓어요.",
      fit: ["원리를 끝까지 파고드는 걸 좋아하는 분", "작은 결과물이라도 직접 만들어 보고 싶은 분", "오류를 하나씩 풀어 가는 과정이 즐거운 분"],
      start: ["HTML·CSS로 나만의 페이지 하나 만들어 보기", "만든 결과물을 저장소에 올려 기록하기", "자주 쓰는 서비스의 화면을 따라 만들어 보기"]
    },
    design: {
      summary: "사용자가 겪는 불편을 발견하고, 더 쓰기 쉬운 화면과 경험으로 바꿔요. 보기 좋은 것만큼 문제를 잘 푸는 것이 중요해요.",
      fit: ["사람들이 왜 그렇게 행동하는지 궁금한 분", "생각을 그림이나 화면으로 정리하는 걸 좋아하는 분", "피드백을 받아 고쳐 나가는 과정이 즐거운 분"],
      start: ["자주 쓰는 앱의 불편한 점을 찾아 개선안 그려 보기", "주변 사람 한 명에게 사용 경험 물어보기", "작업 과정을 글과 그림으로 정리해 두기"]
    },
    po: {
      summary: "무엇을 왜 만들지 정하고, 팀이 같은 목표를 보고 움직이도록 도와요. 사용자와 팀 사이에서 방향을 잡는 역할이에요.",
      fit: ["여러 의견을 듣고 정리하는 걸 잘하는 분", "왜 이걸 해야 하는지 이유를 찾는 분", "숫자와 사용자 이야기를 함께 보는 분"],
      start: ["좋아하는 서비스의 기능 하나를 골라 목표와 이유 적어 보기", "할 일 목록에 우선순위를 매기고 근거 써 보기", "간단한 기획서를 한 장으로 정리해 보기"]
    },
    marketing: {
      summary: "서비스의 가치를 필요한 사람에게 알리고, 반응을 보며 더 좋은 방법을 찾아요. 이야기와 숫자를 함께 다뤄요.",
      fit: ["사람들이 무엇에 끌리는지 관심이 많은 분", "글이나 영상으로 생각을 전하는 걸 좋아하는 분", "결과를 보고 다음 시도를 바꿔 보는 분"],
      start: ["좋아하는 브랜드의 콘텐츠를 보고 잘된 점 정리하기", "짧은 소개 글이나 카드뉴스 하나 만들어 보기", "올린 글의 반응을 기록하고 비교해 보기"]
    }
  };

  // 직무 카드 데이터 — 직군마다 5개씩, 같은 분량으로
  const ROLES = [
    // ---- 개발 ----
    { group: "dev", name: "프론트엔드 개발자",
      tasks: ["사용자 화면을 구현해요", "클릭과 이동을 연결해요", "화면 속도와 품질을 높여요"],
      skills: ["화면 구현", "문제 해결"], tools: ["코드 편집기", "브라우저"],
      ai: "코드 초안을 만들어요" },
    { group: "dev", name: "백엔드 개발자",
      tasks: ["서버의 기능을 만들어요", "데이터를 안전하게 관리해요", "안정적인 서비스를 운영해요"],
      skills: ["서버 설계", "데이터 이해"], tools: ["데이터베이스", "서버 도구"],
      ai: "오류 원인을 찾아요" },
    { group: "dev", name: "모바일 앱 개발자",
      tasks: ["휴대폰 앱 화면을 만들어요", "기기 기능(카메라·알림)을 연결해요", "앱을 스토어에 출시해요"],
      skills: ["앱 구조 이해", "꼼꼼한 테스트"], tools: ["앱 개발 도구", "기기 테스트 도구"],
      ai: "화면 코드 예시를 찾아요" },
    { group: "dev", name: "데이터 엔지니어",
      tasks: ["흩어진 데이터를 한곳에 모아요", "데이터가 흐르는 길을 만들어요", "분석하기 좋게 정리해요"],
      skills: ["데이터 구조 이해", "자동화"], tools: ["데이터베이스", "작업 예약 도구"],
      ai: "데이터 정리 코드를 다듬어요" },
    { group: "dev", name: "인프라 엔지니어",
      tasks: ["서비스가 돌아갈 서버를 준비해요", "배포 과정을 자동으로 만들어요", "장애를 살피고 대응해요"],
      skills: ["시스템 이해", "침착한 대응"], tools: ["클라우드 콘솔", "모니터링 도구"],
      ai: "설정 파일 초안을 만들어요" },
    // ---- 디자인 ----
    { group: "design", name: "프로덕트 디자이너",
      tasks: ["사용자의 문제를 발견해요", "서비스 화면을 설계해요", "사용성을 검증하고 개선해요"],
      skills: ["화면 설계", "사용자 이해"], tools: ["디자인 도구", "협업 보드"],
      ai: "시안을 빠르게 탐색해요" },
    { group: "design", name: "사용자 경험 리서처",
      tasks: ["사용자의 이야기를 들어요", "행동과 요구를 분석해요", "개선 방향의 근거를 찾아요"],
      skills: ["인터뷰", "분석력"], tools: ["설문 도구", "분석 도구"],
      ai: "인터뷰 내용을 정리해요" },
    { group: "design", name: "모션 디자이너",
      tasks: ["화면에 자연스러운 움직임을 더해요", "전환과 반응 효과를 설계해요", "짧은 소개 영상을 만들어요"],
      skills: ["타이밍 감각", "스토리 구성"], tools: ["모션 도구", "영상 편집 도구"],
      ai: "움직임 아이디어를 빠르게 시험해요" },
    { group: "design", name: "브랜드 디자이너",
      tasks: ["브랜드의 얼굴(로고·색)을 만들어요", "어디서든 같은 느낌이 나게 정리해요", "홍보물과 굿즈를 디자인해요"],
      skills: ["시각 표현", "일관성 관리"], tools: ["그래픽 도구", "디자인 가이드 문서"],
      ai: "무드보드 후보를 모아요" },
    { group: "design", name: "UX 라이터",
      tasks: ["버튼과 안내 문구를 써요", "말투와 용어를 통일해요", "헷갈리는 문장을 쉽게 고쳐요"],
      skills: ["쉬운 글쓰기", "사용자 공감"], tools: ["문서 도구", "디자인 도구"],
      ai: "문구 후보를 여러 개 뽑아요" },
    // ---- PO ----
    { group: "po", name: "프로덕트 오너",
      tasks: ["제품의 목표를 정해요", "일의 우선순위를 결정해요", "팀과 함께 성과를 만들어요"],
      skills: ["우선순위", "소통"], tools: ["문서 도구", "일정 보드"],
      ai: "기획 초안을 정리해요" },
    { group: "po", name: "서비스 기획자",
      tasks: ["사용자 흐름을 그려요", "기능 정책을 정리해요", "출시 후 지표를 살펴봐요"],
      skills: ["논리적 구조화", "데이터 해석"], tools: ["화면 흐름도", "지표 대시보드"],
      ai: "요구사항을 빠짐없이 정리해요" },
    { group: "po", name: "프로덕트 애널리스트",
      tasks: ["사용자 행동 데이터를 살펴봐요", "기능의 효과를 숫자로 확인해요", "다음 개선 아이디어를 제안해요"],
      skills: ["데이터 분석", "가설 세우기"], tools: ["분석 도구", "스프레드시트"],
      ai: "데이터 요약과 해석을 도와요" },
    { group: "po", name: "프로젝트 매니저",
      tasks: ["일정과 할 일을 나눠요", "팀 사이의 소통을 이어요", "위험을 미리 찾아 대비해요"],
      skills: ["일정 관리", "조율"], tools: ["일정 보드", "회의록 도구"],
      ai: "회의 내용을 할 일로 정리해요" },
    { group: "po", name: "서비스 운영 매니저",
      tasks: ["서비스가 잘 돌아가는지 살펴요", "사용자 문의와 불편을 모아요", "운영 정책을 다듬어요"],
      skills: ["꼼꼼함", "문제 정리"], tools: ["운영 관리 도구", "문의 관리 도구"],
      ai: "문의 내용을 유형별로 나눠요" },
    // ---- 마케팅 ----
    { group: "marketing", name: "콘텐츠 마케터",
      tasks: ["고객에게 전할 이야기를 찾아요", "콘텐츠를 기획하고 만들어요", "반응을 분석하고 개선해요"],
      skills: ["글쓰기", "콘텐츠 기획"], tools: ["편집 도구", "분석 도구"],
      ai: "콘텐츠 아이디어를 넓혀요" },
    { group: "marketing", name: "퍼포먼스 마케터",
      tasks: ["광고 목표를 세워요", "채널별 성과를 비교해요", "예산을 효율적으로 나눠요"],
      skills: ["숫자 감각", "실험 설계"], tools: ["광고 관리 도구", "분석 도구"],
      ai: "광고 문구 후보를 만들어요" },
    { group: "marketing", name: "브랜드 마케터",
      tasks: ["브랜드가 전할 메시지를 정해요", "캠페인을 기획하고 실행해요", "브랜드 인지도를 살펴봐요"],
      skills: ["기획력", "트렌드 감각"], tools: ["기획 문서", "설문 도구"],
      ai: "캠페인 아이디어를 넓혀요" },
    { group: "marketing", name: "CRM 마케터",
      tasks: ["고객을 성향별로 나눠요", "알림과 메일로 다시 찾아오게 해요", "재방문과 이탈을 살펴봐요"],
      skills: ["고객 이해", "데이터 활용"], tools: ["메시지 발송 도구", "고객 분석 도구"],
      ai: "고객별 메시지 초안을 써요" },
    { group: "marketing", name: "홍보(PR) 담당자",
      tasks: ["회사 소식을 보도자료로 써요", "언론·외부와 관계를 이어요", "이슈가 생기면 대응 방향을 정리해요"],
      skills: ["글쓰기", "관계 관리"], tools: ["문서 도구", "뉴스 모니터링 도구"],
      ai: "보도자료 초안을 다듬어요" }
  ];
  // ===== 간단 적합도 테스트 =====
  // 직군마다 3문항 × 보기 4개. 보기를 고르면 적힌 직무에 1점씩 더해요 (네 직군 같은 분량)
  const QUIZ = {
    dev: [
      { q: "만들고 나서 가장 뿌듯한 순간은?", opts: [
        ["내가 만든 화면을 사람들이 직접 눌러 볼 때", ["프론트엔드 개발자", "모바일 앱 개발자"]],
        ["보이지 않는 곳에서 기능이 정확히 돌아갈 때", ["백엔드 개발자"]],
        ["엉켜 있던 데이터가 깔끔하게 정리될 때", ["데이터 엔지니어"]],
        ["서비스가 멈추지 않고 안정적으로 돌아갈 때", ["인프라 엔지니어"]] ] },
      { q: "더 끌리는 작업은?", opts: [
        ["웹 브라우저에서 바로 확인되는 작업", ["프론트엔드 개발자"]],
        ["휴대폰에서 손으로 만져 보는 작업", ["모바일 앱 개발자"]],
        ["규칙과 흐름을 설계하는 작업", ["백엔드 개발자", "데이터 엔지니어"]],
        ["반복되는 일을 자동으로 만드는 작업", ["인프라 엔지니어", "데이터 엔지니어"]] ] },
      { q: "팀에서 맡고 싶은 역할은?", opts: [
        ["디자이너와 함께 화면을 다듬기", ["프론트엔드 개발자", "모바일 앱 개발자"]],
        ["데이터가 안전하게 오가도록 책임지기", ["백엔드 개발자"]],
        ["분석하는 동료가 쓸 데이터 준비하기", ["데이터 엔지니어"]],
        ["문제가 생기면 가장 먼저 원인 살피기", ["인프라 엔지니어", "백엔드 개발자"]] ] }
    ],
    design: [
      { q: "작업하면서 가장 뿌듯한 순간은?", opts: [
        ["복잡한 화면이 한눈에 정리될 때", ["프로덕트 디자이너"]],
        ["사용자의 진짜 속마음을 알아냈을 때", ["사용자 경험 리서처"]],
        ["움직임 하나로 화면이 살아날 때", ["모션 디자이너"]],
        ["로고와 색만 봐도 우리 브랜드인 걸 알아볼 때", ["브랜드 디자이너"]] ] },
      { q: "더 끌리는 작업은?", opts: [
        ["사람들과 대화하고 행동을 관찰하기", ["사용자 경험 리서처"]],
        ["딱 맞는 단어와 문장을 고르기", ["UX 라이터"]],
        ["영상이나 애니메이션 만들기", ["모션 디자이너"]],
        ["서비스 화면의 흐름 전체를 설계하기", ["프로덕트 디자이너"]] ] },
      { q: "팀에서 맡고 싶은 역할은?", opts: [
        ["서비스 전체의 말투와 용어 정하기", ["UX 라이터", "브랜드 디자이너"]],
        ["브랜드 디자인 가이드 만들기", ["브랜드 디자이너"]],
        ["사용자 테스트를 진행하고 결과 공유하기", ["사용자 경험 리서처", "프로덕트 디자이너"]],
        ["개발자와 함께 화면 효과 맞추기", ["모션 디자이너", "프로덕트 디자이너"]] ] }
    ],
    po: [
      { q: "일하면서 가장 뿌듯한 순간은?", opts: [
        ["팀이 같은 목표를 보고 움직일 때", ["프로덕트 오너"]],
        ["꼼꼼히 짠 기획이 그대로 만들어질 때", ["서비스 기획자"]],
        ["개선 효과를 숫자로 확인했을 때", ["프로덕트 애널리스트"]],
        ["일정에 맞춰 무사히 출시했을 때", ["프로젝트 매니저"]] ] },
      { q: "더 끌리는 작업은?", opts: [
        ["무엇부터 할지 우선순위 정하기", ["프로덕트 오너"]],
        ["화면 흐름과 정책 문서 쓰기", ["서비스 기획자"]],
        ["데이터를 보고 가설 세우기", ["프로덕트 애널리스트"]],
        ["사용자 문의를 모아 개선점 찾기", ["서비스 운영 매니저"]] ] },
      { q: "팀에서 맡고 싶은 역할은?", opts: [
        ["여러 팀의 일정과 소통 조율하기", ["프로젝트 매니저"]],
        ["서비스 현장의 문제를 가장 먼저 해결하기", ["서비스 운영 매니저"]],
        ["회의에서 최종 방향 정하기", ["프로덕트 오너"]],
        ["지표를 정리해 팀에 공유하기", ["프로덕트 애널리스트", "서비스 기획자"]] ] }
    ],
    marketing: [
      { q: "일하면서 가장 뿌듯한 순간은?", opts: [
        ["내가 만든 콘텐츠가 많이 공유될 때", ["콘텐츠 마케터"]],
        ["광고 성과 숫자가 올라갈 때", ["퍼포먼스 마케터"]],
        ["사람들이 우리 브랜드를 기억해 줄 때", ["브랜드 마케터"]],
        ["떠났던 고객이 다시 돌아올 때", ["CRM 마케터"]] ] },
      { q: "더 끌리는 작업은?", opts: [
        ["글이나 영상으로 이야기 만들기", ["콘텐츠 마케터"]],
        ["캠페인의 큰 그림 그리기", ["브랜드 마케터"]],
        ["고객마다 맞춘 메시지 쓰기", ["CRM 마케터"]],
        ["회사 소식을 바깥에 알리기", ["홍보(PR) 담당자"]] ] },
      { q: "팀에서 맡고 싶은 역할은?", opts: [
        ["예산과 성과 표 관리하기", ["퍼포먼스 마케터"]],
        ["외부 사람들과 관계 이어 가기", ["홍보(PR) 담당자"]],
        ["고객 데이터를 보고 그룹 나누기", ["CRM 마케터", "퍼포먼스 마케터"]],
        ["중요한 공지와 메시지 문장 다듬기", ["홍보(PR) 담당자", "콘텐츠 마케터"]] ] }
    ]
  };

  // "전체"에서 보는 직군 유형 테스트 — 5문항, 문항마다 네 직군 보기가 하나씩 (순서는 섞어 둠)
  const TYPE_QUIZ = [
    { q: "친구들이 나에게 자주 부탁하는 일은?", opts: [
      ["고장 난 기기나 설정을 봐 주기", ["dev"]],
      ["발표 자료나 포스터를 보기 좋게 다듬기", ["design"]],
      ["모임 일정과 역할을 정리하기", ["po"]],
      ["좋았던 맛집이나 물건을 추천하기", ["marketing"]] ] },
    { q: "새 앱을 처음 쓸 때 먼저 눈에 들어오는 것은?", opts: [
      ["화면 배치와 색감, 쓰기 편한지", ["design"]],
      ["사람들이 이 앱을 어떻게 알고 오는지", ["marketing"]],
      ["이 기능이 어떻게 만들어졌는지", ["dev"]],
      ["이 앱이 어떤 문제를 풀려고 하는지", ["po"]] ] },
    { q: "팀 프로젝트에서 맡고 싶은 역할은?", opts: [
      ["전체 방향과 순서를 정하기", ["po"]],
      ["직접 만들어서 돌아가게 하기", ["dev"]],
      ["결과물을 알리고 반응을 모으기", ["marketing"]],
      ["보기 좋고 쓰기 쉽게 다듬기", ["design"]] ] },
    { q: "더 즐거운 문제 풀이는?", opts: [
      ["논리 퍼즐처럼 규칙을 찾아내기", ["dev"]],
      ["사람의 마음을 움직일 문장 찾기", ["marketing"]],
      ["불편한 경험을 더 낫게 바꾸기", ["design"]],
      ["여러 의견 사이에서 최선의 선택 찾기", ["po"]] ] },
    { q: "일을 마친 뒤 가장 듣고 싶은 말은?", opts: [
      ["\"덕분에 방향이 분명해졌어요\"", ["po"]],
      ["\"보기만 해도 써 보고 싶어져요\"", ["design"]],
      ["\"덕분에 많은 사람이 알게 됐어요\"", ["marketing"]],
      ["\"한 번도 멈추지 않고 잘 돌아가요\"", ["dev"]] ] }
  ];

  // ===== 화면 그리기 (B안) =====
  const ICONS = {
    chevR: '<path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>',
    chevL: '<path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>',
    check: '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
    spark: '<path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/>',
    help: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>',
    clock: '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>',
    list: '<path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>',
    replay: '<path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>'
  };
  const svg = (p) => `<svg class="mi" viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
  const icon = (g) => svg(GROUPS[g].icon);
  const tile = (g) => `<span class="ico" data-group="${g}">${icon(g)}</span>`;
  const listItems = (arr) => arr.map((t) => `<li>${t}</li>`).join("");
  const tags = (arr) => arr.map((t) => `<span class="tag">${t}</span>`).join("");

  const grid = document.getElementById("role-grid");
  const count = document.getElementById("count");
  const filterBox = document.getElementById("filter");
  const buttons = filterBox.querySelectorAll("button");
  const intro = document.getElementById("intro");
  const quiz = document.getElementById("quiz");
  const live = document.getElementById("quiz-live");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollOpt = (block) => ({ behavior: reduceMotion ? "auto" : "smooth", block });

  // 필터 칩에 직군 아이콘을 붙여요
  buttons.forEach((b) => { if (GROUPS[b.dataset.filter]) b.insertAdjacentHTML("afterbegin", icon(b.dataset.filter)); });

  // 직무 카드
  grid.innerHTML = ROLES.map((r) => `
    <li data-group="${r.group}">
      <article class="card role-card" data-group="${r.group}" data-name="${r.name}" aria-labelledby="role-${ROLES.indexOf(r)}">
        <div class="top">${tile(r.group)}<span class="tag">${GROUPS[r.group].name}</span></div>
        <h3 class="t-headline1" id="role-${ROLES.indexOf(r)}">${r.name}</h3>
        <h4 class="t-caption1">하는 일</h4>
        <ul class="tasks t-body2">${listItems(r.tasks)}</ul>
        <div class="meta">
          <div><h4 class="t-caption1">필요 역량</h4><div class="chips">${tags(r.skills)}</div></div>
          <div><h4 class="t-caption1">관련 도구</h4><div class="chips">${tags(r.tools)}</div></div>
        </div>
        <p class="ai t-label1">${svg(ICONS.spark)}<span><b>AI는 이렇게</b>${r.ai}</span></p>
      </article>
    </li>`).join("");

  function clearPicked() {
    grid.querySelectorAll(".picked").forEach((c) => {
      c.classList.remove("picked");
      const t = c.querySelector(".tag-brand"); if (t) t.remove();
    });
  }

  function showGroup(filter) {
    if (filter !== "all" && !GROUPS[filter]) filter = "all";
    let shown = 0;
    grid.querySelectorAll(":scope > li").forEach((li) => {
      const match = filter === "all" || li.dataset.group === filter;
      li.hidden = !match;
      if (match) shown++;
    });
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === filter)));
    const label = filter === "all" ? "전체" : GROUPS[filter].name;
    count.textContent = `${label} · 카드 ${shown}장`;
    clearPicked();
    showIntro(filter);
    showQuiz(filter);
  }

  // 직군 소개: "전체"일 때는 숨기고, 직군을 고르면 그 직군 소개를 보여줘요
  function showIntro(filter) {
    if (filter === "all") { intro.hidden = true; intro.innerHTML = ""; return; }
    const it = INTROS[filter];
    intro.dataset.group = filter;
    intro.innerHTML = `
      <header>${tile(filter)}<h3 class="t-heading2">${GROUPS[filter].name} 직군은 이런 일을 해요</h3></header>
      <p class="lead">${it.summary}</p>
      <div class="intro-cols">
        <div class="intro-box"><h4 class="t-headline2">이런 분께 잘 맞아요</h4>
          <ul class="ticks t-body2">${it.fit.map((t) => `<li>${svg(ICONS.check)}<span>${t}</span></li>`).join("")}</ul></div>
        <div class="intro-box"><h4 class="t-headline2">첫걸음으로 해 보면 좋아요</h4>
          <ol class="ticks t-body2">${it.start.map((t, i) => `<li><span class="n" aria-hidden="true">${i + 1}</span><span>${t}</span></li>`).join("")}</ol></div>
      </div>`;
    intro.hidden = false;
  }

  // ===== 한 문제씩 넘어가는 미니 게임 =====
  // step: -1 = 시작 화면, 0~(문항 수-1) = 문제, 문항 수 = 결과
  let game = null;

  function showQuiz(filter) {
    const isAll = filter === "all";
    game = {
      filter, isAll,
      qs: isAll ? TYPE_QUIZ : QUIZ[filter],
      title: isAll ? "나는 어떤 직군과 잘 맞을까?" : `나에게 맞는 ${GROUPS[filter].name} 직무는?`,
      step: -1, answers: [], locked: false
    };
    quiz.dataset.group = filter;
    quiz.hidden = false;
    live.textContent = "";
    renderGame(false);
  }

  // 단계 막대: 지난 문제는 진한 파랑, 지금 문제는 연한 파랑
  const stepsBar = (total, now) =>
    `<ol class="q-steps" aria-hidden="true">${Array.from({ length: total }, (_, i) =>
      `<li class="${i < now ? "done" : i === now ? "now" : ""}"></li>`).join("")}</ol>`;

  function renderGame(moveFocus = true) {
    const { qs, step, isAll, title } = game;

    // 1) 시작 화면
    if (step < 0) {
      quiz.innerHTML = `
        <div class="q-start q-card">
          <span class="ico">${svg(ICONS.help)}</span>
          <h3 class="t-title3">${title}</h3>
          <p class="lead">한 문제씩 끌리는 쪽을 골라 보세요. 정답은 없어요.</p>
          <ul class="q-meta t-label1">
            <li class="tag tag-brand">${isAll ? "직군 유형 테스트" : "상세 직무 테스트"}</li>
            <li class="tag">${svg(ICONS.list)}${qs.length}문항</li>
            <li class="tag">${svg(ICONS.clock)}약 ${isAll ? "1분" : "30초"}</li>
          </ul>
          <button type="button" class="btn btn-primary" id="q-start">시작하기</button>
        </div>`;
      document.getElementById("q-start").onclick = () => { game.step = 0; renderGame(); };
      return;
    }

    // 2) 문제 화면
    if (step < qs.length) {
      const item = qs[step];
      const left = qs.length - step - 1;
      quiz.innerHTML = `
        <div class="q-top t-label1">
          <span>질문 <b>${step + 1}</b> / ${qs.length}</span>
          <span>${left === 0 ? "마지막 질문이에요" : `남은 질문 ${left}개`}</span>
        </div>
        ${stepsBar(qs.length, step)}
        <div class="q-card">
          <h3 class="q-text t-heading2" tabindex="-1"><small>QUESTION ${step + 1}</small>${item.q}<span class="sr"> (질문 ${step + 1} / ${qs.length})</span></h3>
          <ul class="choices">
            ${item.opts.map((o, j) => `<li><button type="button" class="choice t-body1${game.answers[step] === j ? " chosen" : ""}" data-j="${j}"${game.answers[step] === j ? ' aria-pressed="true"' : ""}><span class="key" aria-hidden="true">${"ABCD"[j]}</span><span>${o[0]}</span></button></li>`).join("")}
          </ul>
          <div class="q-nav t-label1">
            <button type="button" class="btn btn-sm q-back"${step === 0 ? " disabled" : ""}>${svg(ICONS.chevL)}이전 질문</button>
            <span class="label">${title}</span>
          </div>
        </div>`;
      game.locked = false;
      quiz.querySelectorAll(".choice").forEach((b) => b.onclick = () => {
        if (game.locked) return;
        game.locked = true;
        quiz.querySelectorAll(".choice").forEach((c) => { c.classList.remove("chosen"); c.removeAttribute("aria-pressed"); });
        b.classList.add("chosen");
        b.setAttribute("aria-pressed", "true");
        game.answers[step] = Number(b.dataset.j);
        setTimeout(() => { game.step++; renderGame(); }, reduceMotion ? 0 : 280);
      });
      quiz.querySelector(".q-back").onclick = () => { game.step--; renderGame(); };
      if (moveFocus) quiz.querySelector(".q-text").focus({ preventScroll: true });
      return;
    }

    // 3) 결과 화면
    quiz.innerHTML = `
      <div class="q-top t-label1">
        <span><b>완료!</b> ${qs.length}문항에 모두 답했어요</span>
      </div>
      ${stepsBar(qs.length, qs.length)}
      <div class="q-card">
        <div class="quiz-result" id="quiz-result" tabindex="-1">
          <span class="tag tag-brand t-label1">결과</span>
          <div id="q-result-body"></div>
        </div>
      </div>`;
    if (isAll) showTypeResult(); else showRoleResult();
    if (moveFocus) document.getElementById("quiz-result").focus({ preventScroll: true });
  }

  function restartGame() {
    clearPicked();
    game.step = 0; game.answers = [];
    live.textContent = "";
    renderGame();
  }

  // 직군 유형 테스트 결과: 점수가 가장 높은 직군(같으면 모두)을 보여줘요
  function showTypeResult() {
    const score = { dev: 0, design: 0, po: 0, marketing: 0 };
    game.answers.forEach((j, i) => TYPE_QUIZ[i].opts[j][1].forEach((g) => score[g]++));
    const max = Math.max(...Object.values(score));
    const tops = Object.keys(score).filter((g) => score[g] === max);
    const names = tops.map((g) => GROUPS[g].name).join(" · ");

    const box = document.getElementById("quiz-result");
    box.dataset.group = tops[0];
    document.getElementById("q-result-body").innerHTML = `
      <p class="pick t-heading2">지금 답으로 보면 잘 맞을 수 있는 직군: <b>${names}</b></p>
      ${tops.length > 1
        ? `<p class="t-body1">${tops.length}개 직군이 비슷하게 나왔어요. 소개를 함께 비교해 보세요.</p>`
        : `<p class="t-body1">${INTROS[tops[0]].summary}</p>`}
      <p class="note t-label1">가볍게 참고만 해 주세요. 직군을 골라 상세 직무 테스트도 해 볼 수 있어요.</p>
      <div class="quiz-actions">
        ${tops.map((g, i) => `<button type="button" class="btn btn-sm ${i === 0 ? "btn-primary" : "btn-outline"}" data-go="${g}">${GROUPS[g].name} 직군 자세히 보기${svg(ICONS.chevR)}</button>`).join("")}
        <button type="button" class="btn btn-sm btn-outline" id="quiz-reset">${svg(ICONS.replay)}처음부터 다시</button>
      </div>`;
    live.textContent = `결과가 나왔어요. 잘 맞을 수 있는 직군: ${names}`;

    box.querySelectorAll("[data-go]").forEach((b) => b.onclick = () => {
      history.replaceState(null, "", `#${b.dataset.go}`);
      showGroup(b.dataset.go);
      filterBox.scrollIntoView(scrollOpt("start"));
      const pressed = filterBox.querySelector('[aria-pressed="true"]');
      if (pressed) pressed.focus({ preventScroll: true });
    });
    document.getElementById("quiz-reset").onclick = restartGame;
  }

  // 상세 직무 테스트 결과: 이 직군의 직무별 점수 (같으면 카드 순서대로)
  function showRoleResult() {
    const { filter, qs, answers } = game;
    const names = ROLES.filter((r) => r.group === filter).map((r) => r.name);
    const score = Object.fromEntries(names.map((n) => [n, 0]));
    answers.forEach((j, i) => qs[i].opts[j][1].forEach((n) => score[n]++));
    const ranked = [...names].sort((a, b) => score[b] - score[a]);
    const best = ROLES.find((r) => r.name === ranked[0]);

    document.getElementById("quiz-result").dataset.group = filter;
    document.getElementById("q-result-body").innerHTML = `
      <p class="pick t-heading2">지금 답으로 보면 잘 맞을 수 있는 직무: <b>${best.name}</b></p>
      <p class="t-body1">이 직무는 "${best.tasks[0]}", "${best.tasks[1]}" 같은 일을 해요.</p>
      <p class="t-body1">함께 살펴보면 좋은 직무: <b>${ranked[1]}</b></p>
      <p class="note t-label1">가볍게 참고만 해 주세요. 카드를 직접 비교해 보며 정하는 게 가장 좋아요.</p>
      <div class="quiz-actions">
        <button type="button" class="btn btn-sm btn-primary" id="go-card">카드 보러 가기${svg(ICONS.chevR)}</button>
        <button type="button" class="btn btn-sm btn-outline" id="quiz-reset">${svg(ICONS.replay)}처음부터 다시</button>
      </div>`;
    live.textContent = `결과가 나왔어요. 잘 맞을 수 있는 직무: ${best.name}, 함께 살펴보면 좋은 직무: ${ranked[1]}`;

    document.getElementById("go-card").onclick = () => {
      clearPicked();
      const card = grid.querySelector(`[data-name="${best.name}"]`);
      card.classList.add("picked");
      card.querySelector(".top").insertAdjacentHTML("beforeend", '<span class="tag tag-brand">테스트 추천</span>');
      card.setAttribute("tabindex", "-1");
      card.scrollIntoView(scrollOpt("center"));
      card.focus({ preventScroll: true });
    };
    document.getElementById("quiz-reset").onclick = restartGame;
  }

  // 칩을 누르면 주소 끝(#dev 등)도 바꿔서, 홈의 직군 카드 링크와 같은 주소가 돼요
  buttons.forEach((b) => b.addEventListener("click", () => {
    const f = b.dataset.filter;
    history.replaceState(null, "", f === "all" ? location.pathname + location.search : `#${f}`);
    showGroup(f);
  }));
  // 홈에서 roles/index.html#dev 처럼 들어오면 그 직군을 바로 열어요
  window.addEventListener("hashchange", () => showGroup(location.hash.slice(1) || "all"));
  showGroup(location.hash.slice(1) || "all");
})();
