import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GameTitle from "@/models/GameTitle";
import { requireAdmin } from "@/lib/getUser";
import { querySchema, QueryParams } from "@/schemas/QuerySchema";

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

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    await requireAdmin();

    const parseResult = querySchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));
    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid query params", details: parseResult.error.flatten() }, { status: 400 });
    }

    const {
      page = "1",
      limit = "10",
      search,
      searchField,
      sort = "desc",
      fields,
      filter,
      startDate,
      endDate,
      status,
      includeCount = "false",
    } = parseResult.data;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOption: Record<string, 1 | -1> = { releaseDate: sort === "asc" ? 1 : -1 };
    const query: Record<string, any> = {};

    if (search && searchField) {
      query[searchField] = { $regex: search, $options: "i" };
    }

    if (filter) {
      const [key, value] = filter.split("=");
      if (key && value) query[key] = value;
    }

    if (status) {
      query.status = status;
    }

    if (startDate || endDate) {
      query.releaseDate = {};
      if (startDate) query.releaseDate.$gte = new Date(startDate);
      if (endDate) query.releaseDate.$lte = new Date(endDate);
    }

    const projection = fields
      ? fields.split(",").reduce((acc, field) => {
          acc[field.trim()] = 1;
          return acc;
        }, {} as Record<string, number>)
      : undefined;

    const queryBuilder = GameTitle.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    if (projection) {
      queryBuilder.select(projection);
    }

    const results = await queryBuilder.exec();

    if (includeCount === "true") {
      const total = await GameTitle.countDocuments(query);
      return NextResponse.json({ results, total });
    }

    return NextResponse.json(results);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
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
