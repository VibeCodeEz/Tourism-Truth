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
              toast: '!border-white/60 !bg-white/80 !text-cocoa !backdrop-blur-xl',
              description: '!text-cocoa/72',
              actionButton: '!bg-royal !text-cream',
            },
          }}
        />
      </GameFlowProvider>
    </AuthProvider>
  )
}

export default App
