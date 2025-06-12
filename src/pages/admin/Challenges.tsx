
import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { challengesService } from '@/services/supabaseService';
import { supabase } from '@/integrations/supabase/client';

const AdminChallenges = () => {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [visibilityChanges, setVisibilityChanges] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchChallenges();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('challenges-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'challenges'
        },
        () => {
          fetchChallenges();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchChallenges = async () => {
    try {
      const data = await challengesService.getChallenges(true);
      setChallenges(data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
      toast({
        title: "Error",
        description: "Failed to fetch challenges",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVisibilityChange = (challengeId: string, isVisible: boolean) => {
    setVisibilityChanges(prev => ({
      ...prev,
      [challengeId]: isVisible
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const updatePromises = Object.entries(visibilityChanges).map(([challengeId, isVisible]) =>
        challengesService.updateChallenge(challengeId, { is_visible: isVisible })
      );

      await Promise.all(updatePromises);

      toast({
        title: "Success",
        description: "Challenge visibility updated successfully",
      });

      setVisibilityChanges({});
      fetchChallenges();
    } catch (error) {
      console.error('Error updating challenges:', error);
      toast({
        title: "Error",
        description: "Failed to update challenge visibility",
        variant: "destructive",
      });
    }
  };

  const hasChanges = Object.keys(visibilityChanges).length > 0;

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

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
            {challenges.map((challenge) => {
              const currentVisibility = visibilityChanges[challenge.id] ?? challenge.is_visible;
              
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
                        <span className="font-medium">Max Points:</span> {challenge.max_points}
                      </div>
                      <div>
                        <span className="font-medium">Participants:</span> {challenge.participating_teams}
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

                    {challenge.requirements && challenge.requirements.length > 0 && (
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
