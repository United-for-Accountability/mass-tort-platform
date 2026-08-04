import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const surveillanceSystems = [
  'Automated license plate readers and searchable vehicle-location databases',
  'Facial recognition, biometric identification, and watchlist systems',
  'Police, municipal, and privately operated camera networks',
  'Drones, aerial monitoring, acoustic sensors, and real-time tracking tools',
  'Cellphone-location, advertising, and commercial data-broker products',
  'Connected-vehicle, telematics, toll, parking, and mobility data',
  'Retail, landlord, employer, school, and neighborhood surveillance systems',
  'Data-fusion platforms that combine records from multiple public and private sources'
];

const investigationQuestions = [
  {
    title: 'Was surveillance collected without meaningful notice or consent?',
    body: 'We are examining whether people were placed into persistent, searchable records simply because they drove, walked, worked, worshiped, protested, obtained medical care, attended school, or participated in lawful community life.'
  },
  {
    title: 'Did government use a private system to avoid constitutional safeguards?',
    body: 'Government should not be able to purchase, request, or search privately collected location and identity data in circumstances where direct government collection would require judicial process, individualized suspicion, or public oversight.'
  },
  {
    title: 'Were records inaccurate, stale, improperly shared, or misused?',
    body: 'A false plate read, outdated hotlist, incorrect identity match, unauthorized search, or uncontrolled data-sharing chain can lead to stops, searches, detention, retaliation, stalking, discrimination, or exposure of sensitive associations.'
  },
  {
    title: 'Did secrecy prevent democratic control?',
    body: 'We are collecting contracts, retention rules, data-sharing lists, audit records, procurement documents, public-meeting records, accuracy reports, and policies showing who authorized the system and what safeguards were promised.'
  }
];

const legalFramework = [
  {
    title: 'Fourth Amendment — persistent tracking and unreasonable search',
    body: 'A single observation in public is not automatically equivalent to a searchable history of a person’s movements. Carpenter v. United States recognized that detailed historical location records can implicate a legitimate expectation of privacy even when a private company holds the data. Whether a particular ALPR or surveillance search is unconstitutional remains fact-specific and is not settled by this investigation in advance.'
  },
  {
    title: 'First Amendment — speech, worship, protest, press, and association',
    body: 'Surveillance that identifies visits to political meetings, protests, unions, places of worship, medical providers, attorneys, journalists, or advocacy groups may chill lawful activity. A viable claim requires evidence of governmental action and a concrete or credibly threatened injury.'
  },
  {
    title: 'Fourteenth Amendment — due process and equal protection',
    body: 'Wrongful alerts, discriminatory deployment, secret watchlists, inaccessible correction procedures, and unequal enforcement may support due-process or equal-protection claims when the evidence and jurisdictional requirements are met.'
  },
  {
    title: 'Ninth Amendment — retained rights and popular sovereignty',
    body: 'The Ninth Amendment confirms that enumerating some rights does not deny or disparage others retained by the people. We treat it as an interpretive and popular-sovereignty principle supporting privacy, movement, autonomy, and freedom from continuous observation—not as a currently established standalone damages statute.'
  },
  {
    title: 'Corporate responsibility and the state-action requirement',
    body: 'Constitutional claims ordinarily require governmental action. A private vendor is not automatically a constitutional defendant merely because it sells technology to police. Corporate liability may arise through joint action, delegated authority, statutory privacy duties, consumer-protection law, negligence, contract, disclosure, data-security, or other state-law theories depending on the facts.'
  }
];

const concreteHarms = [
  'Wrongful traffic stop, search, detention, arrest, citation, or armed encounter',
  'Disclosure of movements, associations, medical visits, worship, protests, or family activity',
  'False identification, stale hotlist entry, plate mismatch, or inaccurate database record',
  'Retaliation, stalking, harassment, discrimination, immigration consequences, or employment harm',
  'Denial of access to records, correction procedures, audit logs, contracts, or sharing information',
  'Financial loss, property loss, legal expense, emotional injury, or disruption of family life',
  'A credible chilling effect on speech, worship, protest, journalism, medical care, or lawful association',
  'Whistleblower evidence of unauthorized searches, data sharing, misleading representations, or ignored safeguards'
];

