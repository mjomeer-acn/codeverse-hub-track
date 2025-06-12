
import mockData from '../data/mockData.json';

export interface User {
  role: 'admin' | 'team_lead';
  email?: string;
  accountId?: string;
  password: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

export interface Team {
  id: number;
  accountId: string;
  name: string;
  description: string;
  members: TeamMember[];
  points: number;
  challenges: number[];
  avatar: string;
  photo?: string;
}

export interface Challenge {
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
  status: string;
  requirements: string[];
}

export interface LeaderboardEntry {
  teamId: number;
  points: number;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const dataService = {
  // Auth
  async authenticateUser(identifier: string, password: string): Promise<User | null> {
    await delay(500);
    const user = mockData.users.find(u => 
      (u.email === identifier || u.accountId === identifier) && u.password === password
    );
    return user ? user as User : null;
  },

  // Teams
  async getTeams(): Promise<Team[]> {
    await delay(300);
    return mockData.teams as Team[];
  },

  async getTeamById(id: number): Promise<Team | null> {
    await delay(300);
    const team = mockData.teams.find(team => team.id === id);
    return team ? team as Team : null;
  },

  // Challenges
  async getChallenges(): Promise<Challenge[]> {
    await delay(300);
    return mockData.challenges.filter(challenge => challenge.isVisible) as Challenge[];
  },

  async getChallengeById(id: number): Promise<Challenge | null> {
    await delay(300);
    const challenge = mockData.challenges.find(challenge => challenge.id === id);
    return challenge ? challenge as Challenge : null;
  },

  // Leaderboard
  async getLeaderboard(): Promise<(Team & { totalPoints: number })[]> {
    await delay(300);
    const teams = mockData.teams as Team[];
    const leaderboard = teams.map(team => ({
      ...team,
      totalPoints: team.points
    }));
    return leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
  },

  // Get challenges for a team
  async getTeamChallenges(teamId: number): Promise<Challenge[]> {
    await delay(300);
    const team = mockData.teams.find(t => t.id === teamId);
    if (!team) return [];
    
    return mockData.challenges.filter(challenge => 
      team.challenges.includes(challenge.id)
    ) as Challenge[];
  },

  // Get participating teams for a challenge
  async getChallengeTeams(challengeId: number): Promise<Team[]> {
    await delay(300);
    return mockData.teams.filter(team => 
      team.challenges.includes(challengeId)
    ) as Team[];
  }
};
