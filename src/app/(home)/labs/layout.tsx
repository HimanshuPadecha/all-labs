import { ModeToggle } from "@/components/mode-toggle";
import { SidebarProvider } from "@/components/ui/sidebar";
import { HydrateClient, trpc } from "@/trpc/server";
import { AppSidebar } from "@/ui/reuseables/appsidebar";
import React from "react";

interface pageProps {
  children: React.ReactElement;
}

const Layout = ({ children }: pageProps) => {
  trpc.seed.subjects.prefetch();
  trpc.seed.getAllSubjectsAndLabs.prefetch();

  return (
    <HydrateClient>
      <SidebarProvider className="flex items-center justify-center">
        <AppSidebar variant="client" />
        <div className="absolute right-4 top-4 z-60">
          <ModeToggle />
        </div>
        <div className="min-h-screen flex items-center justify-center px-8 relative">
          {children}
        </div>
      </SidebarProvider>
    </HydrateClient>
  );
};

export default Layout;
