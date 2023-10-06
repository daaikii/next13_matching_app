import prisma from "@/app/lib/prismadb"
import useSession from "./getSession"

type ListType = "all" | "follow" | "entry" | "author"


const getWorkListData = async (listType: ListType) => {
  try {
    const session = await useSession()

    if (!session?.user?.email) {
      return []
    }

    const workTypes = {
      all: async () => {
        const work = await prisma.work.findMany()
        if (!work) {
          return []
        }
        return work
      },

      follow: async () => {
        const work = await prisma.user.findUnique({
          where: {
            email: session?.user?.email!
          },
          select: {
            followWork: true
          }
        })
        if (!work) {
          return []
        }
        return work.followWork
      },

      entry: async () => {
        const userData = await prisma.user.findUnique({
          where: {
            email: session?.user?.email!
          },
          select: {
            entryWork: true
          }
        })
        if (!userData) {
          return []
        }
        return userData.entryWork
      },

      author: async () => {
        const authorWork = await prisma.user.findUnique({
          where: {
            email: session.user?.email!
          },
          select: {
            work: true
          }
        })
        if (!authorWork) {
          return []
        }
        return authorWork.work
      }
    }
    const workListFunc = workTypes[`${listType}`]
    const workListData = await workListFunc()
    return workListData
  } catch {
    return []
  }
}

export default getWorkListData