const requestedSafeguards = [
  'Judicial authorization for searches designed to reconstruct a person’s movements over time, subject to genuine emergencies',
  'Short retention periods and automatic deletion of records not connected to a documented lawful purpose',
  'Data sharing disabled by default, with public disclosure of every agency and contractor receiving access',
  'Human verification before stops, searches, detention, arrest, or other adverse action',
  'Independent accuracy, bias, security, and misuse audits with public results',
  'Public approval, contract disclosure, privacy-impact review, and renewal hearings before deployment or expansion',
  'Notice, access, correction, deletion, and appeal procedures for affected people',
  'Stricter protection for medical, religious, political, journalistic, legal, reproductive, and other sensitive locations',
  'A private right of action, statutory damages, attorney fees, suppression, deletion, and injunctive relief where authorized by law'
];

const sources = [
  {
    label: 'Congressional Research Service, Fourth Amendment current doctrine and Carpenter',
    href: 'https://constitution.congress.gov/browse/essay/amdt4-3-4/ALDE_00013718/'
  },
  {
    label: 'Congressional Research Service, Ninth Amendment doctrine',
    href: 'https://constitution.congress.gov/browse/essay/amdt9-3/ALDE_00013643/'
  },
  {
    label: 'Congressional Research Service, state-action doctrine',
    href: 'https://constitution.congress.gov/browse/essay/amdt14-2/ALDE_00000810/'
  },
  {
    label: 'California Civil Code provisions governing ALPR systems and privacy policies',
    href: 'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=&chapter=&division=3.&lawCode=CIV&part=4.&title=1.81.23.'
  },
  {
    label: 'California Attorney General, January 21, 2026 El Cajon ALPR data-sharing litigation update',
    href: 'https://oag.ca.gov/news/press-releases/attorney-general-bonta-continues-legal-challenge-stop-el-cajon-illegally-sharing'
  },
  {
    label: 'FTC final order concerning Mobilewalla and sensitive location data',
    href: 'https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-finalizes-order-banning-mobilewalla-selling-sensitive-location-data'
  },
  {
    label: 'FTC proposed 2026 Kochava location-data settlement',
    href: 'https://www.ftc.gov/news-events/news/press-releases/2026/05/ftc-ban-kochava-subsidiary-selling-sensitive-location-data-settle-charges-they-sold-location-data'
  },
  {
    label: 'NIST face-recognition demographic-effects evaluation',
    href: 'https://pages.nist.gov/frvt/html/frvt_demographics.html'
  }
];

