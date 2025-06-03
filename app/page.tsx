"use client";
import { useState, useEffect, Suspense } from "react";
import { IUser } from "@/models/User";
import { useUser } from "@clerk/nextjs";

// Define the fetchUser function outside of useEffect
async function fetchOrCreateUserMongo(): Promise<IUser> {
  const res = await fetch("/api/user", { method: "GET" });
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  const userData: IUser = await res.json();
  return userData;
}

export default function Home() {
  const [user, setUser] = useState<IUser | null>(null);
  const { user: clerkUser, isLoaded } = useUser();

   useEffect(() => {
    if (isLoaded && clerkUser) {
      async function getUser() {
        try {
          const userData = await fetchOrCreateUserMongo();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }

      getUser();
    } else {
      setUser(null);
    }
  }, [clerkUser, isLoaded])

  return (
    <div className="flex flex-col h-full border bg-background text-foreground">
      <header className="p-4 text-center bg-gray-800 text-foreground">
        <h1 className="text-4xl font-bold">Thaloran</h1>
        <p className="text-lg">Welcome to the world of magic and machine!</p>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <Suspense fallback={<p>Loading user...</p>}>
          {user ? (
            <div className="mt-4 text-center">
              <h2 className="text-xl">Welcome, {user.name}!</h2>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
          ) : clerkUser ? (
            <p>Loading user...</p>
          ) : (
            <p>Log in to continue</p>
          )}
        </Suspense>
      </main>
    </div>
  );
}
