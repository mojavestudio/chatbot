const toggleBtn = document.createElement('button');
toggleBtn.className = `chat-toggle${cfg.style.position === 'left' ? ' position-left' : ''}`;

const iconURL = cfg.branding.chatBubbleIcon?.trim();
const useCustomIcon = iconURL && iconURL.length > 0;

if (useCustomIcon) {
  toggleBtn.innerHTML = `
    <img src="${iconURL}" alt="Chat"
         style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />
  `;
} else {
  toggleBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 24 24"
         style="width: 24px; height: 24px; fill: currentColor;">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838
               A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18
               c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156
               A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8
               -3.589 8-8 8z"/>
    </svg>
  `;
}