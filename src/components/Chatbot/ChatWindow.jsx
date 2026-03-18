import React, { useEffect, useRef, useState } from "react";
import ChatButton from "./ChatButton";
import MessageBubble from "./MessageBubble";
import "./chatbot.css";
import Auth from "../../utils/auth";

const baseMessages = [
  {
    role: "assistant",
    content: "Hi! Ask me about workouts, recovery, or nutrition.",
  },
];

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(baseMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const suggestions = [
    "What did I do today?",
    "Suggest a quick workout",
    "How can I recover faster?",
  ];
  const isLoggedIn = Auth.loggedIn();
  const userId = isLoggedIn ? Auth.getUserId() : null;

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    if (!isLoggedIn || !userId) {
      setMessages(baseMessages);
      return;
    }
    const stored = localStorage.getItem(`chat_messages_${userId}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed.slice(-10));
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }
    setMessages(baseMessages);
  }, [isOpen, isLoggedIn, userId]);

  useEffect(() => {
    if (!isLoggedIn || !userId) {
      return;
    }
    localStorage.setItem(`chat_messages_${userId}`, JSON.stringify(messages.slice(-10)));
  }, [messages, isLoggedIn, userId]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) {
      return;
    }

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    const trimmedMessages = nextMessages.slice(-10);

    setMessages(trimmedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ messages: trimmedMessages }),
      });

      const data = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: data.message || "Sorry, I could not respond right now.",
      };

      setMessages((prev) => [...prev, assistantMessage].slice(-10));
    } catch (error) {
      setMessages((prev) =>
        [...prev, { role: "assistant", content: "Network error. Try again." }].slice(-10)
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestion = (text) => {
    if (isTyping) {
      return;
    }
    setInput(text);
  };

  return (
    <div className="chatbot-container">
      <ChatButton isOpen={isOpen} onToggle={handleToggle} />
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div>
              <p className="chatbot-title">Coach Bot</p>
              <span className="chatbot-subtitle">Fitness insights, fast</span>
            </div>
            <button
              type="button"
              className="chatbot-close"
              onClick={handleToggle}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <MessageBubble
                key={`${message.role}-${index}`}
                role={message.role}
                content={message.content}
              />
            ))}
            {isTyping && (
              <div className="chatbot-message assistant">
                <div className="chatbot-message-bubble typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-suggestions">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="chatbot-suggestion"
                onClick={() => handleSuggestion(suggestion)}
                disabled={isTyping}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ask about your next workout..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit" disabled={!input.trim() || isTyping}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
