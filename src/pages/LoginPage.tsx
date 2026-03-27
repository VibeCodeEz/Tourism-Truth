import { AlertCircle, ArrowRight, Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { AuroraBackdrop } from '@/components/app/AuroraBackdrop'
import { Logo } from '@/components/app/Logo'
import { SiteFooter } from '@/components/app/SiteFooter'
import { Badge } from '@/components/ui/Badge'
import { Button, buttonStyles } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'
import { isSupabaseConfigured } from '@/lib/supabase'

function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email)
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, signIn } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/app'
  const emailIsValid = validateEmail(form.email)
  const passwordIsValid = form.password.length >= 6

  useEffect(() => {
    if (user) {
      navigate('/app', { replace: true })
    }
  }, [navigate, user])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: typeof errors = {}
    if (!validateEmail(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    setErrors(nextErrors)
    setSubmitError(null)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSubmitting(true)

    try {
      await signIn(form)
      toast.success('Welcome back to Tourism Truth')
      navigate(redirectTo, { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to sign in'
      setSubmitError(message)
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AuroraBackdrop />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <Logo />
          <Link to="/register" className={buttonStyles({ variant: 'ghost' })}>
            Create account
          </Link>
        </header>

        <div className="grid flex-1 gap-5 lg:grid-cols-[0.9fr,1.1fr] lg:gap-8 lg:items-center">
          <Card className="order-2 rounded-[32px] p-6 sm:p-8 lg:order-1">
            <Badge className="border-white/56 bg-white/34 text-cocoa">Member login</Badge>
            <h1 className="mt-4 font-display text-4xl text-cocoa sm:text-5xl">Return to your next route.</h1>
            <p className="mt-3 text-sm leading-7 text-cocoa/80">
              Sign in to continue your travel game, restore your profile, and keep your destination progress in sync.
            </p>
            <div className="mt-6 rounded-[28px] border border-white/36 bg-white/18 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-cocoa/68">Inside your account</p>
              <p className="mt-3 text-base leading-7 text-cocoa/82">
                Travel type, premium access, and saved rounds stay attached to your profile so the app feels seamless on every return.
              </p>
            </div>
            {!isSupabaseConfigured ? (
              <div className="mt-6 flex items-start gap-3 rounded-3xl border border-white/42 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(223,241,255,0.12))] p-4 text-sm text-cream/88">
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-azure" />
                Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to enable authentication.
              </div>
            ) : null}
          </Card>

          <Card className="order-1 rounded-[32px] p-5 sm:p-7 lg:order-2 lg:p-8">
            <div className="mb-5 space-y-2">
              <p className="text-sm uppercase tracking-[0.22em] text-cocoa/68">Secure sign in</p>
              <h2 className="font-display text-3xl text-cocoa sm:text-4xl">Pick up where you left off.</h2>
            </div>

            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit} aria-busy={submitting}>
              {submitError ? (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-start gap-3 rounded-[24px] border border-plum/28 bg-[linear-gradient(180deg,rgba(108,134,162,0.22),rgba(255,255,255,0.12))] px-4 py-3 text-sm text-cream"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0 text-azure" />
                  <div>
                    <p className="font-semibold">Sign-in failed</p>
                    <p className="mt-1 text-cream/80">{submitError}</p>
                  </div>
                </div>
              ) : null}

              {submitting ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex items-start gap-3 rounded-[24px] border border-white/34 bg-white/16 px-4 py-3 text-sm text-cocoa"
                >
                  <LoaderCircle className="mt-0.5 size-4 shrink-0 animate-spin" />
                  <div>
                    <p className="font-semibold">Signing you in</p>
                    <p className="mt-1 text-cocoa/76">Restoring your profile, route access, and saved progress.</p>
                  </div>
                </div>
              ) : null}

              <div className="space-y-2">
                <label className="text-sm font-medium text-cocoa" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  error={errors.email}
                  isValid={form.email.length > 0 && emailIsValid}
                  disabled={submitting}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-cocoa" htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  error={errors.password}
                  isValid={form.password.length > 0 && passwordIsValid}
                  disabled={submitting}
                  endAdornment={
                    <button
                      type="button"
                      className="interactive-outline rounded-full p-1 text-cocoa/48 transition hover:text-cocoa"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  }
                />
              </div>
              <Button type="submit" size="lg" className="w-full" loading={submitting}>
                Sign in to continue
                <ArrowRight className="size-4" />
              </Button>
            </form>

            <p className="mt-5 text-sm text-cocoa/76">
              New here?{' '}
              <Link to="/register" className="font-semibold text-cocoa">
                Create an account
              </Link>
            </p>
          </Card>
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
