import type { NextApiRequest, NextApiResponse } from "next";
import { getAllUsers, createUser, getUserById } from "@/lib/controllers/user_controller";
import { NextResponse } from "next/server";


// @POST Register a new user
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the request body
    const user = await createUser(body);
    console.log(user)
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
};