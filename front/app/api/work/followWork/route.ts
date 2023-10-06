import { NextResponse } from "next/server";

import prisma from "@/app/lib/prismadb"

export async function POST(req: Request) {
  const { workId, currentUserId } = await req.json()
  try {
    await prisma.work.update({
      where: {
        id: workId,
      },
      data: {
        followUsers: {
          connect: {
            id: currentUserId,
          },
        },
      },
    });
    return NextResponse.json({ status: "ok" }, { status: 200 })
  } catch {
    return new NextResponse("Error", { status: 500 })
  }
}
