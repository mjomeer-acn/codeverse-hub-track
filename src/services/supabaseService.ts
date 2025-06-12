
import { supabase } from '@/integrations/supabase/client';

// Teams service
export const teamsService = {
  async getTeams() {
    const { data, error } = await supabase
      .from('teams')
      .select(`
        *,
        team_members(*),
        team_challenges(challenge_id)
      `);
    
    if (error) throw error;
    return data;
  },

  async getTeamById(id: string) {
    const { data, error } = await supabase
      .from('teams')
      .select(`
        *,
        team_members(*),
        team_challenges(
          challenge_id,
          challenges(*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateTeam(id: string, updates: any) {
    const { data, error } = await supabase
      .from('teams')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async uploadTeamPhoto(teamId: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${teamId}-${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('team-photos')
      .upload(fileName, file);
    
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('team-photos')
      .getPublicUrl(fileName);
    
    return publicUrl;
  }
};

// Team Members service
export const teamMembersService = {
  async addMember(teamId: string, member: { name: string; role: string; avatar?: string }) {
    const { data, error } = await supabase
      .from('team_members')
      .insert({ ...member, team_id: teamId })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateMember(id: string, updates: any) {
    const { data, error } = await supabase
      .from('team_members')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteMember(id: string) {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Challenges service
export const challengesService = {
  async getChallenges(showAll = false) {
    let query = supabase
      .from('challenges')
      .select('*');
    
    if (!showAll) {
      query = query.eq('is_visible', true);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getChallengeById(id: string) {
    const { data, error } = await supabase
      .from('challenges')
      .select(`
        *,
        team_challenges(
          team_id,
          teams(*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateChallenge(id: string, updates: any) {
    const { data, error } = await supabase
      .from('challenges')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Leaderboard service
export const leaderboardService = {
  async getLeaderboard() {
    // Get teams with aggregated points from leaderboard_entries
    const { data, error } = await supabase
      .from('teams')
      .select(`
        *,
        team_members(*),
        leaderboard_entries(points)
      `)
      .order('points', { ascending: false });
    
    if (error) throw error;
    
    return data.map(team => {
      // Calculate total points from leaderboard_entries
      const totalPoints = team.leaderboard_entries?.reduce((sum: number, entry: any) => sum + entry.points, 0) || 0;
      
      return {
        ...team,
        totalPoints,
        members: team.team_members
      };
    }).sort((a, b) => b.totalPoints - a.totalPoints);
  },

  async assignPoints(entry: {
    team_id: string;
    challenge_id?: string;
    points: number;
    description?: string;
    assigned_by: string;
  }) {
    const { data, error } = await supabase
      .from('leaderboard_entries')
      .insert(entry)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getLeaderboardEntries() {
    const { data, error } = await supabase
      .from('leaderboard_entries')
      .select(`
        *,
        teams(name),
        challenges(title)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};
