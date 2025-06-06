"use client";
interface Props {
  gameId: string;
  onBackAction: () => void;
}

export function GameDashboard({ gameId, onBackAction }: Props) {
  return (
    <div className="rounded-2xl p-4 bg-white text-dark shadow-lg w-full">
      <button onClick={onBackAction} className="text-sm text-blue-500 mb-4">
        &larr; Back to Games
      </button>
      <h2 className="text-2xl font-bold">Game ID: {gameId}</h2>
      <p>This is where the game screen will go.</p>
    </div>
  );
}
