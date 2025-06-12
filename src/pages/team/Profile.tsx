
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TeamSidebar from '@/components/team/TeamSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save, Upload } from 'lucide-react';
import { teamsService } from '@/services/supabaseService';
import { useAuth } from '@/hooks/useAuth';

const TeamProfile = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState<any>(null);
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [teamPhoto, setTeamPhoto] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (teamId) {
      fetchTeam();
    }
  }, [teamId]);

  const fetchTeam = async () => {
    try {
      const data = await teamsService.getTeamById(teamId!);
      setTeam(data);
      setTeamName(data.name);
      setDescription(data.description || '');
      setTeamPhoto(data.photo || '');
    } catch (error) {
      console.error('Error fetching team:', error);
      toast({
        title: "Error",
        description: "Failed to fetch team data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await teamsService.updateTeam(teamId!, {
        name: teamName,
        description,
        photo: teamPhoto
      });
      
      toast({
        title: "Success",
        description: "Team profile updated successfully",
      });
      
      fetchTeam();
    } catch (error) {
      console.error('Error updating team:', error);
      toast({
        title: "Error",
        description: "Failed to update team profile",
        variant: "destructive",
      });
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const photoUrl = await teamsService.uploadTeamPhoto(teamId!, file);
      setTeamPhoto(photoUrl);
      
      toast({
        title: "Success",
        description: "Photo uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: "Error",
        description: "Failed to upload photo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <TeamSidebar />
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
      <TeamSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text">Manage Profile</h1>
            <p className="text-muted-foreground">Update your team information and branding</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Team Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe your team's mission, skills, and approach..."
                  />
                </div>

                <Button onClick={handleSave} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Photo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  {teamPhoto ? (
                    <img
                      src={teamPhoto}
                      alt="Team photo"
                      className="max-w-full h-48 object-cover mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="h-48 flex items-center justify-center text-muted-foreground">
                      No team photo uploaded
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="photo">Upload Team Photo</Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="mt-1"
                    disabled={uploading}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload a high-quality photo of your team (max 5MB)
                  </p>
                </div>

                <Button variant="outline" className="w-full" disabled={uploading}>
                  <Upload className="mr-2 h-4 w-4" />
                  {uploading ? 'Uploading...' : 'Upload New Photo'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamProfile;
