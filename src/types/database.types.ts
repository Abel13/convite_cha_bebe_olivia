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
    PostgrestVersion: "14.4"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      gifts: {
        Row: {
          created_at: string | null
          description: string | null
          external_link: string | null
          id: string
          image_url: string | null
          is_purchased: boolean | null
          name: string
          party_id: string
          price: number | null
          priority: number | null
          purchased_at: string | null
          purchased_by: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          external_link?: string | null
          id?: string
          image_url?: string | null
          is_purchased?: boolean | null
          name: string
          party_id: string
          price?: number | null
          priority?: number | null
          purchased_at?: string | null
          purchased_by?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          external_link?: string | null
          id?: string
          image_url?: string | null
          is_purchased?: boolean | null
          name?: string
          party_id?: string
          price?: number | null
          priority?: number | null
          purchased_at?: string | null
          purchased_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gifts_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "parties"
            referencedColumns: ["id"]
          },
        ]
      }
      guests: {
        Row: {
          code: string
          confirmed: boolean | null
          contact: string | null
          created_at: string | null
          dietary_restrictions: string | null
          id: string
          name: string
          note: string | null
          party_id: string
        }
        Insert: {
          code?: string
          confirmed?: boolean | null
          contact?: string | null
          created_at?: string | null
          dietary_restrictions?: string | null
          id?: string
          name: string
          note?: string | null
          party_id: string
        }
        Update: {
          code?: string
          confirmed?: boolean | null
          contact?: string | null
          created_at?: string | null
          dietary_restrictions?: string | null
          id?: string
          name?: string
          note?: string | null
          party_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "guests_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "parties"
            referencedColumns: ["id"]
          },
        ]
      }
      parties: {
        Row: {
          allow_plus_one: boolean | null
          cover_image: string | null
          created_at: string | null
          custom_message: string | null
          date: string | null
          description: string | null
          id: string
          is_public: boolean | null
          location: string | null
          max_guests: number | null
          name: string
          owner_id: string
          pix_key: string | null
          rsvp_deadline: string | null
          slug: string
          theme_color: string | null
        }
        Insert: {
          allow_plus_one?: boolean | null
          cover_image?: string | null
          created_at?: string | null
          custom_message?: string | null
          date?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          location?: string | null
          max_guests?: number | null
          name: string
          owner_id: string
          pix_key?: string | null
          rsvp_deadline?: string | null
          slug: string
          theme_color?: string | null
        }
        Update: {
          allow_plus_one?: boolean | null
          cover_image?: string | null
          created_at?: string | null
          custom_message?: string | null
          date?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          location?: string | null
          max_guests?: number | null
          name?: string
          owner_id?: string
          pix_key?: string | null
          rsvp_deadline?: string | null
          slug?: string
          theme_color?: string | null
        }
        Relationships: []
      }
      photos: {
        Row: {
          caption: string | null
          created_at: string | null
          guest_id: string | null
          id: string
          is_approved: boolean | null
          is_public: boolean | null
          party_id: string
          path: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          guest_id?: string | null
          id?: string
          is_approved?: boolean | null
          is_public?: boolean | null
          party_id: string
          path: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          guest_id?: string | null
          id?: string
          is_approved?: boolean | null
          is_public?: boolean | null
          party_id?: string
          path?: string
        }
        Relationships: [
          {
            foreignKeyName: "photos_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "parties"
            referencedColumns: ["id"]
          },
        ]
      }
      rsvps: {
        Row: {
          adults: number | null
          children: number | null
          contact: string
          created_at: string | null
          guest_id: string | null
          id: string
          message: string | null
          name: string
          party_id: string
        }
        Insert: {
          adults?: number | null
          children?: number | null
          contact: string
          created_at?: string | null
          guest_id?: string | null
          id?: string
          message?: string | null
          name: string
          party_id: string
        }
        Update: {
          adults?: number | null
          children?: number | null
          contact?: string
          created_at?: string | null
          guest_id?: string | null
          id?: string
          message?: string | null
          name?: string
          party_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rsvps_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rsvps_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "parties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_guest_code: { Args: never; Returns: string }
      get_guest_by_code: {
        Args: { input_code: string }
        Returns: {
          id: string
          party_id: string
        }[]
      }
      get_photos: {
        Args: { input_guest_code: string; input_party_id: string }
        Returns: {
          author: string
          caption: string
          id: string
          path: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
