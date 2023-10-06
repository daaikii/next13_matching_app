import { NextResponse } from "next/server"

import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from "@/app/lib/prismadb"

export async function POST(req: Request) {
  const { imageURL, body, title } = await req.json()
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("user not found", { status: 500 });
    }
    await prisma.work.create({
      data: {
        imageURL: imageURL,
        title: title,
        body: body,
        matchState: false,
        author: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        author: true,
        followUsers: true,
        entryUsers: true
      },
    });
    return NextResponse.json({ imageURL, body, title }, { status: 200 })
  } catch {
    return new NextResponse("catch Error", { status: 500 })
  }
}
