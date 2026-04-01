import { type PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'

import { assertSupabaseConfigured, isSupabaseConfigured, supabase } from '@/lib/supabase'
import { formatDisplayName } from '@/lib/utils'
import type { AppProfile, GameMode, GameSessionRecord, TravelType } from '@/types/models'
import type { Database } from '@/types/supabase'

interface SignInPayload {
  email: string
  password: string
}

interface SignUpPayload extends SignInPayload {
  fullName: string
}

interface SignUpResult {
  needsEmailVerification: boolean
  profileSyncError?: string | null
}

interface AuthContextValue {
  session: Session | null
  user: User | null
  profile: AppProfile | null
  loading: boolean
  signIn: (payload: SignInPayload) => Promise<void>
  signUp: (payload: SignUpPayload) => Promise<SignUpResult>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  updateTravelType: (travelType: TravelType) => Promise<void>
  upgradeToPremium: () => Promise<void>
  getGameSessions: (limit?: number) => Promise<GameSessionRecord[]>
  recordGameSession: (payload: {
    destination: string
    placeName: string
    mode: GameMode
    revealedCard: string | null
  }) => Promise<void>
}

function mapProfile(
  row: {
    id: string
    full_name: string | null
    travel_type: string | null
    is_premium: boolean
    created_at: string
  },
  user: User | null,
): AppProfile {
  return {
    id: row.id,
    fullName: formatDisplayName(row.full_name, user?.email),
    travelType: (row.travel_type as TravelType | null) ?? null,
    isPremium: row.is_premium,
    createdAt: row.created_at,
  }
}

function buildLocalProfile(user: User): AppProfile {
  return {
    id: user.id,
    fullName: formatDisplayName(user.user_metadata.full_name as string | undefined, user.email),
    travelType: null,
    isPremium: false,
    createdAt: null,
  }
}

function mapGameSession(row: Database['public']['Tables']['game_sessions']['Row']): GameSessionRecord {
  return {
    id: row.id,
    destination: row.destination,
    placeName: row.place_name,
    mode: row.mode,
    revealedCard: row.revealed_card,
    createdAt: row.created_at,
  }
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<AppProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (currentUser: User) => {
    if (!isSupabaseConfigured) {
      const localProfile = buildLocalProfile(currentUser)
      setProfile(localProfile)
      return localProfile
    }

    const { data, error } = await supabase.from('profiles').select('*').eq('id', currentUser.id).maybeSingle()

    if (error) {
      throw error
    }

    if (!data) {
      const fallbackProfile = buildLocalProfile(currentUser)
      setProfile(fallbackProfile)
      return fallbackProfile
    }

    const mappedProfile = mapProfile(data as Database['public']['Tables']['profiles']['Row'], currentUser)
    setProfile(mappedProfile)
    return mappedProfile
  }, [])

  const ensureProfile = useCallback(async (currentUser: User, fullName?: string) => {
    if (!isSupabaseConfigured) {
      const localProfile = buildLocalProfile(currentUser)
      if (fullName) {
        localProfile.fullName = fullName
      }
      setProfile(localProfile)
      return localProfile
    }

    const { error } = await supabase.from('profiles').upsert(
      {
        id: currentUser.id,
        full_name: fullName ?? (currentUser.user_metadata.full_name as string | undefined) ?? null,
      },
      { onConflict: 'id' },
    )

    if (error) {
      throw error
    }

    return fetchProfile(currentUser)
  }, [fetchProfile])

  useEffect(() => {
    let active = true

    async function bootstrapSession() {
      if (!isSupabaseConfigured) {
        if (active) {
          setLoading(false)
        }
        return
      }

      const { data, error } = await supabase.auth.getSession()

      if (error) {
        throw error
      }

      if (!active) {
        return
      }

      setSession(data.session)
      setUser(data.session?.user ?? null)

      if (data.session?.user) {
        await ensureProfile(data.session.user)
      } else {
        setProfile(null)
      }

      if (active) {
        setLoading(false)
      }
    }

    void bootstrapSession().catch(() => {
      if (active) {
        setLoading(false)
        setProfile(null)
      }
    })

    if (!isSupabaseConfigured) {
      return () => {
        active = false
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, nextSession) => {
      setSession(nextSession)
      setUser(nextSession?.user ?? null)

      if (!nextSession?.user) {
        setProfile(null)
        setLoading(false)
        return
      }

      void ensureProfile(nextSession.user).finally(() => {
        if (active) {
          setLoading(false)
        }
      })
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [ensureProfile])

  async function signIn(payload: SignInPayload) {
    assertSupabaseConfigured()

    const { error } = await supabase.auth.signInWithPassword(payload)

    if (error) {
      throw error
    }
  }

  async function signUp(payload: SignUpPayload) {
    assertSupabaseConfigured()

    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          full_name: payload.fullName,
        },
      },
    })

    if (error) {
      throw error
    }

    let profileSyncError: string | null = null

    if (data.user) {
      setUser(data.user)
      setProfile(buildLocalProfile(data.user))
    }

    if (data.session?.user) {
      setSession(data.session)

      try {
        await ensureProfile(data.session.user, payload.fullName)
      } catch (error) {
        profileSyncError = getErrorMessage(error, 'Unable to sync profile data')
        setProfile(buildLocalProfile(data.session.user))
      }
    }

    return {
      needsEmailVerification: !data.session,
      profileSyncError,
    }
  }

  async function signOut() {
    if (!isSupabaseConfigured) {
      setSession(null)
      setUser(null)
      setProfile(null)
      return
    }

    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }
  }

  async function refreshProfile() {
    if (!user) {
      return
    }

    await fetchProfile(user)
  }

  async function updateTravelType(travelType: TravelType) {
    if (!user) {
      return
    }

    setProfile((currentProfile) =>
      currentProfile
        ? {
            ...currentProfile,
            travelType,
          }
        : null,
    )

    if (!isSupabaseConfigured) {
      return
    }

    const { error } = await supabase.from('profiles').update({ travel_type: travelType }).eq('id', user.id)

    if (error) {
      throw error
    }
  }

  async function upgradeToPremium() {
    if (!user) {
      return
    }

    setProfile((currentProfile) =>
      currentProfile
        ? {
            ...currentProfile,
            isPremium: true,
          }
        : null,
    )

    if (!isSupabaseConfigured) {
      return
    }

    const { error } = await supabase.from('profiles').update({ is_premium: true }).eq('id', user.id)

    if (error) {
      throw error
    }
  }

  const getGameSessions = useCallback(async (limit = 24) => {
    if (!user || !isSupabaseConfigured) {
      return []
    }

    const { data, error } = await supabase
      .from('game_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      throw error
    }

    return (data ?? []).map((row) => mapGameSession(row as Database['public']['Tables']['game_sessions']['Row']))
  }, [user])

  const recordGameSession = useCallback(async (payload: {
    destination: string
    placeName: string
    mode: GameMode
    revealedCard: string | null
  }) => {
    if (!user || !isSupabaseConfigured) {
      return
    }

    const { error } = await supabase.from('game_sessions').insert({
      user_id: user.id,
      destination: payload.destination,
      place_name: payload.placeName,
      mode: payload.mode,
      revealed_card: payload.revealedCard,
    })

    if (error) {
      throw error
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        refreshProfile,
        updateTravelType,
        upgradeToPremium,
        getGameSessions,
        recordGameSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
