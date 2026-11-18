const screens = {
  invite: document.querySelector("#invite-screen"),
  choice: document.querySelector("#choice-screen"),
  success: document.querySelector("#success-screen")
};

const progressDots = [...document.querySelectorAll("[data-progress]")];
const form = document.querySelector("#date-form");
const otherWrap = document.querySelector("#other-wrap");
const otherInput = document.querySelector("#other-idea");
const messageInput = document.querySelector("#message");
const characterCount = document.querySelector("#character-count");
const formError = document.querySelector("#form-error");

function showScreen(name, step) {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[name].classList.add("is-active");
  progressDots.forEach((dot, index) => dot.classList.toggle("is-active", index === step - 1));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelector("#yes-button").addEventListener("click", () => showScreen("choice", 2));
document.querySelector("#back-button").addEventListener("click", () => showScreen("invite", 1));

// The "No" button intentionally has no action, per the requested experience.
document.querySelector("#no-button").addEventListener("click", () => {});

form.addEventListener("change", (event) => {
  if (event.target.name !== "dateType") return;
  const otherOption = form.querySelector('input[name="dateType"][value="Other"]');
  const isOtherSelected = otherOption.checked;
  otherWrap.hidden = !isOtherSelected;
  otherInput.required = isOtherSelected;
  if (event.target === otherOption && isOtherSelected) otherInput.focus();
});

messageInput.addEventListener("input", () => {
  characterCount.textContent = `${messageInput.value.length} / 240`;
});

function selectedPlans() {
  return [...form.querySelectorAll('input[name="dateType"]:checked')].map((option) =>
    option.value === "Other" ? otherInput.value.trim() : option.value
  );
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${value}T00:00:00Z`));
}

function createReceiptNumber() {
  const now = Date.now().toString().slice(-4);
  return `#${now}`;
}

function displaySummary(details) {
  const summaryList = document.querySelector("#summary-type");
  summaryList.replaceChildren(
    ...details.plans.map((plan) => {
      const item = document.createElement("li");
      item.textContent = plan;
      return item;
    })
  );
  document.querySelector("#summary-total").textContent =
    details.plans.length === 1 ? "Here is our plan" : `${details.plans.length} awesome plans!`;
  document.querySelector("#receipt-number").textContent = details.receiptNumber;

  const nameRow = document.querySelector("#summary-name-row");
  nameRow.hidden = !details.name;
  document.querySelector("#summary-name").textContent = details.name;

  const dateRow = document.querySelector("#summary-date-row");
  dateRow.hidden = !details.preferredDate;
  document.querySelector("#summary-date").textContent = formatDate(details.preferredDate);

  const noteWrap = document.querySelector("#summary-note-wrap");
  noteWrap.hidden = !details.note;
  document.querySelector("#summary-note").textContent = details.note;

  showScreen("success", 3);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.textContent = "";

  const selected = form.querySelectorAll('input[name="dateType"]:checked');
  if (!selected.length) {
    formError.textContent = "Choose at least one date idea first.";
    form.querySelector('input[name="dateType"]').focus();
    return;
  }

  const plans = selectedPlans();
  if (plans.some((plan) => !plan)) {
    formError.textContent = "Tell me your date idea first.";
    otherInput.focus();
    return;
  }

  const details = {
    plans,
    name: document.querySelector("#guest-name").value.trim(),
    preferredDate: document.querySelector("#preferred-date").value,
    note: messageInput.value.trim(),
    receiptNumber: createReceiptNumber()
  };

  displaySummary(details);
});

document.querySelector("#start-over-button").addEventListener("click", () => {
  form.reset();
  otherWrap.hidden = true;
  otherInput.required = false;
  characterCount.textContent = "0 / 240";
  formError.textContent = "";
  showScreen("invite", 1);
});
