import getSession from "@/app/action/getSession"
import prisma from "@/app/lib/prismadb"

const getCurrentUser = async () => {
  try {
    const session = await getSession()
    if (!session?.user?.email) {
      return null
    }
    const currentUser = prisma.user.findUnique({
      where: {
        email: session?.user?.email
      }
    })
    if (!currentUser) {
      return null
    }
    return currentUser
  } catch {
    return null
  }
}

export default getCurrentUser