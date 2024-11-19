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

function toggleChatbox() {
  const chatBox = document.getElementById("chatBox");
  if (chatBox.style.display === "none" || !chatBox.style.display) {
    chatBox.style.display = "block";
    // Pequeno delay para permitir que o display:block seja aplicado antes da animação
    setTimeout(() => {
      chatBox.classList.add("show");
      resetChat(); // Inicializa as animações dos botões
    }, 10);
  } else {
    chatBox.classList.remove("show");
    // Aguarda a animação terminar antes de esconder o elemento
    setTimeout(() => (chatBox.style.display = "none"), 300);
  }
}

function chatResponse(option) {
  const chatMessages = document.querySelector(".chat-messages");
  const messageArea = document.getElementById("chat-message-area");
  let response = "";

  // Remove os botões existentes
  const buttons = chatMessages.querySelectorAll("button:not(.send-button)");
  buttons.forEach((button) => button.remove());

  switch (option) {
    case "whatsapp":
      response = "Você pode entrar em contato conosco pelo WhatsApp através do número (22) 3853-9003 😊";
      break;
    case "extra1":
      response = "Esta é a resposta para a Opção Extra 1 🚀";
      break;
    case "extra2":
      response = "Esta é a resposta para a Opção Extra 2 ✨";
      break;
    case "extra3":
      response = "Esta é a resposta para a Opção Extra 3 🌟";
      break;
    case "reset":
      // Adiciona apenas os botões de opções, sem limpar o histórico
      const optionsHTML = `
        <button onclick="chatResponse('online')" class="cta-button">👩‍💻 Atendimento online</button>
        <button onclick="chatResponse('whatsapp')" class="cta-button">📱 Contato por WhatsApp</button>
        <button onclick="chatResponse('extra2')" class="cta-button">🌟 Opção Extra 2</button>
        <button onclick="chatResponse('extra3')" class="cta-button">✨ Opção Extra 3</button>
      `;
      const optionsContainer = document.createElement("div");
      optionsContainer.innerHTML = optionsHTML;
      chatMessages.appendChild(optionsContainer);

      // Reinicializa as animações dos botões
      resetChat();
      return;
    case "online":
      messageArea.style.display = "flex";
      // Remove a mensagem imediata de atendente
      break;
    default:
      response = "Opção não reconhecida.";
  }

  if (option !== "online") {
    const responseElement = document.createElement("p");
    responseElement.className = "chat-response";
    responseElement.textContent = response;
    chatMessages.appendChild(responseElement);

    // Adiciona o botão para voltar apenas se não for atendimento online
    const resetButton = document.createElement("button");
    resetButton.className = "cta-button";
    resetButton.textContent = "Voltar para o menu inicial 🔄";
    resetButton.style.setProperty("--btn-index", "0"); // Para animação
    resetButton.onclick = () => chatResponse("reset");
    chatMessages.appendChild(resetButton);
  }

  // Scroll suave para o final
  chatMessages.scrollTo({
    top: chatMessages.scrollHeight,
    behavior: "smooth",
  });
}

let isFirstMessage = true;

function sendMessage() {
  const input = document.querySelector(".chat-input");
  const message = input.value.trim();
  const messageArea = document.getElementById("chat-message-area");

  if (message) {
    const chatMessages = document.querySelector(".chat-messages");
    const messageElement = document.createElement("p");
    messageElement.textContent = "Você: " + message;
    chatMessages.appendChild(messageElement);
    input.value = "";

    // Verifica se é a primeira mensagem
    if (isFirstMessage) {
      setTimeout(() => {
        const attendantMessage = document.createElement("p");
        attendantMessage.className = "chat-response";
        attendantMessage.innerHTML =
          'Um atendente foi chamado e logo irá te atender! 😊<br><br>Se desejar encerrar o chat basta escrever "Encerrar"';
        chatMessages.appendChild(attendantMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 500);
      isFirstMessage = false;
    }

    // Verifica se a mensagem é "Encerrar" (case-insensitive)
    if (message.toLowerCase() === "encerrar") {
      messageArea.style.display = "none";
      const goodbyeMessage = document.createElement("p");
      goodbyeMessage.className = "chat-response";
      goodbyeMessage.textContent = "Chat encerrado! Como posso ajudar você? 😊";
      chatMessages.appendChild(goodbyeMessage);

      isFirstMessage = true; // Reset para próximo atendimento
      // Pequeno delay antes de mostrar as opções novamente
      setTimeout(() => chatResponse("reset"), 500);
      return;
    }

    // Scroll para o final do chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Adicionar event listener para a tecla Enter
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".chat-input");
  if (input) {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }
});

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
