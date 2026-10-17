/*
  LearningVtoX website setup:
  1) CHANNEL_URL mein apne YouTube channel ka link paste karein.
  2) resources list mein apne PDF links add karein.
  3) videos list mein apne latest YouTube video links add karein.
  Link example: https://drive.google.com/file/d/YOUR_FILE_ID/view
*/

const CHANNEL_URL = "https://www.youtube.com/"; // Replace with your channel URL

// PDF resources: link ko apne real PDF/Google Drive link se replace karein.
const resources = [
  { class: "9", subject: "Physics", title: "Class 9 Physics Notes", description: "Chapter-wise notes and important concepts.", link: "#", type: "PDF" },
  { class: "9", subject: "Chemistry", title: "Class 9 Chemistry Notes", description: "Quick revision and key definitions.", link: "#", type: "PDF" },
  { class: "9", subject: "Mathematics", title: "Class 9 Maths Practice", description: "Formulas, examples and practice questions.", link: "#", type: "PDF" },
  { class: "10", subject: "Physics", title: "Class 10 Physics Notes", description: "Important concepts for board preparation.", link: "#", type: "PDF" },
  { class: "10", subject: "Chemistry", title: "Class 10 Chemistry Notes", description: "Reactions, definitions and revision notes.", link: "#", type: "PDF" },
  { class: "10", subject: "Mathematics", title: "Class 10 Maths Formula Sheet", description: "Useful formulas and quick revision.", link: "#", type: "PDF" },
  { class: "11", subject: "Physics", title: "Class 11 Physics Notes", description: "Concept-focused notes for each chapter.", link: "#", type: "PDF" },
  { class: "11", subject: "Chemistry", title: "Class 11 Chemistry Notes", description: "Physical, organic and inorganic basics.", link: "#", type: "PDF" },
  { class: "11", subject: "Mathematics", title: "Class 11 Maths Notes", description: "Formulas and solved examples.", link: "#", type: "PDF" },
  { class: "12", subject: "Physics", title: "Class 12 Physics Notes", description: "Board-focused notes and key formulas.", link: "#", type: "PDF" },
  { class: "12", subject: "Chemistry", title: "Class 12 Chemistry Notes", description: "Chapter revision and important reactions.", link: "#", type: "PDF" },
  { class: "12", subject: "Mathematics", title: "Class 12 Maths Formula Sheet", description: "Important formulas for quick revision.", link: "#", type: "PDF" }
];

// Apne latest YouTube video links yahan add karein.
const videos = [
  { title: "Latest Physics Lesson", subject: "Physics · Class 9–12", description: "Apna latest video title yahan likhein.", link: "https://www.youtube.com/" },
  { title: "Chemistry Concept Explained", subject: "Chemistry · Class 9–12", description: "Apna latest video title yahan likhein.", link: "https://www.youtube.com/" },
  { title: "Maths Tricks & Practice", subject: "Mathematics · Class 9–12", description: "Apna latest video title yahan likhein.", link: "https://www.youtube.com/" }
];

const resourceGrid = document.getElementById("resourceGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("resourceSearch");
let activeFilter = "all";

function renderResources() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = resources.filter(item => {
    const matchesClass = activeFilter === "all" || item.class === activeFilter;
    const haystack = `${item.class} ${item.subject} ${item.title} ${item.description}`.toLowerCase();
    return matchesClass && haystack.includes(query);
  });
  resourceGrid.innerHTML = filtered.map(item => {
    const usableLink = item.link && item.link !== "#";
    return `<article class="resource-card">
      <div class="pdf-icon">PDF</div>
      <div class="resource-info">
        <div class="resource-meta">Class ${escapeHtml(item.class)} · ${escapeHtml(item.subject)}</div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <a class="download-link" href="${usableLink ? escapeAttr(item.link) : '#'}" ${usableLink ? 'target="_blank" rel="noopener"' : 'data-unavailable="true"'}>${usableLink ? 'Open PDF ↗' : 'PDF link coming soon ↗'}</a>
      </div>
    </article>`;
  }).join("");
  emptyState.hidden = filtered.length > 0;
  resourceGrid.querySelectorAll("[data-unavailable]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      alert("Is PDF ke liye abhi link add nahi hua hai. script.js mein is resource ka link update karein.");
    });
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function escapeAttr(value) {
  return escapeHtml(value);
}

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    activeFilter = button.dataset.filter;
    renderResources();
  });
});
document.querySelectorAll("[data-class-link]").forEach(link => {
  link.addEventListener("click", () => {
    activeFilter = link.dataset.classLink;
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.toggle("selected", btn.dataset.filter === activeFilter);
    });
    renderResources();
  });
});
searchInput.addEventListener("input", renderResources);

document.getElementById("channelButton").href = CHANNEL_URL;
document.getElementById("year").textContent = new Date().getFullYear();

const videoList = document.getElementById("videoList");
videoList.innerHTML = videos.map(video => `
  <a class="video-item" href="${escapeAttr(video.link)}" target="_blank" rel="noopener">
    <div class="video-thumb">▶</div>
    <div class="video-detail"><small>${escapeHtml(video.subject)}</small><h3>${escapeHtml(video.title)}</h3><p>${escapeHtml(video.description)}</p></div>
    <span class="video-arrow">↗</span>
  </a>`).join("");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

renderResources();
