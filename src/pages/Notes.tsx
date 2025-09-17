import { useState } from "react";
import { FileText, Plus, Search, Tag, Star, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QuickAddDialog } from "@/components/ui/quick-add-dialog";

const notes = [
  {
    id: "1",
    title: "Product Roadmap Q4",
    content: "Key initiatives for Q4 include: user authentication system, advanced analytics dashboard, mobile app optimization...",
    tags: ["product", "roadmap", "planning"],
    createdAt: "2024-10-20",
    updatedAt: "2024-10-22",
    starred: true,
    category: "work",
  },
  {
    id: "2",
    title: "Meeting Notes - Design Review",
    content: "Discussed new UI components, user feedback on the dashboard redesign, and accessibility improvements...",
    tags: ["meeting", "design", "ui"],
    createdAt: "2024-10-19",
    updatedAt: "2024-10-21",
    starred: false,
    category: "work",
  },
  {
    id: "3",
    title: "Project Ideas",
    content: "1. AI-powered productivity assistant 2. Automated workflow builder 3. Team collaboration tools...",
    tags: ["ideas", "projects", "innovation"],
    createdAt: "2024-10-18",
    updatedAt: "2024-10-18",
    starred: true,
    category: "personal",
  },
  {
    id: "4",
    title: "Learning Resources",
    content: "Collection of useful articles, tutorials, and courses for professional development...",
    tags: ["learning", "resources", "development"],
    createdAt: "2024-10-15",
    updatedAt: "2024-10-20",
    starred: false,
    category: "personal",
  },
];

const Notes = () => {
  const [notesList, setNotesList] = useState(notes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const filteredNotes = notesList.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || note.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const workNotes = filteredNotes.filter(note => note.category === "work");
  const personalNotes = filteredNotes.filter(note => note.category === "personal");
  const starredNotes = filteredNotes.filter(note => note.starred);

  const allTags = [...new Set(notes.flatMap(note => note.tags))];

  const toggleStar = (id: string) => {
    setNotesList(notes =>
      notes.map(note =>
        note.id === id ? { ...note, starred: !note.starred } : note
      )
    );
  };

  const NoteCard = ({ note }: { note: typeof notes[0] }) => (
    <Card className="glass-effect border-0 shadow-card hover:shadow-float transition-smooth">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg flex items-center gap-2">
              {note.title}
              {note.starred && <Star className="h-4 w-4 text-warning fill-warning" />}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Updated {new Date(note.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => toggleStar(note.id)}>
                <Star className="h-4 w-4 mr-2" />
                {note.starred ? "Unstar" : "Star"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {note.content}
        </p>
        <div className="flex flex-wrap gap-1">
          {note.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs cursor-pointer hover:bg-primary/10"
              onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            Notes
          </h1>
          <p className="text-muted-foreground mt-1">
            Capture and organize your thoughts
          </p>
        </div>
        <QuickAddDialog>
          <Button variant="primary" className="shadow-glow">
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </QuickAddDialog>
      </div>

      {/* Search and Filters */}
      <Card className="glass-effect border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            {/* Tag filters */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedTag === "" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedTag("")}
              >
                All Tags
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({filteredNotes.length})</TabsTrigger>
          <TabsTrigger value="starred">Starred ({starredNotes.length})</TabsTrigger>
          <TabsTrigger value="work">Work ({workNotes.length})</TabsTrigger>
          <TabsTrigger value="personal">Personal ({personalNotes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </TabsContent>

        <TabsContent value="starred" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {starredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </TabsContent>

        <TabsContent value="work" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </TabsContent>

        <TabsContent value="personal" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {personalNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </TabsContent>
      </Tabs>

      {filteredNotes.length === 0 && (
        <Card className="glass-effect border-0 shadow-card">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No notes found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedTag 
                ? "Try adjusting your search or filter criteria" 
                : "Create your first note to get started"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Notes;