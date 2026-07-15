// =========================================================
// Shared behaviour across all pages
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initCommitteeGrids();
  initApplyForm();
  initVerifyPage();
  initContactForm();
  setYear();
});

function setYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

function initials(name) {
  return name
    .replace("Placeholder ", "")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* ---------------- Nav toggle (mobile) ---------------- */
function initNav() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav.main-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
}

/* ---------------- Committee grids ---------------- */
function initCommitteeGrids() {
  const advisoryTarget = document.getElementById("advisory-grid");
  const execTarget = document.getElementById("executive-grid");
  const homeTeaser = document.getElementById("committee-teaser");

  if (typeof EXECUTIVE_COMMITTEE === "undefined") return;

  if (advisoryTarget) {
    advisoryTarget.innerHTML = ADVISORY_PANEL.map((m) => personCard(m, true)).join("");
  }
  if (execTarget) {
    execTarget.innerHTML = EXECUTIVE_COMMITTEE.map((m) => personCard(m, false)).join("");
  }

  if (homeTeaser) {
    const all = [...ADVISORY_PANEL, ...EXECUTIVE_COMMITTEE];
    const picks = HOME_TEASER_DESIGNATIONS.map((d) => all.find((m) => m.designation === d)).filter(Boolean);
    homeTeaser.innerHTML = picks.map((m) => personCard(m, true)).join("");
  }
}

function personCard(m, lead) {
  const photoTag = m.photo
    ? `<img class="person-photo" src="${m.photo}" alt="${m.name}" loading="lazy">`
    : `<div class="person-avatar">${initials(m.name)}</div>`;
  return `
    <div class="person-card ${lead ? "lead" : ""}">
      ${photoTag}
      <h4>${m.name}</h4>
      <div class="role">${m.designation}</div>
      <div class="person-mobile">${m.mobile}</div>
    </div>`;
}

/* ---------------- Membership application (apply.html) ---------------- */
function initApplyForm() {
  const form = document.getElementById("apply-form");
  if (!form) return;

  const steps = document.querySelectorAll(".step");
  const panels = document.querySelectorAll(".form-panel");
  let currentStep = 1;

  function goToStep(n) {
    currentStep = n;
    panels.forEach((p) => (p.style.display = Number(p.dataset.panel) === n ? "block" : "none"));
    steps.forEach((s) => {
      const sn = Number(s.dataset.n);
      s.classList.toggle("active", sn === n);
      s.classList.toggle("done", sn < n);
    });
    window.scrollTo({ top: form.offsetTop - 110, behavior: "smooth" });
  }

  document.querySelectorAll("[data-next]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const requiredFields = panels[currentStep - 1].querySelectorAll("[required]");
      for (const f of requiredFields) {
        if (!f.value) {
          f.reportValidity();
          return;
        }
      }
      goToStep(currentStep + 1);
    })
  );
  document.querySelectorAll("[data-back]").forEach((btn) =>
    btn.addEventListener("click", () => goToStep(currentStep - 1))
  );

  // Payment method selection
  document.querySelectorAll(".pay-method").forEach((el) => {
    el.addEventListener("click", () => {
      document.querySelectorAll(".pay-method").forEach((x) => x.classList.remove("selected"));
      el.classList.add("selected");
      el.querySelector("input").checked = true;
    });
  });

  // Fake payment + ID generation
  const payBtn = document.getElementById("pay-now-btn");
  payBtn.addEventListener("click", () => {
    const selected = document.querySelector('input[name="paymethod"]:checked');
    if (!selected) {
      alert("Please select a payment method to continue (demo).");
      return;
    }
    payBtn.disabled = true;
    payBtn.textContent = "Processing payment…";

    setTimeout(() => {
      const fullName = document.getElementById("f-name").value || "New Member";
      const email = document.getElementById("f-email").value || "you@example.com";
      const trade = document.getElementById("f-trade").value || "Trainer";
      const institute = document.getElementById("f-institute").value || "—";

      const year = new Date().getFullYear();
      const serial = String(Math.floor(1 + Math.random() * 899999)).padStart(6, "0");
      const memberId = `TTWSB-${serial}/${year}`;
      const validTill = new Date();
      validTill.setFullYear(validTill.getFullYear() + 1);
      const validTillStr = validTill.toISOString().slice(0, 10);

      const record = {
        id: memberId,
        name: fullName,
        role: "Trainer Member",
        institute,
        trade,
        validTill: validTillStr,
        status: "active",
      };
      if (typeof SESSION_MEMBERS !== "undefined") SESSION_MEMBERS.push(record);

      renderIdCard(record, email);
      goToStep(3);
      payBtn.disabled = false;
      payBtn.textContent = "Pay Now (Demo)";
    }, 1400);
  });
}

function renderIdCard(record, email) {
  document.getElementById("result-name").textContent = record.name;
  document.getElementById("result-id").textContent = record.id;
  document.getElementById("result-email").textContent = email;
  document.getElementById("card-name").textContent = record.name;
  document.getElementById("card-role").textContent = record.role + " · " + record.trade;
  document.getElementById("card-id").textContent = record.id;
  document.getElementById("card-valid").textContent = "Valid till " + record.validTill;
  document.getElementById("card-initials").textContent = initials(record.name);

  const statusEl = document.getElementById("card-status");
  statusEl.textContent = "ACTIVE";
  statusEl.className = "id-card-status status-active";

  const qrTarget = document.getElementById("card-qr");
  qrTarget.innerHTML = "";
  const verifyUrl = `${location.origin}${location.pathname.replace(/apply\.html$/, "")}verify.html?id=${encodeURIComponent(record.id)}`;
  if (typeof QRCode !== "undefined") {
    new QRCode(qrTarget, { text: verifyUrl, width: 84, height: 84, correctLevel: QRCode.CorrectLevel.M });
  }
}

/* ---------------- Verify member (verify.html) ---------------- */
function initVerifyPage() {
  const searchBtn = document.getElementById("verify-btn");
  const input = document.getElementById("verify-input");
  if (!searchBtn || !input) return;

  function runSearch() {
    const record = typeof findMember === "function" ? findMember(input.value) : null;
    const resultBox = document.getElementById("verify-result");
    const notFound = document.getElementById("verify-not-found");

    if (!record) {
      resultBox.classList.remove("show");
      notFound.classList.add("show");
      return;
    }
    notFound.classList.remove("show");
    resultBox.classList.add("show");

    document.getElementById("v-initials").textContent = initials(record.name);
    document.getElementById("v-name").textContent = record.name;
    document.getElementById("v-id").textContent = record.id;
    document.getElementById("v-role").textContent = record.role;
    document.getElementById("v-institute").textContent = record.institute;
    document.getElementById("v-trade").textContent = record.trade;
    document.getElementById("v-valid").textContent = record.validTill;

    const badge = document.getElementById("v-status");
    const isActive = record.status === "active" && new Date(record.validTill) >= new Date();
    badge.textContent = isActive ? "ACTIVE" : "EXPIRED / INACTIVE";
    badge.className = "id-card-status " + (isActive ? "status-active" : "status-inactive");
  }

  searchBtn.addEventListener("click", runSearch);
  input.addEventListener("keydown", (e) => e.key === "Enter" && runSearch());

  const params = new URLSearchParams(location.search);
  const qid = params.get("id");
  if (qid) {
    input.value = qid;
    runSearch();
  }
}

/* ---------------- Contact form (contact.html) ---------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const box = document.getElementById("contact-success");
    box.style.display = "block";
    form.reset();
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
