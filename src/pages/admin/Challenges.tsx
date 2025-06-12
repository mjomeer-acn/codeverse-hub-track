
import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { dataService } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const AdminChallenges = () => {
  const [visibilityChanges, setVisibilityChanges] = useState<Record<number, boolean>>({});
  const { toast } = useToast();

  const { data: challenges, isLoading } = useQuery({
    queryKey: ['admin-all-challenges'],
    queryFn: async () => {
      // Get all challenges including hidden ones for admin
      const mockData = await import('@/data/mockData.json');
      return mockData.challenges;
    },
  });

  const handleVisibilityChange = (challengeId: number, isVisible: boolean) => {
    setVisibilityChanges(prev => ({
      ...prev,
      [challengeId]: isVisible
    }));
  };

  const handleSaveChanges = () => {
    // In a real app, this would make API calls to update challenge visibility
    console.log('Saving visibility changes:', visibilityChanges);
    
    toast({
      title: "Success",
      description: "Challenge visibility updated successfully",
    });

    setVisibilityChanges({});
  };

  const hasChanges = Object.keys(visibilityChanges).length > 0;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Manage Challenges</h1>
              <p className="text-muted-foreground">Control challenge visibility and public access</p>
            </div>
            {hasChanges && (
              <Button onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {challenges?.map((challenge: any) => {
              const currentVisibility = visibilityChanges[challenge.id] ?? challenge.isVisible;
              
              return (
                <Card key={challenge.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{challenge.title}</span>
                      <Badge variant={currentVisibility ? "default" : "secondary"}>
                        {currentVisibility ? "Public" : "Hidden"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Difficulty:</span> {challenge.difficulty}
                      </div>
                      <div>
                        <span className="font-medium">Category:</span> {challenge.category}
                      </div>
                      <div>
                        <span className="font-medium">Max Points:</span> {challenge.maxPoints}
                      </div>
                      <div>
                        <span className="font-medium">Participants:</span> {challenge.participatingTeams}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`visibility-${challenge.id}`}>
                          Public Visibility
                        </Label>
                        <Switch
                          id={`visibility-${challenge.id}`}
                          checked={currentVisibility}
                          onCheckedChange={(checked) => handleVisibilityChange(challenge.id, checked)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {currentVisibility 
                          ? "Challenge is visible to all teams" 
                          : "Challenge is hidden from teams"
                        }
                      </p>
                    </div>

                    {challenge.requirements && (
                      <div>
                        <span className="font-medium text-sm">Requirements:</span>
                        <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                          {challenge.requirements.map((req: string, index: number) => (
                            <li key={index}>• {req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminChallenges;
