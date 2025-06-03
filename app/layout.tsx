import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Providers from "./providers";

export const metadata = {
  title: "Template App",
  description: "Next.js 15 template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-background text-foreground">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
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
