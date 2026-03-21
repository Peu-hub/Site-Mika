// MENU
const btn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

btn.onclick = () => {
  if (menu.style.top === "0%") {
    menu.style.top = "-100%";
  } else {
    menu.style.top = "0%";
  }
};

// ANIMAÇÃO AO SCROLL
const elements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

elements.forEach(el => observer.observe(el));