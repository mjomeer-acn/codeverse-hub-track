
import React, { useState } from 'react';
import TeamSidebar from '@/components/team/TeamSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save, Upload } from 'lucide-react';

const TeamProfile = () => {
  const [teamName, setTeamName] = useState('Neural Ninjas');
  const [description, setDescription] = useState('A dynamic team of AI enthusiasts pushing the boundaries of machine learning and neural networks.');
  const [teamPhoto, setTeamPhoto] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log('Saving profile:', { teamName, description, teamPhoto });
    
    toast({
      title: "Success",
      description: "Team profile updated successfully",
    });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server
      const reader = new FileReader();
      reader.onload = (e) => {
        setTeamPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload a high-quality photo of your team (max 5MB)
                  </p>
                </div>

                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Photo
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
