// "오늘"을 2026-10-16으로 고정해, 언제 열어도 시안과 같은 D-day가 보입니다.
var TODAY = new Date(2026, 9, 16);

var ROLES = ["전체", "개발", "디자인", "PO", "마케팅"];
var ROLE_CLASS = { "개발": "r-dev", "디자인": "r-des", "PO": "r-po", "마케팅": "r-mkt" };

JOBS.forEach(function (j) {
  var p = /^\d{4}-\d{2}-\d{2}$/.test(j.date) ? j.date.split("-") : null;
  j.d = p ? new Date(+p[0], +p[1] - 1, +p[2]) : null;       // 날짜가 없으면(상시·채용 시) null
  j.left = p ? Math.round((j.d - TODAY) / 86400000) : null;
});

var state = { role: "전체", newOnly: false, aiOnly: false, view: new Date(TODAY.getFullYear(), TODAY.getMonth(), 1) };
var $ = function (id) { return document.getElementById(id); };

function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
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

function renderRoleChips() {
  $("roleChips").innerHTML = ROLES.map(function (r) {
    return '<button class="chip" data-role="' + r + '" aria-pressed="' + (state.role === r) + '">' + r + "</button>";
  }).join("");
}

function renderGrid() {
  var list = visible();
  $("count").textContent = "전체 " + list.length + "개";
  if (!list.length) {
    $("grid").innerHTML = '<li class="empty"><b>조건에 맞는 공고가 아직 없어요.</b>필터를 하나 풀어 보세요.</li>';
    return;
  }
  $("grid").innerHTML = list.map(function (j, i) {
    var deco = i % 3 === 2 ? '<span class="clip" aria-hidden="true"></span>' : '<span class="pin" aria-hidden="true"></span>';
    return '<li><a class="note" href="' + esc(j.link) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(j.co) + ' ' + esc(j.title) + ' 공고 원문 (새 창)">' + deco +
      '<span class="co">' + esc(j.co) + '</span>' +
      '<span class="ti">' + esc(j.title) + '</span>' +
      '<span class="tags"><span class="tag ' + ROLE_CLASS[j.role] + '">' + j.role + '</span>' +
      '<span class="tag">' + j.level + '</span>' + (j.ai ? '<span class="tag ai">AI 우대</span>' : '') + '</span>' +
      '<span class="stamp' + (j.left !== null && j.left < 0 ? ' done' : '') + '" aria-label="마감 ' + dday(j) + '">' + dday(j) + '</span>' +
      '</a></li>';
  }).join("");
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
      html += '<td' + (isToday ? ' class="today"' : '') + '>' +
        (hit ? '<button data-id="' + hit[0].id + '" aria-label="' + (m + 1) + '월 ' + day + '일 마감 ' + hit.map(function (h) { return esc(h.co); }).join(", ") + '">' + day + '</button>' : day) + "</td>";
      day++;
    }
    html += "</tr>";
  }
  $("days").innerHTML = html;

  var up = visible().filter(function (j) { return j.left !== null && j.left >= 0; }).slice(0, 3);
  $("upcoming").innerHTML = up.length ? up.map(function (j) {
    return '<li><button data-id="' + j.id + '"><b>' + (j.d.getMonth() + 1) + '월 ' + j.d.getDate() + '일</b><span>' + esc(j.co) + '</span><span aria-hidden="true" style="flex:none">›</span></button></li>';
  }).join("") : '<li><p>다가오는 마감이 없어요.</p></li>';
}

function renderAll() { renderRoleChips(); renderGrid(); renderCal(); }

// 달력·다가오는 마감 버튼: 누르면 그 공고 원문을 새 창으로 엽니다.
function openJob(id) {
  var j = JOBS.filter(function (x) { return x.id === id; })[0];
  if (j && /^https:\/\//.test(j.link || "")) window.open(j.link, "_blank", "noopener");
}

document.addEventListener("click", function (e) {
  var t = e.target.closest("button"); if (!t) return;
  if (t.dataset.role) { state.role = t.dataset.role; renderAll(); }
  else if (t.id === "fNew") { state.newOnly = !state.newOnly; t.setAttribute("aria-pressed", state.newOnly); renderAll(); }
  else if (t.id === "fAi") { state.aiOnly = !state.aiOnly; t.setAttribute("aria-pressed", state.aiOnly); renderAll(); }
  else if (t.id === "prev" || t.id === "next") { state.view = new Date(state.view.getFullYear(), state.view.getMonth() + (t.id === "next" ? 1 : -1), 1); renderCal(); }
  else if (t.dataset.id) { openJob(+t.dataset.id); }
});

renderAll();
