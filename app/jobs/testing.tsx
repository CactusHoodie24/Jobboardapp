'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginSchema, LoginInput, signInSchema } from '@/lib/zod';
import React, { ChangeEvent, useState } from 'react';

export default function Testing() {
  const [form, setForm] = useState<LoginInput>({
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LoginInput, string>>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setForm(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = signInSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0] ?? '',
        email: fieldErrors.email?.[0] ?? '',
      });
    } else {
      setErrors({});
      console.log('✅ Valid form:', result.data);
      // Submit to API or perform action
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id='name'
        type='text'
        value={form.name}
        onChange={handleChange}
        placeholder='Name'
      />
      {errors.name && <p className='text-red-500'>{errors.name}</p>}

      <Input
        id='email'
        type='email'
        value={form.email}
        onChange={handleChange}
        placeholder='Email'
      />
      {errors.email && <p className='text-red-500'>{errors.email}</p>}

      <Button type='submit'>Submit</Button>
    </form>
  );
}
