"use server";
import { createClient } from "@/auth/server";
import { handleError } from "@/lib/utils";
import { prisma } from "@/db/prisma";



export const loginAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signInWithPassword({ email, password });
    if (error) throw error;

    // Verify that the user is actually logged in after sign-in
    const userObject = await auth.getUser();
    if (!userObject || !userObject.data.user) {
      throw new Error("Failed to authenticate user");
    }

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
export const logOutAction = async () => {
  try {
    const { auth } = await createClient();

    const { error } = await auth.signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const signUpAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { data, error } = await auth.signUp({ email, password });
    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error("Failed to get user ID after signup");

    
    await prisma.user.create({
      data: {
        id: userId,
        email,
      },
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};