import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

const title = 'Kelo v. City of New London and the Meaning of Public Use'
const description = 'A review of the Fifth Amendment, the Kelo decision, and proposed safeguards for working farmland and affected communities.'
const opinion = 'https://www.govinfo.gov/app/details/USREPORTS-545/USREPORTS-545-469'

export default function KeloPublicUse() {
  return (
    <>
      <Head>
        <title>{title + ' | United for Accountability'}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://www.unitedforaccountability.org/cases/kelo-public-use" />
      </Head>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
        <Link href="/cases" className="text-blue-800 underline">The People’s Docket</Link>
        <h1 className="mt-4 mb-4 text-4xl font-bold text-blue-900">{title}</h1>
        <p className="mb-8 text-lg">Constitutional precedent review and proposals for public discussion</p>
        <div className="space-y-8">
          <section>
            <h2 className="mb-2 text-2xl font-semibold text-blue-900">What the Court decided</h2>
            <p className="mb-3">
              The Fifth Amendment says private property shall not “be taken for public use, without just
              compensation.” In <em>Kelo v. City of New London</em>, 545 U.S. 469 (2005), the Supreme Court
              held 5–4 that New London’s integrated economic redevelopment plan served a public purpose
              sufficient to satisfy the federal public-use requirement, even though some of the property
              would pass to private parties. The majority followed precedents interpreting public use
              broadly and evaluated the planned development as a whole. It also recognized a limit on
              takings that use a public purpose as a pretext to confer a private benefit.
            </p>
            <p>
              Justice O’Connor warned that expected economic gains could leave ordinary property owners
              vulnerable to takings for the benefit of more influential private interests. Justice Thomas
              argued that the clause requires government ownership or a legal right for the public to use
              the property. <a className="text-blue-800 underline" href={opinion}>Read the majority opinion, concurrence, and dissents.</a>
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-2xl font-semibold text-blue-900">Why the distinction matters</h2>
            <p>
              A projected increase in jobs or tax revenue tells the public what a developer expects to
              deliver. A legal right of public access or an enforceable duty to serve the public tells
              people what they can actually demand. When a project seeks to force an easement across a
              working farm, the public record should explain who the project is designed to serve, why
              that route is needed, and how it would affect irrigation, equipment access, and food
              production. Federal transmission condemnation also has its own statutory requirements.
              <a className="ml-1 text-blue-800 underline" href="https://uscode.house.gov/us/usc/119-136/t16/s824p/">
                Read 16 U.S.C. § 824p.
              </a>
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-2xl font-semibold text-blue-900">Safeguards for public discussion</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Require a demonstrable public use or enforceable duty to serve the public. Economic projections alone would be insufficient.</li>
              <li>Disclose who ultimately owns and controls the applicant, which major customers the project is designed to serve, and what feasible routes were evaluated.</li>
              <li>Require a parcel-specific finding that no feasible, less harmful alternative exists before condemning working farmland, with early participation by farmers and tenants.</li>
              <li>Consider a binding local vote before compulsory acquisition primarily serving an identified private development. Ask affected communities who should vote and whether any override should exist for an essential regional need.</li>
            </ul>
            <p className="mt-4">
              States may adopt stronger safeguards. Michigan’s constitution excludes takings for transfer
              to a private entity for economic development or increased tax revenue from its definition
              of public use.
              <a className="ml-1 text-blue-800 underline" href="https://legislature.mi.gov/Laws/MCL?objectName=MCL-ARTICLE-X-2">
                Read Michigan Constitution Article X, Section 2.
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
