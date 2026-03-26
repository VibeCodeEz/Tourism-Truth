import { motion } from 'framer-motion'
import { ArrowRight, Compass, Crown, LockKeyhole, Sparkles, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import { AuroraBackdrop } from '@/components/app/AuroraBackdrop'
import { DestinationSlideshow } from '@/components/app/DestinationSlideshow'
import { Logo } from '@/components/app/Logo'
import { SiteFooter } from '@/components/app/SiteFooter'
import { Badge } from '@/components/ui/Badge'
import { buttonStyles } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { fadeUpItem, luxuryEase, staggerContainer } from '@/lib/motion'

export function LandingPage() {
  const launchHighlights = [
    {
      label: 'Free route live',
      value: 'Intramuros',
      detail: 'Start immediately with the complete place-based experience.',
    },
    {
      label: 'Suspense deck',
      value: '15 cards',
      detail: 'A cleaner shuffle reveal with one location-aware challenge.',
    },
    {
      label: 'Saved flow',
      value: 'Supabase sync',
      detail: 'Profiles, premium status, and round history stay attached to your account.',
    },
  ]

  const firstScrollSequence = [
    {
      step: '01',
      title: 'Set your travel energy',
      copy: 'Pick solo, companion, group, or couple mode so the route starts with the right social tone.',
    },
    {
      step: '02',
      title: 'Lock one destination and place',
      copy: 'Choose the route, then select one exact stop to anchor the next reveal.',
    },
    {
      step: '03',
      title: 'Move from story to suspense',
      copy: 'Truth gives cultural context. Dare turns the same place into a polished live challenge.',
    },
  ]

  const trustStrip = [
    {
      label: 'What it is',
      value: 'A travel mini-game',
      detail: 'Choose a destination, lock one place, then reveal a truth or a dare tied to that exact stop.',
    },
    {
      label: 'Why it feels polished',
      value: 'Place-aware flow',
      detail: 'Every reveal is anchored to the route, the place, and your chosen mode instead of generic prompts.',
    },
    {
      label: 'What stays saved',
      value: 'Profile + rounds',
      detail: 'Auth, premium access, travel setup, and gameplay history remain attached to your account.',
    },
    {
      label: 'Free vs premium',
      value: 'Intramuros + more',
      detail: 'Start free in Intramuros. Premium unlocks Binondo, Ilocos, and Boracay as exclusive routes.',
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AuroraBackdrop />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="glass-panel-strong mb-8 rounded-[28px] px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Logo />
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/login" className={buttonStyles({ variant: 'ghost' })}>
                Login
              </Link>
              <Link to="/register" className={buttonStyles()}>
                Register
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 space-y-8 pb-8">
          <section className="grid gap-6 xl:grid-cols-[1.02fr,0.98fr] xl:items-stretch">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="glass-panel-strong hero-wash section-orb relative overflow-hidden rounded-[40px] p-6 md:p-8 lg:p-10"
            >
              <div className="absolute inset-0 panel-grid opacity-70" />
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-white/0 via-white/45 to-white/0" />
              <div className="relative flex h-full flex-col justify-between gap-8">
                <div className="space-y-6">
                  <motion.div variants={fadeUpItem}>
                    <Badge className="border-blush/30 bg-blush/12 text-mist">Travel play with an editorial finish</Badge>
                  </motion.div>

                  <motion.div variants={fadeUpItem} className="space-y-4">
                    <p className="text-sm uppercase tracking-[0.24em] text-cream/48">For city days worth documenting</p>
                    <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[0.92] text-cream sm:text-6xl lg:text-[5.25rem]">
                      Move through places with <span className="text-gradient">story-first reveals</span> and a travel
                      mood that feels cinematic from the first scroll.
                    </h1>
                    <p className="max-w-2xl text-base leading-8 text-cream/72 md:text-lg">
                      Tourism Truth turns a stop into a refined mini-experience. Sign in, choose your travel setup,
                      pick a destination, and let each truth or dare shape the tone of the day.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeUpItem} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link to="/register" className={buttonStyles({ size: 'lg' })}>
                      Start the route
                      <ArrowRight className="size-4" />
                    </Link>
                    <Link to="/login" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
                      Resume your trip
                    </Link>
                    <div className="flex items-center text-sm text-cream/56">
                      Start free in Intramuros. Premium opens the wider route map.
                    </div>
                  </motion.div>
                </div>

                <motion.div variants={fadeUpItem} className="grid gap-3 md:grid-cols-3">
                  {launchHighlights.map((item, index) => (
                    <Card key={item.label} className="card-shell hover-lift rounded-[28px] p-5">
                      {index === 0 ? <Sparkles className="mb-3 size-5 text-blush" /> : null}
                      {index === 1 ? <Star className="mb-3 size-5 text-azure" /> : null}
                      {index === 2 ? <Crown className="mb-3 size-5 text-gold" /> : null}
                      <p className="text-[11px] uppercase tracking-[0.22em] text-cream/45">{item.label}</p>
                      <p className="mt-3 font-display text-3xl text-cream">{item.value}</p>
                      <p className="mt-2 text-sm leading-7 text-cream/66">{item.detail}</p>
                    </Card>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.08, duration: 0.58, ease: luxuryEase }}
              className="h-full"
            >
              <DestinationSlideshow />
            </motion.div>
          </section>

          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div variants={fadeUpItem}>
              <Card className="rounded-[36px] p-5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-sm uppercase tracking-[0.22em] text-cream/45">One-glance product strip</p>
                    <h2 className="mt-3 font-display text-3xl text-cream sm:text-4xl">
                      Sign in, choose a route, pick one place, then let the app turn it into a story or challenge.
                    </h2>
                  </div>
                  <Badge className="border-white/10 bg-white/8 text-cream/66">Built for premium travel play</Badge>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {trustStrip.map((item) => (
                    <Card key={item.label} className="card-shell rounded-[26px] p-5">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-cream/42">{item.label}</p>
                      <h3 className="mt-3 font-display text-[2rem] leading-none text-cream">{item.value}</h3>
                      <p className="mt-3 text-sm leading-7 text-cream/64">{item.detail}</p>
                    </Card>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.section>

          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-4 lg:grid-cols-[1.15fr,0.85fr]"
          >
            <motion.div variants={fadeUpItem}>
              <Card className="rounded-[36px] p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-gold/12 p-3 text-gold">
                    <Compass className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-cream/45">First scroll sequence</p>
                    <h2 className="font-display text-3xl text-cream sm:text-4xl">Built like a travel product, not a toy</h2>
                  </div>
                </div>
                <div className="mt-7 grid gap-3 md:grid-cols-3">
                  {firstScrollSequence.map((item) => (
                    <Card key={item.step} className="card-shell hover-lift rounded-[26px] p-5">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-cream/45">Step {item.step}</p>
                      <h3 className="mt-3 font-display text-3xl text-cream">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-cream/66">{item.copy}</p>
                    </Card>
                  ))}
                </div>
              </Card>
            </motion.div>

            <div className="grid gap-4">
              <motion.div variants={fadeUpItem}>
                <Card className="rounded-[34px] p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-cream/45">Built for moments</p>
                  <h2 className="mt-3 font-display text-3xl text-cream">Social, safe, and camera-friendly</h2>
                  <p className="mt-3 text-sm leading-7 text-cream/68">
                    Every dare is designed for public spaces, polished reactions, and memorable content without being disruptive.
                  </p>
                </Card>
              </motion.div>
              <motion.div variants={fadeUpItem}>
                <Card className="section-orb relative overflow-hidden rounded-[34px] p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,195,154,0.12),transparent_34%)]" />
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                      <LockKeyhole className="size-4" />
                      Premium routes
                    </div>
                    <h2 className="mt-3 font-display text-3xl text-cream">Three destinations stay exclusive until you upgrade.</h2>
                    <p className="mt-3 text-sm leading-7 text-cream/68">
                      Intramuros is fully playable on the free pass. Premium opens Binondo, Ilocos, and Boracay with the same place-aware flow and saved sessions.
                    </p>
                    <div className="mt-5 grid gap-2 sm:grid-cols-3">
                      <div className="rounded-[22px] border border-gold/14 bg-gold/8 px-4 py-3 text-sm font-semibold text-gold">Binondo</div>
                      <div className="rounded-[22px] border border-gold/14 bg-gold/8 px-4 py-3 text-sm font-semibold text-gold">Ilocos</div>
                      <div className="rounded-[22px] border border-gold/14 bg-gold/8 px-4 py-3 text-sm font-semibold text-gold">Boracay</div>
                    </div>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <Link to="/register" className={buttonStyles({ size: 'lg' })}>
                        Unlock the full passport
                        <ArrowRight className="size-4" />
                      </Link>
                      <Link to="/login" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
                        Compare routes after login
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.section>
        </main>
        <SiteFooter className="mt-0" />
      </div>
    </div>
  )
}
