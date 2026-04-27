import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getPeoplesLastResortState } from '../../../data/contingentCases';

const denialReveals = [
  {
    title: "The system's accountability mechanisms are closed loops.",
    body:
      'A dismissal would show that the same government structure writes the rules, enforces the rules, and adjudicates challenges to those rules, while offering no direct democracy circuit breaker inside Article III courts.'
  },
  {
    title: 'Self-created doctrines would be exposed as barriers against the sovereign.',
    body:
      'If sovereign immunity, standing, or political-question doctrines are used to block a majority action, the denial itself would frame the people as outsiders who must ask permission from the institutions they created.'
  },
  {
    title: 'Consent would be treated as irrevocable unless the government authorizes its own correction.',
    body:
      'A denial would place on the record the claim that original consent has no practical recall clause apart from government-controlled mechanisms, even when the people assert that the compact has been breached.'
  }
];

const nextSteps = [
  'A People\'s Declaration of Withdrawn Consent, published only if the configured majority benchmark and court-dismissal conditions are met.',
  'A People\'s Convention organized directly from the sovereign body rather than from ordinary federal channels.',
  'Mass non-cooperation and parallel civic institutions as peaceful responses to a sealed legal container.',
  'Pressure for an Article V convention or comparable formal restructuring if a broad public mandate forms.'
];

const preparedNoticeArticles = [
  {
    heading: 'Preamble',
    paragraphs: [
      'We, the undersigned, comprising more than one-half of the adult population of the United States, hereby issue this Notice. We do not petition. We do not request. We notify.',
      'We hold this truth to be self-evident: that just governments derive their powers from the consent of the governed, and that when a government becomes destructive of the safety and happiness of the people, it is the right of the people to alter or abolish it. This right is not a gift from government. It is not conferred by statute. It is the foundational fact of political existence, acknowledged in the Declaration of Independence and preserved against disparagement by the Ninth Amendment to the Constitution of the United States.',
      'We have now tested whether the existing governmental structure can be corrected through its own mechanisms. The answer is definitive. A lawsuit joined by a majority of the sovereign people, a good-faith attempt to hold the government accountable for systemic capture and widespread harm, has been dismissed by the federal courts. The dismissal invokes doctrines invented by the government itself: sovereign immunity, standing, and the political question doctrine.',
      'We accept the dismissal as evidence. It establishes, beyond doubt, that the legal container cannot be used to repair the container. The government has insulated itself from its source. The social compact is breached.',
      'Therefore, acting collectively as the sovereign popular body that authorized this government, we now withdraw our consent. We resume the authority that has always been ours, retained and unenumerated, and we declare the current governmental apparatus to be on notice that its legitimacy is extinguished by the will of its rightful source.'
    ]
  },
  {
    heading: 'Article I: The Fact of Retained Sovereignty',
    paragraphs: [
      'The people are the supreme authority. Before any constitution, before any statute, before any court, the people exist as the political sovereign. Governments are their agents, not their masters.',
      'The Ninth Amendment preserves this truth. The ultimate right retained by the people is the right to exist as a free and self-governing body, and to remove or reconstitute any government that subverts their well-being.',
      'Majority rule is the engine of sovereignty. When a clear majority of the adult population acts in concert, it is the sovereign speaking in its most authoritative voice.'
    ]
  },
  {
    heading: 'Article II: The Act of Gathering',
    paragraphs: [
      'We, the people, have assembled in numbers exceeding half of the adult citizens of the United States. We have done so peacefully and publicly, exercising our retained rights of assembly, association, and political expression.',
      'We have collectively brought an action, not as isolated plaintiffs with discrete injuries, but as the sovereign body itself, asserting that the federal government has been captured by corporate and private interests and no longer serves the general welfare.',
      'We invoked the Ninth Amendment as the textual acknowledgment of our unenumerated right to collective correction. We sought no money damages. We sought only that the government be redirected to serve its rightful purpose: the safety and happiness of the people.'
    ]
  },
  {
    heading: 'Article III: The Predicted Denial and Its Meaning',
    paragraphs: [
      'The federal courts have dismissed our action. They did not reach the merits. They dismissed it at the threshold, citing doctrines of judicial self-restraint that the government itself created.',
      'Sovereign immunity, they said. We respond: the sovereign is the people, and an agent cannot claim immunity from its principal.',
      'Standing, they said. We respond: when the grievance is held by the majority of the sovereign people, it is not a grievance. It is a verdict.',
      'Political question, they said. We respond: when the elected branches are the ones captured, referring the people back to those branches confirms the capture.',
      'The meaning of the denial is plain. The legal system has announced that there is no door within the container through which the sovereign can pass to correct a broken government.'
    ]
  },
  {
    heading: 'Article IV: Withdrawal of Consent',
    paragraphs: [
      'Consent is revocable. The consent that authorized this government was given by the people, and what the people gave, the people may withdraw.',
      'We hereby withdraw our consent. We, the majority of the adult population, no longer recognize the current federal government as our lawful agent.',
      'This withdrawal is not a request. It is not subject to review by any branch of the government being withdrawn from. It is a statement of political fact grounded in the same sovereign authority that brought the government into existence.'
    ]
  },
  {
    heading: 'Article V: The People\'s Next Steps',
    paragraphs: [
      'A Convention of the People will draft a new governing charter, or amendments to the existing one, and submit that work directly to a national referendum of the adult population.',
      'Mass non-cooperation will continue peacefully through withdrawal of labor, commerce, and obedience to mandates that serve corporate capture rather than the public good.',
      'Parallel institutions of mutual aid, dispute resolution, and collective decision-making will be built outside the captured federal apparatus.',
      'State and local governments are invited to recognize the withdrawal of consent and support a People\'s Convention.',
      'The world is notified that the government occupying Washington, D.C., no longer represents the consent of the governed.'
    ]
  },
  {
    heading: 'Conclusion',
    paragraphs: [
      'We are not a mob. We are not a faction. We are the majority of the adult citizens of the United States, acting in solemn assembly and exercising the right the Ninth Amendment acknowledges and no law can erase.',
      'Let this Notice be recorded. Let it be published. Let it be known that on this day, the people withdrew their consent, and the lawful work of reconstituting a government that serves them began.'
    ]
  }
];

