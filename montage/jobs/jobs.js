// B안 채용 공고. 데이터는 A안의 ../../jobs/data.js(JOBS)를 그대로 불러 써요.
// "오늘"을 2026-10-16으로 고정해, 언제 열어도 시안과 같은 D-day가 보입니다.
var TODAY = new Date(2026, 9, 16);
var PAGE = 24; // 더 보기 한 번에 늘어나는 공고 수

var ROLES = ["전체", "개발", "디자인", "PO", "마케팅"];
var ROLE_CLASS = { "개발": "r-dev", "디자인": "r-des", "PO": "r-po", "마케팅": "r-mkt" };
var WEEK = ["일", "월", "화", "수", "목", "금", "토"];
var ICON_OPEN = '<svg class="mi" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>';
var ICON_CHEVRON = '<svg class="mi" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>';

JOBS.forEach(function (j) {
  var p = /^\d{4}-\d{2}-\d{2}$/.test(j.date) ? j.date.split("-") : null;
  j.d = p ? new Date(+p[0], +p[1] - 1, +p[2]) : null;       // 날짜가 없으면(상시·채용 시) null
  j.left = p ? Math.round((j.d - TODAY) / 86400000) : null;
});

var state = { role: "전체", newOnly: false, aiOnly: false, shown: PAGE, view: new Date(TODAY.getFullYear(), TODAY.getMonth(), 1) };
var $ = function (id) { return document.getElementById(id); };

