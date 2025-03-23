import { NextResponse } from "next/server";
import { authenticateUser, getAllUsers } from "@/lib/controllers/user_controller";


export async function GET(req: Request) {
  try {
    const users = await getAllUsers();

    return NextResponse.json(users);
    
  } catch (error) {
    return NextResponse.json({
      error: error
    })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the request body
    const user = await authenticateUser(body.email, body.password); // Authenticate the user

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          token: user.token, // JWT Token
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
