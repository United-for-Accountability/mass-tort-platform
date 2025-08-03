import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function Cases() {
  return (
    <>
      <Head>
        <title>The People's Docket | United for Accountability</title>
        <meta name="description" content="Explore active mass tort cases being prepared by United for Accountability. This is where legal evidence becomes action, and systemic harm meets justice." />
        <link rel="canonical" href="https://www.unitedforaccountability.org/cases" />
      </Head>

      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">⚖️ The People’s Docket</h1>
       <p className="text-lg text-gray-700 mb-10">
       This is the living legal archive of active lawsuits led by <strong>United for Accountability</strong>. 
       Each case is grounded in documented public harm, constitutional violations, and legal precedent. To assert our right as a unified force for change, we must hold and exercise the rights we retain — together.
       <br />
       <br />
       <strong>The 9th Amendment was written for this very moment:</strong> When government fails, when institutions betray, when systems harm — the people have the lawful right to rise.
       <br />
       <br />
       <strong>Failing to use our rights is not neutrality. It is surrender.</strong><br />
       <strong>And surrender is not what the Constitution intended.</strong>
       <br />
       <br />
       The rights we do not use are the rights we silently waive — and in that silence, injustice grows.
       <br />
       <br />
       <strong>But when we stand united, we do not just remember our rights — we activate them.</strong>
</p>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CaseCard
            title="Unauthorized Rule: The People’s Right to Reject Corporate Capture of Government Mass Tort"
            href="/cases/unauthorized-rule"
            description="Invoking the 9th Amendment to lawfully resist any leader — past or present — who attempts to govern without public consent, dismantle representative democracy, or surrender government to institutional holders."
          />
          <CaseCard
           title="We Recognize Palestine: A Global and Constitutional Legal Demand for Sovereignty"
           href="/cases/we-recognize-palestine"
           description="A global mass tort and 9th Amendment action to recognize Palestine as a sovereign state, end U.S. complicity in genocide, and assert the people's retained right to lawful resistance against state-enabled oppression and foreign policy without consent."
         />
          <CaseCard
            title="United for Accountability et al. v. Corporate Congressional Influence and Systemic Disenfranchisement"
            href="/cases/corporate-congressional-influence-and-systemic-disenfranchisement"
            description="Mass tort asserting the 9th Amendment right to be free from corporate lobbying that overrides public representation."
          />
          <CaseCard
            title="Housing Injustice Lawsuit"
            href="/cases/housing"
            description="Challenging the systemic exploitation of tenants, homelessness criminalization, and institutional neglect in housing policy."
          />
          <CaseCard
            title="Healthcare Harm Lawsuit"
            href="/cases/healthcare"
            description="Targeting medical abuse, insurance denial, pharmaceutical exploitation, and discriminatory care practices."
          />
          <CaseCard
            title="Institutional Betrayal Lawsuit"
            href="/cases/institutional-abuse"
            description="Holding prisons, schools, and government bodies accountable for systemic harm and negligence."
          />
          <CaseCard
            title="Environmental & Extraction Lawsuit"
            href="/cases/environment"
            description="Legal action against environmental racism, corporate pollution, and extraction of public resources for private gain."
          />
          <CaseCard
            title="Civil & Constitutional Violations"
            href="/cases/constitutional"
            description="Litigating violations of 1st, 8th, 9th, and 14th Amendments, plus federal civil rights under 42 U.S.C. § 1983 & § 1985."
          />
        </div>
      </main>

      <Footer />
    </>
  )
}

function CaseCard({ title, description, href }) {
  return (
    <Link href={href} className="block border border-blue-100 rounded-lg p-6 shadow hover:shadow-md transition">
      <h2 className="text-2xl font-semibold text-blue-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  )
}
