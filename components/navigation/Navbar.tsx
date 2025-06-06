'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRole() {
      if (user) {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setRole(data.role);
        }
      }
    }
    fetchRole();
  }, [user]);

  return (
    <nav className="flex justify-between items-center p-1 bg-navbar text-light w-full">
      <div className="flex gap-4 items-center">
        <Link href="/">🏠 Home</Link>
        <SignedIn>
          {role === "admin" && (
            <Link href="/admin/create-game">🛠️ Create Game</Link>
          )}
        </SignedIn>
      </div>
      <div className="flex items-center p-2">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </div>
    </nav>
  );
}
