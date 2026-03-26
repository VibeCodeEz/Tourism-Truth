import { LegalPageLayout } from '@/components/app/LegalPageLayout'
import { legalMeta } from '@/data/legal'

export function TermsOfServicePage() {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: (
        <>
          <p>
            These Terms of Service govern your access to and use of Tourism Truth, including the website, account system,
            destination-selection flow, truth and dare gameplay features, premium access logic, and related content and
            services.
          </p>
          <p>
            By accessing or using Tourism Truth, you agree to be bound by these Terms and our Privacy Policy. If you do
            not agree, you should not access or use the service.
          </p>
        </>
      ),
    },
    {
      id: 'eligibility',
      title: 'Eligibility to Use the Service',
      content: (
        <>
          <p>
            You may use Tourism Truth only if you have the legal capacity to agree to these Terms under applicable law.
            If you are using the service on behalf of an organization or other entity, you represent that you have
            authority to bind that entity to these Terms.
          </p>
          <p>
            The service is not designed for unsupervised use by young children. If local law requires parental or
            guardian consent for your use of online services, you must obtain that consent before using Tourism Truth.
          </p>
        </>
      ),
    },
    {
      id: 'accounts',
      title: 'Account Registration and Security',
      content: (
        <>
          <p>
            Some features of Tourism Truth require you to register an account or log in through Supabase Auth. You agree
            to provide accurate information, keep your login credentials secure, and promptly update information that
            becomes inaccurate or outdated.
          </p>
          <p>
            You are responsible for activity that occurs under your account unless you notify us promptly of unauthorized
            use. We may suspend access, require credential resets, or take other protective action if we believe an
            account has been compromised or used in violation of these Terms.
          </p>
        </>
      ),
    },
    {
      id: 'service-description',
      title: 'Description of the Service',
      content: (
        <>
          <p>Tourism Truth is a travel-themed entertainment and experience web app.</p>
          <ul>
            <li>Users can browse the landing page and create or access an account.</li>
            <li>Authenticated users can choose a travel type and select an available destination.</li>
            <li>Users can select one place within the active route and then choose a truth or dare mode.</li>
            <li>Truth mode presents place-based information and context.</li>
            <li>Dare mode presents a card-based reveal with safe, location-aware challenges.</li>
            <li>The service may save gameplay history and premium status to the user profile.</li>
          </ul>
          <p>
            Tourism Truth is intended as an entertainment and travel-exploration companion. It is not an official tour
            operator, licensed travel guide service, or guarantee of destination access or venue conditions.
          </p>
        </>
      ),
    },
    {
      id: 'free-premium',
      title: 'Free and Premium Features',
      content: (
        <>
          <p>
            Tourism Truth may offer both free and premium access tiers. Based on the current app design, Intramuros is
            available on the free tier, while other destinations may be shown as premium-only routes.
          </p>
          <p>
            Premium logic may depend on a profile flag such as <code>is_premium</code>. Access levels, route availability,
            feature bundles, and unlock rules may change over time as the product evolves.
          </p>
        </>
      ),
    },
    {
      id: 'future-billing',
      title: 'Future Subscription and Billing Terms',
      content: (
        <>
          <p>
            The current codebase is structured to support premium access and future paid subscriptions, but live payment
            processing may not yet be enabled. Unless and until billing is actually launched, these Terms do not claim
            that Tourism Truth currently charges you through a live payment processor.
          </p>
          <p>
            If paid subscriptions are activated in the future, we may publish additional billing terms covering pricing,
            renewal, cancellation, refunds, taxes, failed payments, and related subscription rules before accepting live
            payment information.
          </p>
        </>
      ),
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable Use',
      content: (
        <>
          <p>You may use Tourism Truth only for lawful, respectful, personal, and intended product use.</p>
          <ul>
            <li>Use the app in a way that respects venues, historical sites, staff, bystanders, and local rules.</li>
            <li>Complete dares only when they are safe, appropriate, and lawful in the real-world setting around you.</li>
            <li>Use your own judgment before participating in any truth, challenge, or travel activity.</li>
            <li>Stop using a prompt immediately if circumstances make it unsafe, disruptive, or inappropriate.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'prohibited-conduct',
      title: 'Prohibited Conduct',
      content: (
        <>
          <p>You may not use Tourism Truth to do any of the following:</p>
          <ul>
            <li>Break the law, violate venue rules, trespass, or encourage others to do so.</li>
            <li>Harass, intimidate, film, or pressure other people without appropriate consent.</li>
            <li>Damage property, disrupt businesses or tourist sites, or interfere with staff or public operations.</li>
            <li>Use the service in a reckless, dangerous, abusive, or offensive way.</li>
            <li>Attempt to reverse engineer, scrape, disrupt, overload, or interfere with the app or backend systems.</li>
            <li>Bypass premium restrictions, access controls, authentication flows, or other product safeguards.</li>
            <li>Use another person’s account without authorization or submit false registration information.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'user-inputs-feedback',
      title: 'User Inputs, Feedback, and Submissions',
      content: (
        <>
          <p>
            Tourism Truth primarily processes account inputs, profile selections, destination choices, and gameplay
            actions you submit through the interface. If you send us feedback, feature ideas, bug reports, or other
            suggestions, you agree that we may use those submissions to operate and improve the service without an
            obligation to compensate you.
          </p>
          <p>
            You remain responsible for the legality and appropriateness of anything you submit through account fields,
            support channels, or other direct communications with us.
          </p>
        </>
      ),
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      content: (
        <>
          <p>
            Tourism Truth, including its interface design, copy, graphics, branding, destination/gameplay structure,
            software code, and other service content, is protected by applicable intellectual property laws.
          </p>
          <p>
            Subject to these Terms, we grant you a limited, revocable, non-exclusive, non-transferable right to access
            and use the service for its intended purpose. You may not copy, distribute, publicly exploit, or create
            derivative works from protected service content except as permitted by law or with our written permission.
          </p>
        </>
      ),
    },
    {
      id: 'tourism-disclaimer',
      title: 'Tourism Information Disclaimer',
      content: (
        <>
          <p>
            Tourism Truth includes destination descriptions, place details, fun facts, and gameplay prompts for
            entertainment and general informational purposes. We do not guarantee that all destination information,
            opening conditions, historic interpretations, operating hours, ticketing rules, or venue restrictions are
            complete, current, or error-free.
          </p>
          <p>
            You should verify current site conditions, fees, schedules, access restrictions, and official rules directly
            with the relevant venue or authority before relying on them for travel planning.
          </p>
        </>
      ),
    },
    {
      id: 'safety-disclaimer',
      title: 'Safety and Personal Responsibility',
      content: (
        <>
          <p>
            Dares and prompts in Tourism Truth are intended to be safe and public-appropriate, but your surroundings,
            health, mobility, weather, crowd conditions, and local rules may change the real-world risk of any activity.
          </p>
          <p>
            You are solely responsible for deciding whether to participate in any prompt. You must not perform any action
            that is unsafe, illegal, disrespectful, physically risky, or prohibited by site rules. You must not disturb
            protected heritage areas, disrupt pedestrian traffic, obstruct operations, harass other people, or put
            yourself or others at risk.
          </p>
        </>
      ),
    },
    {
      id: 'warranty-availability',
      title: 'No Warranty and Service Availability',
      content: (
        <>
          <p>
            Tourism Truth is provided on an <strong>“as is”</strong> and <strong>“as available”</strong> basis. To the
            maximum extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose,
            non-infringement, and any warranty that the service will be uninterrupted, secure, or error-free.
          </p>
          <p>
            We may modify, pause, remove, or discontinue features at any time, including destination availability,
            premium access logic, or gameplay flows, without guaranteeing continuous availability.
          </p>
        </>
      ),
    },
    {
      id: 'liability-indemnity',
      title: 'Limitation of Liability and Indemnification',
      content: (
        <>
          <p>
            To the fullest extent permitted by law, Tourism Truth and its operators, affiliates, service providers, and
            personnel will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages,
            or for any loss of profits, data, goodwill, travel opportunities, or business interruption arising from or
            relating to your use of the service.
          </p>
          <p>
            Our total liability for claims arising out of or related to the service will be limited to the amount you
            paid to Tourism Truth for the relevant service in the twelve months before the event giving rise to the claim,
            or if no amount was paid, a reasonable statutory minimum or the lowest amount permitted under applicable law.
          </p>
          <p>
            You agree to indemnify and hold harmless Tourism Truth and its operators from claims, liabilities, damages,
            losses, and expenses arising out of your misuse of the service, violation of these Terms, or unlawful,
            unsafe, or disruptive conduct connected to your use of the app.
          </p>
        </>
      ),
    },
    {
      id: 'termination',
      title: 'Suspension and Termination',
      content: (
        <>
          <p>
            We may suspend, restrict, or terminate your access to Tourism Truth if we reasonably believe you violated
            these Terms, created legal or security risk, interfered with the service, or used the app in a harmful or
            abusive way.
          </p>
          <p>
            You may stop using the service at any time. Certain provisions of these Terms, including provisions about
            intellectual property, disclaimers, limitations of liability, indemnification, and disputes, will survive
            termination to the extent legally permitted.
          </p>
        </>
      ),
    },
    {
      id: 'governing-law',
      title: 'Governing Law and Dispute Resolution',
      content: (
        <>
          <p>
            These Terms are governed by the laws of <strong>{legalMeta.governingLaw}</strong>, without regard to conflict
            of law principles, unless mandatory local consumer law requires otherwise.
          </p>
          <p>
            Before filing a formal claim, we encourage you to contact us at {legalMeta.contactEmail} so we can try to
            resolve the issue informally. If a dispute cannot be resolved informally, the parties agree that courts or
            dispute forums located in <strong>{legalMeta.governingLaw}</strong> will have jurisdiction, unless applicable
            law requires a different forum.
          </p>
        </>
      ),
    },
    {
      id: 'changes-contact',
      title: 'Changes to These Terms and Contact Information',
      content: (
        <>
          <p>
            We may update these Terms from time to time to reflect changes to the service, legal requirements, or
            product operations. If we make material changes, we will update the effective date and take reasonable steps
            to notify users where appropriate.
          </p>
          <p>
            Questions about these Terms may be sent to <strong>{legalMeta.contactEmail}</strong>. Our listed business
            address is <strong>{legalMeta.businessAddress}</strong>.
          </p>
        </>
      ),
    },
  ]

  return (
    <LegalPageLayout
      badge="Terms of Service"
      title="Use the product freely, but use it responsibly."
      description="These terms explain who can use Tourism Truth, how the app may be used, and the safety, tourism, premium-access, and liability rules that apply to a travel entertainment product."
      effectiveDate={legalMeta.effectiveDate}
      sections={sections}
    />
  )
}

