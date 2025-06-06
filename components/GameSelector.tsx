"use client";
import { useEffect, useState } from "react";

interface Props {
  userId: string;
  onSelectGame: (gameId: string) => void;
}

export function GameSelector({ userId, onSelectGame }: Props) {
  const [games, setGames] = useState<any[]>([]);

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

  fetchGames();
}, [userId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {games.map(game => (
        <div
          key={game._id}
          className="p-4 border rounded-xl shadow hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelectGame(game._id)}
        >
          <h3 className="text-xl font-bold">{game.title}</h3>
          <p className="text-sm text-dark">Click to play</p>
        </div>
      ))}

      <div
        className="p-4 border-2 border-dashed rounded-xl flex items-center justify-center text-center hover:bg-gray-50 hover:text-dark cursor-pointer"
        onClick={() => onSelectGame("new")}
      >
        <span className="text-lg font-semibold">+ Start a New Game</span>
      </div>
    </div>
  );
}
