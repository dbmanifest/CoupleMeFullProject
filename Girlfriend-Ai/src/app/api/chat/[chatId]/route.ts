// app/api/chat/route.ts
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { MemoryManager } from "@/lib/memory";
import prismadb from "@/lib/prismadb";
import { rateLimit } from "@/lib/rate-limits";
import axios from "axios";
import { NextRequest } from "next/server";

export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.GIRLFRIEND_AI_LLM_API_KEY,
  basePath: "https://digifab-fastapi-lilac.vercel.app/v1",
});

const openai = new OpenAIApi(configuration);

export async function POST(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const { prompt, isImage } = await request.json();
    const user = await currentUser();

    if (!user || !user.firstName || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const identifier = request.url + "-" + user.id;
    const success = true;

    if (!success) {
      return new NextResponse("Rate limit exceeded", { status: 429 });
    }

    const companion = await prismadb.companion.update({
      where: {
        id: params.chatId,
      },
      data: {
        messages: {
          create: {
            content: prompt,
            role: "user",
            userId: user.id,
            isImage: isImage || false,
          },
        },
      },
      select: {
        baseImageOne: true,
        baseImagePrompt: true,
        src: true,
        id: true,
        instructions: true,       
        seed: true,
      },
    });

    const messages = await prismadb.companion.findUnique({
      where: {
        id: params.chatId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc'
          }
        },

      }
    });

    if (!messages) {
      return new NextResponse("Messages not found", { status: 404 });
    }

    const messagesArray = messages.messages.map((message) => ({
      content: message.content,
      role: message.role,
    }));
    if (!companion) {
      return new NextResponse("Companion not found", { status: 404 });
    }

    const name = companion.id;
    const companionKey = {
      companionName: name!,
      userId: user.id,
      modelName: "llama2-13b",
    };
    const memoryManager = await MemoryManager.getInstance();

    const records = await memoryManager.readLatestHistory(companionKey);
    if (records.length === 0) {
      await memoryManager.seedChatHistory(companion.seed, "\n\n", companionKey);
    }
    await memoryManager.writeToHistory("User: " + prompt + "\n", companionKey);
    const recentChatHistory = await memoryManager.readLatestHistory(
      companionKey
    );
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: `${companion.instructions}` },
        { role: "system", content: companion.baseImageOne || "" },
        { role: "system", content: companion.baseImagePrompt || "" },
        ...messagesArray
      ],
      temperature: 0.7,
      stream: false,
    });
    const resp = await res.json();
    const new_message = resp.choices?.[0]?.message?.content || "";
    await memoryManager.writeToHistory("Character:" + new_message.trim() + "\n", companionKey);

    // Check if the response contains a UUID
    let isImageUUID = false;
    let imageBase64 = "";

    try {
      if (resp.uuid) {
        await prismadb.companion.update({
          where: {
            id: params.chatId,
          },
          data: {
            messages: {
              create: {
                content: new_message.trim(),
                role: "system",
                userId: user.id,
                isImage: true,
              },
            },
          },
        });

        isImageUUID = true;
        const imageResponse = await axios.get(`https://68xm3ymlwe5ep0-8000.proxy.runpod.net/getimage/${resp.uuid}`, {
          responseType: "arraybuffer",
        });
        imageBase64 = Buffer.from(imageResponse.data).toString('base64');
      }
    } catch (error) {
      // Not a JSON object, proceed as a regular message
    }

    if (isImageUUID) {
      await prismadb.companion.update({
        where: {
          id: params.chatId,
        },
        data: {
          messages: {
            create: {
              content: imageBase64,
              role: "system",
              userId: user.id,
              isImage: true,
            },
          },
        },
      });

      return new NextResponse(JSON.stringify({ uuid: resp.uuid }));
    } else {
      await prismadb.companion.update({
        where: {
          id: params.chatId,
        },
        data: {
          messages: {
            create: {
              content: new_message.trim(),
              role: "system",
              userId: user.id,
            },
          },
        },
      });
    }

    return new StreamingTextResponse(new_message);
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { chatId: string } }
) {
  try {
    const { uuid, imageData } = await request.json();
    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the message with the UUID and update it with the image data
    const updatedMessage = await prismadb.message.updateMany({
      where: {
        companionId: params.chatId,
        userId: user.id,
        content: uuid,
        isImage: true,
      },
      data: {
        content: imageData,
      },
    });

    if (updatedMessage.count === 0) {
      return new NextResponse("Message not found", { status: 404 });
    }

    return new NextResponse("Message updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating message:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}