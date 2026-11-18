import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const slug = 'federal-privatization-public-authority';
const pageUrl = `https://www.unitedforaccountability.org/cases/${slug}`;
const title =
  "The People's Government: Investigation Into Federal Privatization, Private Control, and the Transfer of Public Authority";
const subtitle = 'Who Owns the Infrastructure, Who Controls the Decisions, and Who Answers to the American People?';
const metaDescription =
  'A pre-litigation investigation into federal privatization, contractor ownership and control, operational dependence, and whether public authority remains accountable. FAA air traffic control is the first pilot. No complaint has been filed.';

const labelStyles = {
  Verified: 'bg-green-100 text-green-900 border-green-300',
  'Under investigation': 'bg-blue-100 text-blue-900 border-blue-300',
  Disputed: 'bg-orange-100 text-orange-900 border-orange-300',
  Unverified: 'bg-amber-100 text-amber-900 border-amber-300',
  'Legally unresolved': 'bg-purple-100 text-purple-900 border-purple-300',
  Corrected: 'bg-gray-100 text-gray-900 border-gray-300',
  Closed: 'bg-gray-200 text-gray-800 border-gray-400',
};

const sources = [
  ['E-001', 'U.S. DOT, OMB, FAA \u2014 Joint Letter Regarding Additional ATC Funding (Nov. 17, 2026)', 'https://www.transportation.gov/sites/dot.gov/files/2026-11/Joint%20Letter%20Regarding%20Additional%20ATC%20Funding.pdf'],
  ['E-002', 'The Heritage Foundation \u2014 Mandate for Leadership 2025, Ch. 19, pp. 632\u2013634', 'https://archive.org/details/2025_MandateForLeadership_FULL'],
  ['E-003', 'FAA \u2014 Nationwide Ground Stop: Questions and Answers (Nov. 15, 2026)', 'https://www.faa.gov/newsroom/nationwide-ground-stop-questions-and-answers'],
  ['E-004', 'U.S. GAO \u2014 GAO-26-107992, Air Traffic Control Systems (Sept. 14, 2026)', 'https://www.gao.gov/products/gao-26-107992'],
  ['E-005', 'Congressional Research Service \u2014 The Private Nondelegation Doctrine, IF13307 (Sept. 8, 2026)', 'https://www.everycrsreport.com/reports/IF13307.html'],
  ['E-006', "Congressional Research Service \u2014 FCC v. Consumers' Research, LSB11301", 'https://www.everycrsreport.com/reports/LSB11301.html'],
  ['E-007', 'FAA \u2014 Contract Tower Program', 'https://www.faa.gov/about/office_org/headquarters_offices/ato/service_units/mission_support/faa_contract_tower_program'],
  ['E-008', 'Federal Acquisition Regulation \u2014 Subpart 7.5, Inherently Governmental Functions', 'https://www.acquisition.gov/far/subpart-7.5'],
  ['E-010', 'AIN \u2014 FAA Awards ATC Upgrade Integration Contract to Peraton (Dec. 5, 2025)', 'https://www.ainonline.com/aviation-news/air-transport/2025-12-05/faa-awards-atc-upgrade-integration-contract-peraton'],
  ['E-014', 'Washington Technology \u2014 FAA brings in AT&T for network modernization program (Aug. 2026)', 'https://www.washingtontechnology.com/contracts/2026/08/faa-brings-t-network-modernization-program/415412/'],
  ['E-016', 'FAA \u2014 Pilot to transition selected contract towers to FAA operation (May 18, 2026)', 'https://faa.gov/newsroom/new-faa-program-moves-strengthen-controller-pipeline-standardize-training'],
  ['E-019', 'Ballard Spahr \u2014 FinCEN exempts U.S. entities from beneficial ownership reporting (Aug. 24, 2026)', 'https://www.ballardspahr.com/insights/alerts-and-articles/2026/08/fincen-permanently-exempts-us-entities-and-persons-from-beneficial-ownership-reporting'],
];

