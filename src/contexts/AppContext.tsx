import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

// Types
interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate: string;
  assignee?: string;
  tags: string[];
  completed: boolean;
  aiSuggestion?: string;
}

interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

interface AppContextType {
  tasks: Task[];
  events: Event[];
  notes: Note[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  addTask: (task: Partial<Task>) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  addNote: (note: Partial<Note>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const { user } = useAuth();

  const mapTaskRowToTask = (row: any): Task => ({
    id: row.id,
    title: row.title,
    description: row.description || '',
    priority: (row.priority as 'low' | 'medium' | 'high') || 'medium',
    status: (row.status as 'todo' | 'in-progress' | 'completed') || 'todo',
    dueDate: row.due_date,
    assignee: row.assignee || 'You',
    tags: row.tags || [],
    completed: !!row.completed,
    aiSuggestion: row.ai_suggestion || undefined,
  });

  const mapEventRowToEvent = (row: any): Event => ({
    id: row.id,
    title: row.title,
    description: row.description || '',
    date: row.date,
    time: row.time,
    duration: row.duration,
  });

  const mapNoteRowToNote = (row: any): Note => ({
    id: row.id,
    title: row.title,
    content: row.content,
    tags: row.tags || [],
    createdAt: row.created_at,
  });

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setEvents([]);
      setNotes([]);
      return;
    }

    (async () => {
      const { data: tasksData } = await supabase
        .from('tasks')
        .select('*')
        .order('due_date', { ascending: true });
      if (tasksData) setTasks(tasksData.map(mapTaskRowToTask));

      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
      if (eventsData) setEvents(eventsData.map(mapEventRowToEvent));

      const { data: notesData } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });
      if (notesData) setNotes(notesData.map(mapNoteRowToNote));
    })();
  }, [user]);

  const addTask = (taskData: Partial<Task>) => {
    if (!user) return;
    const due_date = taskData.dueDate || new Date().toISOString().split('T')[0];

    (async () => {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          title: taskData.title || '',
          description: taskData.description || '',
          priority: taskData.priority || 'medium',
          status: 'todo',
          due_date,
          assignee: 'You',
          tags: taskData.tags || [],
          completed: false,
          user_id: user.id,
          ai_suggestion: taskData.aiSuggestion || null,
        })
        .select('*')
        .single();

      if (!error && data) {
        setTasks(prev => [mapTaskRowToTask(data), ...prev]);
      }
    })();
  };

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    if (!user) return;
    const time = eventData.time && eventData.time.length === 5 ? `${eventData.time}:00` : (eventData.time || '00:00:00');

    (async () => {
      const { data, error } = await supabase
        .from('events')
        .insert({
          title: eventData.title,
          description: eventData.description || '',
          date: eventData.date,
          time,
          duration: eventData.duration || '1h',
          user_id: user.id,
        })
        .select('*')
        .single();

      if (!error && data) {
        setEvents(prev => [mapEventRowToEvent(data), ...prev]);
      }
    })();
  };

  const addNote = (noteData: Partial<Note>) => {
    if (!user) return;

    (async () => {
      const { data, error } = await supabase
        .from('notes')
        .insert({
          title: noteData.title || '',
          content: noteData.content || '',
          tags: noteData.tags || [],
          user_id: user.id,
        })
        .select('*')
        .single();

      if (!error && data) {
        setNotes(prev => [mapNoteRowToNote(data), ...prev]);
      }
    })();
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    (async () => {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: updates.title,
          description: updates.description,
          priority: updates.priority,
          status: updates.status,
          due_date: updates.dueDate,
          assignee: updates.assignee,
          tags: updates.tags,
          completed: updates.completed,
          ai_suggestion: updates.aiSuggestion,
        })
        .eq('id', id);

      if (!error) {
        setTasks(prev =>
          prev.map(task =>
            task.id === id ? { ...task, ...updates } : task
          )
        );
      }
    })();
  };

  const deleteTask = (id: string) => {
    (async () => {
      const { error } = await supabase.from('tasks').delete().eq('id', id);
      if (!error) {
        setTasks(prev => prev.filter(task => task.id !== id));
      }
    })();
  };

  const value = {
    tasks,
    events,
    notes,
    setEvents,
    addTask,
    addEvent,
    addNote,
    updateTask,
    deleteTask,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};