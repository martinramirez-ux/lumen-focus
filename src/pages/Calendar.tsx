import { useState } from "react";
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuickAddDialog } from "@/components/ui/quick-add-dialog";
import { useApp } from "@/contexts/AppContext";
import { EventEditDialog } from "@/components/calendar/EventEditDialog";

const Calendar = () => {
  const { events } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [editingEvent, setEditingEvent] = useState<any>(null);


  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-border/20"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate;
      const isToday = day === new Date().getDate() && 
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear();

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`h-24 border border-border/20 p-2 cursor-pointer transition-smooth hover:bg-secondary/50 ${
            isSelected ? 'bg-primary/10 ring-1 ring-primary' : ''
          } ${isToday ? 'bg-accent/5' : ''}`}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-primary' : ''}`}>
            {day}
          </div>
          {/* Show events for this day */}
          {events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === day &&
                   eventDate.getMonth() === currentDate.getMonth() &&
                   eventDate.getFullYear() === currentDate.getFullYear();
          }).map(event => (
            <div
              key={event.id}
              onClick={(e) => {
                e.stopPropagation();
                setEditingEvent(event);
              }}
              className="text-xs p-1 mt-1 rounded bg-primary/80 text-primary-foreground truncate cursor-pointer hover:bg-primary transition-smooth"
            >
              {event.time} {event.title}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CalendarIcon className="h-8 w-8 text-primary" />
            Calendar
          </h1>
          <p className="text-muted-foreground mt-1">
            Schedule and manage your time
          </p>
        </div>
        <QuickAddDialog>
          <Button variant="primary" className="shadow-glow">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </QuickAddDialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <Card className="glass-effect border-0 shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-0 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-sm font-medium text-muted-foreground text-center">
                    {day}
                  </div>
                ))}
              </div>
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-0 border border-border/20">
                {renderCalendarDays()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Events */}
        <div className="space-y-6">
          <Card className="glass-effect border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Events
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {todayEvents.length} events scheduled
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayEvents.map((event) => (
                <div 
                  key={event.id} 
                  onClick={() => setEditingEvent(event)}
                  className="p-3 rounded-lg border border-border/20 hover:bg-secondary/50 transition-smooth cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary mt-1 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {event.time} • {event.duration}
                      </p>
                      {event.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {todayEvents.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No events today</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass-effect border-0 shadow-card">
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Events</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Meetings</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Focus Time</span>
                <span className="font-medium">0 hrs</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Edit Dialog */}
      {editingEvent && (
        <EventEditDialog
          event={editingEvent}
          open={!!editingEvent}
          onOpenChange={(open) => !open && setEditingEvent(null)}
        />
      )}
    </div>
  );
};

export default Calendar;