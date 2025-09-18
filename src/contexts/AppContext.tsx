import React, { createContext, useContext, useState, ReactNode } from 'react';

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

  const addTask = (taskData: Partial<Task>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title || '',
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      status: 'todo',
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
      assignee: 'You',
      tags: taskData.tags || [],
      completed: false,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const addNote = (noteData: Partial<Note>) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: noteData.title || '',
      content: noteData.content || '',
      tags: noteData.tags || [],
      createdAt: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const value = {
    tasks,
    events,
    notes,
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