export default function PrivacySurveillanceRightsPage() {
  return (
    <>
      <Head>
        <title>Privacy, Surveillance & Corporate Control | United for Accountability</title>
        <meta
          name="description"
          content="A nationwide pre-litigation investigation into government-enabled surveillance, corporate control of location and biometric data, wrongful tracking, and the retained privacy rights of the people."
        />
        <link
          rel="canonical"
          href="https://www.unitedforaccountability.org/cases/privacy-surveillance-rights"
        />
      </Head>

      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-5 mb-8">
          <p className="font-bold text-amber-900">Pre-Litigation Investigation — No complaint has been filed</p>
          <p className="mt-2 text-amber-950">
            This page gathers evidence for legal and public-interest review. It does not allege that every
            camera, data system, agency, or vendor is unlawful. Liability must be evaluated by defendant,
            jurisdiction, technology, purpose, search, disclosure, and documented injury.
          </p>
        </div>

        <p className="uppercase tracking-wide text-sm font-semibold text-blue-700 mb-3">
          Rights by default. Surveillance by exception.
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-5">
          Privacy, Surveillance & Corporate Control
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          A nationwide constitutional and public-interest investigation into government-enabled mass
          surveillance, corporate control of movement and identity data, and the people’s retained right
          to live, move, associate, worship, speak, and seek care without continuous suspicionless tracking.
        </p>

        <section className="bg-blue-50 border border-blue-200 rounded-xl p-7 mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-3">The principle</h2>
          <p className="text-lg mb-3">
            The people should not have to repeatedly prove that they deserve privacy. Government and
            corporations seeking to collect, search, retain, combine, sell, or disclose personal movement
            and identity data should carry the burden of proving necessity, legality, accuracy,
            proportionality, security, and democratic authorization.
          </p>
          <p className="font-semibold text-blue-950">
            Neither a public agency nor its private contractor may lawfully acquire powers greater than
            those the people delegated to government.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-5">Systems within the investigation</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {surveillanceSystems.map((item) => (
              <li key={item} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-gray-600">
            Flock Safety is a prominent example because many public agencies use its license-plate-reader
            network. Naming a company or technology identifies an area for evidence collection; it is not
            a finding that every deployment or business practice is unlawful.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">What we are investigating</h2>
          <div className="space-y-6">
            {investigationQuestions.map((item) => (
              <article key={item.title} className="border-l-4 border-blue-600 pl-5">
                <h3 className="text-xl font-semibold text-blue-950 mb-2">{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Legal framework under review</h2>
          <div className="space-y-6">
            {legalFramework.map((item) => (
              <article key={item.title} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h3 className="text-xl font-semibold text-blue-950 mb-2">{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Why aggregation changes the question</h2>
          <p className="mb-4">
            Seeing one vehicle on one street is different from maintaining a retrospective database that
            can reveal where a person sleeps, works, worships, organizes, receives medical treatment, meets
            family, or travels over weeks or months. The constitutional question becomes more serious as
            surveillance grows in duration, precision, scale, searchability, sharing, and consequence.
          </p>
          <p>
            California’s attorney general alleged in litigation filed against El Cajon that the city shared
            ALPR data with more than 100 out-of-state law-enforcement agencies despite state restrictions.
            The state explained that such records can reveal residences, workplaces, schools, medical
            providers, places of worship, and driving patterns. That litigation is one example of the
            accountability questions this national investigation will track.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-5">Concrete harms and evidence sought</h2>
          <ul className="list-disc pl-6 space-y-3">
            {concreteHarms.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-5 font-medium">
            A broad policy objection matters politically, but litigation usually requires standing and a
            concrete injury. The declaration form therefore separates personal harm, community evidence,
            public-record findings, and whistleblower information.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-5">Safeguards and remedies under consideration</h2>
          <ul className="list-disc pl-6 space-y-3">
            {requestedSafeguards.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="bg-blue-950 text-white rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4">Add evidence to the national record</h2>
          <p className="text-blue-100 mb-6">
            Submit a declaration if you experienced a wrongful surveillance-related encounter, discovered
            misuse or improper sharing, obtained public records, were chilled from lawful activity, or have
            firsthand professional or whistleblower knowledge. Preserve original records and metadata.
          </p>
          <Link
            href="/cases/privacy-surveillance-rights/declaration"
            className="inline-block bg-white text-blue-950 font-bold px-6 py-3 rounded-lg hover:bg-blue-100 transition"
          >
            Submit a Privacy & Surveillance Declaration
          </Link>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Research sources</h2>
          <ul className="space-y-3">
            {sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 underline hover:text-blue-900"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="text-sm text-gray-600 border-t pt-6">
          <p>
            This investigation is not a law firm, does not create an attorney-client relationship, and does
            not stop any statute of limitations, administrative deadline, notice requirement, or records-
            preservation duty. People facing an active criminal, immigration, employment, family, or civil
            matter should seek qualified counsel promptly.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
