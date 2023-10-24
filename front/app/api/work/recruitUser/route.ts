import { NextResponse } from "next/server"

import prisma from "@/app/lib/prismadb"

export async function POST(req: Request) {
  const { workId, recruitUserId } = await req.json()
  try {
    await prisma.work.update({
      where: {
        id: workId,
      },
      data: {
        matchState: true,
        recruitmentUser: recruitUserId,
      },
    });
    return NextResponse.json({ status: "ok" })
  } catch {
    return new NextResponse("Error", { status: 500 })
  }
}

export default POST