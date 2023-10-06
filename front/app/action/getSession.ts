import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const useSession = async () => {
  return await getServerSession(authOptions)
}

export default useSession