import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GameModel from "@/models/Game";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const gameId = params.id;

    const game = await GameModel.findById(gameId)
      .populate("gameTitle")
      .lean();

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (err) {
    console.error("[GET_GAME_BY_ID_ERROR]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
