import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Providers from "./providers";
import Navbar from "@/components/navigation/Navbar";

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
            <Navbar />
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
