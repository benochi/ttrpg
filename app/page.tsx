"use client";
import { useState, useEffect, Suspense } from "react";
import { IUser } from "@/models/User";
import { useUser } from "@clerk/nextjs";
import { GameSelector } from "@/components/GameSelector";
import { GameDashboard } from "@/components/GameDashboard";

async function fetchOrCreateUserMongo(): Promise<IUser> {
  const res = await fetch("/api/user", { method: "GET" });
  if (!res.ok) throw new Error("Failed to fetch user data");
  const userData = await res.json();
  return userData as IUser;
}

export default function Home() {
  const [user, setUser] = useState<IUser | null>(null);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const { user: clerkUser, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && clerkUser) {
      fetchOrCreateUserMongo().then(setUser).catch(console.error);
    } else {
      setUser(null);
    }
  }, [clerkUser, isLoaded]);

  return (
    <div className="flex flex-col h-full border bg-background-dark text-foreground">
      <header className="p-4 text-center bg-background-dark text-foreground rounded-b-2xl">
        <h1 className="text-4xl font-bold">Thaloran</h1>
        <p className="text-lg">Welcome to the world of magic and machine!</p>
      </header>

      <main className="flex-grow p-4 flex justify-center items-start overflow-y-auto">
        <div className="w-full max-w-6xl">
          <Suspense fallback={<p>Loading user...</p>}>
            {!user ? (
              <p className="text-center">Log in to continue</p>
            ) : activeGameId ? (
              <GameDashboard gameId={activeGameId} onBackAction={() => setActiveGameId(null)} />
            ) : (
              <GameSelector userId={user._id.toString()} onSelectGameAction={setActiveGameId} />
            )}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
