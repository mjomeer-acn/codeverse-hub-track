
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Trophy, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    challenges: number[];
    avatar: string;
    photo?: string;
    // Support for Supabase data structure
    team_members?: TeamMember[];
    team_challenges?: { challenge_id: string }[];
  };
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  // Handle both mock data and Supabase data structures
  const members = team.members || team.team_members || [];
  const challengeCount = team.challenges?.length || team.team_challenges?.length || 0;

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
      <CardHeader className="relative">
        {team.photo && (
          <div className="absolute inset-0 rounded-t-lg overflow-hidden">
            <img 
              src={team.photo} 
              alt={`${team.name} team photo`}
              className="w-full h-32 object-cover opacity-10 group-hover:opacity-20 transition-opacity"
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
                <span>{members.length} members</span>
                <Trophy className="h-4 w-4 ml-2" />
                <span>{team.points?.toLocaleString() || 0} points</span>
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
            {members.length > 0 ? (
              members.map((member, index) => (
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
              ))
            ) : (
              <p className="text-xs text-muted-foreground">No members added yet</p>
            )}
          </div>
        </div>

        {/* Active Challenges Count */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Active Challenges</h4>
          <Badge variant="outline" className="text-xs">
            {challengeCount} challenges
          </Badge>
        </div>

        {/* View Details Button */}
        <Button 
          variant="outline" 
          className="w-full border-codeverse-accent text-codeverse-accent hover:bg-codeverse-accent hover:text-white"
          asChild
        >
          <Link to={`/teams/${team.id}`}>
            View Team Profile
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
