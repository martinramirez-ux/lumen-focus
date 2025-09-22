import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Code2, Briefcase, Mail, Linkedin } from "lucide-react";

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "FlowSpace - AI-Powered Productivity Workspace",
      description: "A comprehensive productivity application featuring AI-powered task management, smart scheduling, team collaboration tools, and integrated calendar functionality for busy professionals.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "React Router", "Lucide Icons"],
      features: [
        "AI-powered task prioritization",
        "Smart calendar integration", 
        "Team collaboration tools",
        "Real-time notifications",
        "Responsive design",
        "Dark/Light mode"
      ],
      demoLink: "/",
      isCurrentApp: true,
      status: "Live",
      category: "Web Application"
    },
    {
      id: 2,
      title: "E-Commerce Dashboard",
      description: "Modern e-commerce analytics dashboard with real-time sales tracking, inventory management, and customer insights.",
      technologies: ["React", "Next.js", "TypeScript", "PostgreSQL", "Stripe API"],
      features: [
        "Real-time analytics",
        "Inventory tracking",
        "Payment processing",
        "Customer management"
      ],
      status: "In Development",
      category: "Dashboard"
    },
    {
      id: 3,
      title: "Social Media Manager",
      description: "Multi-platform social media management tool with content scheduling, analytics, and engagement tracking.",
      technologies: ["Vue.js", "Node.js", "MongoDB", "Socket.io"],
      features: [
        "Multi-platform posting",
        "Content scheduling",
        "Analytics dashboard",
        "Team collaboration"
      ],
      status: "Completed",
      category: "SaaS Platform"
    }
  ];

  const skills = [
    "React", "TypeScript", "JavaScript", "Node.js", "Python", 
    "Tailwind CSS", "Next.js", "Vue.js", "PostgreSQL", "MongoDB",
    "AWS", "Docker", "Git", "Figma", "REST APIs"
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12 bg-gradient-to-br from-primary/10 via-accent/5 to-background rounded-lg border">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Full Stack Developer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating exceptional digital experiences with modern technologies and clean, efficient code.
          </p>
        </div>
        
        <div className="flex justify-center gap-4 pt-4">
          <Button variant="outline" size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Contact Me
          </Button>
          <Button variant="outline" size="sm">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
          <Button variant="outline" size="sm">
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
        </div>
      </div>

      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Technical Skills
          </CardTitle>
          <CardDescription>
            Technologies and tools I work with
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projects Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Briefcase className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Featured Projects</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id} className={project.isCurrentApp ? "border-primary shadow-lg" : ""}>
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg leading-tight">
                      {project.title}
                      {project.isCurrentApp && (
                        <Badge variant="default" className="ml-2 text-xs">
                          Current App
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                      <Badge 
                        variant={project.status === "Live" ? "default" : 
                                project.status === "In Development" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {project.demoLink && (
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.location.href = project.demoLink}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {project.isCurrentApp ? "Explore App" : "View Demo"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader className="text-center">
          <CardTitle>Let's Work Together</CardTitle>
          <CardDescription>
            I'm always interested in new opportunities and exciting projects
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Whether you have a project in mind or just want to chat about technology, 
            I'd love to hear from you.
          </p>
          <Button variant="default">
            <Mail className="w-4 h-4 mr-2" />
            Get In Touch
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;