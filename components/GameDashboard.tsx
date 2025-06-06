"use client";

import { useEffect, useState } from "react";
import { GameSchema } from "@/schemas/GameSchema";
import { GameTitleInput } from "@/schemas/GameTitleSchema";

interface Props {
  gameId: string;
  onBackAction: () => void;
}

type GameWithTitle = GameSchema & { _id: string; gameTitle?: GameTitleInput };

export function GameDashboard({ gameId, onBackAction }: Props) {
  const [game, setGame] = useState<GameWithTitle | null>(null);
  const [availableTitles, setAvailableTitles] = useState<GameTitleInput[] | null>(null);

  useEffect(() => {
    if (gameId === "new") {
      fetch("/api/getUserGameTitles")
        .then(res => res.json())
        .then(data => setAvailableTitles(data))
        .catch(err => console.error("Failed to fetch game titles", err));
      return;
    }

    fetch(`/api/game/${gameId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch game");
        return res.json();
      })
      .then(data => setGame(data))
      .catch(err => console.error(err));
  }, [gameId]);

  if (gameId === "new") {
    return (
      <div className="rounded-2xl p-4 bg-dark text-light shadow-lg w-full">
        <button
          onClick={onBackAction}
          className="text-sm text-light hover:underline mb-4 transition"
        >
          &larr; Back to Games
        </button>
        <h2 className="text-2xl font-bold mb-4">Select a Game to Start</h2>
        {!availableTitles ? (
          <p className="text-center text-muted">Loading games...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {availableTitles.map((title, idx) => (
              <div key={idx} className="p-4 bg-background-dark rounded-xl cursor-pointer hover:bg-hover hover:text-dark hover:text-bold transition">
                <h3 className="text-xl font-semibold">{title.name}</h3>
                <p className="text-sm">{title.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (!game) return <p className="text-center text-light">Loading game...</p>;

  return (
    <div className="rounded-2xl p-4 bg-light text-dark shadow-lg w-full">
      <button
        onClick={onBackAction}
        className="text-sm text-accent hover:underline mb-4 transition"
      >
        &larr; Back to Games
      </button>
      <h2 className="text-3xl font-bold mb-2">{game.gameTitle?.name || game.title}</h2>
      <p className="text-muted mb-4">{game.gameTitle?.description}</p>

      <div className="bg-background-dark text-light p-4 rounded-xl">
        <pre>{JSON.stringify(game, null, 2)}</pre>
      </div>
    </div>
  );
}
