import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // ✅ await req.json(), not req.json()
    const { email, phoneNumber, fullName, userId } = body;

    await prisma.applicant.create({
      data: {
        userId,
        email,
        phoneNumber,
        fullName,
      },
    });

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
