const CONFIG = {
  coupleName: "Rakha & Eny",
  eventTitle: "Pernikahan Rakha & Eny",
  eventDate: "2026-12-12T09:00:00+07:00",
  eventEndDate: "2026-12-12T14:00:00+07:00",
  locationName: "[Nama Gedung atau Rumah]",
  address: "[Nama Gedung atau Rumah], [Alamat Lengkap Acara]",
  mapUrl: "https://maps.google.com/?q=Jakarta",
  mapEmbedUrl: "https://www.google.com/maps?q=Jakarta&output=embed",

  // Isi URL Web App Google Apps Script agar RSVP masuk ke Google Sheet.
  // Biarkan kosong jika hanya ingin memakai local storage untuk demo.
  googleSheetWebAppUrl: ""
};

const STORAGE_KEY = "rakha_eny_wedding_rsvp_v3";
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("to") || params.get("tamu") || "";
  const cleaned = raw.replace(/\+/g, " ").trim();
  return cleaned || "Bapak/Ibu/Saudara/i";
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

async function copyText(text, successMessage = "Berhasil disalin.") {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage);
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    showToast(successMessage);
  }
}

function initGate() {
  const gate = $("#invitationGate");
  const openButton = $("#openInvitation");
  const guestName = getGuestName();
  const guestTarget = $("#guestNameGate");
  const rsvpName = $("#rsvpName");

  if (guestTarget) guestTarget.textContent = guestName;
  if (rsvpName && guestName !== "Bapak/Ibu/Saudara/i") rsvpName.value = guestName;

  openButton?.addEventListener("click", async () => {
    gate?.classList.add("hide");
    document.body.classList.remove("gate-open");
    window.setTimeout(() => gate?.remove(), 650);
    await tryPlayMusic(false);
  });
}

