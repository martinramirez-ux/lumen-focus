import { Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AIInsights() {
  return (
    <Card className="glass-effect border-0 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
            <Brain className="h-3 w-3 text-white" />
          </div>
          AI Assistant
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Get personalized productivity insights and assistance
        </p>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Brain className="h-12 w-12 text-muted-foreground/50 mb-3" />
        <p className="text-lg font-medium text-muted-foreground mb-2">
          Coming Soon
        </p>
        <p className="text-sm text-muted-foreground text-center">
          AI-powered productivity insights and assistance will be available soon.
        </p>
      </CardContent>
    </Card>
  );
}