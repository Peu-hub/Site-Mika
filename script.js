// MENU
const btn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

btn.onclick = () => {
  btn.classList.toggle("open"); // anima o botão
  menu.classList.toggle("open")
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

// VIDEO HERO AJUSTADO
const heroSection = document.querySelector('.video-hero');
const heroVideo = document.getElementById('heroVideo');
const heroImage = document.getElementById('heroImage');

// Observer para scroll (pausa vídeo se rolar MUITO)
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !heroSection.classList.contains('video-ended')) {
      heroVideo.play();
    } else if (!heroSection.classList.contains('video-ended')) {
      heroVideo.pause();
    }
  });
}, { threshold: 0.3 });

videoObserver.observe(heroSection);

// AO TERMINAR VÍDEO: some permanentemente + ativa imagem pequena + cresce texto
heroVideo.onended = () => {
  heroSection.classList.add('video-ended');
  heroVideo.pause();
  heroVideo.currentTime = 0; // reset se quiser
};

// Pause no scroll também ativa se quiser (opcional, comente se não)
heroVideo.onpause = () => {
  // só ativa se não ended ainda
  if (!heroSection.classList.contains('video-ended') && heroVideo.currentTime > 0) {
    heroVideo.currentTime = heroVideo.duration * 0.9; // pula quase pro final
  }
};