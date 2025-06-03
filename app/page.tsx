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
    }
  }, [clerkUser, isLoaded])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-background text-foreground">
      <header className="text-center">
        <h1 className="text-4xl font-bold">TTRPG start</h1>
        <p className="text-lg special-font1">Special font test area</p>
      </header>
      <main className="flex flex-col items-center gap-4">
        <Suspense fallback={<p>Loading user...</p>}>
          {user ? (
            <div className="mt-4">
              <h2 className="text-xl">Welcome, {user.name}!</h2>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
          ) : (
            <p>Loading user...</p>
          )}
        </Suspense>
      </main>
    </div>
  );
}
