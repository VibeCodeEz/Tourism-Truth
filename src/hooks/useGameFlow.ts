import { useContext } from 'react'

import { GameFlowContext } from '@/context/GameFlowContext'

export function useGameFlow() {
  const context = useContext(GameFlowContext)

  if (!context) {
    throw new Error('useGameFlow must be used within GameFlowProvider')
  }

  return context
}
