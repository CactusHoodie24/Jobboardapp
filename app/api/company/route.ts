import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res: Request) {
   const data = await prisma.company.findMany()
     return NextResponse.json(data, { status: 200 });
}