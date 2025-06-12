
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Award, ArrowUpDown } from 'lucide-react';

interface Team {
  id: number;
  name: string;
  points: number;
  challenges: string[];
  members: number;
  avatar: string;
}

const LeaderboardTable = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const mockTeams: Team[] = [
    { id: 1, name: 'Neural Ninjas', points: 2850, challenges: ['AI Challenge', 'Web Dev', 'Data Science'], members: 4, avatar: '🧠' },
    { id: 2, name: 'Code Crusaders', points: 2720, challenges: ['Web Dev', 'Mobile Dev'], members: 5, avatar: '⚔️' },
    { id: 3, name: 'Pixel Pioneers', points: 2650, challenges: ['UI/UX', 'Web Dev', 'Game Dev'], members: 3, avatar: '🎨' },
    { id: 4, name: 'Quantum Queriers', points: 2480, challenges: ['Data Science', 'AI Challenge'], members: 4, avatar: '🔬' },
    { id: 5, name: 'Binary Builders', points: 2350, challenges: ['Web Dev', 'Backend'], members: 4, avatar: '🏗️' },
    { id: 6, name: 'Lambda Legends', points: 2180, challenges: ['Functional Programming'], members: 3, avatar: 'λ' },
    { id: 7, name: 'Stack Overflow', points: 1950, challenges: ['Full Stack'], members: 5, avatar: '📚' },
    { id: 8, name: 'Debug Dragons', points: 1820, challenges: ['Bug Hunt', 'Web Dev'], members: 4, avatar: '🐉' },
  ];

  const sortedTeams = [...mockTeams].sort((a, b) => {
    return sortOrder === 'desc' ? b.points - a.points : a.points - b.points;
  });

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1: return <Medal className="h-6 w-6 text-gray-400" />;
      case 2: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <span className="h-6 w-6 flex items-center justify-center text-sm font-bold text-muted-foreground">#{index + 1}</span>;
    }
  };

  const getRankBadgeColor = (index: number) => {
    switch (index) {
      case 0: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 1: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 2: return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default: return 'bg-gradient-primary';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold gradient-text">Leaderboard</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            Sort by Points
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedTeams.map((team, index) => (
            <div
              key={team.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${
                index < 3 ? 'bg-gradient-card border-codeverse-accent/30' : 'bg-card'
              }`}
            >
              <div className="flex items-center space-x-4">
                {/* Rank */}
                <div className="flex items-center justify-center w-12 h-12">
                  {getRankIcon(index)}
                </div>
                
                {/* Team Info */}
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{team.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{team.name}</h3>
                    <p className="text-sm text-muted-foreground">{team.members} members</p>
                  </div>
                </div>
              </div>

              {/* Challenges and Points */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex flex-wrap gap-1">
                  {team.challenges.slice(0, 3).map((challenge, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {challenge}
                    </Badge>
                  ))}
                  {team.challenges.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{team.challenges.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="text-right">
                  <div className={`text-2xl font-bold text-white px-3 py-1 rounded-full ${getRankBadgeColor(index)}`}>
                    {team.points.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">points</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardTable;
