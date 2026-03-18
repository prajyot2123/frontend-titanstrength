import React from "react";

const ChatButton = ({ isOpen, onToggle }) => {
  return (
    <button
      type="button"
      className={`chatbot-button ${isOpen ? "open" : ""}`}
      onClick={onToggle}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      <span className="chatbot-button-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" role="img" focusable="false">
          <path
            d="M7.5 18.5h6l3.5 3.5v-3.5h.5a4 4 0 0 0 4-4V7.5a4 4 0 0 0-4-4h-11a4 4 0 0 0-4 4v7a4 4 0 0 0 4 4h1z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="11" r="1" fill="currentColor" />
          <circle cx="12" cy="11" r="1" fill="currentColor" />
          <circle cx="15" cy="11" r="1" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
};

export default ChatButton;
