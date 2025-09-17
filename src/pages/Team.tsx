import { useState } from "react";
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  MoreHorizontal,
  UserPlus,
  Settings,
  Crown,
  Shield,
  User,
  MessageSquare,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const teamMembers = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@flowspace.com",
    role: "Product Manager",
    department: "Product",
    status: "online",
    avatar: "/api/placeholder/40/40",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "2023-01-15",
    permissions: "admin",
    tasksCompleted: 48,
    currentProjects: ["Q4 Roadmap", "User Research"],
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.chen@flowspace.com",
    role: "Senior Designer",
    department: "Design",
    status: "online",
    avatar: "/api/placeholder/40/40",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    joinDate: "2023-03-20",
    permissions: "editor",
    tasksCompleted: 72,
    currentProjects: ["Design System", "Mobile App"],
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike.davis@flowspace.com",
    role: "Senior Developer",
    department: "Engineering",
    status: "away",
    avatar: "/api/placeholder/40/40",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    joinDate: "2022-11-10",
    permissions: "editor",
    tasksCompleted: 91,
    currentProjects: ["API v2", "Performance Optimization"],
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@flowspace.com",
    role: "Marketing Manager",
    department: "Marketing",
    status: "offline",
    avatar: "/api/placeholder/40/40",
    phone: "+1 (555) 456-7890",
    location: "Los Angeles, CA",
    joinDate: "2023-05-08",
    permissions: "viewer",
    tasksCompleted: 34,
    currentProjects: ["Q4 Campaign", "Content Strategy"],
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@flowspace.com",
    role: "Data Analyst",
    department: "Analytics",
    status: "online",
    avatar: "/api/placeholder/40/40",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
    joinDate: "2023-07-12",
    permissions: "editor",
    tasksCompleted: 26,
    currentProjects: ["Analytics Dashboard", "User Insights"],
  },
];

const departments = [
  { name: "Product", count: 8, color: "bg-primary/10 text-primary" },
  { name: "Engineering", count: 12, color: "bg-success/10 text-success" },
  { name: "Design", count: 6, color: "bg-accent/10 text-accent" },
  { name: "Marketing", count: 4, color: "bg-warning/10 text-warning" },
  { name: "Analytics", count: 3, color: "bg-purple-100 text-purple-700" },
];

const statusColors = {
  online: "bg-success",
  away: "bg-warning",
  offline: "bg-muted-foreground",
};

const permissionIcons = {
  admin: Crown,
  editor: Shield,
  viewer: User,
};

const Team = () => {
  const [membersList, setMembersList] = useState(teamMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const filteredMembers = membersList.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const onlineMembers = filteredMembers.filter(member => member.status === "online");
  const adminMembers = filteredMembers.filter(member => member.permissions === "admin");

  const TeamMemberCard = ({ member }: { member: typeof teamMembers[0] }) => {
    const PermissionIcon = permissionIcons[member.permissions as keyof typeof permissionIcons];
    
    return (
      <Card className="glass-effect border-0 shadow-card hover:shadow-float transition-smooth">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${statusColors[member.status as keyof typeof statusColors]}`}></div>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  {member.name}
                  <PermissionIcon className="h-4 w-4 text-muted-foreground" />
                </h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <Badge variant="outline" className="text-xs mt-1">
                  {member.department}
                </Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Permissions
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{member.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{member.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{member.location}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Tasks Completed</p>
                <p className="font-medium">{member.tasksCompleted}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Projects</p>
                <p className="font-medium">{member.currentProjects.length}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-muted-foreground text-xs mb-1">Current Projects</p>
              <div className="flex flex-wrap gap-1">
                {member.currentProjects.map((project) => (
                  <Badge key={project} variant="secondary" className="text-xs">
                    {project}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
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
            <Users className="h-8 w-8 text-primary" />
            Team
          </h1>
          <p className="text-muted-foreground mt-1">
            Collaborate with your team members
          </p>
        </div>
        <Button variant="primary" className="shadow-glow">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {departments.map((dept) => (
          <Card key={dept.name} className="glass-effect border-0 shadow-card cursor-pointer hover:shadow-float transition-smooth"
                onClick={() => setSelectedDepartment(selectedDepartment === dept.name ? "" : dept.name)}>
            <CardContent className="p-4 text-center">
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${dept.color} mb-2`}>
                <Users className="h-4 w-4" />
              </div>
              <h3 className="font-medium">{dept.name}</h3>
              <p className="text-sm text-muted-foreground">{dept.count} members</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="glass-effect border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            {/* Department filters */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedDepartment === "" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedDepartment("")}
              >
                All Departments
              </Badge>
              {departments.map((dept) => (
                <Badge
                  key={dept.name}
                  variant={selectedDepartment === dept.name ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedDepartment(selectedDepartment === dept.name ? "" : dept.name)}
                >
                  {dept.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Members ({filteredMembers.length})</TabsTrigger>
          <TabsTrigger value="online">Online ({onlineMembers.length})</TabsTrigger>
          <TabsTrigger value="admins">Admins ({adminMembers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </TabsContent>

        <TabsContent value="online" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {onlineMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </TabsContent>

        <TabsContent value="admins" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </TabsContent>
      </Tabs>

      {filteredMembers.length === 0 && (
        <Card className="glass-effect border-0 shadow-card">
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No team members found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedDepartment 
                ? "Try adjusting your search or filter criteria" 
                : "Invite your first team member to get started"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Team;