const verifiedBackground = [
  {
    label: 'Verified',
    text: 'On November 17, 2026, the Secretary of Transportation, the OMB Director, and the FAA Administrator asked the House and Senate Appropriations Committees for $50.1 billion for air traffic control modernization and airport infrastructure. The letter breaks down spending but does not address who will own or operate the new systems.',
    ids: 'E-001',
  },
  {
    label: 'Verified',
    text: 'On November 13, 2026, the FAA issued a nationwide ground stop. The FAA states that legacy equipment became unstable when data flooded the FAA Telecommunications Infrastructure network, affecting 17 of 22 en route centers. The root-cause investigation was ongoing.',
    ids: 'E-003',
  },
  {
    label: 'Verified',
    text: 'In September 2026, GAO reported that the Brand New Air Traffic Control System program lacked a reliable lifecycle cost estimate and an integrated master schedule.',
    ids: 'E-004',
  },
  {
    label: 'Verified',
    text: 'Project 2025\u2019s Department of Transportation chapter recommends separating the FAA from DOT or, at a minimum, the Air Traffic Organization from the FAA, funding air traffic services through user fees, and operating the FAA more like a business. It describes these as changes requiring legislation. These are proposals; no action implementing them has been identified.',
    ids: 'E-002',
  },
  {
    label: 'Verified',
    text: 'The FAA has contracted out the staffing of some control towers since 1982 under a program Congress authorizes and funds. In May 2026 the FAA began a pilot moving selected high-activity contract towers into FAA operation.',
    ids: 'E-007, E-016',
  },
];

const questions = [
  'Has any federal agency transferred a governmental function, or the operational control of essential infrastructure, without the authority the law requires?',
  'Do contractors make, or effectively make, final decisions that bind the public or commit federal funds?',
  'Who owns the equipment, software, and data that essential public functions depend on, and could the government replace the contractor without loss of service?',
  'Who ultimately owns and controls the contractors performing essential functions, and is control concentrated across agencies?',
  'Were required notices, records, legal reviews, or approvals omitted or bypassed?',
  'Has any identifiable person suffered a concrete, legally cognizable harm traceable to an unlawful arrangement?',
];

const tracks = [
  ['A', 'Changes in governmental authority', 'Which functions were transferred, delegated, contracted, or reorganized; under what statute; whether Congress authorized it; whether officials kept required supervision; whether it was disclosed.'],
  ['B', 'Ownership of essential public infrastructure', 'Who owns equipment, software, communications systems, facilities, and data, and whether ownership limits the government\u2019s ability to replace a contractor.'],
  ['C', 'Contractor and beneficial-ownership structures', 'Direct, indirect, and beneficial ownership; voting, contractual, and operational control; passive investment and common institutional ownership, recorded without inferring coordination.'],
  ['D', 'Procurement and financial arrangements', 'Awards, competition, sole-source justifications, modifications, long-term obligations, pricing, performance, conflicts, termination and step-in rights, and audit access.'],
  ['E', 'Public harm and operational dependence', 'Documented service disruptions, cost increases, loss of capability, unlawful employment actions, security failures, and records access, kept separate from speculative risk.'],
  ['F', 'Concealment and accountability', 'Whether required records, disclosures, oversight steps, or approvals were omitted, withheld, or bypassed. Lawful confidentiality is not treated as concealment.'],
];

const chronology = [
  ['1982', 'FAA Contract Tower Program established', 'Implemented change (authorized)', 'Verified'],
  ['2002', 'FAA Telecommunications Infrastructure contract awarded to Harris Corp. (now L3Harris)', 'Executed contract', 'Verified'],
  ['Mar. 2023', 'FAA Enterprise Network Services awarded to Verizon', 'Executed contract', 'Verified'],
  ['Apr. 2023', 'Project 2025 Mandate for Leadership published', 'Policy proposal', 'Verified'],
  ['May 16, 2024', 'FAA Reauthorization Act of 2024 directs a contract tower conversion pilot', 'Enacted legislation', 'Verified'],
  ['May 8, 2025', 'Brand New Air Traffic Control System announced', 'Official announcement', 'Verified'],
  ['July 4, 2025', '$12.5 billion provided for ATC modernization', 'Appropriated funding', 'Verified'],
  ['Dec. 4, 2025', 'Peraton announced as prime integrator', 'Executed contract', 'Under investigation'],
  ['May 18, 2026', 'Pilot moves selected contract towers to FAA staffing', 'Implemented change (toward federal operation)', 'Verified'],
  ['Aug. 11, 2026', 'AT&T awarded lead role on FAA Enterprise Network Services; Verizon moves to support', 'Executed contract', 'Under investigation'],
  ['Aug. 2026', 'Press reports of FAA concerns about the integrator\u2019s performance', 'Reported, not adjudicated', 'Unverified'],
  ['Sept. 14, 2026', 'GAO-26-107992 issued', 'Oversight finding', 'Verified'],
  ['Nov. 13, 2026', 'Nationwide ground stop', 'Documented service disruption', 'Verified'],
  ['Nov. 17, 2026', '$50.1 billion request to Congress', 'Official announcement (request)', 'Verified'],
];

