import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import CreateGameTitleForm from "@/components/admin/CreateGameTitleForm";

export default async function AdminCreateGamePage() {
  await dbConnect();
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await UserModel.findOne({ clerkId: userId });
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Game Title</h1>
      <CreateGameTitleForm />
    </div>
  );
}
