import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChatClient } from "./[chatId]/components/client";
interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}
const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const { userId } = auth();
  let chatList;

if (userId) {
 const chatListCall = await prismadb.companion.findMany({
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId: userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  // modify the chatList to include the last message and time
 chatList = chatListCall.map((chat) => {
    // I need to get the avatarUrl from somewhere
    const lastMessage = chat.messages[chat.messages.length - 1];
    return {
      id: chat.id,
      name: chat.name,
      avatarUrl: chat.src,
      lastMessage: lastMessage?.content,
      time: lastMessage?.createdAt,
    };
  });

} else {
   chatList = [
    {
      id: "01a7f592-44fc-4c9e-ae0d-3beccd7dd386",
      name: "Sofia",
      avatarUrl: "https://i.ibb.co/vjyZ4mm/Sofia.png",
      lastMessage: "Can't wait to see you!",
      time: "10:30 AM",
    },
    {
      id: "29e455c1-5018-49d0-99ad-03acfe4d0a34",
      name: "Navya",
      avatarUrl: "https://i.ibb.co/YbnjbZd/Navya.png",
      lastMessage: "Are you free tomorrow?",
      time: "Yesterday",
    },
    {
      id: "4f4f93ce-3e97-4ecd-8d7b-1970d4b19ee1",
      name: "Elise",
      avatarUrl: "https://i.ibb.co/jWWbyYZ/Elise.png",
      lastMessage: "Let's catch up later!",
      time: "2 days ago",
    },
    {
      id: "638f4c6a-6141-407c-9d58-a52778be55e6",
      name: "Maya",
      avatarUrl: "https://i.ibb.co/R2XtxsL/Maya.png",
      lastMessage: "I miss our talks!",
      time: "5 minutes ago",
    },
    {
      id: "68e687f4-c0dc-4af5-b9b7-68bacae7aebb",
      name: "Layla",
      avatarUrl: "https://i.ibb.co/BfVjRHY/Layla.png",
      lastMessage: "What are you up to?",
      time: "3 hours ago",
    },
  ];}

  if (!userId) {
    // return redirectToSignIn();
    redirect('/sign-in')
  }
  let companion;
  if (userId) {
    companion = await prismadb.companion.findUnique({
      where: {
        id: params.chatId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          where: {
            userId: userId,
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });
  } else {
    companion = await prismadb.companion.findUnique({
      where: {
        id: params.chatId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          where: {
            userId: "11111111-1111-1111-1111-111111111111"
        },
      },
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });

  }
  if (!companion) {
    return redirect("/");
  }
  const formattedChatList = chatList.map((chat) => ({
    ...chat,
    time: chat.time.toString(),
  }));
  return <ChatClient companion={companion} chatList={formattedChatList} />;
};
export default ChatIdPage;