const controlMap = [
  ['Equipment', 'FAA owns most airspace-system facilities; the request funds up to 140 FAA-owned towers', 'Title to new equipment; anything leased or provided as a service'],
  ['Software', '$7.2 billion requested for a common automation platform and controller workstations', 'Who owns the code; license, escrow, and modification rights'],
  ['Communications', 'Contractor-run networks carry airspace-system data and voice', 'Whether the network is contractor-owned; FAA step-in and data rights'],
  ['Operational data', 'Not addressed in the records reviewed', 'Who holds and can export flight, surveillance, and system data'],
  ['Workforce', 'FAA controllers at FAA facilities; contractor controllers at contract towers', 'Role of integrator staff in decisions'],
  ['Decision authority', 'Federal law vests airspace authority in the FAA Administrator', 'Delegations in the integrator contract; who approves design and acceptance'],
];

const distinctions = [
  ['Ordinary procurement', 'The government buys goods or routine services and keeps every decision.', 'Lawful and common'],
  ['Contractor-operated support', 'Contractor staff do support work under federal direction.', 'Lawful; watch for inherently governmental work'],
  ['Government-owned, contractor-operated', 'The government owns the asset; a contractor runs it.', 'Lawful; dependency depends on rights retained'],
  ['Contractor-owned, contractor-operated', 'A contractor owns and runs infrastructure an essential function depends on.', 'Lawful in many cases; highest dependency risk'],
  ['Delegation of authority', 'A private party makes or effectively makes binding public decisions.', 'Constitutional and statutory limits apply'],
  ['Full privatization of a function', 'Responsibility moves to a non-federal entity.', 'Generally requires legislation'],
];

const remedies = [
  ['FOIA requests', 'A specific, reasonably described request; exemptions may apply', 'Being prepared'],
  ['Inspector General referral', 'Specific information suggesting possible waste, fraud, abuse, or violation of law', 'Only if warranted'],
  ['GAO review request', 'Generally made by a congressional committee or member', 'Possible'],
  ['Congressional oversight request', 'Questions directed to committees of jurisdiction', 'Being prepared'],
  ['Procurement protest', 'Only actual or prospective bidders; strict deadlines; FAA uses its own dispute office', 'Not available to this organization as a non-bidder'],
  ['Judicial review under the APA', 'Final agency action, a plaintiff with a concrete injury, and a reviewable legal violation', 'Not ripe; no action or plaintiff identified'],
  ['Injunctive or declaratory relief', 'Standing, a likely legal violation, and equitable factors', 'Not ripe'],
];

