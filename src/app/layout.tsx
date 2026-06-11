import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCProvider } from "@/trpc/client";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarProvider } from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: {
    default: "All Labs | DDU CS & MCA Registry",
    template: "%s | All Labs",
  },
  description: "The ultimate centralized platform for DDU CS & MCA students to manage laboratory materials. Skip the manual work of writing lab generals and focus purely on coding with our complete registry of lab questions and seeded answers.",
  keywords: ["DDU", "MCA", "CS", "Computer Science", "Laboratory", "Labs", "Generals", "Registry", "Dharmsinh Desai University", "Coding", "Assignments", "Solutions"],
  authors: [{ name: "All Labs" }],
  creator: "All Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://all-labs.vercel.app",
    title: "All Labs | DDU CS & MCA Registry",
    description: "Centralized laboratory materials for CS & MCA students. Focus on coding, not manual writing.",
    siteName: "All Labs",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
        alt: "All Labs Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Labs | DDU CS & MCA Registry",
    description: "Centralized laboratory materials for CS & MCA students. Focus on coding, not manual writing.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${robotoMono.variable} selection:bg-black selection:text-white relative" `}
      >
          <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          >
            <TRPCProvider>
              <ThemeProvider
                attribute={"class"}
                defaultTheme="system"
                enableSystem
              >
                <Toaster />
                {children}
              </ThemeProvider>
            </TRPCProvider>
          </ClerkProvider>
      </body>
    </html>
  );
}
