import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || "secretrly"

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      properties: true,
    },
  });
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      properties: true,
    },
  });
};

export async function createUser(data: { username: string; email: string; password: string; }) {
  try {

    console.log(data)

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Email is already in use."); // Throw a specific error for duplicate email
    };

    console.log(existingUser)

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.username,
        password: hashedPassword,
      },
    });

    console.log(newUser)
    return {
      success: true,
      message: "User registered successfully.",
    };
  } catch (error: any) {
    if (error.message === "Email is already in use.") {
      throw {
        status: 409, // Conflict
        message: error.message,
      };
    }

    // Handle other unexpected errors
    throw {
      status: 500, // Internal Server Error
      message: "An error occurred while registering the user.",
      details: error.message,
    };
  }
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return null; // No user found

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null; // Invalid password

  // Generate a JWT token
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "5h",
  });

  return { ...user, token }; // Return user info and token
}

export const updateOrCreateProfile = async (id: string, data: any) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};
