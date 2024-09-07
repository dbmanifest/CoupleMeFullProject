"use client";

import { BeatLoader } from "react-spinners";
import { Copy, Volume2 } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BotAvatar } from "./bot-avatar";
import { UserAvatar } from "./user-avatar";
import { useEffect, useState } from "react";
import ImageGenerator from "../Image/ImageLoader";

export interface ChatMessageProps {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
}

export const ChatMessage = ({
  role,
  content,
  isLoading,
  src,
}: ChatMessageProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const msg = new SpeechSynthesisUtterance();
  const [isObject, setIsObject] = useState(false);

  const onCopy = () => {
    if (!content) {
      return;
    }

    // console.log("voices: ", window.speechSynthesis.getVoices());
    msg.voice =
      sessionStorage.getItem("gender") === "female"
        ? window.speechSynthesis.getVoices()[100]
        : window.speechSynthesis.getVoices()[101];
    msg.text = content;
    window.speechSynthesis.speak(msg);
  };

  function isJsonString(content: any) {
    try {
      const parsed = JSON.parse(content);
      return typeof parsed === "object" && parsed !== null;
    } catch (e) {
      return false;
    }
  }
  useEffect(() => {
    setIsObject(isJsonString(content));
  }, [content]);

  // console.log(isObject, "true");

  return (
    <div
      className={cn(
        "group flex items-center gap-x-3 py-4 w-full",
        role === "user" && "justify-end"
      )}
    >
      {role !== "user" && src && <BotAvatar src={src} />}
      <div className="rounded-xl px-4 md:px-4 py-3 md:py-4 max-w-sm text-[16px] md:text-[16px] font-normal text-primary-foreground bg-muted">
        {isLoading ? (
          <BeatLoader color={theme === "light" ? "black" : "white"} size={5} />
        ) : isObject ? (
          <ImageGenerator d={content} />
        ) : (
          content
        )}
      </div>
      {role === "user" && <UserAvatar />}
    </div>
  );
};