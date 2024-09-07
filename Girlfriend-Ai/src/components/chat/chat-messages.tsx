
"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { Companion } from "@prisma/client/edge";
import { ChatMessage, ChatMessageProps } from "./chat-message";
import { animateScroll } from "react-scroll";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
}

export const ChatMessages = ({
  messages = [],
  isLoading,
  companion,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: "chatContainer",
      duration: 300,
      delay: 0,
      smooth: "easeInOutQuad",
    });
  }, [messages.length, isLoading]);

  return (
    <div
      id="chatContainer"
      className="flex-1 overflow-y-auto pr-4 pl-4 pt-4 pb-4"
    >
      <ChatMessage
        isLoading={fakeLoading}
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      {messages.map((message, index) => (
        <div key={index} ref={scrollRef}>
          <ChatMessage
            src={companion.src}
            content={message.content}
            role={message.role}
          />
        </div>
      ))}
      {isLoading && <ChatMessage src={companion.src} role="system" isLoading />}
    </div>
  );
};