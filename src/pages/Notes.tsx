import { useState } from "react";
import { StickyNote, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface StickyNoteType {
  id: string;
  content: string;
  color: string;
  createdAt: string;
}

const stickyColors = [
  "bg-yellow-200 border-yellow-300 text-yellow-900", // Classic yellow
  "bg-pink-200 border-pink-300 text-pink-900",       // Pink
  "bg-green-200 border-green-300 text-green-900",    // Green
  "bg-blue-200 border-blue-300 text-blue-900",       // Blue
  "bg-purple-200 border-purple-300 text-purple-900", // Purple
  "bg-orange-200 border-orange-300 text-orange-900", // Orange
];

const Notes = () => {
  const [notesList, setNotesList] = useState<StickyNoteType[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState("");

  const addNote = () => {
    if (newNoteContent.trim()) {
      const newNote: StickyNoteType = {
        id: Date.now().toString(),
        content: newNoteContent.trim(),
        color: stickyColors[Math.floor(Math.random() * stickyColors.length)],
        createdAt: new Date().toISOString(),
      };
      setNotesList([...notesList, newNote]);
      setNewNoteContent("");
      setIsCreating(false);
    }
  };

  const deleteNote = (id: string) => {
    setNotesList(notesList.filter(note => note.id !== id));
  };

  const updateNote = (id: string, content: string) => {
    setNotesList(notesList.map(note => 
      note.id === id ? { ...note, content } : note
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <StickyNote className="h-8 w-8 text-primary" />
            Sticky Notes
          </h1>
          <p className="text-muted-foreground mt-1">
            Quick notes that stick around
          </p>
        </div>
        <Button 
          onClick={() => setIsCreating(true)}
          className="shadow-glow"
          variant="default"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Note
        </Button>
      </div>

      {/* Notes Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {/* Add Note Card - Only show when creating */}
        {isCreating && (
          <div className="bg-yellow-200 border-2 border-yellow-300 text-yellow-900 p-4 rounded-lg shadow-lg transform rotate-1 hover:rotate-0 transition-smooth">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium">New Note</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsCreating(false);
                  setNewNoteContent("");
                }}
                className="h-6 w-6 p-0 hover:bg-yellow-300/50"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <Textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="What's on your mind?"
              className="min-h-[100px] bg-transparent border-none resize-none p-0 text-yellow-900 placeholder:text-yellow-700 focus-visible:ring-0"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-3">
              <Button
                size="sm"
                onClick={addNote}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Save
              </Button>
            </div>
          </div>
        )}

        {/* Existing Notes */}
        {notesList.map((note, index) => (
          <StickyNoteCard
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onUpdate={updateNote}
            rotation={index % 2 === 0 ? 'rotate-1' : '-rotate-1'}
          />
        ))}
      </div>

      {/* Empty State */}
      {notesList.length === 0 && !isCreating && (
        <div className="text-center py-12">
          <StickyNote className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No sticky notes yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first sticky note to get started
          </p>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Note
          </Button>
        </div>
      )}

    </div>
  );
};

interface StickyNoteCardProps {
  note: StickyNoteType;
  onDelete: (id: string) => void;
  onUpdate: (id: string, content: string) => void;
  rotation: string;
}

const StickyNoteCard = ({ note, onDelete, onUpdate, rotation }: StickyNoteCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);

  const handleSave = () => {
    if (editContent.trim()) {
      onUpdate(note.id, editContent.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditContent(note.content);
    setIsEditing(false);
  };

  return (
    <div className={`${note.color} p-4 rounded-lg shadow-lg transform ${rotation} hover:rotate-0 transition-smooth cursor-pointer border-2`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs opacity-70">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(note.id)}
          className="h-6 w-6 p-0 hover:bg-black/10"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      
      {isEditing ? (
        <div className="space-y-3">
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="bg-transparent border-none resize-none p-0 focus-visible:ring-0 min-h-[80px]"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              className="hover:bg-black/10"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-black/20 hover:bg-black/30"
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <p 
          className="text-sm leading-relaxed whitespace-pre-wrap cursor-text"
          onClick={() => setIsEditing(true)}
        >
          {note.content}
        </p>
      )}
    </div>
  );
};

export default Notes;
