
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { dataService } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent, role: string) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await dataService.authenticateUser(formData.identifier, formData.password);
      
      if (user && user.role === role) {
        toast({
          title: "Login successful",
          description: `Welcome ${role === 'admin' ? 'Admin' : 'Team Lead'}!`,
        });
        
        // Role-based redirection
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'team_lead') {
          navigate('/team/dashboard');
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials or incorrect role",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Form */}
        <Card className="bg-white/95 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center gradient-text">Login to CodeVerse 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="admin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="team-lead">Team Lead</TabsTrigger>
              </TabsList>
              
              <TabsContent value="admin" className="space-y-4">
                <form onSubmit={(e) => handleSubmit(e, 'admin')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="Enter admin email"
                      value={formData.identifier}
                      onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login as Admin'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="team-lead" className="space-y-4">
                <form onSubmit={(e) => handleSubmit(e, 'team_lead')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="team-id">Team Account ID</Label>
                    <Input
                      id="team-id"
                      type="text"
                      placeholder="Enter your team account ID"
                      value={formData.identifier}
                      onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-password">Team Password</Label>
                    <Input
                      id="team-password"
                      type="password"
                      placeholder="Enter team password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login as Team Lead'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Just browsing?{' '}
                <Link to="/" className="text-primary hover:underline">
                  Continue as public viewer
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
