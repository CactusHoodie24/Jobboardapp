
import { prisma } from "@/prisma";
import Apply from "./register"; 
import { auth } from "@/auth"

export default async function ApplyPage() {
   const session = await auth()

  if (!session?.user?.email) {
    return <div>Not authenticated</div>;
  }


  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return(
<Apply user={user} />
  ) 
}
