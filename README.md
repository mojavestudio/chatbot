# 🌵 Mojave Chat Widget

A lightweight, customizable chatbot widget powered by n8n — designed to be easily embedded in sites like Framer. Offers configurable styling, branding, and webhook routing with modern ES6 support.

---

## 🚀 Features

- 💬 Embeds a full chat UI powered by your n8n workflows
- 🌈 Fully brandable: floating icon, header logo, colors, copy
- 🧱 Modular and clean: no external dependencies, Framer-safe
- 🧠 Smart defaults: gracefully handles missing config fields

---

## 🧱 Embed Instructions

Paste the following into your Framer embed block or at the end of your site's `<body>`:

```html
<!-- 1. Required Stylesheet -->
<link rel="stylesheet" href="https://<your-github-pages-domain>/chat-widget.css" />

<!-- 2. Widget Configuration -->
<script>
  window.ChatWidgetConfig = {
    webhook: {
      url: 'https://<your-n8n-instance>/webhook/<workflow-id>/chat', // ✅ Required
      route: '' // ❌ Optional: additional subpath passed as metadata
    },
    branding: {
      logo: '<RAW URL to your header logo>',            // ❌ Optional: appears in top-left of widget
      chatbotIcon: '<RAW URL to your round bubble icon>', // ❌ Optional: overrides default purple SVG button
      name: '', // ❌ Optional: shown next to logo — set to '' to hide
      welcomeText: 'Hi 👋 I’m M0-B0T — your systems expert.', // ✅ Required
      responseTimeText: 'We typically respond right away'     // ✅ Required
    },
    style: {
      primaryColor: '#854fff',      // ✅ Required: base accent color
      secondaryColor: '#6b3fd4',    // ✅ Required: gradient/hover accent
      position: 'right',            // ✅ Required: 'left' or 'right'
      backgroundColor: '#ffffff',   // ✅ Required: widget background
      fontColor: '#333333'          // ✅ Required: primary text color
    }
  };
</script>

<!-- 3. Load the Widget Script -->
<script type="module" src="https://<your-github-pages-domain>/chat-widget.js"></script>
