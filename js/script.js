/* ==========================================================
   BSIT 1-3 Section Portal
   Edit the DATA section below. The rest renders it.
   ========================================================== */

// ===== DATA =====
const quickLinks = [
  { icon: "calendar", title: "Class schedule", text: "Rooms and times per day", href: "#schedule" },
  { icon: "folder", title: "Resources", text: "Modules, slides, and notes", href: "#resources" },
  { icon: "users", title: "Members", text: "Who's in our section", href: "#members" },
];

const schedule = [
  {
    day: "Monday",
    classes: [
      { code: "DCIT 22", room: "ITC 201", time: "7:00 – 8:00 AM" },
      { code: "CVSU 101", room: "TBA", time: "8:00 – 9:00 AM" },
      { code: "DCIT 22", room: "CCL 204", time: "10:00 AM – 1:00 PM" },
      { code: "DCIT 21", room: "CCL 102", time: "3:00 – 5:00 PM" },
      { code: "GNED 11", room: "LH101 CAS", time: "5:00 – 7:00 PM" },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      { code: "FITT", room: "GYM", time: "7:00 – 9:00 AM" },
      { code: "GNED 02", room: "LH 305b CAS", time: "11:00 AM – 1:00 PM" },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      { code: "COSC 50", room: "ITC 408", time: "7:00 – 9:00 AM" },
      { code: "DCIT 22", room: "CCL 102", time: "10:00 AM – 1:00 PM" },
      { code: "GNED 05", room: "CAFENR 105", time: "3:00 – 5:00 PM" },
      { code: "DCIT 21", room: "ITC 408", time: "5:00 – 7:00 PM" },
    ],
  },
];

const resources = [
  { icon: "book", title: "Course modules", text: "Replace with your drive link", href: "#resources" },
  { icon: "link", title: "Class group", text: "Replace with your group link", href: "#resources" },
  { icon: "folder", title: "Shared files", text: "Replace with your folder link", href: "#resources" },
];

const members = [
  { icon: "users", title: "Student Name", text: "President" },
  { icon: "users", title: "Student Name", text: "Vice President" },
  { icon: "users", title: "Student Name", text: "Secretary" },
];

// ===== ICONS (24x24, stroke-based) =====
const icons = {
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0M16 4.5a3.5 3.5 0 0 1 0 7M22 20a7 7 0 0 0-4-6.3"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
};
const svg = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || ""}</svg>`;

// ===== RENDER: cards =====
function renderCards(containerId, items) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = items
    .map((i) => {
      const tag = i.href ? "a" : "div";
      const href = i.href ? ` href="${i.href}"` : "";
      return `<${tag} class="card"${href}>
        <span class="icon">${svg(i.icon)}</span>
        <div><h3>${i.title}</h3><p>${i.text}</p></div>
      </${tag}>`;
    })
    .join("");
}

// ===== RENDER: schedule =====
const classRows = (classes) =>
  classes.length
    ? classes
        .map(
          (c) => `<li>
            <span class="time">${c.time}</span>
            <span class="code">${c.code}</span>
            <span class="room">${c.room}</span>
          </li>`
        )
        .join("")
    : '<li class="empty">No classes.</li>';

function renderSchedule() {
  const tabs = document.getElementById("day-tabs");
  const list = document.getElementById("schedule-list");
  if (!tabs || !list) return;

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  let selected = schedule.find((d) => d.day === today) || schedule[0];

  const draw = () => {
    tabs.innerHTML = schedule
      .map(
        (d) => `<button class="tab" role="tab" type="button" data-day="${d.day}"
          aria-selected="${d.day === selected.day}">${d.day}${d.day === today ? " (today)" : ""}</button>`
      )
      .join("");
    list.innerHTML = classRows(selected.classes);
  };

  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    selected = schedule.find((d) => d.day === btn.dataset.day);
    draw();
  });
  draw();
}

// ===== RENDER: today panel =====
function renderToday() {
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const dateEl = document.getElementById("today-date");
  const listEl = document.getElementById("today-list");
  if (dateEl) dateEl.textContent = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const day = schedule.find((d) => d.day === dayName);
  if (listEl) listEl.innerHTML = classRows(day ? day.classes : []);
}

// ===== THEME =====
function initTheme() {
  const btn = document.getElementById("theme-toggle");
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let theme = saved || (prefersDark ? "dark" : "light");

  const apply = () => {
    document.documentElement.setAttribute("data-theme", theme);
    if (btn) btn.innerHTML = svg(theme === "dark" ? "sun" : "moon");
  };
  apply();

  if (btn) {
    btn.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme", theme); } catch (e) {}
      apply();
    });
  }
}

// ===== INIT =====
renderCards("quick-list", quickLinks);
renderCards("resource-list", resources);
renderCards("member-list", members);
renderSchedule();
renderToday();
initTheme();
