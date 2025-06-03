import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Providers from "./providers";

export const metadata = {
  title: "Dan RPG",
  description: "An online RPG with a classic experience for solo players.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-background text-foreground p-1">
          <header className="flex justify-between items-center p-1">
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton showName />
              </SignedIn>
            </div>
          </header>
          
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-full px-6">
              {/* Providers are for tanstack */}
              <Providers>
                {children}
              </Providers>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}