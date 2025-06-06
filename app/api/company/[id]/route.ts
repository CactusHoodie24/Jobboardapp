import { prisma } from '@/prisma'
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
  const numericId = Number(id)
  if (isNaN(numericId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const body = await req.json();
  const { description, title } = body;
  try {
    const updatedJobListing = await prisma.jobListing.update({
      where: { id: numericId },
      data: { description, title },
    });
    console.log("Updating company with ID:", id);
console.log("New name:", description);
  console.log("Updated company:", updatedJobListing);
  return NextResponse.json(updatedJobListing, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
     
}