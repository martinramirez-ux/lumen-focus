import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  password: z.string().min(8, "Password must be at least 8 characters").max(128, "Password must be less than 128 characters"),
  displayName: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters")
});

const signinSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  password: z.string().min(1, "Password is required").max(128, "Password must be less than 128 characters")
});

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Validate signup inputs
        const validationResult = signupSchema.safeParse({
          email,
          password,
          displayName
        });

        if (!validationResult.success) {
          const firstError = validationResult.error.errors[0];
          toast({ 
            title: "Validation Error", 
            description: firstError.message, 
            variant: "destructive" 
          });
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({ 
          email: validationResult.data.email, 
          password: validationResult.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              display_name: validationResult.data.displayName,
            },
          },
        });
        if (error) throw error;
        toast({ title: "Account created! You can now sign in." });
      } else {
        // Validate signin inputs
        const validationResult = signinSchema.safeParse({
          email,
          password
        });

        if (!validationResult.success) {
          const firstError = validationResult.error.errors[0];
          toast({ 
            title: "Validation Error", 
            description: firstError.message, 
            variant: "destructive" 
          });
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signInWithPassword({ 
          email: validationResult.data.email, 
          password: validationResult.data.password 
        });
        if (error) throw error;
        toast({ title: "Welcome to Clario!" });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-primary">Clario</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <Label htmlFor="displayName">Name</Label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
          </Button>
        </form>
      </div>
    </div>
  );
};
