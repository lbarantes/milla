// Inicialização do canvas de estrelas
const canvas = document.querySelector("#stars-canvas");
const ctx = canvas.getContext("2d");

// Reutiliza as funções de estrelas do login.js
let stars = [];
const numberOfStars = 500;

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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const cpfInput = document.getElementById("cpf");
  const phoneInput = document.getElementById("phone");

  // Máscara para CPF
  cpfInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      e.target.value = value;
    }
  });

  // Máscara para telefone
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      e.target.value = value;
    }
  });

  // Validação do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    // Aqui você pode adicionar sua lógica de registro
    console.log("Formulário enviado");
    // form.submit();
  });
});

window.addEventListener("load", () => {
  initCanvas();
  initStars();
  drawStars();
});

window.addEventListener("resize", () => {
  initCanvas();
  initStars();
});