function statusTone(state) {
  if (state.showPostDenialNotice) {
    return 'border-red-300 bg-red-50 text-red-900';
  }

  if (state.thresholdMet) {
    return 'border-amber-300 bg-amber-50 text-amber-900';
  }

  return 'border-blue-300 bg-blue-50 text-blue-900';
}

function formatCount(value) {
  const count = Number(value);
  if (!Number.isFinite(count) || count < 0) {
    return '0';
  }

  return count.toLocaleString('en-US');
}

function formatRatio(value) {
  const ratio = Number(value);
  if (!Number.isFinite(ratio) || ratio < 0) {
    return null;
  }

  return `${Math.round(ratio * 100)}%`;
}

export default function PeoplesLastResortPage() {
  const [caseState, setCaseState] = useState(getPeoplesLastResortState());
  const [statusError, setStatusError] = useState('');

  useEffect(() => {
    let active = true;

    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/cases/peoples-last-resort/status');
        if (!response.ok) {
          throw new Error('Unable to load live case status.');
        }

        const payload = await response.json();
        if (active) {
          setCaseState(getPeoplesLastResortState(payload));
        }
      } catch (error) {
        console.error(error);
        if (active) {
          setStatusError('Live status is temporarily unavailable. Showing default contingent state.');
        }
      }
    };

    fetchStatus();
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Head>
        <title>{caseState.title} | United for Accountability</title>
        <meta
          name="description"
          content="A contingent Ninth Amendment case built as a last-resort public record: declarations are collected now, but the prepared withdrawal-of-consent notice is only operative after a verified-majority threshold and court dismissal."
        />
        <link rel="canonical" href="https://www.unitedforaccountability.org/cases/peoples-last-resort" />
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16 text-slate-900 space-y-12">
        <section className="space-y-6">
          <div className={`rounded-2xl border p-4 text-sm font-medium ${statusTone(caseState)}`}>
            <p>Status: Contingent collection is active.</p>
            <p>{caseState.explanatoryNotice}</p>
            {statusError && <p className="mt-2 text-xs font-semibold">{statusError}</p>}
          </div>

          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-700">Contingent Ninth Amendment Case</p>
            <h1 className="text-5xl font-extrabold leading-tight text-slate-950">The People&apos;s Last Resort</h1>
            <p className="max-w-4xl text-xl leading-8 text-slate-700">
              This case is designed as a last-resort instrument. Declarations are being gathered now, but the theory ripens only after two conditions are met: a verified majority benchmark and a court denial or dismissal.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Threshold model</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Verified U.S. adult majority</p>
              <p className="mt-2 text-sm text-slate-600">{caseState.publicBenchmarkLabel}</p>
              <p className="mt-2 text-sm text-slate-600">Configured target: {caseState.thresholdConfigured ? formatCount(caseState.thresholdValue) : 'Not configured yet'}</p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Court outcome</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{caseState.courtOutcome.replace(/-/g, ' ')}</p>
              <p className="mt-2 text-sm text-slate-600">
                {caseState.deniedByCourt
                  ? 'Court denial/dismissal recorded. Final notice unlock now depends on threshold status.'
                  : 'No post-denial notice is active until a dismissal or denial is recorded.'}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Verification queue</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {formatCount(caseState.verifiedCount)} verified / {formatCount(caseState.rawSubmissionCount)} total
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Pending review: {formatCount(caseState.pendingCount)} | Rejected/not counted: {formatCount(caseState.rejectedCount)}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900">Threshold progress</h2>
              <p className="text-sm font-semibold text-slate-600">
                {caseState.thresholdConfigured ? formatRatio(caseState.thresholdRatio) || '0%' : 'Awaiting configuration'}
              </p>
            </div>
            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-red-700 transition-all duration-500"
                style={{ width: caseState.thresholdConfigured ? `${Math.max(2, Math.round((caseState.thresholdRatio || 0) * 100))}%` : '2%' }}
              />
            </div>
            <p className="mt-3 text-sm text-slate-700">
              {caseState.thresholdConfigured
                ? caseState.thresholdMet
                  ? 'Verified-majority threshold met. If court outcome is denied/dismissed, the post-denial notice can be activated.'
                  : `${formatCount(caseState.thresholdRemaining)} additional verified declarations are needed to satisfy the configured threshold.`
                : 'Administrators must set a numeric threshold before majority progress can be measured.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/cases/peoples-last-resort/declaration" className="inline-flex items-center rounded-full bg-red-700 px-6 py-3 text-lg font-semibold text-white shadow transition hover:bg-red-800">
              Join the contingent declaration
            </Link>
            <a href="#prepared-notice" className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-lg font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50">
              Read the prepared notice
            </a>
            <Link href="/cases/peoples-last-resort/admin" className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-lg font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50">
              Admin control panel
            </Link>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-stone-50 p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-slate-950">A Declaration of the People&apos;s Ninth Amendment Sovereignty</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              The core assertion is that the people are the supreme authority in this nation and that the Constitution delegates specific, limited powers to a government that exists to serve the people, not to rule them. Under this theory, the Ninth Amendment is the textual acknowledgment that the people&apos;s power is not exhausted by enumerated rights. The retained right at the center of this case is the claimed right to collectively redirect, correct, or dissolve government when it becomes destructive of the public good.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              This page does not represent that the site has already established a verified majority or obtained a court denial. It preserves the theory, the public record, and the future-stage notice that would be published only if those conditions are satisfied.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-950 p-8 text-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold">Current operating rule</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">This case is only intended for use after every other case has obtained majority public support and this final mass action is denied by the courts. Until then, it remains a contingent archive and a prepared legal-political instrument.</p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-300">
              <li>{caseState.verificationStandard}</li>
              <li>Only a recorded court denial or dismissal can unlock the post-denial notice.</li>
              <li>Nothing on this page should be read as claiming those triggers have already occurred.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-950">The Setup a Denial Would Reveal</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {denialReveals.map((item) => (
              <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-700">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-3xl bg-red-50 p-8">
            <h2 className="text-3xl font-bold text-red-900">Why a denial is framed here as evidence</h2>
            <p className="mt-4 text-lg leading-8 text-red-950">
              In this framework, a court&apos;s denial would not function as the end of the argument. It would be entered into the record as proof that the legal container is closed against the majority that supposedly authorizes it. The denial would be used as evidence that the system interprets consent as a permanent transfer rather than a revocable delegation.
            </p>
            <p className="mt-4 text-lg leading-8 text-red-950">
              The page therefore separates two moments: the present collection of declarations, and the future publication of a withdrawal-of-consent notice if the threshold and denial predicates are actually met.
            </p>
          </article>

          <article className="rounded-3xl bg-slate-100 p-8">
            <h2 className="text-3xl font-bold text-slate-950">What comes after the denial</h2>
            <ul className="mt-4 space-y-4 text-lg leading-8 text-slate-700">
              {nextSteps.map((step) => (
                <li key={step} className="rounded-2xl bg-white px-5 py-4 shadow-sm">{step}</li>
              ))}
            </ul>
          </article>
        </section>

        <section id="prepared-notice" className="rounded-3xl border border-amber-300 bg-amber-50 p-8">
          <div className="max-w-4xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Prepared future-state instrument</p>
            <h2 className="text-3xl font-bold text-amber-950">People&apos;s Notice of Withdrawn Consent</h2>
            <p className="text-lg leading-8 text-amber-950">
              This notice is drafted into the public record now because you asked that it be included. It is presented here as prepared text, not as an operative declaration. It becomes active only if the site records both a verified-majority benchmark and a court denial or dismissal.
            </p>
          </div>

          {caseState.showPostDenialNotice ? (
            <div className="mt-8 space-y-8">
              {preparedNoticeArticles.map((article) => (
                <article key={article.heading} className="rounded-3xl bg-white p-6 shadow-sm">
                  <h3 className="text-2xl font-bold text-slate-950">{article.heading}</h3>
                  <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                    {article.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-950">Notice locked pending trigger conditions</h3>
              <p className="mt-4 leading-8 text-slate-700">
                The full notice text is gated until both conditions are met in live case state: verified-majority threshold achieved and court outcome recorded as denied or dismissed.
              </p>
              <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Current trigger check</p>
                <p className="mt-2 text-sm text-slate-700">Threshold met: {caseState.thresholdMet ? 'Yes' : 'No'}</p>
                <p className="mt-1 text-sm text-slate-700">Court denied/dismissed: {caseState.deniedByCourt ? 'Yes' : 'No'}</p>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}