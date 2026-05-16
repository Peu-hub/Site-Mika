// ============================================================
//  script.js — Toda a lógica do site CALLBLACK
// ============================================================

// ————————————————————————————————————————————————
//  1. TELA DE INTRO
//
//  Quando o usuário clica em "ENTRAR", a tela de intro
//  recebe a classe .hidden, que no CSS dispara uma transição
//  de opacity e translateY fazendo ela sumir suavemente.
//  Depois de 800ms (tempo da animação), ela é completamente
//  removida do fluxo da página com display:none.
// ————————————————————————————————————————————————
const introScreen = document.getElementById('intro-screen');
const enterBtn    = document.getElementById('enterBtn');

enterBtn.addEventListener('click', () => {
  introScreen.classList.add('hidden');    // dispara a animação CSS
  setTimeout(() => {
    introScreen.style.display = 'none';  // remove da página após a animação
  }, 800);
});


// ————————————————————————————————————————————————
//  2. NAVBAR COM SCROLL
//
//  Quando o usuário rolar mais de 50px, a navbar ganha
//  a classe .scrolled, que no CSS adiciona uma sombra.
//  Isso dá a sensação de que a barra "flutua" sobre a página.
// ————————————————————————————————————————————————
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ————————————————————————————————————————————————
//  3. MENU HAMBÚRGUER (mobile)
//
//  Alterna as classes .open no botão e no menu.
//  No CSS, .hamburger.open transforma as 3 linhas em X.
//  E .mobile-menu.open muda de display:none para display:flex.
// ————————————————————————————————————————————————
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Função chamada nos links do menu mobile para fechar ao clicar
function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// Fecha menu se clicar fora dele
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});


// ————————————————————————————————————————————————
//  4. SCROLL REVEAL — animação ao entrar na tela
//
//  IntersectionObserver é a forma moderna de detectar quando
//  um elemento entra na área visível do navegador.
//
//  Como funciona:
//  - No CSS, .reveal começa invisible (opacity:0, translateY(40px))
//  - O observer fica "vigiando" todos os elementos .reveal
//  - Quando um deles entra na tela, ele ganha .visible
//  - O CSS faz a transição suave para opacity:1 e translateY(0)
// ————————————————————————————————————————————————
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // once:true já garante que não vai re-observar, mas fazemos
        // unobserve manualmente também, por garantia
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,   // elemento precisa estar 15% visível para animar
    rootMargin: '0px 0px -50px 0px', // considera um pouco antes de chegar
  }
);

revealElements.forEach((el) => observer.observe(el));


// ————————————————————————————————————————————————
//  5. STAGGER — efeito cascata para itens dentro de seções
//
//  Em vez de todos os cards aparecendo juntos, cada um
//  aparece com um pequeno atraso a mais que o anterior.
//  Fazemos isso setando CSS custom property --delay.
// ————————————————————————————————————————————————
document.querySelectorAll('.colecoes-grid .colecao-card').forEach((card, i) => {
  card.style.setProperty('--delay', `${i * 0.15}s`);
  card.style.transitionDelay = `${i * 0.15}s`;
});
