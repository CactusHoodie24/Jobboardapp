'use server'

import { signInSchema } from "@/lib/zod"
import { errorToJSON } from "next/dist/server/render"

export async function SavePost(prevSate: any, formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    try {
        const result = signInSchema.safeParse({name, email})
        if(!result.success) {
            const fielderrors = result.error.flatten().fieldErrors
            return {
                errors: {
                    name: fielderrors.name?.[0] ?? '',
                    email: fielderrors.email?.[0] ?? ''
                }
            }
        } else {
            return {
                errors: {
                    name: '',
                    email: ''
                }
            }
        }
    } catch (error) {
        
    }

     
}