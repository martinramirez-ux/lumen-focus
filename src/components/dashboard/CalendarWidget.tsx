import { Calendar, Clock, Users, Video, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const upcomingEvents = [
  {
    id: "1",
    title: "Team Standup",
    time: "9:00 AM",
    duration: "30m",
    type: "meeting",
    attendees: 5,
    location: "Conference Room A",
    isVirtual: false,
  },
  {
    id: "2",
    title: "Client Presentation", 
    time: "2:00 PM",
    duration: "1h",
    type: "presentation",
    attendees: 8,
    location: "Zoom",
    isVirtual: true,
  },
  {
    id: "3",
    title: "Code Review Session",
    time: "4:30 PM", 
    duration: "45m",
    type: "review",
    attendees: 3,
    location: "Dev Room",
    isVirtual: false,
  },
];

const typeColors = {
  meeting: "bg-primary/10 text-primary",
  presentation: "bg-accent/10 text-accent",
  review: "bg-success/10 text-success",
};

export function CalendarWidget() {
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
          {upcomingEvents.length} events scheduled
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="flex gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-smooth">
            <div className="flex flex-col items-center text-sm">
              <span className="font-medium">{event.time}</span>
              <span className="text-xs text-muted-foreground">{event.duration}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-medium">{event.title}</h4>
                <Badge variant="outline" className={typeColors[event.type as keyof typeof typeColors]}>
                  {event.type}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{event.attendees}</span>
                </div>
                <div className="flex items-center gap-1">
                  {event.isVirtual ? (
                    <>
                      <Video className="h-3 w-3" />
                      <span>{event.location}</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t border-border/50">
          <Button variant="outline" className="w-full">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule New Meeting
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}