import { Toaster } from 'sonner'

import { AuthProvider } from '@/context/AuthContext'
import { GameFlowProvider } from '@/context/GameFlowContext'
import { AppRouter } from '@/routes/AppRouter'

function App() {
  return (
    <AuthProvider>
      <GameFlowProvider>
        <AppRouter />
        <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              toast: '!border-white/12 !bg-ink/90 !text-cream !backdrop-blur-xl',
              description: '!text-cream/70',
              actionButton: '!bg-gold !text-cocoa',
            },
          }}
        />
      </GameFlowProvider>
    </AuthProvider>
  )
}

export default App
