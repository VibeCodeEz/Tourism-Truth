import { LegalPageLayout } from '@/components/app/LegalPageLayout'
import { legalMeta } from '@/data/legal'

export function PrivacyPolicyPage() {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: (
        <>
          <p>
            This Privacy Policy explains how {legalMeta.companyName} collects, uses, stores, and shares information when
            you visit the Tourism Truth website, create an account, choose destinations, use truth-or-dare gameplay
            features, or otherwise interact with the service.
          </p>
          <p>
            Tourism Truth is a travel-themed web application. It lets users register or log in, choose a travel type,
            select destinations, unlock additional destinations if premium access is enabled, and save gameplay history
            such as selected places, modes, and revealed results. This policy is intended to describe those actual data
            flows as they exist today.
          </p>
        </>
      ),
    },
    {
      id: 'who-we-are',
      title: 'Who We Are',
      content: (
        <>
          <p>
            For purposes of this Privacy Policy, the service is operated under the name <strong>{legalMeta.companyName}</strong>.
            Our contact email is <strong>{legalMeta.contactEmail}</strong>, and our listed business address is{' '}
            <strong>{legalMeta.businessAddress}</strong>.
          </p>
          <p>
            If you publish Tourism Truth through a formal business entity, you should replace these placeholders with the
            exact legal entity name, support email, and business address used by the service.
          </p>
        </>
      ),
    },
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      content: (
        <>
          <p>We collect information in several categories depending on how you use the service.</p>
          <ul>
            <li>Information you submit directly when creating an account or updating your profile.</li>
            <li>Authentication and account-related records managed through Supabase Auth.</li>
            <li>Profile and preference information, including travel type and premium status flags.</li>
            <li>Gameplay and session records, including destinations, places, selected mode, and revealed results.</li>
            <li>Technical and device information generated when you access the app through hosting or backend providers.</li>
            <li>Local browser storage used to preserve session continuity and game-flow state on your device.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'direct-information',
      title: 'Information You Provide Directly',
      content: (
        <>
          <p>When you use Tourism Truth, you may provide us with information such as:</p>
          <ul>
            <li>Email address used for registration or login.</li>
            <li>Display name or full name entered during signup or profile setup.</li>
            <li>Travel type selections such as solo, companion, group, or couple mode.</li>
            <li>Support inquiries, account questions, or other direct communications you choose to send us.</li>
          </ul>
          <p>
            You are not required to provide government identification, precise geolocation, or payment card details to
            use the currently implemented version of the app.
          </p>
        </>
      ),
    },
    {
      id: 'account-authentication',
      title: 'Account and Authentication Data',
      content: (
        <>
          <p>
            Tourism Truth uses <strong>Supabase</strong> for authentication and backend infrastructure. When you register
            or log in, account credentials are processed through Supabase Auth. We may store or access account-related
            records such as your user ID, email address, authentication status, session state, and timestamps related to
            account creation or login events.
          </p>
          <p>
            Password handling is managed by Supabase Auth rather than stored in plain text by the app. Even so, you are
            responsible for maintaining the confidentiality of your password and for using a strong, unique password for
            your account.
          </p>
        </>
      ),
    },
    {
      id: 'profile-and-gameplay',
      title: 'Profile, Preference, and Gameplay Data',
      content: (
        <>
          <p>
            We store profile and gameplay-related information so the service can function as designed and preserve
            continuity across sessions.
          </p>
          <ul>
            <li>
              <strong>Profile data:</strong> display name or full name, travel type, account creation date, and premium
              status fields such as an <code>is_premium</code> boolean.
            </li>
            <li>
              <strong>Gameplay data:</strong> destination chosen, place selected, whether you chose truth or dare, and
              the revealed prompt or card result associated with a completed round.
            </li>
            <li>
              <strong>Session history:</strong> timestamps and structured records that help show or persist prior gameplay
              activity in your account.
            </li>
          </ul>
          <p>
            This information is used to personalize the app flow, restore context, and keep your account experience
            consistent when you return.
          </p>
        </>
      ),
    },
    {
      id: 'premium-data',
      title: 'Premium and Subscription-Related Data',
      content: (
        <>
          <p>
            Tourism Truth may store a premium-access flag in your profile to determine whether premium destinations are
            unlocked in the interface. At this time, the codebase supports premium state logic, but live payment
            processing may be mocked, incomplete, or not yet enabled in production.
          </p>
          <p>
            Unless and until paid billing is actually launched, Tourism Truth does not need to collect payment card
            details directly through the current app flow. If paid subscriptions are launched later, this Privacy Policy
            should be updated before billing information is collected or processed.
          </p>
        </>
      ),
    },
    {
      id: 'automatic-collection',
      title: 'Automatically Collected Information',
      content: (
        <>
          <p>
            Like most web applications, Tourism Truth and its infrastructure providers may automatically collect certain
            technical information when you access the service. This may include:
          </p>
          <ul>
            <li>Browser type and version.</li>
            <li>Device type and operating system.</li>
            <li>IP address or network-level identifiers.</li>
            <li>Date, time, and request metadata associated with use of the app.</li>
            <li>Error logs, performance logs, or security-related access logs generated by providers.</li>
          </ul>
          <p>
            We do not state that we collect precise location data, and the current app flow does not require GPS-level
            or exact geolocation tracking.
          </p>
        </>
      ),
    },
    {
      id: 'cookies-storage',
      title: 'Cookies, Local Storage, and Similar Technologies',
      content: (
        <>
          <p>
            Tourism Truth may use browser storage technologies, including local storage and session-related browser
            storage, to keep you signed in, remember in-progress game flow, and preserve your route selections between
            page loads.
          </p>
          <p>
            Supabase authentication may also rely on browser-based storage to persist sessions securely. If you block or
            clear these technologies, some features of the app may not work correctly, including session persistence and
            flow restoration.
          </p>
        </>
      ),
    },
    {
      id: 'how-we-use-information',
      title: 'How We Use Information',
      content: (
        <>
          <p>We use collected information for the following business and operational purposes:</p>
          <ul>
            <li>To create, maintain, and secure user accounts.</li>
            <li>To authenticate users and persist logged-in sessions.</li>
            <li>To save travel type, destination choices, and gameplay history.</li>
            <li>To determine whether premium routes should be available to a given user.</li>
            <li>To operate, maintain, troubleshoot, and improve the app.</li>
            <li>To respond to user questions, account requests, and support issues.</li>
            <li>To investigate abuse, fraud, security incidents, or violations of our Terms of Service.</li>
            <li>To comply with legal obligations, lawful requests, and recordkeeping needs.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'legal-bases',
      title: 'Legal Bases for Processing',
      content: (
        <>
          <p>
            If privacy laws such as the GDPR or UK GDPR apply to our processing, we generally rely on one or more of the
            following legal bases depending on the context:
          </p>
          <ul>
            <li>
              <strong>Contract:</strong> to provide account access, saved gameplay, and core service functionality you
              request.
            </li>
            <li>
              <strong>Legitimate interests:</strong> to secure, maintain, analyze, and improve the service in a
              proportionate way.
            </li>
            <li>
              <strong>Consent:</strong> where consent is required by law for specific processing activities.
            </li>
            <li>
              <strong>Legal obligation:</strong> to comply with applicable laws, regulations, or lawful requests.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'sharing',
      title: 'How We Share Information',
      content: (
        <>
          <p>We do not state that we sell personal data, and this policy does not describe any sale of personal data.</p>
          <p>We may share information in the following limited circumstances:</p>
          <ul>
            <li>With infrastructure and backend providers such as Supabase to operate authentication and database features.</li>
            <li>With hosting or deployment providers that deliver the app and generate operational logs.</li>
            <li>With professional advisers or authorities where disclosure is reasonably necessary to protect rights or comply with law.</li>
            <li>As part of a merger, acquisition, financing, or asset transfer, subject to appropriate confidentiality safeguards.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'service-providers',
      title: 'Service Providers and Third Parties',
      content: (
        <>
          <p>Tourism Truth currently relies on third-party service providers for core technical operations.</p>
          <ul>
            <li>
              <strong>Supabase:</strong> authentication, database storage, session handling, and related backend services.
            </li>
            <li>
              <strong>Hosting provider:</strong> app delivery, web serving, logging, and deployment infrastructure.
            </li>
          </ul>
          <p>
            We do not currently identify a live analytics provider or live payment processor in the implemented codebase.
            If those tools are later added, this policy should be updated to reflect them before launch.
          </p>
        </>
      ),
    },
    {
      id: 'retention-security',
      title: 'Data Retention and Security',
      content: (
        <>
          <p>
            We retain personal information for as long as reasonably necessary to operate the service, maintain accounts,
            preserve gameplay history, resolve disputes, enforce our terms, and comply with legal obligations. Retention
            periods may vary based on the type of information and whether your account remains active.
          </p>
          <p>
            We use reasonable administrative, technical, and organizational measures designed to protect information from
            unauthorized access, disclosure, alteration, or destruction. However, no internet-based service or storage
            system is completely secure, and we cannot guarantee absolute security.
          </p>
        </>
      ),
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      content: (
        <>
          <p>
            Depending on where Tourism Truth, Supabase, and hosting providers operate, personal information may be stored
            or processed outside your city, region, or country. The primary hosting or storage region should be confirmed
            and inserted as <strong>{legalMeta.dataStorageRegion}</strong>.
          </p>
          <p>
            Where international transfers occur, we intend to rely on provider safeguards, contractual protections, and
            other legally recognized transfer mechanisms where required by applicable law.
          </p>
        </>
      ),
    },
    {
      id: 'rights',
      title: 'Your Rights and Choices',
      content: (
        <>
          <p>Depending on your location, you may have rights regarding your personal information, including the right to:</p>
          <ul>
            <li>Access, correct, or update your information.</li>
            <li>Request deletion of your account or certain stored data.</li>
            <li>Object to or restrict certain processing.</li>
            <li>Request a copy of personal data in a portable format where legally applicable.</li>
            <li>Withdraw consent where processing depends on consent.</li>
          </ul>
          <p>
            You may also update some information directly through the app, such as changing your travel setup. For privacy
            requests that cannot be handled inside the interface, contact us at {legalMeta.contactEmail}.
          </p>
        </>
      ),
    },
    {
      id: 'marketing-children-links',
      title: 'Marketing Communications, Children’s Privacy, and Third-Party Links',
      content: (
        <>
          <p>
            Tourism Truth does not currently describe a general marketing newsletter or promotional email program in the
            implemented product flow. We may still send service-related communications, such as account or security
            notices, when necessary.
          </p>
          <p>
            The service is not directed to young children. If you believe a child has provided personal information in
            violation of applicable law, contact us so we can review and address the issue.
          </p>
          <p>
            The service may from time to time contain links to third-party sites or services. We are not responsible for
            the privacy practices of third-party services that are not operated by Tourism Truth.
          </p>
        </>
      ),
    },
    {
      id: 'changes-contact',
      title: 'Changes to This Policy and Contact Us',
      content: (
        <>
          <p>
            We may update this Privacy Policy from time to time to reflect legal, operational, or product changes. If we
            make material changes, we will update the effective date and take reasonable steps to notify users where
            appropriate.
          </p>
          <p>
            If you have questions about this Privacy Policy or want to submit a privacy-related request, contact us at{' '}
            <strong>{legalMeta.contactEmail}</strong> or write to <strong>{legalMeta.businessAddress}</strong>.
          </p>
        </>
      ),
    },
  ]

  return (
    <LegalPageLayout
      badge="Privacy Policy"
      title="Privacy matters should be readable, specific, and honest."
      description="This policy explains what Tourism Truth collects, why the data is needed, how it is used, and where you still need to replace launch-specific legal placeholders before publishing."
      effectiveDate={legalMeta.effectiveDate}
      sections={sections}
    />
  )
}

