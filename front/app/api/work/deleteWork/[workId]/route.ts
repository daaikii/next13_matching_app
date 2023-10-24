import { NextResponse } from "next/server"

import prisma from "@/app/lib/prismadb"

interface IParams {
  workId: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    await prisma.work.delete({
      where: {
        id: params.workId,
      },
      include: {
        followUsers: true,
        entryUsers: true,
        author: true
      }
    });
    return NextResponse.json({}, { status: 200 })
  } catch {
    return new NextResponse("Error", { status: 500 })
  }
}