function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function safeLink(j) { return /^https:\/\//.test(j.link || "") ? j.link : null; }

function visible() {
  return JOBS.filter(function (j) {
    return (state.role === "전체" || j.role === state.role) &&
           (!state.newOnly || j.level === "신입") &&
           (!state.aiOnly || j.ai);
  }).sort(function (a, b) {
    if (!a.d || !b.d) return !a.d && !b.d ? 0 : !a.d ? 1 : -1;   // 마감일 없는 공고는 맨 뒤
    return a.d - b.d;
  });
}
function dday(j) { return j.left === null ? (j.date === "상시" ? "상시" : "채용 시") : j.left > 0 ? "D-" + j.left : j.left === 0 ? "D-day" : "마감"; }
function ddayClass(j) {
  if (j.left === null) return "tag";
  if (j.left < 0) return "tag tag-done";
  return j.left <= 7 ? "tag tag-negative" : "tag tag-brand";
}
function dueText(j) {
  if (!j.d) return j.date === "상시" ? "상시 채용" : "채용 시 마감";
  return (j.d.getMonth() + 1) + "월 " + j.d.getDate() + "일(" + WEEK[j.d.getDay()] + ") 마감";
}

function renderRoleChips() {
  $("roleChips").innerHTML = ROLES.map(function (r) {
    return '<button type="button" class="chip" data-role="' + esc(r) + '" aria-pressed="' + (state.role === r) + '">' + esc(r) + "</button>";
  }).join("");
}

function card(j) {
  var link = safeLink(j);
  var inner =
    '<span class="top t-caption1"><span class="co">' + esc(j.co) + '</span><span class="' + ddayClass(j) + '">' + esc(dday(j)) + '</span></span>' +
    '<span class="ti t-headline1">' + esc(j.title) + '</span>' +
    '<span class="tags"><span class="tag ' + (ROLE_CLASS[j.role] || "") + '">' + esc(j.role) + '</span>' +
      '<span class="tag">' + esc(j.level === "신입" ? "신입" : "자격 확인 필요") + '</span>' +
      (j.ai ? '<span class="tag tag-brand">AI 우대</span>' : '') + '</span>' +
    '<span class="bottom t-caption1"><span>' + esc(dueText(j)) + '</span>' +
      (link ? '<span class="go">원문 보기' + ICON_OPEN + '</span>' : '<span>원문 링크 없음</span>') + '</span>';
  if (!link) return '<li><div class="card job" id="job-' + j.id + '">' + inner + '</div></li>';
  return '<li><a class="card job" id="job-' + j.id + '" href="' + esc(link) + '" target="_blank" rel="noopener noreferrer" aria-label="' +
    esc(j.co + " " + j.title + ", " + dueText(j) + ", " + dday(j) + ". 공고 원문 새 창으로 열기") + '">' + inner + '</a></li>';
}

function renderGrid(focusFrom) {
  var list = visible(), n = Math.min(state.shown, list.length);
  $("count").innerHTML = !list.length ? "조건에 맞는 공고 0개"
    : n < list.length ? "공고 <b>" + list.length + "</b>개 중 " + n + "개를 보여 드려요"
    : "공고 <b>" + list.length + "</b>개를 모두 보여 드려요";
  if (!list.length) {
    $("grid").innerHTML = '<li class="empty"><b>조건에 맞는 공고가 아직 없어요.</b>필터를 하나 풀어 보세요.</li>';
    $("moreWrap").hidden = true;
    return;
  }
  $("grid").innerHTML = list.slice(0, n).map(card).join("");
  var rest = list.length - n;
  $("moreWrap").hidden = rest <= 0;
  $("more").firstChild.nodeValue = "더 보기 (" + Math.min(PAGE, rest) + "개)";
  // 더 보기로 새로 붙은 첫 공고로 키보드 초점을 옮겨요
  if (typeof focusFrom === "number" && list[focusFrom]) {
    var el = $("job-" + list[focusFrom].id);
    if (el && el.focus) el.focus();
  }
}

function renderCal() {
  var y = state.view.getFullYear(), m = state.view.getMonth();
  $("monthLabel").textContent = y + "년 " + (m + 1) + "월";
  var first = new Date(y, m, 1).getDay(), last = new Date(y, m + 1, 0).getDate();
  var byDay = {};
  visible().forEach(function (j) { if (j.d && j.d.getFullYear() === y && j.d.getMonth() === m) (byDay[j.d.getDate()] = byDay[j.d.getDate()] || []).push(j); });
  var html = "", day = 1;
  for (var r = 0; r < 6 && day <= last; r++) {
    html += "<tr>";
    for (var c = 0; c < 7; c++) {
      if ((r === 0 && c < first) || day > last) { html += "<td></td>"; continue; }
      var isToday = y === TODAY.getFullYear() && m === TODAY.getMonth() && day === TODAY.getDate();
      var hit = byDay[day];
      var label = (m + 1) + "월 " + day + "일" + (isToday ? " 오늘" : "");
      html += '<td' + (isToday ? ' class="today"' : '') + '>';
      if (hit) {
        var names = hit.slice(0, 3).map(function (h) { return h.co; }).join(", ") + (hit.length > 3 ? " 외 " + (hit.length - 3) + "개" : "");
        html += '<button type="button" data-id="' + hit[0].id + '" aria-label="' + esc(label + " 마감 " + hit.length + "개: " + names + ". " + hit[0].co + " 공고 원문 새 창으로 열기") + '"' +
          (isToday ? ' aria-current="date"' : '') + '>' + day + '</button>';
      } else {
        html += '<span' + (isToday ? ' aria-current="date"' : '') + '>' + day + '</span>';
      }
      html += "</td>";
      day++;
    }
    html += "</tr>";
  }
  $("days").innerHTML = html;

  var up = visible().filter(function (j) { return j.left !== null && j.left >= 0; }).slice(0, 3);
  $("upcoming").innerHTML = up.length ? up.map(function (j) {
    return '<li><button type="button" data-id="' + j.id + '" aria-label="' + esc(dueText(j) + ", " + dday(j) + ", " + j.co + " " + j.title + ". 공고 원문 새 창으로 열기") + '">' +
      '<span class="when t-caption1">' + esc(dday(j)) + '</span>' +
      '<span class="what"><span class="t-label1">' + esc(j.title) + '</span><span class="c t-caption1">' + esc(j.co) + ' · ' + (j.d.getMonth() + 1) + '월 ' + j.d.getDate() + '일</span></span>' +
      ICON_CHEVRON + '</button></li>';
  }).join("") : '<li><p class="t-label1">다가오는 마감이 없어요.</p></li>';
}

function renderAll() {
  renderRoleChips();
  $("fNew").setAttribute("aria-pressed", state.newOnly);
  $("fAi").setAttribute("aria-pressed", state.aiOnly);
  renderGrid();
  renderCal();
}

// 달력·다가오는 마감 버튼: 누르면 그 공고 원문을 새 창으로 엽니다 (A안과 같아요).
function openJob(id) {
  var j = JOBS.filter(function (x) { return x.id === id; })[0];
  var link = j && safeLink(j);
  if (link) window.open(link, "_blank", "noopener");
}

document.addEventListener("click", function (e) {
  var t = e.target.closest("button"); if (!t) return;
  if (t.dataset.role) { state.role = t.dataset.role; state.shown = PAGE; renderAll(); t = document.querySelector('[data-role="' + state.role + '"]'); if (t) t.focus(); }
  else if (t.id === "fNew") { state.newOnly = !state.newOnly; state.shown = PAGE; renderAll(); }
  else if (t.id === "fAi") { state.aiOnly = !state.aiOnly; state.shown = PAGE; renderAll(); }
  else if (t.id === "more") { var from = state.shown; state.shown += PAGE; renderGrid(from); }
  else if (t.id === "prev" || t.id === "next") { state.view = new Date(state.view.getFullYear(), state.view.getMonth() + (t.id === "next" ? 1 : -1), 1); renderCal(); }
  else if (t.dataset.id) { openJob(+t.dataset.id); }
});

renderAll();
