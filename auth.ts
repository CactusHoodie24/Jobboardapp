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
  where: { email: credentials?.email as string },
});
        
        if(user?.password === credentials?.password){ 
          console.log("User from DB:", user?.role);
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
     callbacks: {
     async jwt({ token, user }) {
    if (user) {
      // Only store the role string in the token
      console.log("JWT user role:", user.role);

      token.role = user.role;
    }
    return token;
  },
  async session({ session, token }) {
    if (token && session.user) {
      // Only set the role string on the session
      console.log("Session token role:", token.role);
      session.user.role = token.role as string;
    }
    console.log("Session from auth():", session);
    return session;
  }
  },
  })

  // Helper function to get session (equivalent to getServerSession)
export async function getSession() {
  return await auth()
}

// Helper function to get current user
export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

// Helper function to check if user is authenticated
export async function isAuthenticated() {
  const session = await auth()
  return !!session?.user
}

// Helper function to check user role
export async function hasRole(requiredRole: string) {
  const session = await auth()
  return session?.user?.role === requiredRole
}