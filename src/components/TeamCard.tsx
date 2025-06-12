
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Trophy, ExternalLink } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

interface TeamCardProps {
  team: {
    id: number;
    name: string;
    description: string;
    members: TeamMember[];
    points: number;
    challenges: string[];
    avatar: string;
    photo?: string;
  };
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
      <CardHeader className="relative">
        {team.photo && (
          <div className="absolute inset-0 rounded-t-lg overflow-hidden">
            <img 
              src={team.photo} 
              alt={`${team.name} team photo`}
              className="w-full h-32 object-cover opacity-20 group-hover:opacity-30 transition-opacity"
            />
          </div>
        )}
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-2">
            <div className="text-3xl">{team.avatar}</div>
            <div>
              <CardTitle className="text-xl font-bold">{team.name}</CardTitle>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{team.members.length} members</span>
                <Trophy className="h-4 w-4 ml-2" />
                <span>{team.points.toLocaleString()} points</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          {team.description}
        </p>

        {/* Team Members */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Team Members</h4>
          <div className="flex flex-wrap gap-2">
            {team.members.map((member, index) => (
              <div 
                key={index}
                className="flex items-center space-x-2 bg-muted/50 rounded-lg px-2 py-1"
              >
                <span className="text-sm">{member.avatar}</span>
                <div className="text-xs">
                  <div className="font-medium">{member.name}</div>
                  <div className="text-muted-foreground">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Active Challenges</h4>
          <div className="flex flex-wrap gap-2">
            {team.challenges.map((challenge, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {challenge}
              </Badge>
            ))}
          </div>
        </div>

        {/* View Details Button */}
        <Button 
          variant="outline" 
          className="w-full border-codeverse-accent text-codeverse-accent hover:bg-codeverse-accent hover:text-white"
        >
          View Team Profile
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
