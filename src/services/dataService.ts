
import mockData from '../data/mockData.json';

export interface User {
  role: 'admin' | 'team_lead';
  email?: string;
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

// Store for in-memory modifications
let modifiedData = JSON.parse(JSON.stringify(mockData));

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const dataService = {
  // Auth
  async authenticateUser(identifier: string, password: string): Promise<User | null> {
    await delay(500);
    const user = modifiedData.users.find((u: any) => 
      u.email === identifier && u.password === password
    );
    return user ? user as User : null;
  },

  // Teams
  async getTeams(): Promise<Team[]> {
    await delay(300);
    return modifiedData.teams as Team[];
  },

  async getTeamById(id: number): Promise<Team | null> {
    await delay(300);
    const team = modifiedData.teams.find((team: any) => team.id === id);
    return team ? team as Team : null;
  },

  async updateTeam(id: number, updates: Partial<Team>): Promise<Team> {
    await delay(300);
    const teamIndex = modifiedData.teams.findIndex((t: any) => t.id === id);
    if (teamIndex !== -1) {
      modifiedData.teams[teamIndex] = { ...modifiedData.teams[teamIndex], ...updates };
    }
    return modifiedData.teams[teamIndex] as Team;
  },

  // Challenges
  async getChallenges(): Promise<Challenge[]> {
    await delay(300);
    return modifiedData.challenges.filter((challenge: any) => challenge.isVisible) as Challenge[];
  },

  async getAllChallenges(): Promise<Challenge[]> {
    await delay(300);
    return modifiedData.challenges as Challenge[];
  },

  async getChallengeById(id: number): Promise<Challenge | null> {
    await delay(300);
    const challenge = modifiedData.challenges.find((challenge: any) => challenge.id === id);
    return challenge ? challenge as Challenge : null;
  },

  async updateChallenge(id: number, updates: Partial<Challenge>): Promise<Challenge> {
    await delay(300);
    const challengeIndex = modifiedData.challenges.findIndex((c: any) => c.id === id);
    if (challengeIndex !== -1) {
      modifiedData.challenges[challengeIndex] = { ...modifiedData.challenges[challengeIndex], ...updates };
    }
    return modifiedData.challenges[challengeIndex] as Challenge;
  },

  // Leaderboard
  async getLeaderboard(): Promise<(Team & { totalPoints: number })[]> {
    await delay(300);
    const teams = modifiedData.teams as Team[];
    const leaderboard = teams.map(team => ({
      ...team,
      totalPoints: team.points
    }));
    return leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
  },

  // Dashboard Stats
  async getDashboardStats(): Promise<{
    totalTeams: number;
    activeChallenges: number;
    totalPointsAwarded: number;
    daysRemaining: number;
  }> {
    await delay(300);
    const teams = modifiedData.teams as Team[];
    const challenges = modifiedData.challenges.filter((c: any) => c.isVisible) as Challenge[];
    const totalPoints = teams.reduce((sum, team) => sum + team.points, 0);
    
    return {
      totalTeams: teams.length,
      activeChallenges: challenges.length,
      totalPointsAwarded: totalPoints,
      daysRemaining: 7
    };
  },

  // Get challenges for a team
  async getTeamChallenges(teamId: number): Promise<Challenge[]> {
    await delay(300);
    const team = modifiedData.teams.find((t: any) => t.id === teamId);
    if (!team) return [];
    
    return modifiedData.challenges.filter((challenge: any) => 
      team.challenges.includes(challenge.id)
    ) as Challenge[];
  },

  // Get participating teams for a challenge
  async getChallengeTeams(challengeId: number): Promise<Team[]> {
    await delay(300);
    return modifiedData.teams.filter((team: any) => 
      team.challenges.includes(challengeId)
    ) as Team[];
  },

  // Team members
  async addTeamMember(teamId: number, member: TeamMember): Promise<void> {
    await delay(300);
    const teamIndex = modifiedData.teams.findIndex((t: any) => t.id === teamId);
    if (teamIndex !== -1 && modifiedData.teams[teamIndex].members.length < 4) {
      modifiedData.teams[teamIndex].members.push(member);
    }
  },

  async removeTeamMember(teamId: number, memberIndex: number): Promise<void> {
    await delay(300);
    const teamIndex = modifiedData.teams.findIndex((t: any) => t.id === teamId);
    if (teamIndex !== -1) {
      modifiedData.teams[teamIndex].members.splice(memberIndex, 1);
    }
  },

  // Assign points
  async assignPoints(teamId: number, points: number, description?: string): Promise<void> {
    await delay(300);
    const teamIndex = modifiedData.teams.findIndex((t: any) => t.id === teamId);
    if (teamIndex !== -1) {
      modifiedData.teams[teamIndex].points += points;
    }
  }
};
