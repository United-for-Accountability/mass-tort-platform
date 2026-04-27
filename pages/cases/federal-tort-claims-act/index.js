import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getFtcaConsentChallengeState } from '../../../data/contingentCases';

const howItWorks = [
  {
    title: 'Build a national declaration record',
    body:
      'The first stage is collection. Supporters submit declarations, identify themselves as part of the U.S. adult population, and explain why the federal government cannot be allowed to hide behind sovereign-immunity doctrine when the sovereign people themselves are demanding accountability.'
  },
  {
    title: 'Verify that support exceeds one-half of the adult population',
    body:
      'This theory is not framed as a symbolic petition. It is framed as a collective sovereign demand. For that reason, the campaign states openly that activation requires verified support from more than half of the adult population of the United States. Until that benchmark is met, submissions preserve the record and the constitutional theory, but do not claim to speak as an activated majority.'
  },
  {
    title: 'Present the challenge to the courts with a complete constitutional record',
    body:
      'Once the majority benchmark is met, the case theory asks an Article III court to decide whether the Federal Tort Claims Act can constitutionally require the sovereign people to obtain their own government\'s permission before seeking judicial accountability for systemic harm.'
  },
  {
    title: 'Seek declaratory and injunctive relief on the merits',
    body:
      'The requested relief is not a plea for grace. It is a demand for adjudication: a declaration that the FTCA\'s consent requirement and related limitations cannot be applied to a verified-majority action by the sovereign people, and an injunction preventing those barriers from being used to shut the courthouse door before the merits are heard.'
  }
];

const legalTheory = [
  {
    title: 'The people precede the government',
    body:
      'The core argument is simple and severe. The federal government is the agent. The people are the principal. A principal does not need the agent\'s consent to demand an accounting from the agent. The theory therefore treats sovereign immunity, in this setting, as constitutionally inverted.'
  },
  {
    title: 'The FTCA is challenged as a barrier, not as a gift',
    body:
      'The Federal Tort Claims Act is ordinarily described as a limited waiver of sovereign immunity. This page reframes that posture. It argues that when the sovereign people act collectively, the statute cannot operate as a permission slip through which the government decides whether the people may approach their own courts.'
  },
  {
    title: 'The Ninth Amendment is the textual anchor',
    body:
      'The retained-rights language of the Ninth Amendment is presented here as the constitutional anchor for a collective right of judicial accountability: the right of the people, acting together, to seek a remedy when systemic harms cannot be corrected through ordinary political channels alone.'
  }
];

const requestedRelief = [
  'A declaration that the FTCA consent requirement and related exceptions cannot constitutionally bar a verified-majority action by the sovereign people seeking accountability for systemic public harm.',
  'An injunction preventing the United States from invoking sovereign immunity, discretionary-function immunity, or similar FTCA limitations as threshold barriers against that collective constitutional claim.',
  'An order allowing the action to proceed to the evidentiary merits so the public record of systemic capture, public injury, and institutional self-protection can be tested in court.',
  'Any additional equitable relief the court determines is necessary to restore lawful accountability between the people and the government created to serve them.'
];

const whyMajorityMatters = [
  'The theory depends on demonstrating that the claim is not a factional grievance but a sovereign demand backed by more than half of the adult population.',
  'A verified-majority threshold is meant to show that the plaintiffs are not merely many individuals aggregated together, but the governing public speaking in concert.',
  'The threshold also prevents overclaiming. Until the majority benchmark is met, the site preserves declarations and legal theory without pretending that activation has already happened.'
];

