import { CheckSquare, Calendar, FileText, Users, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";

export function StatsCards() {
  const { tasks, events, notes } = useApp();
  
  const activeTasks = tasks.filter(task => !task.completed);
  const todayEvents = events.filter(event => {
    const today = new Date().toISOString().split('T')[0];
    return event.date === today;
  });

  const stats = [
    {
      title: "Active Tasks",
      value: activeTasks.length.toString(),
      change: tasks.length > 0 ? `${tasks.length} total` : "No tasks yet",
      icon: CheckSquare,
      trend: "neutral",
      color: "text-primary",
    },
    {
      title: "Events Today",
      value: todayEvents.length.toString(),
      change: events.length > 0 ? `${events.length} this week` : "No events scheduled",
      icon: Calendar,
      trend: "neutral",
      color: "text-accent",
    },
    {
      title: "Notes",
      value: notes.length.toString(),
      change: notes.length > 0 ? "Ready to organize" : "Start taking notes",
      icon: FileText,
      trend: "neutral",
      color: "text-success",
    },
    {
      title: "Workspace",
      value: "1",
      change: "Personal workspace",
      icon: Users,
      trend: "neutral",
      color: "text-warning",
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="glass-effect border-0 shadow-card hover:shadow-float transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stat.trend === "up" && <TrendingUp className="h-3 w-3 mr-1 text-success" />}
                {stat.trend === "neutral" && <Clock className="h-3 w-3 mr-1 text-muted-foreground" />}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}