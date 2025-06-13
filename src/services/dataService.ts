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

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const dataService = {
  // Auth
  async authenticateUser(identifier: string, password: string): Promise<User | null> {
    await delay(500);
    const user = mockData.users.find(u => 
      u.email === identifier && u.password === password
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

  async updateTeam(id: number, updates: Partial<Team>): Promise<Team> {
    await delay(300);
    // In a real app, this would update the database
    const team = mockData.teams.find(t => t.id === id);
    if (team) {
      Object.assign(team, updates);
    }
    return team as Team;
  },

  // Challenges
  async getChallenges(): Promise<Challenge[]> {
    await delay(300);
    return mockData.challenges.filter(challenge => challenge.isVisible) as Challenge[];
  },

  async getAllChallenges(): Promise<Challenge[]> {
    await delay(300);
    return mockData.challenges as Challenge[];
  },

  async getChallengeById(id: number): Promise<Challenge | null> {
    await delay(300);
    const challenge = mockData.challenges.find(challenge => challenge.id === id);
    return challenge ? challenge as Challenge : null;
  },

  async updateChallenge(id: number, updates: Partial<Challenge>): Promise<Challenge> {
    await delay(300);
    const challenge = mockData.challenges.find(c => c.id === id);
    if (challenge) {
      Object.assign(challenge, updates);
    }
    return challenge as Challenge;
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

  // Dashboard Stats
  async getDashboardStats(): Promise<{
    totalTeams: number;
    activeChallenges: number;
    totalPointsAwarded: number;
    daysRemaining: number;
  }> {
    await delay(300);
    const teams = mockData.teams as Team[];
    const challenges = mockData.challenges.filter(c => c.isVisible) as Challenge[];
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
  },

  // Team members
  async addTeamMember(teamId: number, member: TeamMember): Promise<void> {
    await delay(300);
    const team = mockData.teams.find(t => t.id === teamId);
    if (team && team.members.length < 4) {
      team.members.push(member);
    }
  },

  async removeTeamMember(teamId: number, memberIndex: number): Promise<void> {
    await delay(300);
    const team = mockData.teams.find(t => t.id === teamId);
    if (team) {
      team.members.splice(memberIndex, 1);
    }
  },

  // Assign points
  async assignPoints(teamId: number, points: number, description?: string): Promise<void> {
    await delay(300);
    const team = mockData.teams.find(t => t.id === teamId);
    if (team) {
      team.points += points;
    }
  }
};
