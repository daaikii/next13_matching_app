import type {NextAuthOptions} from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import prisma from "@/app/lib/prismadb"
import bcrypt from "bcrypt"
import nextAuth from "next-auth"

export const authOption: NextAuthOptions = {
  providers:[
    GitHubProvider({
      clientId:process.env.GITHUB_ID as string,
      clientSecret:process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId:process.env.GOOGLE_ID as string,
      clientSecret:process.env.GOOGLE_SECRET as string
    }),
    CredentialProvider({
      name:'credentials',
      credentials:{
        email:{label:'email',type:'text'},
        password:{label:'password',type:'password'}
      },
      async authorize(credentials){
        if(!credentials?.email||!credentials?.password){
          throw new Error("error")
        }
        const user = await prisma.user.findUnique({
          where:{
            email:credentials.email
          }
        })
        if(!user||!user.hashedPassword){
          throw new Error("error")
        }
        const isCorrect=await bcrypt.compare(credentials.password,user.hashedPassword)
        if(isCorrect){
          throw new Error("error")
        }
        return user
      }
    })
  ],  
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = nextAuth(authOption)

export {handler as GET,handler as POST} 