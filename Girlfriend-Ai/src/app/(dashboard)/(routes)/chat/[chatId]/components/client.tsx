"use client";

import { Companion, Message } from "@prisma/client/edge";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCompletion } from "ai/react";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatForm } from "@/components/chat/chat-form";
import Image from "next/image";
import axios from "axios";
import ImageLoader from "@/components/Image/ImageLoader";
import { formatTime } from "@/lib/formatTime";
import { useAuth } from "@clerk/nextjs";
import { useSubscription } from "@/lib/subscription";
import { getWalletInfo } from "@/lib/tokens";

interface ChatListItem {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage?: string; // Optional key
  time: string;
}

interface ChatClientProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
  chatList: ChatListItem[];
}

export const ChatClient = ({ companion, chatList }: ChatClientProps) => {
  const router = useRouter();
  const { isSignedIn, userId } = useAuth();
  const isSubscribed = useSubscription();
  const [trialMessages, setTrialMessages] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [selectedCharacterId, setSelectedCharacterId] = useState(companion.id);
  const [messages, setMessages] = useState<any[]>(companion.messages);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [chatType, setChatType] = useState("Ask");
  const [isPolling, setIsPolling] = useState(false);
  const [imageUuid, setImageUuid] = useState<string | null>(null);
  if (!userId) {
    // redirect to sign in page
    router.push("/sign-in");
  }
  const handleChatOption = (val: string) => {
    setChatType(val);
  };

  const generateImage = async () => {
    try {
      const data = {
        positive_prompt: input,
        char_name: companion.name,
      };

      const response = await axios.post(`/api/generate_consistent_character/${selectedCharacterId}`, data);

      const systemMessage = {
        role: "system",
        content: <ImageLoader d={response.data} height={350} width={150} />,
      };
      setMessages((current) => [...current, systemMessage]);
      // make a request to the server to save the image
      const saveMessage = await axios.post("/api/saveMessage", {companion, image_data: response.data.image_data, userId});
      return response.data;
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const pollForImage = (uuid: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`/api/poll-image?uuid=${uuid}`);
        if (response.status === 200) {
          // Image has been generated, save it 
          const systemMessage = {
            role: "system",
            content: <ImageLoader d={response.data.image_data} height={350} width={150} />,
          };
          setMessages((current) => [...current, systemMessage]);

          resolve(response.data.image_data);
        } else if (response.status === 202) {
          // Image is still being generated, continue polling
          setTimeout(() => resolve(pollForImage(uuid)), 1000);
        } else {
          reject("Error polling for image: " + response.data.error);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleImageGeneration = async (prompt: any) => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    // if (!isSubscribed) {
    //   router.push("/subscriptions");
    //   return;
    // }

    if (tokenBalance <= -10000) {
      router.push("/tokens");
      return;
    }

    // Deduct a token
    setTokenBalance(prev => prev - 1);
    // You might want to update this on the server as well
    // await axios.post('/api/subtracttokens', { amount: 1 });

    const imageResponse = await axios.get(companion.baseImageOne, {
      responseType: "arraybuffer",
    });
    let fileImage;
    setImageUuid(null);
    if (prompt && companion) {
      const result = {
        positive_prompt: prompt,
        char_name: companion.name,
        charId: companion.id,
        companion: companion,
        imageResponse: imageResponse.data
      };

      try {
        const response = await axios.post('/api/generate_consistent_character', result);
        setImageUuid(response.data.image_uuid);
        pollForImage(response.data.image_uuid);
      } catch (error) {
        console.error("Error generating images:", error);
      }
    }
  };

  
  

  const { input, isLoading, handleInputChange, handleSubmit, setInput } = useCompletion({
    api: `/api/chat/${companion.id}`,
    onFinish(_prompt, completion) {
      try {
        const responseObj = JSON.parse(completion);
        if (responseObj.prompt) {
          const imageMessage = {
            role: "system",
            content: responseObj.message,
            isImage: true,
          };
          setMessages((current) => [...current, imageMessage]);
          handleImageGeneration(responseObj.prompt);
        } else {
          const systemMessage = {
            role: "assistant",
            content: completion,
          };
          setMessages((current) => [...current, systemMessage]);
        }
      } catch (error) {
        // Not a JSON object, proceed as a regular message
        const systemMessage = {
          role: "system",
          content: completion,
        };
        setMessages((current) => [...current, systemMessage]);
      }
      setInput("");
    },
    onError(e) {
      console.log("error", e);
    },
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (!isSubscribed && trialMessages <= -1) {
      router.push("/subscriptions");
      return;
    }

    // Deduct a trial message if not subscribed
    if (!isSubscribed) {
      setTrialMessages(prev => prev - 0);
      // You might want to update this on the server as well
    }

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((current) => [...current, userMessage]);

    // if (/send me|show me|send|can i see/i.test(input)) {
    //   generateImage();
    // } else {
    handleSubmit(e);
    // }
  };

  // Filter chatList to only include chats with a lastMessage key
  const filteredChatList = chatList.filter(chat => chat.lastMessage !== undefined);

  return (
    <div className="flex gap-1">
      {/* Sidebar for chat list */}
      <div
        className={`w-1/4 p-4 rounded-[20px] bg-[#171717] ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
        data-main-target="chatListContainer"
      >
        <div className="flex justify-between items-center w-full">
          <div className="text-white flex text-md font-bold leading-[34px] my-3 relative">
            Chat
          </div>
        </div>
        <div id="all_conversations">
          {filteredChatList?.map((chat) => (
            <a
              key={chat.id}
              onClick={() => {
                setSelectedCharacterId(chat.id);
                router.push(`/chat/${chat.id.replace(/\s+/g, "-").toLowerCase()}`);
              }}
              className="w-full mt-2 px-[6px] bg-[#303030] border border-zinc-600 rounded-[10px] justify-start items-start gap-4 inline-flex"
            >
              <div className="w-full relative h-[59px] rounded-[10px] justify-start items-center gap-3 inline-flex">
                <div className="w-1/5 h-10 justify-start items-center flex">
                  <Image
                    src={chat.avatarUrl}
                    className="object-cover object-top rounded-full h-12 w-12"
                    alt={chat.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-col w-3/5 justify-start items-start gap-0.5 inline-flex">
                  <div className="justify-between w-[100%] items-center gap-1 inline-flex">
                    <div className="text-white text-sm font-medium leading-normal">
                      {chat.name}
                    </div>
                  </div>
                  <div className="w-full opacity-75 text-white text-xs break-words truncate font-normal">
                    {chat.lastMessage}
                  </div>
                </div>
                <div className="flex-col w-1/5 justify-end gap-2 flex">
                  <div className="opacity-75 text-white text-xs font-light flex justify-end">
                    {formatTime(chat?.time)}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex flex-col w-full bg-popover md:h-fit rounded-3xl p-3 md:p-6 mb-6 mt-1 md:mt-0">
        <div className="flex flex-col h-[88dvh] md:h-[84.5dvh] space-y-2 md:space-y-0">
          <ChatHeader companion={companion} />
          <ChatMessages
            companion={companion}
            isLoading={isLoading}
            messages={messages}
          />
          <ChatForm
            isLoading={isLoading}
            input={input}
            chatType={chatType}
            handleChatOption={handleChatOption}
            handleInputChange={handleInputChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};
