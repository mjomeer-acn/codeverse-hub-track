
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchChallengeData();
    }
  }, [id]);

  const fetchChallengeData = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      console.log('Challenge Detail: Fetching challenge with ID:', id);
      
      const challengeData = await challengesService.getChallengeById(id);
      console.log('Challenge Detail: Received challenge data:', challengeData);
      
      setChallenge(challengeData);
    } catch (error) {
      console.error('Challenge Detail: Error fetching challenge:', error);
      setError('Failed to load challenge details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading challenge details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <div className="space-x-4">
                <button 
                  onClick={fetchChallengeData}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                >
                  Try Again
                </button>
                <Button asChild variant="outline">
                  <Link to="/challenges">Back to Challenges</Link>
                </Button>
              </div>
            </div>
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
                <div className="text-6xl">{challenge.icon || '🚀'}</div>
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
                        <div className="font-semibold">{challenge.participating_teams || 0}</div>
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
                {challenge.requirements && challenge.requirements.length > 0 ? (
                  <ul className="space-y-2">
                    {challenge.requirements.map((requirement: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-sm">No specific requirements listed</p>
                )}
              </CardContent>
            </Card>

            {/* Participating Teams */}
            <Card>
              <CardHeader>
                <CardTitle>Participating Teams</CardTitle>
              </CardHeader>
              <CardContent>
                {participatingTeams.length > 0 ? (
                  <div className="space-y-3">
                    {participatingTeams.map((team: any) => (
                      <div key={team.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {team.avatar || '🧠'}
                        </div>
                        <div>
                          <div className="font-medium">{team.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {team.points || 0} points
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No teams participating yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
