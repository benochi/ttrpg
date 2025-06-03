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
        <body className="bg-background h-screen text-foreground">
          <header className="flex justify-between items-center">
            <div className="flex items-center p-2">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton showName />
              </SignedIn>
            </div>
          </header>
          
          <div className="flex justify-center items-center">
            <div className="w-full max-w-full px-4">
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
