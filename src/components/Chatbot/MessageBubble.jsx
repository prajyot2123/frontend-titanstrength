import React from "react";

const MessageBubble = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div className={`chatbot-message ${isUser ? "user" : "assistant"}`}>
      <div className="chatbot-message-bubble">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
