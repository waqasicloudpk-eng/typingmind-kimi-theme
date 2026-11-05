/*!
 * Kimi-inspired Chat UI for TypingMind
 * Version: 1.0.0
 *
 * A local, CSS-only visual extension for TypingMind.
 * No network requests, chat reading, API-key access, or model changes.
 * Not affiliated with or endorsed by Moonshot AI or TypingMind.
 *
 * Install: TypingMind -> Preferences -> Advanced Settings -> Extensions.
 * Toggle after installation: Ctrl/Cmd + Alt + K.
 * Console API: window.TypingMindKimiTheme.enable() / .disable() / .toggle().
 */
(() => {
  "use strict";

  const VERSION = "1.0.0";
  const ROOT_CLASS = "tm-kimi-ui";
  const STYLE_ID = "tm-kimi-ui-styles";

  if (window.TypingMindKimiTheme) return;

  const css = String.raw`
    html.${ROOT_CLASS} {
      --kimi-bg: #ffffff;
      --kimi-sidebar: #f7f7f5;
      --kimi-surface: #ffffff;
      --kimi-soft: #f5f5f2;
      --kimi-hover: #eeeeeb;
      --kimi-bubble: #f0f0ed;
      --kimi-text: #202124;
      --kimi-muted: #71727a;
      --kimi-faint: #9a9ba2;
      --kimi-border: #e6e6e2;
      --kimi-border-strong: #d5d5d0;
      --kimi-accent: #3478f6;
      --kimi-accent-soft: #edf4ff;
      --kimi-code: #f6f7f8;
      --kimi-shadow: 0 4px 22px rgba(28, 28, 26, 0.07);
      --kimi-avatar: #ffffff;
      color-scheme: light;
    }

    html.dark.${ROOT_CLASS} {
      --kimi-bg: #191919;
      --kimi-sidebar: #111111;
      --kimi-surface: #222222;
      --kimi-soft: #242424;
      --kimi-hover: #2d2d2d;
      --kimi-bubble: #2b2b2b;
      --kimi-text: #ececea;
      --kimi-muted: #aaa9a5;
      --kimi-faint: #777672;
      --kimi-border: #343434;
      --kimi-border-strong: #484848;
      --kimi-accent: #70a5ff;
      --kimi-accent-soft: #202c3e;
      --kimi-code: #202122;
      --kimi-shadow: 0 6px 26px rgba(0, 0, 0, 0.28);
      --kimi-avatar: #242424;
      color-scheme: dark;
    }

    html.${ROOT_CLASS},
    html.${ROOT_CLASS} body {
      background: var(--kimi-bg) !important;
      color: var(--kimi-text);
      font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji",
        "Segoe UI Emoji", sans-serif;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }

    html.${ROOT_CLASS} *,
    html.${ROOT_CLASS} *::before,
    html.${ROOT_CLASS} *::after {
      scrollbar-color: var(--kimi-border-strong) transparent;
      scrollbar-width: thin;
    }

    html.${ROOT_CLASS} ::selection {
      color: var(--kimi-text);
      background: var(--kimi-accent-soft);
    }

    /* Main chat surfaces */
    html.${ROOT_CLASS} [data-element-id="main-content-area"],
    html.${ROOT_CLASS} [data-element-id="chat-space-background"],
    html.${ROOT_CLASS} [data-element-id="chat-space-middle-part"],
    html.${ROOT_CLASS} [data-element-id="chat-space-end-part"] {
      background: var(--kimi-bg) !important;
      color: var(--kimi-text);
    }

    html.${ROOT_CLASS} [data-element-id="chat-space-beginning-part"] {
      color: var(--kimi-text);
      background: color-mix(in srgb, var(--kimi-bg) 90%, transparent) !important;
      border-bottom: 1px solid color-mix(in srgb, var(--kimi-border) 65%, transparent) !important;
      backdrop-filter: blur(16px) saturate(140%);
      -webkit-backdrop-filter: blur(16px) saturate(140%);
    }

    html.${ROOT_CLASS} [data-element-id="current-chat-title"],
    html.${ROOT_CLASS} [data-element-id="model-name"] {
      color: var(--kimi-text) !important;
      font-weight: 600 !important;
      letter-spacing: -0.01em;
    }

    /* Kimi-like quiet navigation */
    html.${ROOT_CLASS} [data-element-id="workspace-bar"],
    html.${ROOT_CLASS} [data-element-id="nav-sidebar-container"],
    html.${ROOT_CLASS} [data-element-id="side-bar-background"],
    html.${ROOT_CLASS} [data-element-id="sidebar-beginning-part"],
    html.${ROOT_CLASS} [data-element-id="sidebar-middle-part"],
    html.${ROOT_CLASS} [data-element-id="side-bar-footer"] {
      color: var(--kimi-muted);
      background: var(--kimi-sidebar) !important;
      border-color: var(--kimi-border) !important;
    }

    html.${ROOT_CLASS} [data-element-id="workspace-bar"] button,
    html.${ROOT_CLASS} [data-element-id="nav-sidebar-container"] button,
    html.${ROOT_CLASS} [data-element-id="nav-sidebar-container"] a,
    html.${ROOT_CLASS} [data-element-id="side-bar-footer"] button {
      color: var(--kimi-muted) !important;
      border-radius: 10px !important;
    }

    html.${ROOT_CLASS} [data-element-id="workspace-bar"] button:hover,
    html.${ROOT_CLASS} [data-element-id="nav-sidebar-container"] button:hover,
    html.${ROOT_CLASS} [data-element-id="nav-sidebar-container"] a:hover,
    html.${ROOT_CLASS} [data-element-id="side-bar-footer"] button:hover {
      color: var(--kimi-text) !important;
      background: var(--kimi-hover) !important;
    }

    html.${ROOT_CLASS} [data-element-id="new-chat-button-in-side-bar"] {
      color: var(--kimi-text) !important;
      background: var(--kimi-surface) !important;
      border: 1px solid var(--kimi-border) !important;
      border-radius: 12px !important;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.025);
      font-weight: 550 !important;
      transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
    }

    html.${ROOT_CLASS} [data-element-id="new-chat-button-in-side-bar"] * {
      color: var(--kimi-text) !important;
    }

    html.${ROOT_CLASS} [data-element-id="new-chat-button-in-side-bar"]:hover {
      background: var(--kimi-soft) !important;
      border-color: var(--kimi-border-strong) !important;
    }

    html.${ROOT_CLASS} [data-element-id="new-chat-button-in-side-bar"]:active {
      transform: scale(0.99);
    }

    html.${ROOT_CLASS} [data-element-id="search-chats-bar"] {
      color: var(--kimi-muted) !important;
      background: transparent !important;
      border-color: var(--kimi-border) !important;
      border-radius: 10px !important;
    }

    html.${ROOT_CLASS} [data-element-id="custom-chat-item"],
    html.${ROOT_CLASS} [data-element-id="selected-chat-item"] {
      border-radius: 11px !important;
      transition: background 140ms ease;
    }

    html.${ROOT_CLASS} [data-element-id="custom-chat-item"]:hover {
      background: var(--kimi-soft) !important;
    }

    html.${ROOT_CLASS} [data-element-id="selected-chat-item"] {
      color: var(--kimi-text) !important;
      background: var(--kimi-hover) !important;
    }

    html.${ROOT_CLASS} [data-element-id="selected-chat-item"] * {
      color: var(--kimi-text) !important;
    }

    /* Messages: open AI answers, soft user bubbles */
    html.${ROOT_CLASS} [data-element-id="response-block"] {
      color: var(--kimi-text);
      background: transparent !important;
      border-radius: 0 !important;
      padding-top: 20px !important;
      padding-bottom: 20px !important;
      transition: none !important;
    }

    html.${ROOT_CLASS} [data-element-id="response-block"]:hover,
    html.dark.${ROOT_CLASS} [data-element-id="response-block"]:hover {
      background: transparent !important;
    }

    html.${ROOT_CLASS} [data-element-id="response-block"][data-message-role="user"] {
      padding-top: 12px !important;
      padding-bottom: 12px !important;
    }

    html.${ROOT_CLASS} [data-element-id="chat-avatar-container"] {
      width: 30px;
      height: 30px;
      overflow: hidden;
      background: var(--kimi-avatar) !important;
      border: 1px solid var(--kimi-border);
      border-radius: 9px !important;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
    }

    html.${ROOT_CLASS} [data-element-id="chat-avatar-container"] img {
      border-radius: 8px !important;
    }

    html.${ROOT_CLASS} [data-element-id="user-message"] {
      display: block;
      width: fit-content !important;
      max-width: min(78%, 720px) !important;
      margin-left: auto !important;
      padding: 10px 16px !important;
      color: var(--kimi-text) !important;
      background: var(--kimi-bubble) !important;
      border: 1px solid color-mix(in srgb, var(--kimi-border) 60%, transparent);
      border-radius: 17px !important;
      box-shadow: none !important;
      font-weight: 400 !important;
      line-height: 1.6 !important;
    }

    html.${ROOT_CLASS} [data-element-id="user-message"] * {
      color: inherit !important;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] {
      max-width: 100% !important;
      color: var(--kimi-text) !important;
      background: transparent !important;
      font-size: 16px;
      line-height: 1.75;
      letter-spacing: -0.004em;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] > :first-child {
      margin-top: 0 !important;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] > :last-child {
      margin-bottom: 0 !important;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] p {
      margin-top: 0.72em;
      margin-bottom: 0.72em;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] h1,
    html.${ROOT_CLASS} [data-element-id="ai-response"] h2,
    html.${ROOT_CLASS} [data-element-id="ai-response"] h3,
    html.${ROOT_CLASS} [data-element-id="ai-response"] h4 {
      color: var(--kimi-text) !important;
      font-weight: 650 !important;
      line-height: 1.35;
      letter-spacing: -0.022em;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] h1 { font-size: 1.65em; }
    html.${ROOT_CLASS} [data-element-id="ai-response"] h2 { font-size: 1.38em; }
    html.${ROOT_CLASS} [data-element-id="ai-response"] h3 { font-size: 1.17em; }

    html.${ROOT_CLASS} [data-element-id="ai-response"] strong {
      color: var(--kimi-text) !important;
      font-weight: 650;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] a {
      color: var(--kimi-accent) !important;
      text-decoration: none;
      border-bottom: 1px solid color-mix(in srgb, var(--kimi-accent) 32%, transparent);
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] a:hover {
      border-bottom-color: var(--kimi-accent);
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] li::marker {
      color: var(--kimi-faint);
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] blockquote {
      color: var(--kimi-muted) !important;
      background: var(--kimi-soft);
      border-left: 2px solid var(--kimi-border-strong) !important;
      border-radius: 0 10px 10px 0;
      padding: 9px 14px;
      font-style: normal;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] :not(pre) > code {
      color: var(--kimi-text) !important;
      background: var(--kimi-soft) !important;
      border: 1px solid var(--kimi-border);
      border-radius: 6px;
      padding: 0.12em 0.36em;
      font-size: 0.88em;
      font-weight: 450;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] :not(pre) > code::before,
    html.${ROOT_CLASS} [data-element-id="ai-response"] :not(pre) > code::after {
      content: none !important;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] pre {
      color: var(--kimi-text) !important;
      background: var(--kimi-code) !important;
      border: 1px solid var(--kimi-border);
      border-radius: 14px;
      box-shadow: none;
      line-height: 1.65;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] pre code {
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      font-size: 0.88em;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] table {
      overflow: hidden;
      border: 1px solid var(--kimi-border);
      border-collapse: separate !important;
      border-spacing: 0;
      border-radius: 12px;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] th {
      color: var(--kimi-text) !important;
      background: var(--kimi-soft) !important;
      font-weight: 600;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] th,
    html.${ROOT_CLASS} [data-element-id="ai-response"] td {
      border-color: var(--kimi-border) !important;
      padding: 9px 12px;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] img {
      border-radius: 14px;
    }

    html.${ROOT_CLASS} [data-element-id="ai-response"] hr {
      border-color: var(--kimi-border) !important;
    }

    /* Thinking, search, citations and response actions */
    html.${ROOT_CLASS} [data-element-id="thinking-block"],
    html.${ROOT_CLASS} [data-element-id="websearch-calls-block"],
    html.${ROOT_CLASS} [data-element-id="citations-block"] {
      color: var(--kimi-muted);
      border-color: var(--kimi-border) !important;
    }

    html.${ROOT_CLASS} [data-element-id="thinking-block"] {
      background: var(--kimi-soft);
      border: 1px solid var(--kimi-border);
      border-radius: 12px;
    }

    html.${ROOT_CLASS} [data-element-id="additional-actions-of-response-container"] {
      color: var(--kimi-muted);
      background: var(--kimi-surface);
      border: 1px solid var(--kimi-border);
      border-radius: 11px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.035);
    }

    html.${ROOT_CLASS} [data-element-id="copy-message-button"],
    html.${ROOT_CLASS} [data-element-id="edit-message-button"],
    html.${ROOT_CLASS} [data-element-id="regenerate-button"],
    html.${ROOT_CLASS} [data-element-id="more-actions-menu-button"],
    html.${ROOT_CLASS} [data-element-id="fork-chat-button"] {
      color: var(--kimi-muted) !important;
      border-radius: 8px !important;
    }

    html.${ROOT_CLASS} [data-element-id="copy-message-button"]:hover,
    html.${ROOT_CLASS} [data-element-id="edit-message-button"]:hover,
    html.${ROOT_CLASS} [data-element-id="regenerate-button"]:hover,
    html.${ROOT_CLASS} [data-element-id="more-actions-menu-button"]:hover,
    html.${ROOT_CLASS} [data-element-id="fork-chat-button"]:hover {
      color: var(--kimi-text) !important;
      background: var(--kimi-hover) !important;
    }

    /* Floating rounded composer */
    html.${ROOT_CLASS} [data-element-id="chat-space-end-part"] {
      padding-bottom: 18px;
    }

    html.${ROOT_CLASS} [data-element-id="chat-input-textbox-container"] {
      color: var(--kimi-text);
      background: var(--kimi-surface) !important;
      border: 1px solid var(--kimi-border) !important;
      border-radius: 22px !important;
      box-shadow: var(--kimi-shadow) !important;
      transition: border-color 160ms ease, box-shadow 160ms ease;
    }

    html.${ROOT_CLASS} [data-element-id="chat-input-textbox-container"]:focus-within {
      border-color: var(--kimi-border-strong) !important;
      box-shadow: 0 6px 26px rgba(28, 28, 26, 0.09) !important;
    }

    html.dark.${ROOT_CLASS} [data-element-id="chat-input-textbox-container"]:focus-within {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.34) !important;
    }

    html.${ROOT_CLASS} [data-element-id="chat-input-textbox"] {
      min-height: 50px !important;
      padding: 15px 17px 7px !important;
      color: var(--kimi-text) !important;
      background: transparent !important;
      font-size: 16px !important;
      line-height: 1.55 !important;
      caret-color: var(--kimi-text);
    }

    html.${ROOT_CLASS} [data-element-id="chat-input-textbox"]::placeholder {
      color: var(--kimi-faint) !important;
      opacity: 1;
    }

    html.${ROOT_CLASS} [data-element-id="chat-input-actions"] {
      padding: 5px 9px 9px !important;
    }

    html.${ROOT_CLASS} [data-element-id="chat-input-actions"] button,
    html.${ROOT_CLASS} [data-element-id="model-setting-button"],
    html.${ROOT_CLASS} [data-element-id="output-settings-button"] {
      color: var(--kimi-muted) !important;
      border-radius: 10px !important;
    }

    html.${ROOT_CLASS} [data-element-id="chat-input-actions"] button:hover,
    html.${ROOT_CLASS} [data-element-id="model-setting-button"]:hover,
    html.${ROOT_CLASS} [data-element-id="output-settings-button"]:hover {
      color: var(--kimi-text) !important;
      background: var(--kimi-hover) !important;
    }

    html.${ROOT_CLASS} [data-element-id="send-button"] {
      width: 36px !important;
      height: 36px !important;
      min-width: 36px !important;
      padding: 0 !important;
      color: var(--kimi-bg) !important;
      background: var(--kimi-text) !important;
      border: 0 !important;
      border-radius: 50% !important;
      box-shadow: none !important;
    }

    html.${ROOT_CLASS} [data-element-id="send-button"] * {
      color: var(--kimi-bg) !important;
    }

    html.${ROOT_CLASS} [data-element-id="send-button"]:hover {
      color: var(--kimi-bg) !important;
      background: var(--kimi-text) !important;
      opacity: 0.84;
    }

    html.${ROOT_CLASS} [data-element-id="send-button"]:disabled {
      color: var(--kimi-muted) !important;
      background: var(--kimi-hover) !important;
      opacity: 1;
    }

    /* Menus and dialogs used by chat controls */
    html.${ROOT_CLASS} [data-element-id="pop-up-modal"],
    html.${ROOT_CLASS} [data-element-id="model-select-options"],
    html.${ROOT_CLASS} [data-element-id="agent-select-options"] {
      color: var(--kimi-text);
      background: var(--kimi-surface) !important;
      border: 1px solid var(--kimi-border) !important;
      border-radius: 16px !important;
      box-shadow: var(--kimi-shadow) !important;
    }

    html.${ROOT_CLASS} [data-element-id="model-select-button"],
    html.${ROOT_CLASS} [data-element-id="agent-select-button"] {
      border-radius: 10px !important;
    }

    html.${ROOT_CLASS} :focus-visible {
      outline: 2px solid color-mix(in srgb, var(--kimi-accent) 70%, transparent) !important;
      outline-offset: 2px;
    }

    @media (max-width: 767px) {
      html.${ROOT_CLASS} [data-element-id="response-block"] {
        padding-top: 16px !important;
        padding-bottom: 16px !important;
      }

      html.${ROOT_CLASS} [data-element-id="ai-response"] {
        font-size: 15.5px;
        line-height: 1.7;
      }

      html.${ROOT_CLASS} [data-element-id="user-message"] {
        max-width: 88% !important;
      }

      html.${ROOT_CLASS} [data-element-id="chat-space-end-part"] {
        padding-bottom: 8px;
      }

      html.${ROOT_CLASS} [data-element-id="chat-input-textbox-container"] {
        border-radius: 19px !important;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      html.${ROOT_CLASS} *,
      html.${ROOT_CLASS} *::before,
      html.${ROOT_CLASS} *::after {
        scroll-behavior: auto !important;
        transition-duration: 0.01ms !important;
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
      }
    }
  `;

  function enable() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      style.type = "text/css";
      style.textContent = css;
      (document.head || document.documentElement).appendChild(style);
    }
    document.documentElement.classList.add(ROOT_CLASS);
    return true;
  }

  function disable() {
    document.documentElement.classList.remove(ROOT_CLASS);
    return false;
  }

  function toggle() {
    return document.documentElement.classList.contains(ROOT_CLASS)
      ? disable()
      : enable();
  }

  const api = Object.freeze({
    version: VERSION,
    enable,
    disable,
    toggle,
    isEnabled: () => document.documentElement.classList.contains(ROOT_CLASS)
  });

  Object.defineProperty(window, "TypingMindKimiTheme", {
    value: api,
    configurable: true
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.altKey && event.code === "KeyK") {
      event.preventDefault();
      toggle();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enable, { once: true });
  } else {
    enable();
  }
})();
