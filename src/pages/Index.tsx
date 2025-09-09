import { StatsCards } from "@/components/dashboard/StatsCards";
import { TasksOverview } from "@/components/dashboard/TasksOverview";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { Zap, Calendar, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome to FlowSpace
          </h1>
          <p className="text-muted-foreground mt-1">
            Your AI-powered productivity workspace
          </p>
        </div>
        <Button variant="primary" className="shadow-glow">
          <Zap className="w-4 h-4 mr-2" />
          Quick Start
        </Button>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <TasksOverview />
          
          {/* Recent Activity */}
          <Card className="glass-effect border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">2 hours ago</span>
                  <span>Completed "Design review session"</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">4 hours ago</span>
                  <span>Added new team member to project</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Yesterday</span>
                  <span>Updated project documentation</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Calendar & AI */}
        <div className="space-y-6">
          <CalendarWidget />
          <AIInsights />
        </div>
      </div>
    </div>
  );
};

export default Index;
