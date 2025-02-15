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
      devops_updates: {
        Row: {
          created_at: string
          description: string
          id: string
          link: string | null
          tags: string[] | null
          title: string
          update_type: string
          version: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          link?: string | null
          tags?: string[] | null
          title: string
          update_type: string
          version?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          link?: string | null
          tags?: string[] | null
          title?: string
          update_type?: string
          version?: string | null
        }
        Relationships: []
      }
      erpnext_updates: {
        Row: {
          created_at: string
          description: string
          id: string
          link: string | null
          tags: string[] | null
          title: string
          update_type: string
          version: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          link?: string | null
          tags?: string[] | null
          title: string
          update_type: string
          version?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          link?: string | null
          tags?: string[] | null
          title?: string
          update_type?: string
          version?: string | null
        }
        Relationships: []
      }
      event_banners: {
        Row: {
          content: string | null
          created_at: string
          dates: string | null
          id: number
          is_visible: boolean | null
          location: string | null
          subtitle: string | null
          title: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          dates?: string | null
          id?: number
          is_visible?: boolean | null
          location?: string | null
          subtitle?: string | null
          title?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          dates?: string | null
          id?: number
          is_visible?: boolean | null
          location?: string | null
          subtitle?: string | null
          title?: string | null
        }
        Relationships: []
      }
      hot_takes: {
        Row: {
          category: string
          created_at: string
          explanation: string
          id: string
          opinion: string
        }
        Insert: {
          category: string
          created_at?: string
          explanation: string
          id?: string
          opinion: string
        }
        Update: {
          category?: string
          created_at?: string
          explanation?: string
          id?: string
          opinion?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          budget: string | null
          company: string | null
          created_at: string
          description: string
          email: string
          id: string
          name: string
          project_type: string
          timeline: string | null
        }
        Insert: {
          budget?: string | null
          company?: string | null
          created_at?: string
          description: string
          email: string
          id?: string
          name: string
          project_type: string
          timeline?: string | null
        }
        Update: {
          budget?: string | null
          company?: string | null
          created_at?: string
          description?: string
          email?: string
          id?: string
          name?: string
          project_type?: string
          timeline?: string | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          title: string
          type: string
          url: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          title: string
          type: string
          url: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          type?: string
          url?: string
        }
        Relationships: []
      }
      schedule_items: {
        Row: {
          created_at: string
          date: string
          id: string
          time: string
          title: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          time: string
          title: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          time?: string
          title?: string
        }
        Relationships: []
      }
      timeline_experiences: {
        Row: {
          company: string
          created_at: string
          description: string
          icon_type: string
          id: number
          title: string
          year: string
        }
        Insert: {
          company: string
          created_at?: string
          description: string
          icon_type: string
          id?: number
          title: string
          year: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string
          icon_type?: string
          id?: number
          title?: string
          year?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
