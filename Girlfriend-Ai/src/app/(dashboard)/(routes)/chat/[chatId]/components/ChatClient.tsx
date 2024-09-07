import React from "react";
import Image from "next/image";

interface ChatClientProps {
  companion: any;
  chatList: any[];
}

const ChatClient = ({ companion, chatList }: ChatClientProps) => {
  return (
    <div>
      {companion.messages.map((message: any, index: number) => (
        <div key={index} className={`message ${message.role}`}>
          {isBase64Image(message.content) ? (
            <Image
              src={`data:image/png;base64,${message.content}`}
              alt="Generated Image"
              width={200}
              height={200}
            />
          ) : (
            <p>{message.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

const isBase64Image = (str: string) => {
  const base64Pattern = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/;
  return base64Pattern.test(str);
};

export default ChatClient;