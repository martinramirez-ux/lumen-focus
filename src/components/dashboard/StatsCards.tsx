import { CheckSquare, Calendar, FileText, Users, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Active Tasks",
    value: "12",
    change: "+2 from yesterday",
    icon: CheckSquare,
    trend: "up",
    color: "text-primary",
  },
  {
    title: "Meetings Today",
    value: "3",
    change: "2 hours scheduled",
    icon: Calendar,
    trend: "neutral",
    color: "text-accent",
  },
  {
    title: "Recent Notes",
    value: "8",
    change: "+3 this week",
    icon: FileText,
    trend: "up",
    color: "text-success",
  },
  {
    title: "Team Members",
    value: "24",
    change: "All active",
    icon: Users,
    trend: "neutral",
    color: "text-warning",
  },
];

export function StatsCards() {
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