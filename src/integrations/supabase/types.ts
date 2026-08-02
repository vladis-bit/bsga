export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contact_messages: {
        Row: {
          company_name: string | null
          created_at: string
          email: string
          email_error: string | null
          email_status: string
          first_name: string
          id: string
          is_read: boolean
          last_name: string | null
          message: string
          participant_count: string | null
          phone: string | null
          preferred_course: string | null
          preferred_date: string | null
          resend_at: string | null
          resend_id: string | null
          service: string | null
          source: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email: string
          email_error?: string | null
          email_status?: string
          first_name: string
          id?: string
          is_read?: boolean
          last_name?: string | null
          message: string
          participant_count?: string | null
          phone?: string | null
          preferred_course?: string | null
          preferred_date?: string | null
          resend_at?: string | null
          resend_id?: string | null
          service?: string | null
          source?: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string
          email_error?: string | null
          email_status?: string
          first_name?: string
          id?: string
          is_read?: boolean
          last_name?: string | null
          message?: string
          participant_count?: string | null
          phone?: string | null
          preferred_course?: string | null
          preferred_date?: string | null
          resend_at?: string | null
          resend_id?: string | null
          service?: string | null
          source?: string
        }
        Relationships: []
      }
      pc_blackouts: {
        Row: {
          created_at: string
          ends_at: string
          id: string
          reason: string | null
          simulator_id: string | null
          starts_at: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          ends_at: string
          id?: string
          reason?: string | null
          simulator_id?: string | null
          starts_at: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          ends_at?: string
          id?: string
          reason?: string | null
          simulator_id?: string | null
          starts_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pc_blackouts_simulator_id_fkey"
            columns: ["simulator_id"]
            isOneToOne: false
            referencedRelation: "pc_simulators"
            referencedColumns: ["id"]
          },
        ]
      }
      pc_bookings: {
        Row: {
          cancel_email_error: string | null
          cancel_email_resend_id: string | null
          cancel_email_sent_at: string | null
          cancel_email_status: string | null
          cancellation_token: string
          created_at: string
          duration_hours: number
          email: string
          email_error: string | null
          email_status: string
          ends_at: string | null
          first_name: string
          id: string
          last_name: string | null
          note: string | null
          payment_status: string
          phone: string | null
          price_eur: number
          reminder_error: string | null
          reminder_resend_id: string | null
          reminder_sent_at: string | null
          reminder_status: string | null
          resend_at: string | null
          resend_id: string | null
          simulator_id: string
          starts_at: string
          status: string
          updated_at: string
        }
        Insert: {
          cancel_email_error?: string | null
          cancel_email_resend_id?: string | null
          cancel_email_sent_at?: string | null
          cancel_email_status?: string | null
          cancellation_token?: string
          created_at?: string
          duration_hours?: number
          email: string
          email_error?: string | null
          email_status?: string
          ends_at?: string | null
          first_name: string
          id?: string
          last_name?: string | null
          note?: string | null
          payment_status?: string
          phone?: string | null
          price_eur?: number
          reminder_error?: string | null
          reminder_resend_id?: string | null
          reminder_sent_at?: string | null
          reminder_status?: string | null
          resend_at?: string | null
          resend_id?: string | null
          simulator_id: string
          starts_at: string
          status?: string
          updated_at?: string
        }
        Update: {
          cancel_email_error?: string | null
          cancel_email_resend_id?: string | null
          cancel_email_sent_at?: string | null
          cancel_email_status?: string | null
          cancellation_token?: string
          created_at?: string
          duration_hours?: number
          email?: string
          email_error?: string | null
          email_status?: string
          ends_at?: string | null
          first_name?: string
          id?: string
          last_name?: string | null
          note?: string | null
          payment_status?: string
          phone?: string | null
          price_eur?: number
          reminder_error?: string | null
          reminder_resend_id?: string | null
          reminder_sent_at?: string | null
          reminder_status?: string | null
          resend_at?: string | null
          resend_id?: string | null
          simulator_id?: string
          starts_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pc_bookings_simulator_id_fkey"
            columns: ["simulator_id"]
            isOneToOne: false
            referencedRelation: "pc_simulators"
            referencedColumns: ["id"]
          },
        ]
      }
      pc_simulators: {
        Row: {
          created_at: string
          description: string | null
          hourly_rate_eur: number
          id: string
          is_active: boolean
          name: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          hourly_rate_eur?: number
          id?: string
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          hourly_rate_eur?: number
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cancel_pc_booking: {
        Args: { _email: string; _first_name: string; _token: string }
        Returns: Json
      }
      get_pc_booking_by_token: {
        Args: { _token: string }
        Returns: {
          duration_hours: number
          email: string
          ends_at: string
          first_name: string
          last_name: string
          payment_status: string
          price_eur: number
          simulator_name: string
          starts_at: string
          status: string
        }[]
      }
      get_pc_day_slots: {
        Args: { _day: string }
        Returns: {
          ends_at: string
          kind: string
          simulator_id: string
          starts_at: string
        }[]
      }
      grant_admin_by_email: { Args: { _email: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      list_admin_users: {
        Args: never
        Returns: {
          email: string
          granted_at: string
          user_id: string
        }[]
      }
      revoke_admin_by_email: { Args: { _email: string }; Returns: string }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
