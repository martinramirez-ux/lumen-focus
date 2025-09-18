import { Zap, TrendingUp, Clock, Target, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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
          AI-powered insights will appear as you use the app
        </p>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-3">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Start adding tasks and events to receive<br />personalized AI recommendations
        </p>
        <Button variant="outline" size="sm">
          <Zap className="h-4 w-4 mr-2" />
          Learn About AI Features
        </Button>
      </CardContent>
    </Card>
  );
}