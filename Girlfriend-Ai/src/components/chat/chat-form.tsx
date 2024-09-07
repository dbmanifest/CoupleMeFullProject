"use client";

import { ChatRequestOptions } from "ai";
import { SendHorizonal } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatFormProps {
  input: string;
  chatType: string;
  handleChatOption: (val: string) => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  isLoading: boolean;
}

const options = [
  { value: "", label: "Ask", key: "ask" },
  { value: "Show me", label: "Show me...", key: "show_me" },
  { value: "Send me", label: "Send me...", key: "send_me" },
  { value: "Send", label: "Send", key: "send" },
  { value: "Can I See", label: "Can I See", key: "can_i_see" },
];

export const ChatForm = ({
  input,
  chatType,
  handleChatOption,
  handleInputChange,
  onSubmit,
  isLoading,
}: ChatFormProps) => {
  const [selectedOption, setSelectedOption] = useState("ask");

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption("ask"); // Reset to "ask" after selection

    if (value === "ask") {
      handleInputChange({
        target: { value: "" },
      } as ChangeEvent<HTMLInputElement>);
    } else {
      // Update input value with selected option
      handleInputChange({
        target: { value: value },
      } as ChangeEvent<HTMLInputElement>);
    }

    handleChatOption(value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-white/10 flex items-center space-x-4 px-0 md:px-0 py-0 pt-6 pb-2 md:pb-0"
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message"
        className="px-4 md:px-5 border-none bg-[#171717] text-white"
      />
      <select
        disabled={isLoading}
        value={selectedOption}
        onChange={handleSelectChange}
        className="bg-[#27272A] text-white border-none h-11 rounded-[15px] p-1"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div>
        <Button disabled={isLoading} size="icon" variant="send">
          <SendHorizonal color="white" className="w-6 h-6" />
        </Button>
      </div>
    </form>
  );
};
