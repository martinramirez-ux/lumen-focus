import { useState } from "react";
import { 
  FolderOpen, 
  Plus, 
  Search, 
  Upload, 
  FileText, 
  Image, 
  Video, 
  Music,
  Archive,
  MoreHorizontal,
  Download,
  Share,
  Trash2,
  Grid3X3,
  List
} from "lucide-react";
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

const files: any[] = [];

const folders: any[] = [];

const Files = () => {
  const [filesList, setFilesList] = useState(files);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredFiles = filesList.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const documentFiles = filteredFiles.filter(file => file.category === "documents");
  const imageFiles = filteredFiles.filter(file => file.category === "images");
  const videoFiles = filteredFiles.filter(file => file.category === "videos");
  const sharedFiles = filteredFiles.filter(file => file.shared);

  const FileCard = ({ file }: { file: typeof files[0] }) => {
    const Icon = file.icon;
    
    if (viewMode === "list") {
      return (
        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-smooth border border-border/20">
          <Icon className="h-8 w-8 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate">{file.name}</h4>
            <p className="text-sm text-muted-foreground">
              {file.size} • Modified {new Date(file.modified).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {file.shared && (
              <Badge variant="outline" className="text-xs">
                Shared
              </Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      );
    }

    return (
      <Card className="glass-effect border-0 shadow-card hover:shadow-float transition-smooth cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <Icon className="h-8 w-8 text-primary" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <h4 className="font-medium mb-2 line-clamp-2">{file.name}</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>{file.size}</p>
            <p>Modified {new Date(file.modified).toLocaleDateString()}</p>
          </div>
          {file.shared && (
            <Badge variant="outline" className="text-xs mt-2">
              Shared
            </Badge>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FolderOpen className="h-8 w-8 text-primary" />
            Files
          </h1>
          <p className="text-muted-foreground mt-1">
            Organize and share your documents
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button variant="primary" className="shadow-glow">
            <Plus className="w-4 h-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Search and View Controls */}
      <Card className="glass-effect border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search files and folders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-1">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Folders */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Folders</h2>
        <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-4" : "space-y-2"}>
          {folders.map((folder) => (
            <Card key={folder.id} className="glass-effect border-0 shadow-card hover:shadow-float transition-smooth cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <FolderOpen className="h-8 w-8 text-accent" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium">{folder.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {folder.count} items
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Files Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({filteredFiles.length})</TabsTrigger>
          <TabsTrigger value="documents">Documents ({documentFiles.length})</TabsTrigger>
          <TabsTrigger value="images">Images ({imageFiles.length})</TabsTrigger>
          <TabsTrigger value="videos">Videos ({videoFiles.length})</TabsTrigger>
          <TabsTrigger value="shared">Shared ({sharedFiles.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-2"}>
            {filteredFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-2"}>
            {documentFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="images">
          <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-2"}>
            {imageFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-2"}>
            {videoFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shared">
          <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-2"}>
            {sharedFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredFiles.length === 0 && (
        <Card className="glass-effect border-0 shadow-card">
          <CardContent className="p-8 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No files found</h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? "Try adjusting your search criteria" 
                : "Upload your first file to get started"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Files;