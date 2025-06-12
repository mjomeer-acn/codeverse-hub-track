
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, Trophy, CheckCircle } from 'lucide-react';
import { challengesService } from '@/services/supabaseService';

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallengeData = async () => {
      if (!id) return;
      
      try {
        const challengeData = await challengesService.getChallengeById(id);
        setChallenge(challengeData);
      } catch (error) {
        console.error('Error fetching challenge data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallengeData();
  }, [id]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Challenge not found</h1>
            <Button asChild className="mt-4">
              <Link to="/challenges">Back to Challenges</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const participatingTeams = challenge.team_challenges?.map((tc: any) => tc.teams) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Back Button */}
          <Button variant="ghost" asChild>
            <Link to="/challenges">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Challenges
            </Link>
          </Button>

          {/* Challenge Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start space-x-4">
                <div className="text-6xl">{challenge.icon}</div>
                <div className="flex-1">
                  <CardTitle className="text-3xl font-bold gradient-text mb-2">
                    {challenge.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge variant="outline">{challenge.category}</Badge>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="secondary" className="capitalize">
                      {challenge.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Time Remaining</div>
                        <div className="font-semibold">{challenge.time_remaining || 'No limit'}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Participating Teams</div>
                        <div className="font-semibold">{participatingTeams.length}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Maximum Points</div>
                        <div className="font-semibold">{challenge.max_points}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {challenge.description}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Challenge Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {challenge.requirements?.map((requirement: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{requirement}</span>
                    </div>
                  )) || (
                    <p className="text-muted-foreground">No specific requirements listed</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Participating Teams */}
            <Card>
              <CardHeader>
                <CardTitle>Participating Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {participatingTeams.map((team: any) => (
                    <Link
                      key={team.id}
                      to={`/teams/${team.id}`}
                      className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <span className="text-2xl">{team.avatar}</span>
                      <div className="flex-1">
                        <div className="font-medium">{team.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {team.points} points
                        </div>
                      </div>
                    </Link>
                  ))}
                  {participatingTeams.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      No teams participating yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
