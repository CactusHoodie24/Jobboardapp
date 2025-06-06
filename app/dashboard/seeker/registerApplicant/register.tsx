'use client';

import { Input } from "@/components/ui/input";
import { ChangeEvent, useState, FormEvent } from "react";
import { Role } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/router";

interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

interface ApplyProps {
  user: User;
}

const Apply: React.FC<ApplyProps> = ({ user }) => {
  const [details, setDetails] = useState({
    fullName: '',
    email: user.email || '',
    phoneNumber: ''
  });
  const [isSubmitted, setIsSubmiited] = useState(false)
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const sendData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/application/apply', {
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({
          userId: user.id,
          fullName: details.fullName,
          email: details.email,
          phoneNumber: details.phoneNumber
        })
      })
      if(res.ok) {
      setIsSubmiited(true);
      } else {
        setIsSubmiited(false);
      }
      } catch (error) {
        console.error('There was an error posting to the database', error)
      }
      
    }
    sendData()
  }

  if(user) {
    return <Link href='/home'>Go back to the home page and Find your job you are already a registered applicant and can apply for any job</Link>
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="fullName"
        value={details.fullName}
        placeholder="Full Name"
        onChange={handleChange}
      />
      <Input
        type="email"
        name="email"
        value={details.email}
        placeholder="Email"
        onChange={handleChange}
      />
      <Input
        type="text"
        name="phoneNumber"
        value={details.phoneNumber}
        placeholder="Phone Number"
        onChange={handleChange}
      />
      <Button type="submit">Submit</Button>
    </form>
    {isSubmitted && <h2 className="text-amber-500">Have successfully Created your profile as an applicant</h2>}
    </>
  );
};

export default Apply;
