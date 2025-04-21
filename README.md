# 🌵 Mojave Chat Widget

A lightweight, customizable chatbot widget powered by n8n — designed to be easily embedded in sites like Framer. Offers configurable styling, branding, and webhook routing with modern ES6 support.

---

## 🚀 Features

- 💬 Embeds a full chat UI powered by your n8n workflows  
- 🌈 Fully brandable: floating icon, header logo, colors, copy  
- 🧱 Modular and clean: no external dependencies, Framer-safe  
- 🧠 Smart defaults: gracefully handles missing config fields  
- 🔢 Displays the first two suggested replies by default (customizable via `slice(0,2)` in `chat-widget.js`)

---

## 🧱 Embed Instructions

Paste the following into your Framer embed block or at the end of your site’s `<body>`:

```html
<!-- 1. Load Stylesheet -->
<link
  rel="stylesheet"
  href="https://mojavestudio.github.io/chatbot/chat-widget.css"
/>

<!-- 2. Widget Configuration -->
<script>
  window.ChatWidgetConfig = {
    webhook: {
      url: 'https://mojavestudio.app.n8n.cloud/webhook/a9effa7f-e129-4718-8013-3634516761e5/chat', // ✅ Required
      route: '' // ❌ Optional: additional subpath passed as metadata
    },
    branding: {
      logo: 'https://raw.githubusercontent.com/mojavestudio/MojaveAssets/…/mobot-horizontal.png',  // ❌ Optional
      chatbotIcon: 'https://raw.githubusercontent.com/mojavestudio/MojaveAssets/…/M0B0T.png',    // ❌ Optional
      name: '',                        // ❌ Optional: set to '' to hide
      welcomeText: 'Hi 👋 I’m M0-B0T — your systems expert.', // ✅ Required
      responseTimeText: 'We typically respond right away'     // ✅ Required
    },
    style: {
      primaryColor: '#854fff',      // ✅ Required
      secondaryColor: '#6b3fd4',    // ✅ Required
      position: 'right',            // ✅ Required: 'left' or 'right'
      backgroundColor: '#ffffff',   // ✅ Required
      fontColor: '#333333'          // ✅ Required
    },
    prompts: {
      initialPrompts: [
        "Hey! I’m M0 🌵 — here to ask a few quick questions and make some smart suggestions. Once we’ve got a sense of what you need, the Mojave team will take it from there.",
        "Hi there! I’m M0 🌵 — my job is to ask a few questions, understand your needs, and recommend the right next steps. From there, one of our Mojave consultants will jump in to help.",
        // …additional initial prompts…
      ],
      suggestedReplies: [
        "⏱️ Save time with automation",
        "📉 Replace messy spreadsheets"
        // (Only the first two are shown by default via `.slice(0,2)`)
      ],
      followUpPrompt: "Tell us more about your business or how we can help you"
    }
  };
</script>

<!-- 3. Load the Widget Script -->
<script type="module" src="https://mojavestudio.github.io/chatbot/chat-widget.js"></script>
