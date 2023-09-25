import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";

const useSession= async()=>{
  return await getServerSession(authOption)
}

export default useSession