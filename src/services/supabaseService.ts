
import { supabase } from '@/integrations/supabase/client';

// Teams service
export const teamsService = {
  async getTeams() {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select(`
          *,
          team_members(*),
          team_challenges(challenge_id)
        `);
      
      if (error) {
        console.error('Error fetching teams:', error);
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error('Teams service error:', error);
      return [];
    }
  },

  async getTeamById(id: string) {
    try {
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
      
      if (error) {
        console.error('Error fetching team by ID:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Team by ID service error:', error);
      throw error;
    }
  },

  async updateTeam(id: string, updates: any) {
    try {
      const { data, error } = await supabase
        .from('teams')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating team:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Update team service error:', error);
      throw error;
    }
  },

  async uploadTeamPhoto(teamId: string, file: File) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${teamId}-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('team-photos')
        .upload(fileName, file);
      
      if (error) {
        console.error('Error uploading team photo:', error);
        throw error;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('team-photos')
        .getPublicUrl(fileName);
      
      return publicUrl;
    } catch (error) {
      console.error('Upload team photo service error:', error);
      throw error;
    }
  }
};

// Team Members service
export const teamMembersService = {
  async addMember(teamId: string, member: { name: string; role: string; avatar?: string }) {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .insert({ ...member, team_id: teamId })
        .select()
        .single();
      
      if (error) {
        console.error('Error adding team member:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Add member service error:', error);
      throw error;
    }
  },

  async updateMember(id: string, updates: any) {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating team member:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Update member service error:', error);
      throw error;
    }
  },

  async deleteMember(id: string) {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting team member:', error);
        throw error;
      }
    } catch (error) {
      console.error('Delete member service error:', error);
      throw error;
    }
  }
};

// Challenges service
export const challengesService = {
  async getChallenges(showAll = false) {
    try {
      let query = supabase
        .from('challenges')
        .select('*');
      
      if (!showAll) {
        query = query.eq('is_visible', true);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching challenges:', error);
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error('Challenges service error:', error);
      return [];
    }
  },

  async getChallengeById(id: string) {
    try {
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
      
      if (error) {
        console.error('Error fetching challenge by ID:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Challenge by ID service error:', error);
      throw error;
    }
  },

  async updateChallenge(id: string, updates: any) {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating challenge:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Update challenge service error:', error);
      throw error;
    }
  }
};

// Leaderboard service
export const leaderboardService = {
  async getLeaderboard() {
    try {
      // Get teams with aggregated points from leaderboard_entries
      const { data: teamsData, error: teamsError } = await supabase
        .from('teams')
        .select(`
          *,
          team_members(*)
        `);
      
      if (teamsError) {
        console.error('Error fetching teams for leaderboard:', teamsError);
        throw teamsError;
      }

      // Get leaderboard entries
      const { data: entriesData, error: entriesError } = await supabase
        .from('leaderboard_entries')
        .select('team_id, points');
      
      if (entriesError) {
        console.error('Error fetching leaderboard entries:', entriesError);
        throw entriesError;
      }

      // Calculate total points for each team
      const teamsWithPoints = (teamsData || []).map(team => {
        const teamEntries = (entriesData || []).filter(entry => entry.team_id === team.id);
        const totalPoints = teamEntries.reduce((sum, entry) => sum + (entry.points || 0), 0);
        
        return {
          ...team,
          totalPoints,
          members: team.team_members
        };
      }).sort((a, b) => b.totalPoints - a.totalPoints);

      return teamsWithPoints;
    } catch (error) {
      console.error('Leaderboard service error:', error);
      return [];
    }
  },

  async assignPoints(entry: {
    team_id: string;
    challenge_id?: string;
    points: number;
    description?: string;
    assigned_by: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('leaderboard_entries')
        .insert(entry)
        .select()
        .single();
      
      if (error) {
        console.error('Error assigning points:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Assign points service error:', error);
      throw error;
    }
  },

  async getLeaderboardEntries() {
    try {
      const { data, error } = await supabase
        .from('leaderboard_entries')
        .select(`
          *,
          teams(name),
          challenges(title)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching leaderboard entries:', error);
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error('Leaderboard entries service error:', error);
      return [];
    }
  }
};
