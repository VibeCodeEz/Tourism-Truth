import { AlertCircle, ArrowRight, Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

function getPasswordStrength(password: string) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ]
  const score = checks.filter(Boolean).length

  if (password.length === 0) {
    return {
      score: 0,
      label: 'Add a password to see strength.',
      tone: 'text-cream/48',
      bars: 0,
    }
  }

  if (score <= 1) {
    return {
      score,
      label: 'Weak: add length, a number, and a symbol.',
      tone: 'text-rose-200',
      bars: 1,
    }
  }

  if (score <= 3) {
    return {
      score,
      label: 'Good: one more layer will make it stronger.',
      tone: 'text-gold',
      bars: 2,
    }
  }

  return {
    score,
    label: 'Strong: this is ready for a production-style account.',
    tone: 'text-emerald-200',
    bars: 3,
  }
}

export function RegisterPage() {
  const navigate = useNavigate()
  const { user, signUp } = useAuth()
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const emailIsValid = validateEmail(form.email)
  const nameIsValid = form.fullName.trim().length >= 2
  const passwordStrength = getPasswordStrength(form.password)

  useEffect(() => {
    if (user) {
      navigate('/app', { replace: true })
    }
  }, [navigate, user])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: typeof errors = {}
    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Enter your name.'
    }
    if (!validateEmail(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.'
    }

    setErrors(nextErrors)
    setSubmitError(null)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSubmitting(true)

    try {
      const result = await signUp(form)
      toast.success(
        result.needsEmailVerification
          ? 'Account created. Check your inbox to verify your email.'
          : 'Account created. Welcome to Tourism Truth.',
      )
      navigate(result.needsEmailVerification ? '/login' : '/app', { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to create account'
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
          <Link to="/login" className={buttonStyles({ variant: 'ghost' })}>
            Login
          </Link>
        </header>

        <div className="grid flex-1 gap-5 lg:grid-cols-[0.9fr,1.1fr] lg:gap-8 lg:items-center">
          <Card className="order-2 rounded-[32px] p-6 sm:p-8 lg:order-1">
            <Badge className="border-blush/30 bg-blush/12 text-mist">Create account</Badge>
            <h1 className="mt-4 font-display text-4xl text-cream sm:text-5xl">Build your travel identity.</h1>
            <p className="mt-3 text-sm leading-7 text-cream/64">
              Register once, store your travel type, keep premium status on your profile, and save each gameplay
              session in Supabase.
            </p>
            <div className="mt-6 rounded-[28px] border border-white/10 bg-white/6 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-cream/45">What you unlock</p>
              <p className="mt-3 text-base leading-7 text-cream/78">
                A cleaner way to move from inspiration to play, with your route choices and session history already attached to your account.
              </p>
            </div>
            {!isSupabaseConfigured ? (
              <div className="mt-6 flex items-start gap-3 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` before testing the auth flow.
              </div>
            ) : null}
          </Card>

          <Card className="order-1 rounded-[32px] p-5 sm:p-7 lg:order-2 lg:p-8">
            <div className="mb-5 space-y-2">
              <p className="text-sm uppercase tracking-[0.22em] text-cream/45">Account setup</p>
              <h2 className="font-display text-3xl text-cream sm:text-4xl">Create your travel login.</h2>
            </div>

            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit} aria-busy={submitting}>
              {submitError ? (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-start gap-3 rounded-[24px] border border-rose-300/24 bg-rose-300/10 px-4 py-3 text-sm text-rose-50"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  <div>
                    <p className="font-semibold">Account creation failed</p>
                    <p className="mt-1 text-rose-50/90">{submitError}</p>
                  </div>
                </div>
              ) : null}

              {submitting ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex items-start gap-3 rounded-[24px] border border-blush/18 bg-blush/8 px-4 py-3 text-sm text-cream/82"
                >
                  <LoaderCircle className="mt-0.5 size-4 shrink-0 animate-spin" />
                  <div>
                    <p className="font-semibold">Creating your account</p>
                    <p className="mt-1 text-cream/64">Saving your profile, travel setup, and starting permissions.</p>
                  </div>
                </div>
              ) : null}

              <div className="space-y-2">
                <label className="text-sm font-medium text-cream/80" htmlFor="fullName">
                  Full name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Your travel name"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
                  error={errors.fullName}
                  isValid={form.fullName.length > 0 && nameIsValid}
                  disabled={submitting}
                  hint="This name appears in your welcome screen and profile."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-cream/80" htmlFor="email">
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
                <label className="text-sm font-medium text-cream/80" htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  error={errors.password}
                  isValid={form.password.length > 0 && passwordStrength.score >= 3}
                  disabled={submitting}
                  hint="Use at least 8 characters with a number, an uppercase letter, and a symbol."
                  endAdornment={
                    <button
                      type="button"
                      className="interactive-outline rounded-full p-1 text-cream/48 transition hover:text-cream"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  }
                />
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 3 }, (_, index) => (
                      <div
                        key={index}
                        className={`h-1.5 rounded-full ${
                          index < passwordStrength.bars
                            ? index === 0
                              ? 'bg-rose-300/80'
                              : index === 1
                                ? 'bg-gold/80'
                                : 'bg-emerald-300/80'
                            : 'bg-white/8'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-sm ${passwordStrength.tone}`} aria-live="polite">
                    {passwordStrength.label}
                  </p>
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full" loading={submitting}>
                Create account
                <ArrowRight className="size-4" />
              </Button>
            </form>

            <p className="mt-5 text-sm text-cream/55">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-cream">
                Sign in
              </Link>
            </p>
          </Card>
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
