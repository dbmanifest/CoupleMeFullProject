import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {companion, image_data, userId} = await req.json();
    await prismadb.companion.update({
        where: {
        id: companion.id,
        },
        data: {
        messages: {
            create: {
            content: image_data,
            role: "system",
            userId: userId || "1",
            isImage: true,
            },
        },
        },
    });
}