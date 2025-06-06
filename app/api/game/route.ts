import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GameModel from "@/models/Game";
import { getAuthenticatedUser } from "@/lib/getUser";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const requestedUserId = req.nextUrl.searchParams.get("userId");
    if (!requestedUserId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const isAdmin = user.role === "admin";
    const isOwner = user._id.toString() === requestedUserId;

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const games = await GameModel.find({ account: requestedUserId }).lean();
    return NextResponse.json(games);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
