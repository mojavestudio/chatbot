// chat-widget.js
import { generateId, openConversation, sendChatMessage } from './chat-api.js';

// Default widget configuration
const defaultConfig = {
  webhook: { url: '', route: '' },
  branding: {
    logo: '',
    chatBubbleIcon: '',
    chatbotIcon: '',
    name: '',
    welcomeText: '',
    responseTimeText: '',
    poweredBy: {
      text: 'Powered by Mojave Studio',
      link: 'https://mojavestud.io'
    }
  },
  style: {
    primaryColor: '',
    secondaryColor: '',
    position: 'right',
    backgroundColor: '#ffffff',
    fontColor: '#333333'
  },
  prompts: {
    initialPrompts: [],
    suggestedReplies: [],
    followUpPrompt: ''
  }
};

// Merge user settings with defaults
function loadConfig() {
  const user = window.ChatWidgetConfig || {};
  return {
    webhook:   { ...defaultConfig.webhook,   ...user.webhook },
    branding:  { ...defaultConfig.branding,  ...user.branding },
    style:     { ...defaultConfig.style,     ...user.style },
    prompts:   { ...defaultConfig.prompts,   ...user.prompts }
  };
}

// Inject the Geist Sans font
function injectFont() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
  document.head.appendChild(link);
}

