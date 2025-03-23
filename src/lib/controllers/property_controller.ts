import { Prisma, PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dkx8fx96z",
  api_key: "534458888867368",
  api_secret: "lsAal6Nk8oM9UBEHcXu56_IWNcU",
});

export const createProperty = async (data: any, user: any) => {
  // Token/User Validation
  if (!user) {
    throw new Error("Unauthorized: User token is invalid or missing.");
  }

  // Validation
  const requiredFields = [
    "title",
    "purpose",
    "state",
    "locality",
    "address",
    "propertyType",
    "price",
    "pictures"
  ];
  
  for (const field of requiredFields) {
    if (!data[field] || data[field] == 'NaN') {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Image Validation
  if(data.pictures.length === 0) {
    throw new Error(`Kindly upload property Image`)
  };
  
  // Process Images with Cloudinary
  if (data.pictures && data.pictures.length > 0) {
    const uploadPromises = data.pictures.map(async (file: File) => {
      try {
        // Convert File to base64
        const buffer = await file.arrayBuffer();
        const base64String = Buffer.from(buffer).toString('base64');
        const dataURI = `data:${file.type};base64,${base64String}`;
        
        const result = await cloudinary.uploader.upload(dataURI, {
          resource_type: "auto",
        });
        
        return result.secure_url;
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw new Error("Failed to upload images.");
      }
    });
    
    // Wait for all uploads to complete
    data.pictures = await Promise.all(uploadPromises);
  }

  // Create Property in Database
  return await prisma.property.create({
    data: {
      ...data,
      active: false,
      views: 0,
      activeMessage: "This property has not been approved to be listed on the website.",
      acceptInstallment: data.acceptInstallment === 'false' ? false : true,
      slug: data.title.split(' ').join('-').toLowerCase(),
      listedBy: { connect: { id: user.id } },
    },
  });
};


export const getAllProperties = async (filters: any) => {
  const where: any = {};

  // Handling location search across state, locality, and address
  if (filters.location) {
    where.OR = [
      { state: { contains: filters.location, mode: "insensitive" } },
      { locality: { contains: filters.location, mode: "insensitive" } },
      { address: { contains: filters.location, mode: "insensitive" } },
    ];
  }

  // Handling property type
  if (filters.propertyType && filters.propertyType !== "Any Type") {
    where.propertyType = filters.propertyType;
  }

  // Handling price range (if provided in "min-max" format)
  if (filters.priceRange) {
    const priceRange = filters.priceRange.split("-");
    if (priceRange.length === 2) {
      where.price = {
        gte: Number(priceRange[0]),
        lte: Number(priceRange[1]),
      };
    }
  }

  // Handling number of bedrooms
  if (filters.bedroom && filters.bedroom !== "Any Beds") {
    where.bedroom = filters.bedroom;
  }


  return await prisma.property.findMany({
    where,
    include: {
      listedBy: {
        select: {
          id: true,
          name: true,
          email: true,
          profile: {
            select: {
              bio: true,
              avatar: true,
              phone: true,
              userType: true,
              company: true
              // Add other profile fields as needed
            },
          },
        },
      },
    },
  });
};


export const getAgentProperties = async (agentId: string) => {
  return await prisma.property.findMany({
    where: { userId: agentId }, // Filtering properties using userId
    include: {
      listedBy: {
        select: {
          id: true,
          name: true,
          email: true,
          profile: {
            select: {
              bio: true,
              avatar: true,
              phone: true,
              userType: true,
              company: true,
              // Add other profile fields as needed
            },
          },
        },
      },
    },
  });
};


export const getPropertyBySlug = async (slug: string) => {
  return await prisma.property.findUnique({
    where: { slug },
    include: {
      listedBy: {
        select: {
          id: true,
          name: true,
          email: true,
          profile: {
            select: {
              bio: true,
              avatar: true,
              phone: true,
              userType: true,
              company: true
              // Add other profile fields as needed
            },
          },
        },
      },
    },
  });
};


export const getSimilarProperties = async (propertyId: string) => {
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });
  
  if (!property) {
    return { error: "Property not found", status: 404 };
  }
  
  // Extract potential keywords from the property title
  const keywords = property.title
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 3); // Filter out short words
  
  const result = await prisma.property.findMany({
    where: {
      id: { not: propertyId }, // Exclude the current property
      OR: [
        // Match by same location (state AND locality)
        {
          state: property.state,
          locality: property.locality,
        },
        // Match by property type and purpose
        {
          propertyType: property.propertyType,
          purpose: property.purpose,
        },
        // Match by keywords in title
        ...keywords.map((keyword) => ({
          title: {
            contains: keyword,
            mode: Prisma.QueryMode.insensitive,
          },
        })),
      ],
    },
    take: 6, // Increased from 3 to 6 to get more results
    orderBy: {
      createdAt: 'desc', // Get the most recent similar properties
    },
  });
  
  return result;
}



export const updateProperty = async (id: string, data: any) => {
  return await prisma.property.update({
    where: { id },
    data,
  });
};

export const deleteProperty = async (id: string) => {
  return await prisma.property.delete({
    where: { id },
  });
};
