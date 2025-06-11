'use server';
import { auth } from "@/auth"
import { prisma } from "@/prisma"


export async function saveUser(prevState: any, formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    const session = await auth();

     // ⚠️ Handle missing session
  if (!session || !session.user?.email) {
    return { error: "Unauthorized", message: "" };
  }

  // ⚠️ Handle missing input
   if (!name && !email) {
    return { error: "Please provide a name or an email to update.", message: "" };
  }

    try {
         const updateData: Record<string, string> = {};

             if (name) updateData.name = name;
    if (email) updateData.email = email;

        await prisma.user.update({
            where: {
                email: session?.user.email
        },
         data: updateData,
   })
    return {error: '', message: 'Updating was successful'}
    } catch (error) {
           console.error("Error updating user:", error); 
        return {error: '', message: 'There was an error updating'}
    }
}