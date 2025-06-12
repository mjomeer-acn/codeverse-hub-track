
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Trophy, Eye } from 'lucide-react';

interface ChallengeCardProps {
  challenge: {
    id: number;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
    timeRemaining: string;
    participatingTeams: number;
    maxPoints: number;
    isVisible: boolean;
    icon: string;
  };
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{challenge.icon}</div>
            <div>
              <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                {challenge.title}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {challenge.category}
                </Badge>
                <Badge className={`text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </Badge>
              </div>
            </div>
          </div>
          
          {challenge.isVisible && (
            <div className="flex items-center space-x-1 text-green-600">
              <Eye className="h-4 w-4" />
              <span className="text-xs font-medium">Public</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          {challenge.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center text-muted-foreground">
              <Clock className="h-4 w-4" />
            </div>
            <div className="text-xs text-muted-foreground">Time Left</div>
            <div className="text-sm font-semibold">{challenge.timeRemaining}</div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-center text-muted-foreground">
              <Users className="h-4 w-4" />
            </div>
            <div className="text-xs text-muted-foreground">Teams</div>
            <div className="text-sm font-semibold">{challenge.participatingTeams}</div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-center text-muted-foreground">
              <Trophy className="h-4 w-4" />
            </div>
            <div className="text-xs text-muted-foreground">Max Points</div>
            <div className="text-sm font-semibold">{challenge.maxPoints}</div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full bg-gradient-primary hover:opacity-90 text-white"
        >
          View Challenge Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
