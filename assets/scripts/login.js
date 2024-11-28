document.addEventListener("DOMContentLoaded", () => {
  // Configuração do canvas de estrelas
  const canvas = document.getElementById("stars-canvas");
  const ctx = canvas.getContext("2d");
  let stars = [];
  const numberOfStars = 200; // Aumentado de 150

  function initCanvas() {
    canvas.width = window.innerWidth * 0.7;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < numberOfStars; i++) {
      const speedMultiplier = Math.random() * 0.15 + 0.05; // Velocidade ainda mais suave
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5, // Tamanho mais consistente
        speed: speedMultiplier,
        opacity: Math.random() * 0.7 + 0.3, // Opacidade mais controlada
        hue: Math.random() * 50 + 190,
        // Alterado o ângulo para mover para baixo-direita (entre 15° e 45° em radianos)
        direction: Math.random() * (Math.PI / 6) + Math.PI / 12,
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      // Animação de brilho mais suave
      star.opacity += (Math.random() - 0.5) * 0.03; // Reduzido de 0.05
      star.opacity = Math.max(0.2, Math.min(1, star.opacity));

      // Movimento atualizado
      star.x += Math.cos(star.direction) * star.speed;
      star.y += Math.sin(star.direction) * star.speed;

      // Reposicionamento quando sair da tela
      if (star.x > canvas.width || star.y > canvas.height) {
        // Reposiciona aleatoriamente na borda superior ou esquerda
        if (Math.random() > 0.5) {
          star.x = 0;
          star.y = Math.random() * canvas.height * 0.5; // Limita à metade superior
        } else {
          star.x = Math.random() * canvas.width * 0.5; // Limita à metade esquerda
          star.y = 0;
        }
      }

      ctx.beginPath();
      ctx.fillStyle = `hsla(${star.hue}, 80%, 80%, ${star.opacity})`;
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(drawStars);
  }

  // Função para gerar posição aleatória no topo da tela
  function getRandomPosition() {
    return {
      x: Math.random() * -50, // Começa mais à esquerda
      y: Math.random() * -100 + 30, // Maior variação na altura inicial, alguns começam mais baixo
    };
  }

  // Função para criar um único cometa
  function createComet() {
    const comet = document.createElement("div");
    comet.className = "comet";

    const depth = Math.random();
    const speed = 5 + (1 - depth) * 7; // Entre 5s e 12s (bem mais lento)
    const scale = 0.5 + depth * 0.5;
    const opacity = 0.4 + depth * 0.6;
    const pos = getRandomPosition();

    comet.style.setProperty("--start-x", `${pos.x}%`);
    comet.style.setProperty("--start-y", `${pos.y}%`);
    comet.style.setProperty("--comet-duration", `${speed}s`);
    comet.style.setProperty("--comet-opacity", opacity);
    comet.style.transform = `scale(${scale})`;

    if (Math.random() > 0.7) comet.classList.add("yellow");

    document.querySelector(".space-section").appendChild(comet);
    comet.addEventListener("animationend", () => comet.remove());
  }

  // Função para iniciar múltiplos cometas
  function initComets(count = 15) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        createComet();
        setInterval(() => {
          createComet();
        }, Math.random() * 5000 + 7000); // Entre 7 e 12 segundos (mais espaçado)
      }, i * 500); // Delay inicial aumentado
    }
  }

  // Inicialização
  initCanvas();
  createStars();
  drawStars();
  initComets(15); // Inicia 15 cometas

  // Criar cometas periodicamente
  function scheduleNextComet() {
    const delay = Math.random() * 3000 + 2000; // Entre 2s e 5s
    setTimeout(() => {
      createComet();
      scheduleNextComet();
    }, delay);
  }
  scheduleNextComet();

  // Ajuste ao redimensionar
  window.addEventListener("resize", () => {
    initCanvas();
    createStars();
  });

  // Handler do formulário
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Lógica de autenticação aqui
      const formData = new FormData(loginForm);
      console.log("Login attempt:", Object.fromEntries(formData));
    });
  }
});
