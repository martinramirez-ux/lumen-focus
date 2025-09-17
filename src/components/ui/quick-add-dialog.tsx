import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  CheckSquare, 
  Calendar, 
  FileText, 
  FolderOpen, 
  Clock,
  AlertCircle,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const quickAddTypes = [
  { id: "task", label: "Task", icon: CheckSquare, color: "bg-primary/10 text-primary" },
  { id: "event", label: "Event", icon: Calendar, color: "bg-accent/10 text-accent" },
  { id: "note", label: "Note", icon: FileText, color: "bg-success/10 text-success" },
  { id: "file", label: "File", icon: FolderOpen, color: "bg-warning/10 text-warning" },
];

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().optional(),
});

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.string().optional(),
});

const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.string().optional(),
});

interface QuickAddDialogProps {
  children: React.ReactNode;
}

export function QuickAddDialog({ children }: QuickAddDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("task");
  const { toast } = useToast();

  const getSchema = () => {
    switch (selectedType) {
      case "task":
        return taskSchema;
      case "event":
        return eventSchema;
      case "note":
        return noteSchema;
      default:
        return taskSchema;
    }
  };

  const form = useForm({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      date: "",
      time: "",
      duration: "",
      content: "",
      tags: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Quick Add:", selectedType, data);
    
    const messages = {
      task: `Task "${data.title}" created successfully!`,
      event: `Event "${data.title}" scheduled successfully!`,
      note: `Note "${data.title}" saved successfully!`,
      file: `File "${data.title}" uploaded successfully!`,
    };

    toast({
      title: "Success!",
      description: messages[selectedType as keyof typeof messages],
    });

    form.reset();
    setOpen(false);
  };

  const renderForm = () => {
    switch (selectedType) {
      case "task":
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add task details..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case "event":
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add event details..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 1h 30m" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case "note":
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter note title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your note here..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., work, ideas, project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] glass-effect border-0 shadow-float">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Quick Add
          </DialogTitle>
          <DialogDescription>
            Quickly add a new task, event, note, or file to your workspace.
          </DialogDescription>
        </DialogHeader>

        {/* Type Selection */}
        <div className="grid grid-cols-4 gap-2 p-1 bg-secondary/30 rounded-lg">
          {quickAddTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedType(type.id);
                  form.reset();
                }}
                className={`flex flex-col items-center gap-2 p-3 rounded-md transition-smooth ${
                  isSelected 
                    ? "bg-background shadow-sm ring-2 ring-primary/20" 
                    : "hover:bg-background/50"
                }`}
              >
                <Icon className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-xs font-medium ${
                  isSelected ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {type.label}
                </span>
              </button>
            );
          })}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {renderForm()}
            
            <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary"
                className="shadow-glow"
              >
                {(() => {
                  const selectedTypeObj = quickAddTypes.find(t => t.id === selectedType);
                  const SelectedIcon = selectedTypeObj?.icon || Zap;
                  return <SelectedIcon className="h-4 w-4 mr-2" />;
                })()}
                Create {quickAddTypes.find(t => t.id === selectedType)?.label}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function Icon({ className }: { className?: string }) {
  // This gets the currently selected type's icon dynamically
  return <Zap className={className} />;
}