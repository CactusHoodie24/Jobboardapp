import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google,
     Credentials({
     credentials: {
      email: {},
      password: {}
     } ,
     authorize: async (credentials) => {
       const email = credentials?.email?.toString().trim()
  const password = credentials?.password?.toString()

  console.log("Email:", email)
  console.log("Password:", password)

  if (!email || !password) {
    console.log("Missing credentials")
    return null
  }
      const user = await prisma.user.findUnique({
        where: {
          email: credentials?.email as string
        }
      })
      console.log("User found:", user) // 👈 Add this
       if(user?.password === credentials?.password){ 
        return user;
       }else{
        console.log('user was not found');
        return null
       }
     }
    })
  ],
   session: {
    strategy: "jwt", // Use JWT for sessions to avoid database calls on every request
  },
})