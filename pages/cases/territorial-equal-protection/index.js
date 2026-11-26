import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const pageUrl = 'https://www.unitedforaccountability.org/cases/territorial-equal-protection';

const territories = [
  ['Puerto Rico', 'Became a U.S. territory in 1898. That date is historical context, not a measure of the rights its people deserve.'],
  ['Guam', 'Residents subject to federal authority must have meaningful constitutional protection and fair access to federal programs.'],
  ['U.S. Virgin Islands', 'Federal program rules must not make territorial residence a standing penalty.'],
  ['Northern Mariana Islands', 'Local self-government and equal federal protection must be able to operate together.'],
  ['American Samoa', 'Every person is entitled to applicable constitutional protections regardless of citizenship classification.'],
];

const statutes = [
  {
    title: 'No territorial diminishment of fundamental rights',
    body: 'No federal actor may deny, abridge, or burden a fundamental right secured by the Constitution or federal law solely because a person resides in a territory or because of that territory’s political classification, date of acquisition, or relationship to the United States.',
  },
  {
    title: 'Federal program parity as the rule',
    body: 'An otherwise eligible resident should receive substantially equivalent federal benefits, services, procedures, and protections as a similarly situated resident of a state. Congress must identify and justify any departure by law and evidence.',
  },
  {
    title: 'Enforceable public accountability',
    body: 'Require agencies to inventory territorial exclusions, publish a parity plan and timeline, consult residents and territorial governments, and provide affected people a path to seek declaratory or injunctive relief.',
  },
];

const sources = [
  ['United States v. Vaello Madero, 596 U.S. 159 (2022)', 'https://www.supremecourt.gov/opinions/21pdf/20-303_new_21o2.pdf', 'The Supreme Court upheld the challenged SSI exclusion under the federal equal-protection component and the tax and program distinctions before it. This is controlling law that any litigation theory must confront.'],
  ['Torres v. Puerto Rico, 442 U.S. 465 (1979)', 'https://tile.loc.gov/storage-services/service/ll/usrep/usrep442/usrep442465/usrep442465.pdf', 'Recognizes constitutional protections in Puerto Rico and rejects the premise that territorial status removes constitutional protections altogether.'],
  ['Downes v. Bidwell, 182 U.S. 244 (1901)', 'https://tile.loc.gov/storage-services/service/ll/usrep/usrep182/usrep182244/usrep182244.pdf', 'An Insular Case forming part of the historical framework for differentiated constitutional treatment of certain territories.'],
  ['Balzac v. Porto Rico, 258 U.S. 298 (1922)', 'https://tile.loc.gov/storage-services/service/ll/usrep/usrep258/usrep258298/usrep258298.pdf', 'Applied the then-existing territorial doctrine to a jury-trial question in Puerto Rico.'],
  ['U.S. Constitution Annotated: Territorial Clause', 'https://constitution.congress.gov/browse/article-4/section-3/clause-2/', 'Congress has authority to govern U.S. territories, subject to constitutional limitations.'],
  ['U.S. Constitution Annotated: Fifth Amendment', 'https://constitution.congress.gov/constitution/amendment-5/', 'The Fifth Amendment constrains federal action; equal protection against the federal government is analyzed through its Due Process Clause.'],
];