// Build the widget DOM and return key elements
function buildWidget(cfg) {
  const wrapper = document.createElement('div');
  wrapper.className = 'chat-widget';
  wrapper.style.setProperty('--chat--color-primary',   cfg.style.primaryColor);
  wrapper.style.setProperty('--chat--color-secondary', cfg.style.secondaryColor);
  wrapper.style.setProperty('--chat--color-background', cfg.style.backgroundColor);
  wrapper.style.setProperty('--chat--color-font',       cfg.style.fontColor);

  const container = document.createElement('div');
  container.className = `chat-container${cfg.style.position === 'left' ? ' position-left' : ''}`;
  container.innerHTML = `
    <div class="brand-header">
      <img src="${cfg.branding.logo}" alt="${cfg.branding.name}">
      <span>${cfg.branding.name}</span>
      <button class="close-button">×</button>
    </div>
    <div class="new-conversation">
      <h2 class="welcome-text">${cfg.branding.welcomeText}</h2>
      <button class="new-chat-btn">
        <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
        </svg>
        Send us a message
      </button>
      <p class="response-text">${cfg.branding.responseTimeText}</p>
    </div>
    <div class="chat-interface">
      <div class="brand-header">
        <img src="${cfg.branding.logo}" alt="${cfg.branding.name}">
        <span>${cfg.branding.name}</span>
        <button class="close-button">×</button>
      </div>
      <div class="messages-container">
        <div class="chat-messages"></div>
      </div>
      <div class="input-container">
        <div class="chat-input">
          <textarea placeholder="Type your message here..." rows="1"></textarea>
          <button type="submit">Send</button>
        </div>
        <div class="chat-footer">
          <a href="${cfg.branding.poweredBy.link}" target="_blank">${cfg.branding.poweredBy.text}</a>
        </div>
      </div>
    </div>
  `;

  const toggleBtn = document.createElement('button');
  toggleBtn.className = `chat-toggle${cfg.style.position === 'left' ? ' position-left' : ''}`;
  
  const chatbotIconURL = (cfg.branding.chatbotIcon || '').trim();
  const useChatbotIcon = chatbotIconURL !== '';

  if (useChatbotIcon) {
    toggleBtn.classList.add('no-bubble-style');
    toggleBtn.innerHTML = `
      <img src="${chatbotIconURL}" alt="Chat Icon"
           style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" />
    `;
    toggleBtn.removeAttribute('style');
    toggleBtn.style.border = 'none';
    toggleBtn.style.background = 'none';
    toggleBtn.style.boxShadow = 'none';
    toggleBtn.style.padding = '0';
    toggleBtn.style.margin = '0';
    toggleBtn.style.transition = 'none';
    toggleBtn.style.transform = 'none';
    toggleBtn.style.width = '60px';
    toggleBtn.style.height = '60px';
    toggleBtn.style.zIndex = '999';
  } else {
    toggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838
                 A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18
                 c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156
                 A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8
                 -3.589 8-8 8z"/>
      </svg>
    `;
    toggleBtn.style.background = `linear-gradient(135deg, ${cfg.style.primaryColor} 0%, ${cfg.style.secondaryColor} 100%)`;
    toggleBtn.style.color = 'white';
    toggleBtn.style.boxShadow = '0 4px 12px rgba(133, 79, 255, 0.3)';
    toggleBtn.style.transition = 'transform 0.3s';
  }

  wrapper.append(container, toggleBtn);
  document.body.appendChild(wrapper);

  return { wrapper, container, toggleBtn };
}

// Wire up events for opening, sending, toggling, and closing
function wireEvents(container, toggleBtn, cfg) {
  let sessionId = '';
  const newBtn   = container.querySelector('.new-chat-btn');
  const sendBtn  = container.querySelector('button[type="submit"]');
  const input    = container.querySelector('textarea');
  const chatArea = container.querySelector('.chat-interface');
  const messages = container.querySelector('.chat-messages');
  const closeBtns = container.querySelectorAll('.close-button');

  newBtn.addEventListener('click', async () => {
    sessionId = generateId();
    const data = await openConversation(sessionId, cfg.webhook.route, cfg.webhook.url);
    container.querySelector('.brand-header').style.display = 'none';
    container.querySelector('.new-conversation').style.display = 'none';
    chatArea.classList.add('active');

    if (cfg.prompts.initialPrompts.length > 0) {
      const initialText = cfg.prompts.initialPrompts[Math.floor(Math.random() * cfg.prompts.initialPrompts.length)];
      const intro = document.createElement('div');
      intro.className = 'chat-message bot';
      intro.textContent = initialText;
      messages.appendChild(intro);
      messages.scrollTop = messages.scrollHeight;
    }

    if (cfg.prompts.suggestedReplies.length > 0) {
      const suggestionBox = document.createElement('div');
      suggestionBox.className = 'suggested-replies';
      cfg.prompts.suggestedReplies.slice(0, 2).forEach(text => {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.className = 'reply-suggestion';
        btn.onclick = () => {
          suggestionBox.remove();
          dispatch(text);
        };
        suggestionBox.appendChild(btn);
      });
      const messagesContainer = chatArea.querySelector('.messages-container');
      messagesContainer.appendChild(suggestionBox);
    }

    const botMsg = Array.isArray(data) ? data[0].output : data.output;
    // Only render the bot message if it's a real response
    if (botMsg && botMsg !== "There was an error connecting to the server.") {
      const botBubble = document.createElement('div');
      botBubble.className = 'chat-message bot';
      botBubble.textContent = botMsg;
      messages.appendChild(botBubble);
      messages.scrollTop = messages.scrollHeight;
    } else {
      console.warn("Skipping initial bot bubble:", botMsg);
    }
    // Always send and display the follow-up prompt
    const followUp = cfg.prompts.followUpPrompt || 'Tell us more about your business or how we can help you';
    await sendChatMessage(sessionId, cfg.webhook.route, cfg.webhook.url, followUp);
    // display the follow-up prompt in the UI
    const followUpBubble = document.createElement('div');
    followUpBubble.className = 'chat-message bot';
    followUpBubble.textContent = followUp;
    messages.appendChild(followUpBubble);
    messages.scrollTop = messages.scrollHeight;
  });

  async function dispatch(text) {
    if (!text) return;
    // user bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-message user';
    userBubble.textContent = text;
    messages.appendChild(userBubble);
    messages.scrollTop = messages.scrollHeight;
    input.value = '';

    const reply = await sendChatMessage(sessionId, cfg.webhook.route, cfg.webhook.url, text);
    const botMsg = Array.isArray(reply) ? reply[0].output : reply.output;
    // suppress the generic fallback error-string when the real request succeeds
    if (!botMsg || botMsg === "There was an error connecting to the server.") {
      console.warn("Suppressing placeholder error message in dispatch:", botMsg);
      return;
    }
    const botBubble = document.createElement('div');
    botBubble.className = 'chat-message bot';
    botBubble.textContent = botMsg;
    messages.appendChild(botBubble);
    messages.scrollTop = messages.scrollHeight;
  }

  sendBtn.addEventListener('click', () => dispatch(input.value.trim()));
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      dispatch(input.value.trim());
    }
  });
  toggleBtn.addEventListener('click', () => container.classList.toggle('open'));
  closeBtns.forEach(btn => btn.addEventListener('click', () => container.classList.remove('open')));
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  if (window.chatWidgetLoaded) return;
  window.chatWidgetLoaded = true;
  injectFont();
  const cfg = loadConfig();
  const { container, toggleBtn } = buildWidget(cfg);
  wireEvents(container, toggleBtn, cfg);
});
