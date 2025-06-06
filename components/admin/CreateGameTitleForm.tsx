"use client";

import { useState } from "react";

export default function CreateGameTitleForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    developer: "",
    genre: "",
    tags: "",
    features: "",
    releaseDate: "",
    isFree: false,
    thumbnailUrl: "",
    coverImageUrl: ""
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/admin/game-title", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(",").map(tag => tag.trim()),
        features: form.features.split(",").map(f => f.trim())
      })
    });

    if (res.ok) {
      alert("Game created!");
    } else {
      alert("Failed to create game.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        ["name", "Name"],
        ["description", "Description"],
        ["developer", "Developer"],
        ["genre", "Genre"],
        ["tags", "Tags (comma-separated)"],
        ["features", "Features (comma-separated)"],
        ["releaseDate", "Release Date (YYYY-MM-DD)"],
        ["thumbnailUrl", "Thumbnail URL"],
        ["coverImageUrl", "Cover Image URL"]
      ].map(([key, label]) => (
        <div key={key}>
          <label className="block text-sm font-medium">{label}</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={(form as any)[key]}
            onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
          />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium">Is Free?</label>
        <input
          type="checkbox"
          checked={form.isFree}
          onChange={e => setForm(prev => ({ ...prev, isFree: e.target.checked }))}
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Game
      </button>
    </form>
  );
}
