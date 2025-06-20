export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      freelancers: {
        Row: {
          avatar_url: string | null
          contact_details: string | null
          created_at: string
          email: string
          experience: string
          full_name: string
          hourly_rate: string
          id: string
          location: string | null
          portfolio_url: string | null
          rating: number | null
          skills: string
          success_rate: number | null
        }
        Insert: {
          avatar_url?: string | null
          contact_details?: string | null
          created_at?: string
          email: string
          experience: string
          full_name: string
          hourly_rate: string
          id?: string
          location?: string | null
          portfolio_url?: string | null
          rating?: number | null
          skills: string
          success_rate?: number | null
        }
        Update: {
          avatar_url?: string | null
          contact_details?: string | null
          created_at?: string
          email?: string
          experience?: string
          full_name?: string
          hourly_rate?: string
          id?: string
          location?: string | null
          portfolio_url?: string | null
          rating?: number | null
          skills?: string
          success_rate?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          first_name: string | null
          github: string | null
          id: string
          last_name: string | null
          linkedin: string | null
          location: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          github?: string | null
          id: string
          last_name?: string | null
          linkedin?: string | null
          location?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          github?: string | null
          id?: string
          last_name?: string | null
          linkedin?: string | null
          location?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          budget: string
          category: string | null
          company: string | null
          contact_details: string | null
          created_at: string | null
          deadline: string
          description: string
          expertise_level: string | null
          id: string
          location: string | null
          skills: string
          timeline: string | null
          title: string
          user_id: string
        }
        Insert: {
          budget: string
          category?: string | null
          company?: string | null
          contact_details?: string | null
          created_at?: string | null
          deadline: string
          description: string
          expertise_level?: string | null
          id?: string
          location?: string | null
          skills: string
          timeline?: string | null
          title: string
          user_id: string
        }
        Update: {
          budget?: string
          category?: string | null
          company?: string | null
          contact_details?: string | null
          created_at?: string | null
          deadline?: string
          description?: string
          expertise_level?: string | null
          id?: string
          location?: string | null
          skills?: string
          timeline?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      works: {
        Row: {
          category: string
          created_at: string | null
          description: string
          duration: string
          files: string[] | null
          id: string
          price: string
          skills: string
          title: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          duration: string
          files?: string[] | null
          id?: string
          price: string
          skills: string
          title: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          duration?: string
          files?: string[] | null
          id?: string
          price?: string
          skills?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
