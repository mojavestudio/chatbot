# Mojave Chat Widget

This is a customizable JavaScript chat widget that can be embedded into any webpage, including static site builders like Framer. It supports real-time messaging through an n8n webhook and is fully configurable via a `window.ChatWidgetConfig` object.

---

## 🔧 Features

- Fully embeddable with a single script block
- Optional branding and theme customization
- Uses inline styles and self-contained assets
- Automatically handles chat session state
- Option to configure the chat bubble icon or fall back to the default SVG

---

## 📦 Installation

No installation required — just copy the embed code below and paste it into your site.

### ✅ Use in Framer

Framer only supports embedded script blocks (no external `<link>` tags), so this widget bundles styles and logic into a single embeddable solution.

Paste this into a Framer **Embed block**:

```html
<!-- 1) Chat Widget Configuration -->
<script>
  window.ChatWidgetConfig = {
    webhook: {
      url: 'https://YOUR_N8N_URL/webhook/your-endpoint/chat',
      route: '' // leave empty if your URL already ends in /chat
    },
    branding: {
      logo: 'https://your.cdn/logo.png',
      name: 'Your Brand Name',
      welcomeText: 'Hi 👋, how can we help?',
      responseTimeText: 'We typically respond right away',
      chatBubbleIcon: 'https://your.cdn/chat-icon.png' // Optional: 60x60 circle
    },
    style: {
      primaryColor: '#854fff',
      secondaryColor: '#6b3fd4',
      position: 'right', // 'left' or 'right'
      backgroundColor: '#ffffff',
      fontColor: '#333333'
    }
  };
</script>

<!-- 2) Embed Widget Script -->
<script src="https://mojavestudio.github.io/chatbot/js/chat-widget.js"></script>
