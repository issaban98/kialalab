const menus = {
  platform: ["Clinicians", "Revenue Cycle", "Nursing", "Assistant", "Care Signals"],
  ai: ["Tech Blog", "Publications", "Whitepapers", "Contextual Reasoning", "Science"],
  resources: ["Customers", "Prompt Library", "Impact Calculator", "Best in KLAS", "News Feed"],
  about: ["About us", "Vision", "Press", "Life at Abridge", "Careers"]
};

const panel = document.querySelector("#nav-panel");
const triggers = [...document.querySelectorAll(".nav-trigger")];

function closeMenu() {
  panel.hidden = true;
  panel.innerHTML = "";
  triggers.forEach((button) => button.setAttribute("aria-expanded", "false"));
}

triggers.forEach((button) => {
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    closeMenu();
    if (isOpen) return;
    button.setAttribute("aria-expanded", "true");
    panel.innerHTML = `<p>${button.textContent.trim()}</p><div>${menus[button.dataset.menu].map((item) => `<a href="#">${item}<span>↗</span></a>`).join("")}</div>`;
    panel.hidden = false;
  });
});

document.addEventListener("keydown", (event) => event.key === "Escape" && closeMenu());
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});

const outcomeContent = {
  access: ["43% increase in ability to accommodate urgent patients", "WVU Medicine: An increase in clinicians’ ability to accommodate at least one additional urgent patient during a clinic session.", "WVU"],
  effort: ["86% reduction in documentation effort", "Reid Health: The effort needed to complete notes has decreased by 86%, with patients reporting their clinicians are more present.", "REID"],
  wrvu: ["14% increase in wRVUs", "Riverside Health: More precise documentation supported a 14% increase in HCC diagnoses documented per encounter.", "RIVERSIDE"]
};

document.querySelectorAll("[data-outcome]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-outcome]").forEach((item) => item.setAttribute("aria-selected", String(item === button)));
    const [title, copy, mark] = outcomeContent[button.dataset.outcome];
    const target = document.querySelector("#outcome-panel");
    target.querySelector("h2").textContent = title;
    target.querySelector(".outcome-copy > p:nth-of-type(2)").textContent = copy;
    target.querySelector(".outcome-monogram").textContent = mark;
  });
});

const scienceContent = {
  early: ["Impact Results from OpenAI’s GPT-5.5", "With better tool utilization and stronger reasoning, we saw a 25% relative increase in our ability to provide greater specificity to match elements in our rubric-based clinical quality evaluation."],
  two: ["The Science of Confabulation Elimination", "In this paper, we focus on a topic that is top-of-mind for adoption of any AI-powered product: hallucinations."],
  one: ["Pioneering the Science of AI Evaluation", "Our process for evaluating AI-generated documentation combines quantitative performance measures with holistic clinician-in-the-loop studies."]
};

document.querySelectorAll("[data-science]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-science]").forEach((item) => item.setAttribute("aria-selected", String(item === button)));
    const [title, copy] = scienceContent[button.dataset.science];
    const target = document.querySelector("#science-panel");
    target.querySelector("h3").textContent = title;
    target.querySelector("p").textContent = copy;
  });
});

const rail = document.querySelector("#news-rail");
document.querySelector("#news-next").addEventListener("click", () => rail.scrollBy({ left: Math.min(rail.clientWidth * 0.8, 480), behavior: "smooth" }));
document.querySelector("#news-prev").addEventListener("click", () => rail.scrollBy({ left: -Math.min(rail.clientWidth * 0.8, 480), behavior: "smooth" }));

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("reduce-motion");
}
