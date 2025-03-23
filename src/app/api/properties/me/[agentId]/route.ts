import { getAgentProperties } from "@/lib/controllers/property_controller";
import { NextResponse } from "next/server";



// GET handler: Fetch a property by ID
export async function GET(req: Request, { params }: { params: { agentId: string } }) {
  const { agentId } = params;

  if (!agentId) {
    return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
  }

  try {
    const property = await getAgentProperties(agentId);

    console.log(property)
    
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(property, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}