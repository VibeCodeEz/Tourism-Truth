import { type PropsWithChildren, createContext, useEffect, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'
import type { DestinationKey, GameFlowState, GameMode, TravelType } from '@/types/models'

const storageKey = 'tourism-truth-game-flow'

const initialState: GameFlowState = {
  travelType: null,
  destinationKey: null,
  placeId: null,
  mode: null,
  revealedCardTitle: null,
  revealedPrompt: null,
}

interface GameFlowContextValue {
  state: GameFlowState
  setTravelType: (travelType: TravelType) => void
  setDestination: (destinationKey: DestinationKey) => void
  setPlace: (placeId: string) => void
  setMode: (mode: GameMode) => void
  completeRound: (payload: { title: string; prompt: string }) => void
  resetRound: () => void
  resetPlaceSelection: () => void
  resetAll: () => void
}

export const GameFlowContext = createContext<GameFlowContextValue | undefined>(undefined)

export function GameFlowProvider({ children }: PropsWithChildren) {
  const { profile } = useAuth()
  const [state, setState] = useState<GameFlowState>(() => {
    const stored = window.localStorage.getItem(storageKey)

    if (!stored) {
      return initialState
    }

    try {
      return JSON.parse(stored) as GameFlowState
    } catch {
      return initialState
    }
  })

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    if (!profile?.travelType || state.travelType) {
      return
    }

    setState((currentState) => ({
      ...currentState,
      travelType: profile.travelType,
    }))
  }, [profile?.travelType, state.travelType])

  function setTravelType(travelType: TravelType) {
    setState((currentState) => ({
      ...currentState,
      travelType,
    }))
  }

  function setDestination(destinationKey: DestinationKey) {
    setState((currentState) => ({
      ...currentState,
      destinationKey,
      placeId: null,
      mode: null,
      revealedCardTitle: null,
      revealedPrompt: null,
    }))
  }

  function setPlace(placeId: string) {
    setState((currentState) => ({
      ...currentState,
      placeId,
      mode: null,
      revealedCardTitle: null,
      revealedPrompt: null,
    }))
  }

  function setMode(mode: GameMode) {
    setState((currentState) => ({
      ...currentState,
      mode,
      revealedCardTitle: null,
      revealedPrompt: null,
    }))
  }

  function completeRound(payload: { title: string; prompt: string }) {
    setState((currentState) => ({
      ...currentState,
      revealedCardTitle: payload.title,
      revealedPrompt: payload.prompt,
    }))
  }

  function resetRound() {
    setState((currentState) => ({
      ...currentState,
      mode: null,
      revealedCardTitle: null,
      revealedPrompt: null,
    }))
  }

  function resetPlaceSelection() {
    setState((currentState) => ({
      ...currentState,
      placeId: null,
      mode: null,
      revealedCardTitle: null,
      revealedPrompt: null,
    }))
  }

  function resetAll() {
    setState(initialState)
  }

  return (
    <GameFlowContext.Provider
      value={{
        state,
        setTravelType,
        setDestination,
        setPlace,
        setMode,
        completeRound,
        resetRound,
        resetPlaceSelection,
        resetAll,
      }}
    >
      {children}
    </GameFlowContext.Provider>
  )
}
