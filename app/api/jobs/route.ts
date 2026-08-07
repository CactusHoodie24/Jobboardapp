import { getJobs } from "@/lib/getJobs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
      const jobs = await getJobs()
      return NextResponse.json(jobs)
    } catch(error) {
      return NextResponse.json({status: 500})
    }
}