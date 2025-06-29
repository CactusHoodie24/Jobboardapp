"use client"

import { useActionState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { saveUser } from './updateUser';
import { signIn } from "next-auth/react"; 

const initialState = {
  message: '',
  error: ''
};

const Profile = () => {
  const [state, formAction, pending] = useActionState(saveUser, initialState);
  const { data: session } = useSession();
  

 useEffect(() => {
  if (state.message) {
    toast(state.message, {
      description: "Profile updated",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo clicked"),
      },
    });

    // 🔄 Refresh session silently so updated name/email appears
    signIn("credentials", {
      redirect: false,
      email: session?.user?.email, // required to re-auth
      password: session?.user?.name || "", // ⚠️ only if you're storing it
    });
  }
}, [state.message]);

  return (
    <div>
      <form action={formAction}>
        <Input
          type='text'
          name='name'
          defaultValue={session?.user?.name ?? ''}
        />
        <Input
          type='text'
          name='email'
          defaultValue={session?.user?.email ?? ''}
        />
        <Button type='submit' disabled={pending}>
          {pending ? 'submitting' : 'update'}
        </Button>
      </form>
      {state.error && <h2>{state.error}</h2>}
    </div>
  );
};

export default Profile;
