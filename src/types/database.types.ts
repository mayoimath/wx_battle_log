export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      battle_log_details: {
        Row: {
          created_at: string;
          log_detail_no: number;
          log_no: number;
          memo: string | null;
          opponent_lrig_id: number;
          play_first: boolean | null;
          result: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          log_detail_no: number;
          log_no?: number;
          memo?: string | null;
          opponent_lrig_id: number;
          play_first?: boolean | null;
          result?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          log_detail_no?: number;
          log_no?: number;
          memo?: string | null;
          opponent_lrig_id?: number;
          play_first?: boolean | null;
          result?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "battle_log_details_log_no_fkey";
            columns: ["log_no"];
            isOneToOne: false;
            referencedRelation: "battle_logs";
            referencedColumns: ["log_no"];
          },
          {
            foreignKeyName: "battle_log_details_log_no_fkey";
            columns: ["log_no"];
            isOneToOne: false;
            referencedRelation: "battle_summary";
            referencedColumns: ["log_no"];
          },
          {
            foreignKeyName: "battle_log_details_opponent_lrig_id_fkey";
            columns: ["opponent_lrig_id"];
            isOneToOne: false;
            referencedRelation: "m_lrigs";
            referencedColumns: ["lrig_id"];
          },
        ];
      };
      battle_logs: {
        Row: {
          created_at: string;
          date: string | null;
          log_no: number;
          lrig_id: number;
          memo: string | null;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          date?: string | null;
          log_no?: number;
          lrig_id: number;
          memo?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          date?: string | null;
          log_no?: number;
          lrig_id?: number;
          memo?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "battle_logs_lrig_id_fkey";
            columns: ["lrig_id"];
            isOneToOne: false;
            referencedRelation: "m_lrigs";
            referencedColumns: ["lrig_id"];
          },
        ];
      };
      m_lrigs: {
        Row: {
          created_at: string;
          lrig_id: number;
          lrig_name: string | null;
        };
        Insert: {
          created_at?: string;
          lrig_id?: number;
          lrig_name?: string | null;
        };
        Update: {
          created_at?: string;
          lrig_id?: number;
          lrig_name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      battle_summary: {
        Row: {
          log_no: number | null;
          lose_count: number | null;
          lrig_name: string | null;
          title: string | null;
          won_count: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      insert_log: {
        Args: {
          t_detail_rows: Database["public"]["CompositeTypes"]["arg_battle_log_detail"][];
          t_log_row: Database["public"]["CompositeTypes"]["arg_battle_log"];
        };
        Returns: undefined;
      };
      update_log: {
        Args: {
          t_detail_rows: Database["public"]["CompositeTypes"]["arg_battle_log_detail"][];
          t_log_no: number;
          t_log_row: Database["public"]["CompositeTypes"]["arg_battle_log"];
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      arg_battle_log: {
        lrig_id: number | null;
        title: string | null;
      };
      arg_battle_log_detail: {
        opponent_lrig_id: number | null;
        play_first: boolean | null;
        result: number | null;
      };
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"]) | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
