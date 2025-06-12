
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, UserCheck, Shield } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    teamId: ''
  });

  const handleSubmit = (e: React.FormEvent, role: string) => {
    e.preventDefault();
    console.log(`Attempting ${role} login with:`, formData);
    // Here you would typically handle the authentication
  };

  const roleInfo = [
    {
      role: 'admin',
      icon: Shield,
      title: 'Admin Access',
      description: 'Manage teams, challenges, and leaderboard',
      permissions: ['Manage Teams', 'Assign Points', 'Control Challenge Visibility', 'Full Dashboard Access']
    },
    {
      role: 'team-lead',
      icon: UserCheck,
      title: 'Team Lead',
      description: 'Manage your team profile and submissions',
      permissions: ['Edit Team Profile', 'Manage Team Members', 'Upload Team Photos', 'Submit Solutions']
    },
    {
      role: 'public',
      icon: User,
      title: 'Public View',
      description: 'View leaderboard, teams, and public challenges',
      permissions: ['View Leaderboard', 'Browse Teams', 'See Public Challenges', 'No Login Required']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Back to Home */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="text-white hover:bg-white/10">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Role Information */}
          <div className="space-y-4">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">Access CodeVerse 2025</h1>
              <p className="text-white/80">Choose your access level based on your role</p>
            </div>
            
            <div className="space-y-4">
              {roleInfo.map((info) => (
                <Card key={info.role} className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-white/20">
                        <info.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{info.title}</h3>
                        <p className="text-sm text-white/70 mb-2">{info.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {info.permissions.map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs bg-white/20 text-white">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <Card className="bg-white/95 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center gradient-text">Login</CardTitle>
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
                      <Label htmlFor="admin-username">Admin Username</Label>
                      <Input
                        id="admin-username"
                        type="text"
                        placeholder="Enter admin username"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
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
                    <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                      Login as Admin
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="team-lead" className="space-y-4">
                  <form onSubmit={(e) => handleSubmit(e, 'team-lead')} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="team-id">Team ID</Label>
                      <Input
                        id="team-id"
                        type="text"
                        placeholder="Enter your team ID"
                        value={formData.teamId}
                        onChange={(e) => setFormData({...formData, teamId: e.target.value})}
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
                    <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                      Login as Team Lead
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
    </div>
  );
};

export default Login;
