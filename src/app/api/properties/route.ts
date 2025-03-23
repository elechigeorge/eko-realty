import { NextResponse } from "next/server";
import { getAllProperties, createProperty } from "@/lib/controllers/property_controller";
import jwt from "jsonwebtoken";

// @GET Get all properties
export async function GET(req: Request) {
  try {
    // Extract search parameters
    const { searchParams } = new URL(req.url);
    const filters: any = {};

    // Build filter conditions dynamically
    if (searchParams.get("type")) filters.purpose = searchParams.get("type");
    if (searchParams.get("location")) filters.state = searchParams.get("location");
    if (searchParams.get("propertyType") && searchParams.get("propertyType") !== "Any Type") {
      filters.propertyType = searchParams.get("propertyType");
    }
    
    const priceRange = searchParams.get("priceRange")?.split("-");
    if (priceRange && priceRange.length === 2) {
      filters.price = {
        gte: Number(priceRange[0]),
        lte: Number(priceRange[1]),
      };
    }

    if (searchParams.get("bedroom") && searchParams.get("bedroom") !== "Any Beds") {
      filters.bedroom = searchParams.get("bedroom");
    }

    console.log(filters)

    const properties = await getAllProperties(filters);
    return NextResponse.json(properties, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}


// @POST Create a new property listing
export async function POST(req: Request) {
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

    // 4. Pass the transformed data to the createProperty controller
    const property = await createProperty(data, user);

    return NextResponse.json(property, { status: 201 });
  } catch (error: any) {
    const errorMessage = error ? error.toString() : "Internal Server Error"; // Convert to string
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


