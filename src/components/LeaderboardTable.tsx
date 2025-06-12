
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users } from 'lucide-react';
import { leaderboardService } from '@/services/supabaseService';

const LeaderboardTable = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Leaderboard: Starting to fetch leaderboard data...');
      
      const data = await leaderboardService.getLeaderboard();
      console.log('Leaderboard: Received leaderboard data:', data);
      
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Leaderboard: Error fetching leaderboard:', error);
      setError('Failed to load leaderboard. Please try again.');
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchLeaderboard}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500 text-white';
      case 2:
        return 'bg-gray-400 text-white';
      case 3:
        return 'bg-amber-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return <Trophy className="h-4 w-4" />;
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {leaderboard && leaderboard.length > 0 ? (
        leaderboard.map((team, index) => {
          const rank = index + 1;
          return (
            <Card key={team.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge className={`${getRankBadgeColor(rank)} flex items-center space-x-1`}>
                      {getRankIcon(rank)}
                      <span>#{rank}</span>
                    </Badge>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {team.avatar || '🧠'}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{team.name || 'Unnamed Team'}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{team.members?.length || 0} members</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {team.totalPoints || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">points</div>
                  </div>
                </div>

                {team.description && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">{team.description}</p>
                  </div>
                )}

                {team.members && team.members.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex flex-wrap gap-2">
                      {team.members.map((member: any, memberIndex: number) => (
                        <div key={memberIndex} className="bg-muted px-2 py-1 rounded text-sm">
                          {member.avatar} {member.name} - {member.role}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No teams found in leaderboard</p>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;
