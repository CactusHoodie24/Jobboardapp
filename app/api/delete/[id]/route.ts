import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { companyId } = await req.json();

    await prisma.company.delete({
      where: { id: Number(companyId) }, // Ensure it's a number
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
