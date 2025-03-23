import prisma from "../prisma";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dkx8fx96z",
  api_key: "534458888867368",
  api_secret: "lsAal6Nk8oM9UBEHcXu56_IWNcU",
});

/**
 * Get user profile by userId
 */
export const getProfile = async (userId: string) => {

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    return profile || null;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile");
  }
};

/**
 * Create or update a user's profile
 */
export const createOrEditProfile = async (userId: string, profileData: any) => {


  // Image Validation
  if (profileData.avatar.length === 0) {
    throw new Error(`Kindly upload property Image`)
  };

  // Process Single Image with Cloudinary
  if (profileData.avatar) {
    try {
      // Convert File to base64
      const buffer = await profileData.avatar.arrayBuffer();
      const base64String = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${profileData.avatar.type};base64,${base64String}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "ekorealty_profile",
        resource_type: "auto",
      });

      profileData.avatar = result.secure_url; // Store Cloudinary URL
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Failed to upload image.");
    }
  }


  try {
    const existingProfile = await prisma.profile.findUnique({ where: { userId } });

    if (existingProfile) {
      // Update existing profile
      return await prisma.profile.update({
        where: { userId },
        data: profileData,
      });

    } else {
      // Create new profile
      return await prisma.profile.create({
        data: { userId, ...profileData },
      });
    }
  } catch (error) {
    console.error("Error saving profile:", error);
    throw new Error("Failed to save profile");
  }
};
