import { NextResponse } from "next/server";
import { getPropertyBySlug, updateProperty, deleteProperty } from "@/lib/controllers/property_controller";

// GET handler: Fetch a property by ID
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
  }

  try {
    const property = await getPropertyBySlug(slug);

    console.log(property)
    
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(property, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

// PUT handler: Update a property by ID
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
  }

  try {
    const body = await req.json(); // Parse the request body
    const updatedProperty = await updateProperty(slug, body);
    return NextResponse.json(updatedProperty, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

// DELETE handler: Delete a property by ID
export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
  }

  try {
    await deleteProperty(slug);
    return new Response(null, { status: 204 }); // 204 No Content
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
