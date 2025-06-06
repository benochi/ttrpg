"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gameTitleSchema, GameTitleInput } from "@/schemas/GameTitleSchema";
import { useState } from "react";

export default function CreateGameTitleForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GameTitleInput>({
    resolver: zodResolver(gameTitleSchema),
  });

  const [rawTags, setRawTags] = useState("");
  const [rawFeatures, setRawFeatures] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (data: GameTitleInput) => {
  const payload = {
    ...data,
    tags: rawTags ? rawTags.split(",").map(tag => tag.trim()).filter(Boolean) : [],
    features: rawFeatures ? rawFeatures.split(",").map(f => f.trim()).filter(Boolean) : [],
    thumbnailUrl: data.thumbnailUrl?.trim() || undefined,
    coverImageUrl: data.coverImageUrl?.trim() || undefined,
    price: isNaN(data.price as number) ? undefined : data.price,
    subscriptionPrice: isNaN(data.subscriptionPrice as number) ? undefined : data.subscriptionPrice,
  };

  const res = await fetch("/api/admin/game-title", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    reset();
    setRawTags("");
    setRawFeatures("");
    setMessage("Game created successfully.");
  } else {
    const errorData = await res.json();
    setMessage(errorData.message || "Failed to create game.");
  }
};

  return (
    <div className="p-6 bg-dark rounded shadow-md max-w-xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-dark space-y-4">
        {[
          { field: "name", label: "Name" },
          { field: "description", label: "Description" },
          { field: "developer", label: "Developer" },
          { field: "genre", label: "Genre" },
          { field: "releaseDate", label: "Release Date (YYYY-MM-DD)" },
          { field: "thumbnailUrl", label: "Thumbnail URL" },
          { field: "coverImageUrl", label: "Cover Image URL" },
          { field: "price", label: "Price", type: "number" },
          { field: "subscriptionPrice", label: "Subscription Price", type: "number" },
        ].map(({ field, label, type }) => (
          <div key={field}>
            <input
              {...register(field as keyof GameTitleInput, { valueAsNumber: type === "number" })}
              type={type || "text"}
              placeholder={label}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors[field as keyof typeof errors] && (
              <p className="text-red-500 text-sm">
                {errors[field as keyof typeof errors]?.message as string}
              </p>
            )}
          </div>
        ))}

        <div>
          <input
            value={rawTags}
            onChange={e => setRawTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
        </div>

        <div>
          <input
            value={rawFeatures}
            onChange={e => setRawFeatures(e.target.value)}
            placeholder="Features (comma separated)"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.features && <p className="text-red-500 text-sm">{errors.features.message}</p>}
        </div>

        <div>
          <label className="inline-flex items-center">
            <input type="checkbox" {...register("isFree")} className="mr-2" />
            <span className="text-light">Is Free</span>
          </label>
          {errors.isFree && <p className="text-red-500 text-sm">{errors.isFree.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-light px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {message && <p className="text-sm text-center text-green-600 mt-4">{message}</p>}
    </div>
  );
}