export default function TerritorialEqualProtectionCase() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Territorial Equality and Equal Protection Investigation',
    description: 'A pre-litigation review of territorial classifications, fundamental rights, and federal program parity under U.S. constitutional and statutory law.',
    url: pageUrl,
    datePublished: '2026-11-25',
    publisher: { '@type': 'Organization', name: 'United for Accountability', url: 'https://www.unitedforaccountability.org' },
  };

  return (
    <>
      <Head>
        <title>Territorial Equality and Equal Protection | United for Accountability</title>
        <meta name="description" content="A pre-litigation constitutional and statutory investigation into territorial classifications, fundamental rights, and equal access to federal programs." />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Territorial Equality and Equal Protection | United for Accountability" />
        <meta property="og:description" content="A public investigation into whether territorial status or acquisition date is being used to justify unequal federal rights or benefits." />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
        <Link href="/cases" className="text-blue-800 underline">The People&apos;s Docket</Link>

        <div className="mt-6 inline-flex items-center rounded-full bg-amber-100 border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-900">
          Pre-Litigation Constitutional and Statutory Investigation · No complaint filed
        </div>

        <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-blue-950 leading-tight">
          Territorial Equality and Equal Protection
        </h1>
        <p className="mt-5 max-w-4xl text-xl font-semibold text-blue-800">
          The United States cannot govern a people while treating their territory&apos;s history or political label as a reason their rights count for less.
        </p>

        <blockquote className="mt-8 border-l-4 border-cyan-500 bg-blue-50 px-6 py-5 text-xl font-semibold leading-8 text-blue-950">
          No American territory shall be treated as a constitutional second-class zone. The date or circumstances of acquisition cannot diminish the equal dignity or fundamental rights of the people who live there.
        </blockquote>

        <section className="mt-10 rounded-xl border border-amber-300 bg-amber-50 p-6">
          <h2 className="text-xl font-bold text-amber-950">Current status and limits</h2>
          <p className="mt-3 leading-7 text-amber-950">
            This is an issue investigation and legal framework. No complaint has been filed, no defendant or named plaintiff has been identified, and no court has made findings in this matter. A viable lawsuit requires a specific government action, a person with concrete injury, a valid cause of action, and a remedy a court can grant.
          </p>
        </section>

        <section className="mt-12 space-y-5">
          <h2 className="text-3xl font-bold text-blue-900">The constitutional principle</h2>
          <p className="text-lg leading-8">
            The Fifth Amendment restrains the federal government and includes an equal-protection principle through its Due Process Clause. The Fourteenth Amendment expressly restrains the states. Congress has authority under the Territorial Clause to govern U.S. territories, but that authority remains subject to applicable constitutional limits.
          </p>
          <p className="text-lg leading-8">
            Territorial status is not an absence of constitutional protection. The Supreme Court has recognized constitutional protections in Puerto Rico. But its Insular Cases created a doctrine under which some constitutional provisions have been applied differently in certain territories. That history is part of the legal dispute; it does not settle the moral or policy question of whether unequal treatment should continue.
          </p>
          <p className="text-lg font-semibold leading-8 text-slate-950">
            Our position is that territorial status alone must not be accepted as a permanent license to withhold fundamental rights or equal dignity. Where Congress has discretion, it should enact parity. Where agencies have created unjustified exclusions, they must identify and remedy them. Where current precedent permits unequal treatment, it must be confronted honestly and changed through lawful legislation, litigation, or constitutional amendment when necessary.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Why acquisition date is not a measure of rights</h2>
          <p className="text-lg leading-8">
            Puerto Rico came under U.S. sovereignty in 1898. The date matters to history and to the development of federal law. It cannot determine the worth of the people living there today. The same principle applies to Guam, the U.S. Virgin Islands, the Northern Mariana Islands, American Samoa, and any other territory under U.S. sovereignty.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {territories.map(([name, note]) => (
              <article key={name} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-blue-900">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{note}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm text-slate-600">
            The territories have different citizenship classifications, local laws, tax arrangements, and political histories. This investigation does not erase those differences. It asks whether each federal distinction is lawful, necessary, and consistent with constitutional and statutory protections.
          </p>
        </section>

        <section className="mt-14 rounded-2xl bg-slate-950 p-8 text-white">
          <h2 className="text-3xl font-bold">The controlling complication: Vaello Madero</h2>
          <p className="mt-4 text-lg leading-8 text-slate-200">
            In <em>United States v. Vaello Madero</em> (2022), the Supreme Court held that the Fifth Amendment&apos;s equal-protection component did not require Congress to make Supplemental Security Income available to Puerto Rico residents on the same terms as state residents, considering the tax and program distinctions before it. The ruling leaves Congress substantial discretion in federal programs. Any serious legal challenge must address this precedent; it cannot be waved away.
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-200">
            The decision did not hold that territorial residents have no constitutional rights. It did show that current doctrine permits some unequal federal program treatment. This case will examine where that discretion ends, whether specific distinctions rest on adequate legal grounds, and where Congress must act even if a court does not compel parity.
          </p>
          <a href={sources[0][1]} target="_blank" rel="noreferrer" className="inline-block mt-5 text-cyan-300 underline hover:text-cyan-100">
            Read the Supreme Court opinion ↗
          </a>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Questions under investigation</h2>
          <ol className="list-decimal pl-6 space-y-4 text-lg leading-7">
            <li>Which federal statutes, regulations, funding formulas, or agency practices give territorial residents different benefits, services, rights, eligibility rules, or procedures?</li>
            <li>Was the distinction enacted expressly by Congress or created by an agency?</li>
            <li>What constitutional or statutory authority supports it, and what evidence supports the government&apos;s stated reason?</li>
            <li>Does the classification burden a fundamental right or treat similarly situated people differently?</li>
            <li>Could parity be achieved through a less discriminatory method while preserving local self-government?</li>
            <li>Is there a specific person who has suffered a concrete injury, and what remedy could a court lawfully grant?</li>
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Legal theories for review</h2>
          <div className="space-y-5">
            <article className="rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-950">Fifth Amendment equal protection</h3>
              <p className="mt-2 leading-7">Challenge a specific federal classification under the equal-protection component of due process. The applicable level of review depends on the right and classification. Under <em>Vaello Madero</em>, a territorial distinction may survive deferential review; the claim must address the actual rationale and record.</p>
            </article>
            <article className="rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-950">Fundamental constitutional rights</h3>
              <p className="mt-2 leading-7">Determine whether the right applies to the person and territory and whether the government has unlawfully burdened it. Territorial status should not be treated as a categorical suspension of constitutional protections.</p>
            </article>
            <article className="rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-950">Statutory and administrative review</h3>
              <p className="mt-2 leading-7">Examine whether an agency has exceeded its authority, misread a federal program statute, or acted arbitrarily. Any APA theory requires a reviewable agency action and a plaintiff with standing; exhaustion and jurisdiction must be checked.</p>
            </article>
            <article className="rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-950">Ninth Amendment and retained rights</h3>
              <p className="mt-2 leading-7">The Ninth Amendment informs the principle that enumerated rights do not exhaust the rights retained by the people. It is not presented as a stand-alone damages statute; any claim must be paired with a recognized cause of action and concrete facts.</p>
            </article>
          </div>
        </section>

        <section className="mt-14 bg-cyan-50 border border-cyan-200 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-cyan-950">Proposed statutory rule</h2>
          <p className="mt-4 text-lg leading-8 text-cyan-950">
            Congress should enact the Territorial Equality and Federal Program Parity Act: bar federal actors from diminishing fundamental rights solely on territorial grounds; make comparable federal benefits and services the default for otherwise eligible residents; require any exception to be expressly enacted, evidence-based, narrowly explained, and periodically reviewed; and authorize affected people to seek prospective judicial relief.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {statutes.map((item) => (
              <article key={item.title} className="rounded-xl bg-white p-5">
                <h3 className="font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm text-cyan-950">
            Local self-government may shape how programs are delivered; it must not be presumed to mean that residents consent to fewer rights. Any change to presidential electors or congressional voting representation must comply with the Constitution and may require amendment.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">What evidence a court case would require</h2>
          <ul className="list-disc pl-6 space-y-3 text-lg leading-7">
            <li>A particular federal statute, rule, decision, or practice that treats territorial residents differently.</li>
            <li>A specific person directly affected and proof of an actual denial, reduction, burden, or threatened injury.</li>
            <li>The federal actor responsible, the legal authority invoked, relevant application records, and any available appeals.</li>
            <li>Evidence about similarly situated residents, the government's explanation, and less discriminatory alternatives.</li>
            <li>A recognized cause of action, jurisdiction, compliance with deadlines and exhaustion rules, and a remedy that would redress the injury.</li>
          </ul>
          <p className="mt-5 text-base leading-7 text-slate-700">
            Until those facts are established, this remains a constitutional and statutory investigation, not a filed lawsuit or a finding that a particular agency violated the law.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold text-blue-900 mb-5">Primary legal sources</h2>
          <ol className="list-decimal pl-6 space-y-4">
            {sources.map(([label, href, note]) => (
              <li key={href} className="pl-1">
                <a href={href} target="_blank" rel="noreferrer" className="font-semibold text-blue-800 underline hover:text-blue-950">{label}</a>
                <p className="mt-1 text-sm leading-6 text-slate-700">{note}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 rounded-xl border-t border-slate-300 pt-6 text-sm leading-6 text-slate-600">
          <h2 className="font-bold text-slate-900">Legal notice</h2>
          <p className="mt-2">
            This page is a public-interest investigation and advocacy framework, not legal advice. No complaint has been filed and this investigation does not establish that any named person or agency acted unlawfully. Legal rules vary by claim and jurisdiction. Anyone facing an active deadline should consult qualified counsel.
          </p>
          <a className="mt-3 inline-block text-blue-800 underline" href="https://github.com/United-for-Accountability/mass-tort-platform/blob/main/docs/investigations/territorial-equality/01-case-framework.md" target="_blank" rel="noreferrer">
            Read the complete case framework and proposed statutory text ↗
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}
