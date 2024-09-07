"use client";

import { Companion, Message } from "@prisma/client/edge";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  Edit,
  MessagesSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { BotAvatar } from "./bot-avatar";

interface ChatHeaderProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export const ChatHeader = ({ companion }: ChatHeaderProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/companion/${companion.id}`);
      toast({
        description: "Success..",
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong..",
      });
    }
  };

  return (
    <div className="flex w-full pb-3 md:pb-6 justify-between items-center border-b border-white/10">
      <div className="flex gap-x-2 items-center">
        <Button onClick={() => router.back()} size="sq" variant="ghost2">
          <ChevronLeft color="white" className="h-6 w-6" />
        </Button>
        <BotAvatar src={companion.src} />
        <div className="flex flex-col gap-y-0.5 ml-2">
          <div className="flex items-center gap-x-2">
            <p className="font-medium font-dmSans text-[20px] !text-white">
              {companion.name}
            </p>
            {/* <div className="flex items-center text-[14px] font-dmSans font-light text-muted-foreground">
              <MessagesSquare className="w-4 h-4 mr-1" />
              {companion._count.messages}
            </div> */}
          </div>
          {/* <p className="text-[15px] font-dmSans font-light text-muted-foreground">
            Created by {companion.userName}
          </p> */}
        </div>
      </div>
      {user?.id === companion.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/companion/${companion.id}`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
