import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { LoadingScreen } from '@/components/app/LoadingScreen'
import { ProtectedRoute } from '@/components/app/ProtectedRoute'
import { AppLayout } from '@/layouts/AppLayout'

const LandingPage = lazy(() => import('@/pages/LandingPage').then((module) => ({ default: module.LandingPage })))
const LoginPage = lazy(() => import('@/pages/LoginPage').then((module) => ({ default: module.LoginPage })))
const RegisterPage = lazy(() => import('@/pages/RegisterPage').then((module) => ({ default: module.RegisterPage })))
const DashboardPage = lazy(() => import('@/pages/DashboardPage').then((module) => ({ default: module.DashboardPage })))
const TravelTypePage = lazy(() => import('@/pages/TravelTypePage').then((module) => ({ default: module.TravelTypePage })))
const DestinationPage = lazy(() => import('@/pages/DestinationPage').then((module) => ({ default: module.DestinationPage })))
const HistoryPage = lazy(() => import('@/pages/HistoryPage').then((module) => ({ default: module.HistoryPage })))
const IntramurosPlacesPage = lazy(() =>
  import('@/pages/IntramurosPlacesPage').then((module) => ({ default: module.IntramurosPlacesPage })),
)
const TruthOrDarePage = lazy(() =>
  import('@/pages/TruthOrDarePage').then((module) => ({ default: module.TruthOrDarePage })),
)
const FunFactPage = lazy(() => import('@/pages/FunFactPage').then((module) => ({ default: module.FunFactPage })))
const AudioTourPage = lazy(() => import('@/pages/AudioTourPage').then((module) => ({ default: module.AudioTourPage })))
const ShuffleCardsPage = lazy(() =>
  import('@/pages/ShuffleCardsPage').then((module) => ({ default: module.ShuffleCardsPage })),
)
const CompletionPage = lazy(() =>
  import('@/pages/CompletionPage').then((module) => ({ default: module.CompletionPage })),
)
const PremiumPage = lazy(() => import('@/pages/PremiumPage').then((module) => ({ default: module.PremiumPage })))
const PrivacyPolicyPage = lazy(() =>
  import('@/pages/legal/PrivacyPolicy').then((module) => ({ default: module.PrivacyPolicyPage })),
)
const TermsOfServicePage = lazy(() =>
  import('@/pages/legal/TermsOfService').then((module) => ({ default: module.TermsOfServicePage })),
)

function RouteFallback() {
  return <LoadingScreen />
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/legal/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/legal/terms" element={<TermsOfServicePage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/app" element={<DashboardPage />} />
              <Route path="/app/travel-type" element={<TravelTypePage />} />
              <Route path="/app/destinations" element={<DestinationPage />} />
              <Route path="/app/history" element={<HistoryPage />} />
              <Route path="/app/destinations/:destinationKey" element={<IntramurosPlacesPage />} />
              <Route path="/app/play" element={<TruthOrDarePage />} />
              <Route path="/app/play/fact" element={<FunFactPage />} />
              <Route path="/app/play/audio-tour" element={<AudioTourPage />} />
              <Route path="/app/play/shuffle" element={<ShuffleCardsPage />} />
              <Route path="/app/play/completion" element={<CompletionPage />} />
              <Route path="/premium" element={<PremiumPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
