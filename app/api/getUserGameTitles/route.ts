import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GameTitle from "@/models/GameTitle";
import { querySchema } from "@/schemas/QuerySchema";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const parsed = querySchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
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
    } = parsed.data;

    const query: any = {};

    if (search && searchField) {
      query[searchField] = { $regex: search, $options: "i" };
    }

    if (startDate || endDate) {
      query.releaseDate = {};
      if (startDate) query.releaseDate.$gte = new Date(startDate);
      if (endDate) query.releaseDate.$lte = new Date(endDate);
    }

    if (status) query.status = status;

    if (filter) {
      const [key, value] = filter.split("=");
      if (key && value) query[key] = value;
    }

    const projection = fields
      ? Object.fromEntries(fields.split(",").map(field => [field.trim(), 1]))
      : undefined;

    const sortOption: Record<string, 1 | -1> = {
      releaseDate: sort === "asc" ? 1 : -1,
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const docs = await GameTitle.find(query, projection)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    if (includeCount === "true") {
      const total = await GameTitle.countDocuments(query);
      return NextResponse.json({ data: docs, total });
    }

    return NextResponse.json(docs);
  } catch (err) {
    console.error("[GET_GAME_TITLES_ERROR]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
