import { Zap, TrendingUp, Clock, Target, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const insights = [
  {
    id: "1",
    type: "productivity",
    title: "Peak Performance Window",
    description: "You're most productive between 10-11 AM. Consider scheduling important tasks during this time.",
    icon: TrendingUp,
    action: "Auto-schedule high-priority tasks",
    confidence: 92,
  },
  {
    id: "2", 
    type: "scheduling",
    title: "Meeting Optimization",
    description: "You have 3 back-to-back meetings. I can suggest a 15-minute buffer between them.",
    icon: Clock,
    action: "Reschedule with buffers",
    confidence: 87,
  },
  {
    id: "3",
    type: "focus",
    title: "Deep Work Opportunity", 
    description: "Tomorrow 2-4 PM is free. Perfect for the client presentation prep.",
    icon: Target,
    action: "Block time for deep work",
    confidence: 95,
  },
];

export function AIInsights() {
  return (
    <Card className="glass-effect border-0 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
            <Brain className="h-3 w-3 text-white" />
          </div>
          AI Insights
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Personalized productivity recommendations
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div key={insight.id} className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium mb-1">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-muted-foreground">Confidence:</span>
                    <Progress value={insight.confidence} className="flex-1 h-2" />
                    <span className="text-xs font-medium">{insight.confidence}%</span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="text-xs">
                    <Zap className="h-3 w-3 mr-1" />
                    {insight.action}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="pt-2 border-t border-border/50">
          <Button variant="ghost" className="w-full text-sm">
            <Brain className="h-4 w-4 mr-2" />
            View All AI Suggestions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}