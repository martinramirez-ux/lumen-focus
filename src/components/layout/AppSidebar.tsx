import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Calendar,
  CheckSquare,
  FileText,
  FolderOpen,
  Home,
  MessageSquare,
  Settings,
  Users,
  Zap,
  Plus,
  Search,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuickAddDialog } from "@/components/ui/quick-add-dialog";

const navigation = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Notes", url: "/notes", icon: FileText },
  { title: "Files", url: "/files", icon: FolderOpen },
];

const aiFeatures = [
  { title: "AI Assistant", url: "/ai", icon: Zap },
  { title: "Smart Scheduling", url: "/ai/scheduling", icon: Calendar },
  { title: "Insights", url: "/insights", icon: MessageSquare },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary border-r-2 border-primary shadow-sm" 
      : "hover:bg-secondary/80 transition-smooth";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r transition-smooth glass-effect`}
    >
      <SidebarContent className="bg-transparent custom-scrollbar">
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FlowSpace
              </span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
              <Zap className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {!collapsed && (
          <div className="p-4 space-y-3">
            <QuickAddDialog>
              <Button 
                variant="primary" 
                size="sm" 
                className="w-full shadow-glow"
              >
                <Plus className="w-4 h-4 mr-2" />
                Quick Add
              </Button>
            </QuickAddDialog>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search everything..." 
                className="pl-9 bg-secondary/50 border-0"
              />
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-4">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mx-2">
                    <NavLink to={item.url} end className={getNavClass}>
                      <item.icon className="w-4 h-4 mr-3" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* AI Features */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-4 flex items-center gap-2">
            <Zap className="w-3 h-3" />
            {!collapsed && "AI Features"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aiFeatures.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mx-2">
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="w-4 h-4 mr-3" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <div className="mt-auto p-4 border-t border-border/50">
          <SidebarMenuButton asChild className="mx-2">
            <NavLink to="/settings" className={getNavClass}>
              <Settings className="w-4 h-4 mr-3" />
              {!collapsed && <span className="font-medium">Settings</span>}
            </NavLink>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}