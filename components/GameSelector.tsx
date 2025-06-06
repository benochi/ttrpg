"use client";

import { useEffect, useState } from "react";
import { GameSchema } from "@/schemas/GameSchema";
import { GameTitleInput } from "@/schemas/GameTitleSchema";

type GameWithId = GameSchema & { _id: string };
type GameTitleWithId = GameTitleInput & { _id: string };

interface Props {
  userId: string;
  onSelectGameAction: (gameId: string) => void;
}

export function GameSelector({ userId, onSelectGameAction }: Props) {
  const [games, setGames] = useState<GameWithId[]>([]);
  const [titles, setTitles] = useState<GameTitleWithId[]>([]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch(`/api/game?userId=${userId}`);
        if (!res.ok) {
          console.error(`Failed to fetch games: ${res.status}`);
          return;
        }
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    }

    async function fetchTitles() {
      try {
        const res = await fetch("/api/getUserGameTitles");
        if (!res.ok) {
          console.error(`Failed to fetch game titles: ${res.status}`);
          return;
        }
        const data = await res.json();
        setTitles(data);
      } catch (err) {
        console.error("Error fetching titles:", err);
      }
    }

    fetchGames();
    fetchTitles();
  }, [userId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {games.map((game) => (
        <div
          key={game._id}
          className="p-4 rounded-xl border border-default shadow-lg bg-light text-dark hover:bg-primary hover:text-light cursor-pointer transition"
          onClick={() => onSelectGameAction(game._id)}
        >
          <h3 className="text-xl font-bold">{game.title}</h3>
          <p className="text-sm text-muted">Click to play</p>
        </div>
      ))}

      {titles.length > 0 && (
        <div
          className="p-4 rounded-xl border-2 border-solid border-light flex items-center justify-center text-center text-light hover:bg-hover hover:text-dark cursor-pointer transition"
          onClick={() => onSelectGameAction("new")}
        >
          <span className="text-lg font-semibold">+ Start a New Game</span>
        </div>
      )}
    </div>
  );
}
