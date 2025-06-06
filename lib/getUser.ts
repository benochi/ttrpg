import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/dbConnect";
import UserModel, { IUser } from "@/models/User";

export async function getAuthenticatedUser(): Promise<IUser | null> {
  await dbConnect();
  const { userId } = await auth();

  if (!userId) return null;

  const user = await UserModel.findOne({ clerkId: userId });
  return user;
}

export async function requireAdmin(): Promise<IUser> {
  const user = await getAuthenticatedUser();
  if (!user || user.role !== "admin") {
    throw new Error("Forbidden");
  }
  return user;
}
