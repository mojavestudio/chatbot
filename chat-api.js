// chat-api.js

/**
 * Generates a new UUID for a chat session.
 * @returns {string} A new UUID.
 */
export function generateId() {
  return crypto.randomUUID();
}

/**
 * Loads the previous chat session or initializes a new one.
 * @param {string} sessionId - The ID of the chat session.
 * @param {string} route - The webhook route.
 * @param {string} url - The webhook URL.
 * @returns {Promise<any>} The parsed JSON response.
 */
export async function openConversation(sessionId, route, url) {
  const payload = [{
    action: "loadPreviousSession",
    sessionId,
    route,
    metadata: { userId: "" }
  }];
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return response.json();
}

/**
 * Sends a chat message to the conversation endpoint.
 * @param {string} sessionId - The ID of the chat session.
 * @param {string} route - The webhook route.
 * @param {string} url - The webhook URL.
 * @param {string} text - The user's message text.
 * @returns {Promise<any>} The parsed JSON response.
 */
export async function sendChatMessage(sessionId, route, url, text) {
  const payload = {
    action: "sendMessage",
    sessionId,
    route,
    chatInput: text,
    metadata: { userId: "" }
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return response.json();
}

/**
 * Returns a random item from an array.
 * @param {string[]} list - Array of strings.
 * @returns {string} A randomly selected item.
 */
export function randomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}