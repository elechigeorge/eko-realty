
import { createOrEditProfile, getProfile } from "@/lib/controllers/profile_controller";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';


// GET handler: Fetch a property by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {

  const { id } = params;


  if (id == "") {
    return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
  };

  

  try {
    const userId = id;
    const profile = await getProfile(userId);

    return NextResponse.json(profile, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

// PUT handler: Update a user profile by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
  };

  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET!);

    // 1. Parse FormData (async because it involves reading the request stream)
    const formData = await req.formData();

    // 2. Convert FormData to a regular object
    const data: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      // Handle fields with multiple values (e.g., pictures[], features[], amenities[])
      if (key.endsWith("[]")) {
        const fieldName = key.slice(0, -2); // Remove the "[]" from the key
        if (!data[fieldName]) {
          data[fieldName] = [];
        }
        data[fieldName].push(value);
      } else {
        data[key] = value;
      }
    }

    console.log(data);
    const updatedProfile = await createOrEditProfile(id, data);
    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

// DELETE handler: Delete a property by ID
// export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
//   const { slug } = params;

//   if (!slug) {
//     return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
//   }

//   try {
//     await deleteProperty(slug);
//     return new Response(null, { status: 204 }); // 204 No Content
//   } catch (error: any) {
//     return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
//   }
// }
