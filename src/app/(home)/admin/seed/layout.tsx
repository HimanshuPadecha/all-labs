import { ModeToggle } from "@/components/mode-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { HydrateClient, trpc } from "@/trpc/server";
import Navbar from "@/ui/home/navbar";
import { AppSidebar } from "@/ui/reuseables/appsidebar";
import React from "react";

interface pageProps {
  children: React.ReactNode;
}

const Layout = ({ children }: pageProps) => {
  trpc.seed.subjects.prefetch();
  trpc.seed.getAllSubjectsAndLabs.prefetch();

  return (
    <HydrateClient>
      <SidebarProvider className="flex items-center justify-center">
        <AppSidebar variant="admin" />
        <SidebarTrigger className="fixed top-16 left-3 md:hidden z-20" />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4 relative mt-14">
          {children}
        </div>
      </SidebarProvider>
    </HydrateClient>
  );
};

export default Layout;
