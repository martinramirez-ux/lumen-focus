import { CheckSquare, Clock, AlertCircle, Zap, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useApp } from "@/contexts/AppContext";

const priorityColors = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-success/10 text-success border-success/20",
};

export function TasksOverview() {
  const { tasks, updateTask } = useApp();

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
    }
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <Card className="glass-effect border-0 shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Tasks Overview
          </CardTitle>
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>{activeTasks.length} active</span>
          <span>{completedCount} completed</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeTasks.slice(0, 4).map((task) => (
          <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-smooth">
            <Checkbox 
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {task.title}
                </h4>
                <Badge variant="outline" className={priorityColors[task.priority as keyof typeof priorityColors]}>
                  {task.priority}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Due {task.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
        
        {activeTasks.length > 4 && (
          <Button variant="ghost" className="w-full text-muted-foreground">
            View {activeTasks.length - 4} more tasks
          </Button>
        )}
      </CardContent>
    </Card>
  );
}