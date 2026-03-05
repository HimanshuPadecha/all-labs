import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/reuseables/appsidebar";
import { HydrateClient, trpc } from "@/trpc/server";
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
        <AppSidebar />
        <div className="min-h-screen flex items-center justify-center px-8 relative">
          {children}
        </div>
      </SidebarProvider>
    </HydrateClient>
  );
};

export default Layout;
