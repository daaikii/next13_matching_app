import prisma from "@/app/lib/prismadb"

const getSelectWork = async (id: string) => {
  try {
    const selectWork = await prisma.work.findFirst({
      where: {
        id: id
      },
      include: {
        followUsers: true,
        entryUsers: true
      }
    })

    if (!selectWork) {
      return null
    }

    return selectWork
  } catch {
    return null
  }
}

export default getSelectWork