import { useState } from "react";
import { CheckSquare, Plus, Filter, Search, Calendar, Clock, User, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tasks = [
  {
    id: "1",
    title: "Review Q4 marketing strategy",
    description: "Analyze performance metrics and plan for next quarter",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-10-23",
    assignee: "Alex Johnson",
    tags: ["marketing", "strategy"],
    completed: false,
  },
  {
    id: "2",
    title: "Update team documentation",
    description: "Refresh onboarding docs and API references",
    priority: "medium",
    status: "todo",
    dueDate: "2024-10-25",
    assignee: "Sarah Chen",
    tags: ["documentation", "team"],
    completed: false,
  },
  {
    id: "3",
    title: "Prepare client presentation",
    description: "Create slides for quarterly business review",
    priority: "high",
    status: "completed",
    dueDate: "2024-10-22",
    assignee: "Alex Johnson",
    tags: ["presentation", "client"],
    completed: true,
  },
];

const priorityColors = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-success/10 text-success border-success/20",
};

const statusColors = {
  todo: "bg-muted text-muted-foreground",
  "in-progress": "bg-primary/10 text-primary",
  completed: "bg-success/10 text-success",
};

const Tasks = () => {
  const [taskList, setTaskList] = useState(tasks);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = taskList.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  const toggleTask = (id: string) => {
    setTaskList(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CheckSquare className="h-8 w-8 text-primary" />
            Tasks
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your work
          </p>
        </div>
        <Button variant="primary" className="shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="glass-effect border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active ({activeTasks.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeTasks.map((task) => (
            <Card key={task.id} className="glass-effect border-0 shadow-card hover:shadow-float transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{task.title}</h3>
                      <Badge variant="outline" className={priorityColors[task.priority as keyof typeof priorityColors]}>
                        <Flag className="w-3 h-3 mr-1" />
                        {task.priority}
                      </Badge>
                      <Badge variant="outline" className={statusColors[task.status as keyof typeof statusColors]}>
                        {task.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{task.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{task.assignee}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mt-3">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedTasks.map((task) => (
            <Card key={task.id} className="glass-effect border-0 shadow-card opacity-75">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold line-through text-muted-foreground">{task.title}</h3>
                      <Badge variant="outline" className={statusColors.completed}>
                        completed
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm line-through">{task.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tasks;