import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure you have a prisma instance properly set up
import { getSimilarProperties } from '@/lib/controllers/property_controller';

interface Params {
    id: string;
}

// Route handler
export async function GET(req: Request, { params }: { params: Params }) {
    try {
        const propertyId = params.id;

        if (!propertyId) {
            return NextResponse.json({ error: 'Invalid property ID' }, { status: 400 });
        }

        const similarProperties = await getSimilarProperties(propertyId);

        return NextResponse.json(similarProperties, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching similar properties' }, { status: 500 });
    }
}