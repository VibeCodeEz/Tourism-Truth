export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          travel_type: string | null
          is_premium: boolean
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          travel_type?: string | null
          is_premium?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          travel_type?: string | null
          is_premium?: boolean
          created_at?: string
        }
        Relationships: []
      }
      game_sessions: {
        Row: {
          id: string
          user_id: string
          destination: string
          place_name: string
          mode: 'truth' | 'dare' | 'audio-tour'
          revealed_card: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          destination: string
          place_name: string
          mode: 'truth' | 'dare' | 'audio-tour'
          revealed_card?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          destination?: string
          place_name?: string
          mode?: 'truth' | 'dare' | 'audio-tour'
          revealed_card?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
