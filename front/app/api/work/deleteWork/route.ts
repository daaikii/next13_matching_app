import { NextResponse } from "next/server"

import prisma from "@/app/lib/prismadb"

export async function POST(req: Request) {
  const { id } = await req.json()
  try {
    await prisma.work.delete({
      where: {
        id: id,
      },
      include: {
        followUsers: true,
        entryUsers: true,
        author: true
      }
    });
    return NextResponse.json({ id }, { status: 200 })
  } catch {
    return new NextResponse("Error", { status: 500 })
  }
}