export default function FederalTortClaimsActCasePage() {
  const caseState = getFtcaConsentChallengeState();

  return (
    <>
      <Head>
        <title>{caseState.title} | United for Accountability</title>
        <meta
          name="description"
          content="A contingent constitutional challenge arguing that the Federal Tort Claims Act cannot require the sovereign people to obtain government consent before seeking judicial accountability for systemic harm."
        />
        <link rel="canonical" href="https://www.unitedforaccountability.org/cases/federal-tort-claims-act" />
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16 text-slate-900 space-y-12">
        <section className="space-y-6">
          <div className="rounded-2xl border border-blue-300 bg-blue-50 p-4 text-sm font-medium text-blue-950">
            <p>Status: Contingent majority-support collection is active.</p>
            <p>{caseState.explanatoryNotice}</p>
          </div>

          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-800">Contingent Ninth Amendment and accountability challenge</p>
            <h1 className="text-5xl font-extrabold leading-tight text-slate-950">Revocation of the Federal Tort Claims Act</h1>
            <p className="max-w-4xl text-xl leading-8 text-slate-700">
              This page sets out a constitutional theory in uncompromising terms: the sovereign people should not need the federal government&apos;s consent to seek judicial accountability from the federal government. The campaign is collecting declarations now, but it states openly that the mass demand activates only if verified support exceeds one-half of the adult population of the United States.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Activation rule</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">More than one-half of U.S. adults</p>
              <p className="mt-2 text-sm text-slate-600">{caseState.publicBenchmarkLabel}</p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Current posture</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Record building and verification preparation</p>
              <p className="mt-2 text-sm text-slate-600">Support is being assembled now without claiming that the majority threshold has already been met.</p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Judicial posture</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Respectfully directed to the courts</p>
              <p className="mt-2 text-sm text-slate-600">The argument asks the courts to hear the constitutional question, not to be bypassed or disregarded.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/cases/federal-tort-claims-act/declaration" className="inline-flex items-center rounded-full bg-blue-800 px-6 py-3 text-lg font-semibold text-white shadow transition hover:bg-blue-900">
              Join the declaration record
            </Link>
            <a href="#how-it-works" className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-lg font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50">
              Read how this would work
            </a>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-3xl bg-stone-50 p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-slate-950">Introduction</h2>
            <div className="mt-4 space-y-4 text-lg leading-8 text-slate-700">
              <p>
                This is not presented as an ordinary tort suit. It is presented as a constitutional accountability theory aimed at a specific barrier: the idea that the federal government may decide for itself when the people may sue it. On this view, that premise is backwards. The people are the source of public power. Courts exist within a constitutional system established by the people. A statute cannot convert that source relationship into a requirement that the sovereign obtain permission from its own agent.
              </p>
              <p>
                The theory therefore challenges the Federal Tort Claims Act not because every line of it is void in every context, but because its consent requirement, exceptions, and gatekeeping function are argued to be nonbinding when invoked against the sovereign people acting collectively to address systemic public harm.
              </p>
            </div>
          </article>

          <article className="rounded-3xl bg-slate-950 p-8 text-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold">Current operating rule</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              This case is collecting support now, but it does not claim to be an activated majority action until the platform can verify support exceeding one-half of the U.S. adult population.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-300">
              <li>{caseState.verificationStandard}</li>
              <li>The page preserves legal theory, public support, and declarations before activation.</li>
              <li>The site is not claiming that a verified majority or court ruling already exists.</li>
            </ul>
          </article>
        </section>

        <section id="how-it-works" className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-950">How This Would Work</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {howItWorks.map((item) => (
              <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-700">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-3xl bg-blue-50 p-8">
            <h2 className="text-3xl font-bold text-blue-950">Why the majority threshold is central</h2>
            <ul className="mt-4 space-y-4 text-lg leading-8 text-blue-950">
              {whyMajorityMatters.map((item) => (
                <li key={item} className="rounded-2xl bg-white px-5 py-4 shadow-sm">{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl bg-emerald-50 p-8">
            <h2 className="text-3xl font-bold text-emerald-950">Respect for the courts</h2>
            <div className="mt-4 space-y-4 text-lg leading-8 text-emerald-950">
              <p>
                This campaign does not treat the courts as an enemy institution to be brushed aside. It treats the courts as the forum in which a constitutional contradiction should be confronted. The request is direct: hear the claim, test it, and decide whether the government may place a consent gate between the sovereign people and judicial accountability.
              </p>
              <p>
                Respect for the courts, in this framework, means bringing the strongest record possible, speaking plainly about the constitutional theory, and asking the judiciary to perform its duty rather than allowing threshold doctrines to extinguish the question before the merits are reached.
              </p>
            </div>
          </article>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-950">Complaint Theory in Strong Form</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {legalTheory.map((item) => (
              <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-700">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-red-50 p-8">
          <h2 className="text-3xl font-bold text-red-950">Why the FTCA is the target of this challenge</h2>
          <div className="mt-4 space-y-4 text-lg leading-8 text-red-950">
            <p>
              The Federal Tort Claims Act is ordinarily presented as the statute that allows people to sue the United States in limited circumstances. This page challenges that framing. It argues that the statute operates as a gate through which the government decides when accountability is allowed, what harms count, and which categories of conduct are immunized from judicial review.
            </p>
            <p>
              On this theory, the problem becomes most severe when the injury is systemic rather than individualized. If the government may insist that every public wrong be broken into isolated personal torts, while reserving broad exceptions for discretionary and policy-level conduct, then the largest public injuries become the least reachable in court. That is the constitutional inversion this campaign is designed to confront.
            </p>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-slate-950">Requested relief</h2>
            <ul className="mt-4 space-y-4 text-lg leading-8 text-slate-700">
              {requestedRelief.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-5 py-4">{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl bg-amber-50 p-8">
            <h2 className="text-3xl font-bold text-amber-950">Join the declaration record</h2>
            <div className="mt-4 space-y-4 text-lg leading-8 text-amber-950">
              <p>
                If you support the proposition that the sovereign people should not need government consent to seek judicial accountability for systemic harm, join this declaration record. Your submission is preserved now as part of a contingent constitutional record while the verification standard for a majority-supported action is being built.
              </p>
              <p>
                The site is explicit about the threshold: more than half of the adult population must be verified before this campaign claims activation as a mass demand. Until then, the work is to document support, assemble testimony, and prepare the strongest constitutional record possible for the courts.
              </p>
            </div>
            <Link href="/cases/federal-tort-claims-act/declaration" className="mt-6 inline-flex items-center rounded-full bg-amber-700 px-6 py-3 text-lg font-semibold text-white transition hover:bg-amber-800">
              Open the FTCA declaration
            </Link>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}