function initHeader() {
  const header = $("#siteHeader");
  const syncHeader = () => header?.classList.toggle("scrolled", window.scrollY > 60);
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

function initCountdown() {
  const target = new Date(CONFIG.eventDate).getTime();
  const days = $("#days");
  const hours = $("#hours");
  const minutes = $("#minutes");
  const seconds = $("#seconds");

  const update = () => {
    const distance = target - Date.now();

    if (distance <= 0) {
      if (days) days.textContent = "00";
      if (hours) hours.textContent = "00";
      if (minutes) minutes.textContent = "00";
      if (seconds) seconds.textContent = "00";
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const m = Math.floor((distance / (1000 * 60)) % 60);
    const s = Math.floor((distance / 1000) % 60);

    if (days) days.textContent = String(d).padStart(2, "0");
    if (hours) hours.textContent = String(h).padStart(2, "0");
    if (minutes) minutes.textContent = String(m).padStart(2, "0");
    if (seconds) seconds.textContent = String(s).padStart(2, "0");
  };

  update();
  window.setInterval(update, 1000);
}

function initEventActions() {
  const addressText = $("#addressText");
  const openMap = $("#openMap");
  const mapIframe = $(".map-card iframe");

  if (addressText) addressText.textContent = CONFIG.address;
  if (openMap) openMap.href = CONFIG.mapUrl;
  if (mapIframe) mapIframe.src = CONFIG.mapEmbedUrl;

  $("#copyAddress")?.addEventListener("click", () => copyText(CONFIG.address, "Alamat acara berhasil disalin."));
  $("#copyCurrentLink")?.addEventListener("click", () => copyText(window.location.href, "Link undangan berhasil disalin."));
  $("#addCalendar")?.addEventListener("click", () => {
    const url = buildCalendarUrl();
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

function formatGoogleCalendarDate(isoDate) {
  const date = new Date(isoDate);
  const pad = (value) => String(value).padStart(2, "0");
  return [
    date.getUTCFullYear(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate()),
    "T",
    pad(date.getUTCHours()),
    pad(date.getUTCMinutes()),
    pad(date.getUTCSeconds()),
    "Z"
  ].join("");
}

function buildCalendarUrl() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: CONFIG.eventTitle,
    dates: `${formatGoogleCalendarDate(CONFIG.eventDate)}/${formatGoogleCalendarDate(CONFIG.eventEndDate)}`,
    details: "Akad nikah dan resepsi pernikahan Rakha & Eny. Kehadiran dan doa restu Anda menjadi kehormatan bagi kami.",
    location: CONFIG.address
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function initGallery() {
  const galleryGrid = $("#galleryGrid");
  const toggleButton = $("#toggleGallery");
  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const closeButton = $("#lightboxClose");

  toggleButton?.addEventListener("click", () => {
    galleryGrid?.classList.toggle("show-all");
    const isOpen = galleryGrid?.classList.contains("show-all");
    toggleButton.textContent = isOpen ? "Tampilkan Lebih Ringkas" : "Lihat Semua Foto";
  });

  $$(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const imageUrl = item.getAttribute("data-full");
      if (!imageUrl || !lightboxImage || !lightbox) return;
      lightboxImage.src = imageUrl;
      lightbox.classList.add("show");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  const closeLightbox = () => {
    lightbox?.classList.remove("show");
    lightbox?.setAttribute("aria-hidden", "true");
    if (lightboxImage) lightboxImage.src = "";
  };

  closeButton?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

function readRsvpEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function saveRsvpEntry(entry) {
  const entries = readRsvpEntries();
  entries.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 100)));
  renderWishList();
}

function renderWishList() {
  const wishList = $("#wishList");
  if (!wishList) return;

  const entries = readRsvpEntries();

  if (!entries.length) {
    wishList.innerHTML = `
      <article class="wish-card">
        <strong>Belum ada ucapan.</strong>
        <small>Ucapan tamu akan tampil di sini.</small>
        <p>Isi form RSVP untuk mencoba fitur buku tamu digital.</p>
      </article>
    `;
    return;
  }

  wishList.innerHTML = entries.map((entry) => `
    <article class="wish-card">
      <strong>${escapeHtml(entry.name)}</strong>
      <small>${escapeHtml(entry.attendance)} • ${escapeHtml(entry.guests)} tamu</small>
      <p>${escapeHtml(entry.message || "Terima kasih atas undangannya.")}</p>
    </article>
  `).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function initRsvp() {
  const form = $("#rsvpForm");
  const exportButton = $("#exportCsv");
  const formNote = $("#formNote");

  renderWishList();

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const entry = {
      name: String(formData.get("name") || "").trim(),
      attendance: String(formData.get("attendance") || "Hadir"),
      guests: String(formData.get("guests") || "1"),
      message: String(formData.get("message") || "").trim(),
      invitedTo: getGuestName(),
      timestamp: new Date().toISOString()
    };

    if (!entry.name) {
      showToast("Nama tamu wajib diisi.");
      return;
    }

    saveRsvpEntry(entry);
    form.reset();
    const rsvpName = $("#rsvpName");
    const guestName = getGuestName();
    if (rsvpName && guestName !== "Bapak/Ibu/Saudara/i") rsvpName.value = guestName;

    if (CONFIG.googleSheetWebAppUrl) {
      await sendToGoogleSheet(entry);
      if (formNote) formNote.textContent = "RSVP tersimpan lokal dan dikirim ke Google Sheet.";
    } else if (formNote) {
      formNote.textContent = "RSVP pernikahan tersimpan lokal. Isi URL Apps Script di script.js agar masuk Google Sheet.";
    }

    showToast("RSVP berhasil dikirim. Terima kasih.");
  });

  exportButton?.addEventListener("click", exportCsv);
}

async function sendToGoogleSheet(entry) {
  try {
    await fetch(CONFIG.googleSheetWebAppUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(entry)
    });
  } catch (error) {
    showToast("Data tersimpan lokal. Koneksi Google Sheet belum berhasil.");
  }
}

function exportCsv() {
  const entries = readRsvpEntries();
  if (!entries.length) {
    showToast("Belum ada data RSVP untuk diexport.");
    return;
  }

  const headers = ["timestamp", "name", "attendance", "guests", "message", "invitedTo"];
  const rows = [headers, ...entries.map((entry) => headers.map((key) => entry[key] || ""))];
  const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "rsvp-pernikahan-rakha-eny.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function csvEscape(value) {
  const text = String(value).replaceAll('"', '""');
  return `"${text}"`;
}

async function tryPlayMusic(showError = true) {
  const audio = $("#weddingMusic");
  const button = $("#musicToggle");
  if (!audio) return;

  try {
    await audio.play();
    button?.classList.add("is-playing");
  } catch (error) {
    button?.classList.remove("is-playing");
    if (showError) showToast("Tambahkan file assets/audio/music.mp3 untuk mengaktifkan musik.");
  }
}

function initMusic() {
  const audio = $("#weddingMusic");
  const button = $("#musicToggle");
  if (!audio || !button) return;

  button.addEventListener("click", async () => {
    if (audio.paused) {
      await tryPlayMusic(true);
    } else {
      audio.pause();
      button.classList.remove("is-playing");
    }
  });

  audio.addEventListener("pause", () => button.classList.remove("is-playing"));
  audio.addEventListener("play", () => button.classList.add("is-playing"));
}

function initRevealAnimation() {
  const elements = $$(".reveal-up");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}

function initSmoothNav() {
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = targetId ? document.querySelector(targetId) : null;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initGate();
  initHeader();
  initCountdown();
  initEventActions();
  initGallery();
  initRsvp();
  initMusic();
  initRevealAnimation();
  initSmoothNav();
});
