import { ReactNode, useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("there");

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("user_id", user.id)
          .maybeSingle();
        
        if (error) {
          console.error('Failed to fetch profile:', error);
          return;
        }
        
        if (data?.display_name) {
          setDisplayName(data.display_name);
        }
      };
      fetchProfile();
    }
  }, [user]);

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
                    Good morning, {displayName}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Avatar 
                  className="w-8 h-8 shadow-sm cursor-pointer hover:opacity-80 transition-smooth"
                  onClick={() => toast.info("Database coming soon")}
                >
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="gradient-primary text-white text-sm font-medium">
                    {displayName.charAt(0).toUpperCase()}
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