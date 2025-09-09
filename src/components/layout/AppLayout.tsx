import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-primary/5">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border/50 glass-effect sticky top-0 z-50">
            <div className="h-full px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="hover:bg-secondary/80 transition-smooth" />
                <div className="hidden md:block">
                  <h1 className="font-semibold text-lg text-foreground">
                    Good morning, Alex
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    You have 3 tasks due today
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                </Button>
                
                <Avatar className="w-8 h-8 shadow-sm">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="gradient-primary text-white text-sm font-medium">
                    AJ
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}