// route.ts or application route handler
import { prisma } from "@/prisma"; // or wherever your prisma instance is
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jobId, userEmail } = body;

    if (!jobId || !userEmail) {
      return NextResponse.json({ error: "Missing jobId or userId" }, { status: 400 });
    }

    const user = await prisma.applicant.findUnique({
    where: { email: userEmail},
  });

  if (!user) {
    return NextResponse.json({message: 'User not found'}, {status: 401});
  }

    const application = await prisma.application.create({
      data: {
        jobId,
        applicantId: user.id // ✅ this must match an existing applicant in the DB
      },
    });

    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
