import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // ✅ await req.json(), not req.json()
    const { email, phonenumber, fullName, userId, image } = body;

    const user = await prisma.user.findUnique({
      where: {email: email}
    })

    if(!user) return

    await prisma.applicant.create({
      data: {
        userId: user?.id,
        email,
        phoneNumber: phonenumber,
        fullName,
        resumeUrl: image 
      },
    });

    await prisma.user.update({
      where: {id: user.id},
      data: {
        role: 'APPLICANT'
      }
    })

    return NextResponse.json(
      { message: "Successfully uploaded to the database" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving applicant:", error); // 🔍 helpful for debugging
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
