AOS.init({
  duration: 800,
  once: true,
});

let stars = [];
const numberOfStars = 500; // Aumente o número de estrelas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function initCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 0.5 + 0.1,
  };
}

function initStars() {
  stars = [];
  for (let i = 0; i < numberOfStars; i++) {
    stars.push(createStar());
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  ctx.beginPath();
  stars.forEach((star) => {
    ctx.moveTo(star.x, star.y);
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

    // Movimento
    star.y += star.speed;

    // Reset quando estrela sair da tela
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  ctx.fill();

  requestAnimationFrame(drawStars);
}

// Inicialização
window.addEventListener("load", () => {
  initCanvas();
  initStars();
  drawStars();
});

// Ajuste do canvas ao redimensionar
window.addEventListener("resize", () => {
  initCanvas();
  initStars();
});

// Fecha o menu ao clicar em um item (exceto Central do Cliente)
document.querySelectorAll(".navbar-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    // Não fechar se for o dropdown da Central do Cliente
    if (link.classList.contains("dropdown-toggle")) return;

    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      bootstrap.Collapse.getInstance(navbarCollapse).hide();
    }
  });
});
