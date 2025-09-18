import { Calendar, Clock, Users, Video, MapPin, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";

export function CalendarWidget() {
  const { events } = useApp();
  
  const today = new Date().toISOString().split('T')[0];
  const todayEvents = events.filter(event => event.date === today);
  
  if (todayEvents.length === 0) {
    return (
      <Card className="glass-effect border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            No events scheduled for today
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Calendar className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground text-center mb-4">
            Your schedule is clear today.<br />Ready to add some events?
          </p>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="glass-effect border-0 shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {todayEvents.length} event{todayEvents.length !== 1 ? 's' : ''} scheduled
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {todayEvents.map((event) => (
          <div key={event.id} className="flex gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-smooth">
            <div className="flex flex-col items-center text-sm">
              <span className="font-medium">{event.time}</span>
              <span className="text-xs text-muted-foreground">{event.duration}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-medium">{event.title}</h4>
              </div>
              
              {event.description && (
                <p className="text-xs text-muted-foreground">{event.description}</p>
              )}
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t border-border/50">
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}