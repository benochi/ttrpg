import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GameTitle from "@/models/GameTitle";
import { requireAdmin } from "@/lib/getUser";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    await requireAdmin();
    const body = await req.json();

    const game = new GameTitle({
      name: body.name,
      description: body.description,
      developer: body.developer,
      genre: body.genre,
      tags: body.tags,
      features: body.features,
      releaseDate: new Date(body.releaseDate),
      isFree: body.isFree,
      thumbnailUrl: body.thumbnailUrl,
      coverImageUrl: body.coverImageUrl
    });

    await game.save();
    return NextResponse.json({ message: "Game created successfully" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 403 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    await requireAdmin();
    const games = await GameTitle.find().sort({ releaseDate: -1 }).lean();
    return NextResponse.json(games);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 403 });
  }
}

export async function PATCH(req: NextRequest) {
  await dbConnect();
  try {
    await requireAdmin();
    const body = await req.json();

    const game = await GameTitle.findByIdAndUpdate(
      body.id,
      { $set: body },
      { new: true }
    );

    if (!game) return NextResponse.json({ error: "Game not found" }, { status: 404 });
    return NextResponse.json({ message: "Game updated", game });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 403 });
  }
}


export async function DELETE(req: NextRequest) {
  await dbConnect();
  try {
    await requireAdmin();
    const { id } = await req.json();

    const result = await GameTitle.findByIdAndDelete(id);
    if (!result) return NextResponse.json({ error: "Game not found" }, { status: 404 });

    return NextResponse.json({ message: "Game deleted successfully" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 403 });
  }
}
