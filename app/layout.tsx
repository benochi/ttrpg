import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Providers from "./providers";
import { ThemeProvider } from "../components/ThemeProvider";
import { ThemeToggle } from "../components/ThemeToggle";
import { ThemeScript } from "../components/ThemeScript"

export const metadata = {
  title: "Template App",
  description: "Next.js 15 template",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <ThemeScript />
        </head>
        <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] p-1">
          <ThemeProvider>
            <header className="flex justify-between items-center p-4">
              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton showName />
                </SignedIn>
              </div>
              <ThemeToggle />
            </header>
            
            <div className="flex justify-center items-center min-h-screen">
              <div className="w-full max-w-full px-6">
                {/* Providers are for tanstack */}
                <Providers>
                  {children}
                </Providers>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}