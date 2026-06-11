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
      <SidebarProvider className="flex w-full">
        <AppSidebar variant="client" />
        <SidebarTrigger className="fixed top-16 left-3 md:hidden z-20" />
        <Navbar />
        <div className="min-h-screen flex-1 px-4 relative mt-14 w-full">
          {children}
        </div>
      </SidebarProvider>
    </HydrateClient>
  );
};

export default Layout;
