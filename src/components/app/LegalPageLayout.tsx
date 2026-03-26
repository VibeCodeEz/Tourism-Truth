import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { AuroraBackdrop } from '@/components/app/AuroraBackdrop'
import { Logo } from '@/components/app/Logo'
import { SiteFooter } from '@/components/app/SiteFooter'
import { PageHero } from '@/components/app/PageHero'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { PageTransition } from '@/components/ui/PageTransition'

export interface LegalSection {
  id: string
  title: string
  content: ReactNode
}

interface LegalPageLayoutProps {
  badge: string
  title: string
  description: string
  effectiveDate: string
  sections: LegalSection[]
}

export function LegalPageLayout({
  badge,
  title,
  description,
  effectiveDate,
  sections,
}: LegalPageLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AuroraBackdrop />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="glass-panel-strong mb-6 rounded-[28px] px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Logo />
            <nav aria-label="Secondary" className="flex flex-wrap items-center gap-2">
              <Link className="interactive-outline rounded-full px-4 py-2 text-sm text-cream/78 transition hover:bg-white/8 hover:text-cream" to="/">
                Home
              </Link>
              <Link className="interactive-outline rounded-full px-4 py-2 text-sm text-cream/78 transition hover:bg-white/8 hover:text-cream" to="/legal/privacy">
                Privacy
              </Link>
              <Link className="interactive-outline rounded-full px-4 py-2 text-sm text-cream/78 transition hover:bg-white/8 hover:text-cream" to="/legal/terms">
                Terms
              </Link>
            </nav>
          </div>
        </header>

        <PageTransition>
          <main className="flex-1 space-y-6">
            <PageHero
              badge={badge}
              title={title}
              description={description}
              actions={<Badge className="border-white/10 bg-white/8 text-cream/74">Effective date: {effectiveDate}</Badge>}
            />

            <div className="grid gap-6 xl:grid-cols-[0.72fr,1.28fr]">
              <aside className="xl:sticky xl:top-28 xl:self-start">
                <Card className="rounded-[34px] p-5 sm:p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-cream/46">On this page</p>
                  <nav aria-label="Section navigation" className="mt-4 flex flex-col gap-2">
                    {sections.map((section, index) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="interactive-outline rounded-[22px] border border-white/8 bg-white/4 px-4 py-3 text-sm text-cream/74 transition hover:border-white/12 hover:bg-white/8 hover:text-cream"
                      >
                        <span className="mr-2 text-cream/38">{String(index + 1).padStart(2, '0')}</span>
                        {section.title}
                      </a>
                    ))}
                  </nav>
                </Card>
              </aside>

              <div className="space-y-4">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-28">
                    <Card className="rounded-[34px] p-6 sm:p-7">
                      <h2 id={`${section.id}-heading`} className="font-display text-3xl text-cream sm:text-4xl">
                        {section.title}
                      </h2>
                      <div className="mt-5 space-y-4 text-sm leading-7 text-cream/80 [&_strong]:text-cream [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-cream/80 [&_ul]:marker:text-blush">
                        {section.content}
                      </div>
                    </Card>
                  </section>
                ))}
              </div>
            </div>
          </main>
        </PageTransition>

        <SiteFooter />
      </div>
    </div>
  )
}

