import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const sources = [
  {
    label: 'Lawrence Berkeley National Laboratory — 2024 United States Data Center Energy Usage Report',
    href: 'https://eta.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report'
  },
  {
    label: 'U.S. Government Accountability Office — Generative AI’s Environmental and Human Effects',
    href: 'https://www.gao.gov/products/gao-25-107172'
  },
  {
    label: 'U.S. Environmental Protection Agency — Water Reuse at Data Centers',
    href: 'https://www.epa.gov/waterreuse/basic-information-about-water-reuse'
  },
  {
    label: '28 U.S.C. § 1407 — Multidistrict Litigation',
    href: 'https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title28-section1407%28a%29'
  },
  {
    label: '33 U.S.C. § 1365 — Clean Water Act Citizen Suits',
    href: 'https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title33-section1365'
  },
  {
    label: '42 U.S.C. § 6972 — RCRA Citizen Suits',
    href: 'https://uscode.house.gov/view.xhtml?req=%28title%3A42+section%3A6972+edition%3Aprelim%29'
  },
  {
    label: 'Congressional Constitution Annotated — Ninth Amendment Doctrine',
    href: 'https://constitution.congress.gov/browse/essay/amdt9-3/ALDE_00013643/'
  }
];

export default function DataCenterWaterRightsPage() {
  return (
    <>
      <Head>
        <title>Data Center Water Rights Mass Tort Investigation | United for Accountability</title>
        <meta
          name="description"
          content="A nationwide pre-litigation investigation documenting data-center water depletion, utility burdens, permit failures, contamination, secrecy, and injury to communities and water-right holders."
        />
        <link
          rel="canonical"
          href="https://www.unitedforaccountability.org/cases/data-center-water-rights"
        />
      </Head>

      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
        <div className="inline-flex items-center rounded-full bg-amber-100 border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-900 mb-6">
          Pre-Litigation Investigation — No complaint has been filed
        </div>

        <h1 className="text-4xl font-bold mb-5 text-blue-900">
          Data Center Water Rights &amp; Community Harm
        </h1>
        <p className="text-xl font-semibold text-blue-800 mb-5">
          A nationwide mass-tort, public-trust, and water-rights investigation
        </p>
        <p className="text-lg mb-8">
          Digital infrastructure can serve the public without quietly transferring scarce water,
          public utility capacity, and drought risk to private operators. This investigation is
          building a verified national record of communities, well owners, farmers, Tribal water
          holders, ratepayers, businesses, and local governments that may have suffered concrete
          harm connected to a data center’s water withdrawal, cooling system, wastewater,
          infrastructure agreement, or regulatory approval.
        </p>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-3">The principle</h2>
          <p className="text-lg">
            Water is a shared life-sustaining resource. A company may receive permission to use
            water, but permission should not become private sovereignty over a community’s supply.
            Domestic access, existing lawful users, ecosystems, Tribal rights, and the long-term
            stability of the watershed must be protected before public institutions commit water
            or infrastructure to industrial expansion.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Why this investigation is necessary</h2>
          <div className="space-y-4">
            <p>
              Lawrence Berkeley National Laboratory estimated that U.S. data centers directly
              consumed approximately 66 billion liters of water in 2023—about 17.4 billion
              gallons—with hyperscale and colocation facilities accounting for approximately 84%
              of that total. The same report estimated an indirect water footprint of nearly 800
              billion liters from electricity generation. These are national estimates, not proof
              that any particular facility caused a local injury.
            </p>
            <p>
              The Government Accountability Office has also warned that estimates of AI-related
              water consumption remain limited and that companies generally do not disclose enough
              facility-level detail. Without transparent local information, residents may be asked
              to accept major water commitments before they can evaluate the effect on wells,
              utility rates, drought resilience, agriculture, or future growth.
            </p>
            <p>
              Data centers are not all alike. Cooling technology, climate, water source, operating
              practices, and electricity supply can produce very different impacts. Some facilities
              rely heavily on evaporative cooling and potable water; others use air cooling,
              closed-loop systems, or reclaimed water. This investigation will follow evidence—not
              assume that every data center causes the same harm.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-5 text-blue-800">What we are investigating</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InvestigationCard
              title="Water depletion and loss of access"
              items={[
                'Declining private-well levels, reduced pressure, dry wells, or higher pumping costs',
                'Aquifer drawdown, reduced streamflow, subsidence, or interference with senior and existing users',
                'Water restrictions imposed on residents or agriculture while industrial allocations remain protected'
              ]}
            />
            <InvestigationCard
              title="Public cost shifted to ratepayers"
              items={[
                'Water, sewer, treatment, pipeline, or storage expansions financed by existing customers',
                'Preferential rates, rebates, tax incentives, or minimum-use guarantees negotiated without meaningful disclosure',
                'Higher household bills, connection fees, or public debt linked to large-load infrastructure'
              ]}
            />
            <InvestigationCard
              title="Wastewater and contamination"
              items={[
                'Cooling-tower blowdown, treatment chemicals, fuel releases, or other discharges that violate permits or damage property',
                'Changes in taste, odor, color, sediment, or tested water quality after facility construction or operation',
                'Improper handling, storage, treatment, or disposal of wastes that may endanger health or the environment'
              ]}
            />
            <InvestigationCard
              title="Secrecy, permitting, and unequal treatment"
              items={[
                'Confidential water-use agreements or incomplete public disclosure of projected demand',
                'Approvals based on unrealistic demand, drought, recharge, or wastewater assumptions',
                'Failure to consult affected communities, protect Tribal rights, enforce permit conditions, or conduct required environmental review'
              ]}
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">How a nationwide case must be structured</h2>
          <p className="mb-4">
            Water law is not uniform nationwide. Eastern states commonly use versions of riparian
            rights, western states commonly use prior appropriation, groundwater rules vary widely,
            and public-trust protections differ by jurisdiction. For that reason, this campaign is
            a national evidence and coordination effort—but viable complaints will ordinarily need
            to be organized by facility, watershed, defendant, state law, and injured plaintiff.
          </p>
          <p className="mb-4">
            Multiple federal cases sharing common factual questions may qualify for coordinated
            pretrial proceedings under 28 U.S.C. § 1407. That process is not automatic, does not
            erase state-law differences, and does not replace the need to prove each plaintiff’s
            injury, causation, and available remedy.
          </p>
          <p>
            The Ninth Amendment expresses the principle that listing certain rights does not deny
            other rights retained by the people. Under current doctrine, however, it is generally
            not treated as a stand-alone damages statute. Any court filing should pair the retained-
            rights and popular-sovereignty argument with recognized claims grounded in concrete
            injury and applicable water, property, tort, utility, environmental, administrative,
            Tribal, civil-rights, and public-trust law.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Legal theories under review</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>State water-right, groundwater-management, reasonable-use, and permit violations.</li>
            <li>Private or public nuisance, negligence, trespass, property damage, and interference with lawful water use.</li>
            <li>Public-trust, state constitutional, Tribal reserved-rights, and consultation claims where applicable.</li>
            <li>Utility-rate, public-contract, procurement, open-records, due-process, and environmental-review violations.</li>
            <li>
              Clean Water Act claims where there is an unlawful discharge or permit violation. Large
              water consumption by itself is not a Clean Water Act violation.
            </li>
            <li>
              RCRA claims where handling or disposal of solid or hazardous waste may present an
              imminent and substantial endangerment. Water use alone is not enough.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Who should submit a declaration</h2>
          <p className="mb-4">
            Submit information when you have a specific facility, approval, contract, withdrawal,
            discharge, or measurable community impact to report. Useful declarants may include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Residents, homeowners, tenants, private-well owners, and municipal water customers.</li>
            <li>Farmers, ranchers, nurseries, food producers, and water-dependent local businesses.</li>
            <li>Tribal members, governments, and organizations protecting reserved or culturally significant waters.</li>
            <li>Utility employees, contractors, engineers, public officials, and whistleblowers with firsthand knowledge.</li>
            <li>Community groups documenting approvals, rate impacts, drought planning, or environmental injustice.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Evidence to preserve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {[
              'Well-depth, pump, pressure, and water-quality records',
              'Water and sewer bills before and after facility activity',
              'Drought restrictions, shutoff notices, and utility communications',
              'Permits, environmental reviews, water contracts, meeting minutes, and public-record responses',
              'Photographs, dated videos, maps, property records, crop or livestock loss records',
              'Testing results from accredited laboratories and chain-of-custody documents',
              'Names of witnesses and a dated timeline of events',
              'Public statements that conflict with later measured use or disclosed agreements'
            ].map((item) => (
              <div key={item} className="flex items-start">
                <span className="text-blue-700 font-bold mr-2">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 font-semibold text-red-700">
            Preserve original records. Do not alter metadata, trespass, access protected systems,
            or obtain documents unlawfully.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Relief this campaign may seek</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>Public disclosure of actual and projected water withdrawal, consumption, source, discharge, and drought plans.</li>
            <li>Independent baseline testing and continuous monitoring paid for by the facility—not local residents.</li>
            <li>Developer-funded water, wastewater, and resilience infrastructure with protections against stranded costs.</li>
            <li>Use of reclaimed or non-potable water where safe, feasible, and not harmful to other public needs.</li>
            <li>Operational limits, permit enforcement, or injunctive relief where unlawful or imminent harm is proven.</li>
            <li>Restoration and compensation for well replacement, property damage, agricultural loss, business loss, and other proven injuries.</li>
            <li>Priority protection for essential household use, existing lawful users, ecosystems, and Tribal water rights.</li>
          </ul>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-blue-900 mb-3">Add your evidence to the national record</h2>
          <p className="text-lg mb-6">
            A declaration is most useful when it identifies the facility, location, timing, water
            source, measurable impact, and records that may corroborate the harm.
          </p>
          <Link
            href="/cases/data-center-water-rights/declaration"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold py-3 px-6 rounded shadow transition"
          >
            Submit a Water Harm Declaration
          </Link>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Research and legal sources</h2>
          <ol className="list-decimal pl-6 space-y-3">
            {sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-gray-300 pt-6 text-sm text-gray-600">
          <h2 className="font-bold text-gray-800 mb-2">Important legal notice</h2>
          <p>
            This page announces an evidence-gathering and legal-review initiative. It does not
            accuse every data center of wrongdoing, state that a lawsuit has been filed, guarantee
            that any claim will be accepted, or create an attorney-client relationship. Legal
            rights and filing deadlines vary by jurisdiction. Anyone facing an active deadline,
            unsafe water, property damage, or immediate health concern should contact qualified
            local counsel and the appropriate public agency without waiting for this campaign.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

function InvestigationCard({ title, items }) {
  return (
    <div className="border border-blue-100 rounded-lg p-6 shadow-sm bg-white">
      <h3 className="text-xl font-semibold text-blue-900 mb-3">{title}</h3>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
