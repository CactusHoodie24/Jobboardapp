import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
   const data = await prisma.company.findMany()
     return NextResponse.json(data, { status: 200 });
}