export default function FederalPrivatizationPublicAuthority() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: metaDescription,
    url: pageUrl,
    datePublished: '2026-11-18',
    publisher: { '@type': 'Organization', name: 'United for Accountability', url: 'https://www.unitedforaccountability.org' },
  };

  return (
    <>
      <Head>
        <title>{`${title} | United for Accountability`}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
        <Link href="/cases" className="text-blue-800 underline">
          The People&apos;s Docket
        </Link>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-amber-100 border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-900">
            Pre-Litigation Investigation \u00b7 No complaint has been filed
          </span>
          <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-900">
            Evidence Gathering / Legal Review Required
          </span>
          <span className="inline-flex items-center rounded-full bg-gray-100 border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800">
            United States \u2014 Federal
          </span>
        </div>

        <h1 className="mt-6 text-3xl sm:text-4xl font-bold text-blue-900 leading-tight">{title}</h1>
        <p className="mt-4 text-xl font-semibold text-blue-800">{subtitle}</p>

        <blockquote className="mt-8 border-l-4 border-blue-700 bg-blue-50 px-6 py-5 text-lg italic text-blue-950">
          The American people deserve to know who owns the infrastructure operating in their name, who controls essential
          governmental functions, and whether public authority remains accountable under the Constitution and federal law.
        </blockquote>

        <nav aria-label="On this page" className="mt-10 rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm font-bold uppercase tracking-wide text-gray-600 mb-3">On this page</p>
          <ol className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2 list-decimal pl-5">
            {[
              ['overview', 'Case overview'],
              ['why', 'Why this investigation matters'],
              ['background', 'Verified factual background'],
              ['faa', 'FAA pilot investigation'],
              ['questions', 'Questions under investigation'],
              ['law', 'Relevant constitutional and statutory law'],
              ['distinctions', 'Contracting and privatization distinctions'],
              ['evidence', 'Evidence register'],
              ['findings', 'Documented findings'],
              ['allegations', 'Allegations requiring verification'],
              ['harms', 'Potential public harms'],
              ['responses', 'Government and contractor responses'],
              ['analysis', 'Legal analysis'],
              ['participate', 'Public participation'],
              ['timeline', 'Investigation timeline'],
              ['status', 'Current status and next steps'],
              ['sources', 'Sources and methodology'],
              ['related', 'Related People\u2019s Docket cases'],
            ].map(([id, name]) => (
              <li key={id}>
                <a href={`#${id}`} className="text-blue-800 hover:underline">
                  {name}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <Section id="overview" title="1. Case overview">
          <p>
            This is an organized, transparent investigation into whether any federal agency, official, or contractor has
            participated in arrangements that unlawfully transfer governmental authority, conceal material changes in public
            operational control, evade statutory oversight, or cause legally actionable harm through privatization or
            contracting. It also examines whether lawful arrangements nonetheless create serious accountability or continuity
            risks.
          </p>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
            <p className="font-bold text-blue-900">Core principle</p>
            <p className="mt-2">
              Public contracting is not inherently unlawful. But a government cannot use private contracting to evade
              constitutional limits, statutory duties, public accountability, or restrictions on the delegation of
              governmental authority.
            </p>
          </div>
          <p>
            The investigation does not presume that privatization is illegal, does not presume a coordinated scheme, and will
            remain open to evidence that contradicts its starting questions.
          </p>
        </Section>

        <Section id="why" title="2. Why this investigation matters">
          <p>
            Americans on social media and elsewhere are asking whether public institutions are being allowed to fail so that
            they can be handed to private interests. That is a serious question. It is also, at this point, a hypothesis and
            not an established fact. The responsible response is to examine the records.
          </p>
          <p>
            When infrastructure, software, data, or day-to-day operations of an essential service sit in private hands, the
            public may not be able to tell who is in control, whether the government could keep the service running without a
            particular company, or who answers when it fails. Those questions can be answered with documents.
          </p>
        </Section>

        <Section id="background" title="3. Verified factual background">
          <ul className="space-y-4">
            {verifiedBackground.map((item) => (
              <li key={item.text} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <StatusLabel label={item.label} />
                  <span className="text-xs font-mono text-gray-500">{item.ids}</span>
                </div>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="faa" title="4. FAA pilot investigation">
          <p>
            Air traffic control is the first example because the records are identifiable: a large modernization program, a
            prime integrator, contractor-run telecommunications networks, a long-standing contract tower program, and recent
            GAO and Inspector General work. Naming a contract or company here records a public fact. It is not an allegation.
          </p>
          <h3 className="text-xl font-semibold text-blue-900 mt-6">Dated chronology</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Chronology of FAA events with evidence category and status</caption>
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th scope="col" className="px-3 py-2">Date</th>
                  <th scope="col" className="px-3 py-2">Event</th>
                  <th scope="col" className="px-3 py-2">Category</th>
                  <th scope="col" className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {chronology.map(([date, event, category, label]) => (
                  <tr key={`${date}-${event}`} className="border-t border-gray-200 odd:bg-gray-50 align-top">
                    <td className="px-3 py-2 font-semibold whitespace-nowrap">{date}</td>
                    <td className="px-3 py-2">{event}</td>
                    <td className="px-3 py-2">{category}</td>
                    <td className="px-3 py-2">
                      <StatusLabel label={label} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600">
            A proposed reform is never described as an implemented transfer without evidence. The hypothesis that air traffic
            control is being allowed to deteriorate to justify privatization is labeled <StatusLabel label="Unverified" />: no
            supporting record has been identified.
          </p>

          <h3 className="text-xl font-semibold text-blue-900 mt-6">Ownership-and-control map</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">What is known and what must be verified for each layer of the air traffic system</caption>
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th scope="col" className="px-3 py-2">Layer</th>
                  <th scope="col" className="px-3 py-2">What the public record shows</th>
                  <th scope="col" className="px-3 py-2">What we are working to verify</th>
                </tr>
              </thead>
              <tbody>
                {controlMap.map(([layer, known, verify]) => (
                  <tr key={layer} className="border-t border-gray-200 odd:bg-gray-50 align-top">
                    <td className="px-3 py-2 font-semibold">{layer}</td>
                    <td className="px-3 py-2">{known}</td>
                    <td className="px-3 py-2">{verify}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="questions" title="5. Questions under investigation">
          <ol className="list-decimal pl-6 space-y-2">
            {questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          <h3 className="text-xl font-semibold text-blue-900 mt-6">Six investigative tracks</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {tracks.map(([letter, name, body]) => (
              <div key={letter} className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm">
                <p className="text-sm font-bold text-blue-700">Track {letter}</p>
                <h4 className="text-lg font-semibold text-blue-900">{name}</h4>
                <p className="mt-2 text-gray-700">{body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="law" title="6. Relevant constitutional and statutory law">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Article I</strong> gives Congress the legislative power and the power of the purse. Agencies may not spend
              money for purposes Congress has not approved or restructure statutory agencies without legislation.
            </li>
            <li>
              <strong>Article II</strong> vests executive power in the President, who must faithfully execute the laws. The
              <strong> Appointments Clause</strong> requires that people exercising significant federal authority be properly
              appointed officers.
            </li>
            <li>
              <strong>Private nondelegation.</strong> <em>Carter v. Carter Coal Co.</em> (1936) struck down private control of
              binding industry rules. <em>Sunshine Anthracite</em> (1940) upheld private participation where the government
              kept final authority. In <em>FCC v. Consumers&apos; Research</em> (2025), the Supreme Court found no violation because
              the FCC retained final decision-making power.
            </li>
            <li>
              <strong>Inherently governmental functions.</strong> The FAIR Act, OMB Policy Letter 11-01, and FAR Subpart 7.5
              bar contracting out functions that must be performed by federal employees. The FAA generally uses its own
              acquisition system rather than the FAR.
            </li>
            <li>
              <strong>Administrative Procedure Act.</strong> Allows courts to set aside final agency action that is unlawful
              or arbitrary, if a plaintiff with a concrete injury brings the case.
            </li>
            <li>
              <strong>Transparency and oversight.</strong> FOIA, the Federal Records Act, the Inspector General Act, and
              whistleblower protections for federal and contractor employees.
            </li>
            <li>
              <strong>Ninth Amendment.</strong> It states that listing certain rights does not deny others retained by the
              people. Courts have not treated it as an independent source of enforceable rights or a cause of action, and it
              does not by itself give anyone standing to sue. This investigation relies on recognized statutory and
              constitutional claims, if the evidence supports any.
            </li>
          </ul>
        </Section>

        <Section id="distinctions" title="7. Federal contracting and privatization distinctions">
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Kinds of federal contracting arrangements and their general legal status</caption>
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th scope="col" className="px-3 py-2">Arrangement</th>
                  <th scope="col" className="px-3 py-2">What it means</th>
                  <th scope="col" className="px-3 py-2">General status</th>
                </tr>
              </thead>
              <tbody>
                {distinctions.map(([name, meaning, status]) => (
                  <tr key={name} className="border-t border-gray-200 odd:bg-gray-50 align-top">
                    <td className="px-3 py-2 font-semibold">{name}</td>
                    <td className="px-3 py-2">{meaning}</td>
                    <td className="px-3 py-2">{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Ownership is not the same as operational control, and neither is the same as decision authority. Private equity
            sponsorship, institutional investment, or shared ownership is recorded for transparency and is not treated as
            evidence of misconduct.
          </p>
        </Section>

        <Section id="evidence" title="8. Evidence register">
          <p>
            Every factual statement on this page is tied to a record in the evidence register, with its issuer, date,
            what it does and does not show, and its authentication status. Official sources (Congress.gov, the Federal
            Register, USAspending.gov, SAM.gov, GAO, Inspectors General, court filings, and SEC filings) are prioritized. News
            reporting is used as corroboration. Social media posts and public submissions are leads, not proof.
          </p>
          <p>
            The full register is maintained in the investigation file and will be published with each update. Selected
            records are listed under Sources below.
          </p>
        </Section>

        <Section id="findings" title="9. Documented findings">
          <p>
            <StatusLabel label="Verified" /> The records establish the funding request, the ground stop and the FAA&apos;s initial
            explanation, GAO&apos;s cost and schedule findings, the content of the Project 2025 proposals, and the long-standing,
            statutorily authorized contract tower program.
          </p>
          <p className="font-semibold">
            No record reviewed to date establishes that any agency, official, or company has acted unlawfully.
          </p>
        </Section>

        <Section id="allegations" title="10. Allegations requiring verification">
          <ul className="space-y-3">
            <li className="flex flex-wrap items-start gap-2">
              <StatusLabel label="Unverified" />
              <span>That public institutions are being deliberately allowed to deteriorate to justify privatization.</span>
            </li>
            <li className="flex flex-wrap items-start gap-2">
              <StatusLabel label="Unverified" />
              <span>Press reports of FAA concerns about the prime integrator&apos;s performance (August 2026).</span>
            </li>
            <li className="flex flex-wrap items-start gap-2">
              <StatusLabel label="Legally unresolved" />
              <span>Whether any contractor in the modernization program makes final decisions that bind the public.</span>
            </li>
          </ul>
        </Section>

        <Section id="harms" title="11. Potential public harms">
          <p>
            Documented: the November 13, 2026 nationwide ground stop disrupted air travel. Its root cause, and whether any
            contract arrangement contributed, are not established.
          </p>
          <p>Risks under investigation, which are not injuries unless proven:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>loss of the government&apos;s ability to operate essential systems without a particular contractor;</li>
            <li>vendor lock-in and higher long-term taxpayer cost;</li>
            <li>improper exercise of governmental authority by private parties;</li>
            <li>concentration of control across essential services;</li>
            <li>loss of public access to records held by contractors;</li>
            <li>security and continuity failures.</li>
          </ul>
        </Section>

        <Section id="responses" title="12. Government and contractor responses">
          <p>
            We invite the Department of Transportation, the FAA, and any company named on this page to respond, correct, or
            add context. Responses received will be published here in full or summarized fairly, with the date received.
          </p>
          <p className="text-sm text-gray-600">No responses have been received as of November 18, 2026.</p>
        </Section>

        <Section id="analysis" title="13. Legal analysis">
          <p>
            Every potential theory is currently unproven. Under current precedent, a private-delegation claim would require
            evidence that a contractor makes final, binding decisions without meaningful federal review, and the Supreme Court&apos;s
            2025 decision makes that a demanding standard. An APA claim would require a final agency action and a plaintiff with
            a concrete injury. Procurement protests are limited to bidders. Records-access claims under FOIA are the most likely
            near-term legal pathway.
          </p>
          <h3 className="text-xl font-semibold text-blue-900 mt-6">Strongest counterarguments</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Most federal contracting is lawful, and the FAA retains statutory authority over the airspace.</li>
            <li>Modernization through contractors is not privatization; the request funds FAA-owned towers.</li>
            <li>The FAA is moving some contract towers into federal operation, which cuts against the privatization hypothesis.</li>
            <li>Project 2025 proposals require legislation, and none has been identified as implemented.</li>
            <li>Standing, ripeness, and sovereign immunity significantly limit litigation by members of the public.</li>
          </ul>
          <h3 className="text-xl font-semibold text-blue-900 mt-6">Remedies and accountability pathways</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Remedies, their legal requirements, and current status</caption>
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th scope="col" className="px-3 py-2">Pathway</th>
                  <th scope="col" className="px-3 py-2">What the law requires</th>
                  <th scope="col" className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {remedies.map(([name, req, status]) => (
                  <tr key={name} className="border-t border-gray-200 odd:bg-gray-50 align-top">
                    <td className="px-3 py-2 font-semibold">{name}</td>
                    <td className="px-3 py-2">{req}</td>
                    <td className="px-3 py-2">{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600">Courts cannot automatically invalidate privatization. Each remedy has its own legal requirements.</p>
        </Section>

        <Section id="participate" title="14. Public participation">
          <p>
            If you are a federal employee, contractor employee, air traffic controller, technician, small business, or member
            of the public with documented information about federal privatization, contractor control, agency restructuring,
            infrastructure ownership, or related harm, you can submit it for review.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Do not submit classified information, unlawfully obtained records, credentials, or other people&apos;s private information.</li>
            <li>We cannot promise anonymity, privilege, immunity, or whistleblower protection.</li>
            <li>
              Employees seeking legal protection for disclosures should consider their agency Inspector General, the U.S. Office
              of Special Counsel, or Congress.
            </li>
            <li>Every submission is treated as a lead to be checked, never as a verified allegation.</li>
          </ul>
          <div className="mt-4">
            <Link
              href={`/cases/${slug}/declaration`}
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold py-3 px-6 rounded shadow transition"
            >
              Submit Evidence
            </Link>
          </div>
        </Section>

        <Section id="timeline" title="15. Investigation timeline">
          <ol className="list-decimal pl-6 space-y-2">
            <li>Preserve and hash every cited record.</li>
            <li>File records requests for the integrator contract, the network contracts, the ground stop root-cause analysis, and any restructuring studies.</li>
            <li>Open public intake after privacy and security review.</li>
            <li>Build the ownership-and-control map from the records received.</li>
            <li>Re-evaluate every legal theory against the evidence.</li>
            <li>Pursue oversight, referral, or legal action only where the evidence and the law support it.</li>
          </ol>
        </Section>

        <Section id="status" title="16. Current status and next steps">
          <p>
            <strong>Status:</strong> Pre-Litigation Investigation \u00b7 Evidence Gathering / Legal Review Required. No complaint has
            been filed. No defendants or plaintiffs have been identified. This page will be updated as records arrive, and
            corrections will be labeled and dated.
          </p>
        </Section>

        <Section id="sources" title="17. Sources and methodology">
          <ol className="space-y-2 text-sm">
            {sources.map(([id, label, href]) => (
              <li key={id} className="flex gap-3">
                <span className="font-mono text-gray-500 shrink-0">{id}</span>
                <a href={href} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ol>
          <p className="text-sm text-gray-600">
            Method: records are classified by what each party actually owns, controls, and decides; legal authority is matched to
            statute, appropriation, and contract; ownership is traced through lawful records; and patterns across agencies are
            evaluated with published criteria. A repeated pattern does not by itself establish intent, collusion, or unlawful
            coordination.
          </p>
        </Section>

        <Section id="related" title="18. Related People\u2019s Docket cases">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <Link href="/cases/unauthorized-rule" className="text-blue-700 hover:underline">
                Unauthorized Rule: The People\u2019s Right to Reject Corporate Capture of Government
              </Link>{' '}
              \u2014 a broader corporate-capture matter. This investigation is narrower and record-specific.
            </li>
            <li>
              <Link href="/cases/corporate-congressional-influence-and-systemic-disenfranchisement" className="text-blue-700 hover:underline">
                Corporate Congressional Influence and Systemic Disenfranchisement
              </Link>
            </li>
            <li>
              <Link href="/cases/privacy-surveillance-rights" className="text-blue-700 hover:underline">
                Privacy, Surveillance &amp; Corporate Control
              </Link>
            </li>
            <li>
              <Link href="/cases/data-center-water-rights" className="text-blue-700 hover:underline">
                Data Center Water Rights &amp; Community Harm
              </Link>
            </li>
          </ul>
          <p className="text-sm text-gray-600">These matters are linked for readers. Their records and claims remain separate.</p>
        </Section>

        <section className="border-t border-gray-300 pt-6 mt-12 text-sm text-gray-600">
          <h2 className="font-bold text-gray-800 mb-2">Important legal notice</h2>
          <p>
            This page announces an evidence-gathering and legal-review initiative. It is not a lawsuit, does not state that any
            agency, official, or company has acted unlawfully, and does not create an attorney-client relationship. Statements
            about contracts and ownership reflect public records cited above. Anyone with an active legal deadline should
            consult qualified counsel without waiting for this investigation.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 mt-12 space-y-4">
      <h2 className="text-2xl font-bold text-blue-800">{title}</h2>
      {children}
    </section>
  );
}

function StatusLabel({ label }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${labelStyles[label] || labelStyles.Unverified}`}>
      {label}
    </span>
  );
}
