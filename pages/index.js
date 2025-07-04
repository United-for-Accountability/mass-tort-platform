import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>United for Accountability | Mass Tort Platform for Justice</title>
        <meta name="description" content="Document your harm. Read real stories. Sign the Declaration. United for Accountability is building a legal platform to challenge systemic abuse and corporate negligence." />
        <meta property="og:title" content="United for Accountability" />
        <meta property="og:description" content="Join the growing mass tort movement to expose injustice and demand restitution." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.unitedforaccountability.org/" />
        <meta property="og:image" content="/public/og-image.jpg" />
        <link rel="canonical" href="https://www.unitedforaccountability.org/" />
      </Head>
      <Navbar />
      <main className="px-6 py-16 max-w-3xl mx-auto text-center text-gray-800">
        <h1 className="text-4xl font-bold mb-6">This Is Our Record. Our Resistance. Our Demand for Accountability.</h1>
        <p className="text-lg mb-8">
          We’re building this platform to prepare for a mass tort against systems that have caused nationwide harm — from private equity and corporate profiteering to unjust policies and systemic neglect.
        </p>
        <a href="/sign" className="inline-block bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition">
          🖊 Sign the Declaration
        </a>

        {/* State Sovereignty Section */}
        <section className="mt-16 bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">The Federal Government Was Created by the States — Not the Other Way Around</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            We reject the false narrative that the federal government holds supreme power over the states or the people. The United States was founded on a principle of sovereign states voluntarily uniting under a limited federal structure. Over time, this balance has been violated.
          </p>
          <p className="mt-4 text-base text-gray-700 leading-relaxed">
            From over-taxation and federal mandates that benefit for-profit insurance companies and banks, to distorted census data and forced toll roads — federal overreach has eroded local control and the public’s right to self-determination.
          </p>
          <p className="mt-4 text-base text-gray-700 leading-relaxed">
            The 10th Amendment makes it clear: powers not granted to the federal government remain with the states and the people. This platform stands for restoring that balance — lawfully, peacefully, and powerfully.
          </p>
        </section>

        {/* Federal and State Complicity Section */}
        <section className="mt-12 bg-red-50 p-6 rounded-lg shadow border border-red-200">
          <h2 className="text-2xl font-semibold mb-4 text-red-800">Complicity at All Levels: Federal and State Governments Have Failed to Protect the People</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            We hold both the federal and state governments responsible for allowing systemic harm to continue unchecked. The federal government, created to serve the people and coordinate the states, has instead imposed mandates, protected monopolies, and failed to stop states from violating the rights of their residents.
          </p>
          <p className="mt-4 text-base text-gray-700 leading-relaxed">
            Meanwhile, the states — sovereign entities designed to be protectors of their people — have been silent or complicit, allowing federal overreach and participating in harmful corporate-aligned laws and mandates. This dual failure is not just immoral — it's unconstitutional.
          </p>
          <p className="mt-4 text-base text-gray-700 leading-relaxed font-semibold italic">
            A government that allows harm from above and below cannot claim to represent the people. We demand accountability from both levels — not just in words, but in court.
          </p>
        </section>
        
<section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px', textAlign: 'center' }}>
  <div style={{ maxWidth: '800px', margin: '0 auto' }}>
    <h2 style={{ fontSize: '2.5rem', color: '#222' }}>
      What About the Rights Not Written Down?
    </h2>
    <p style={{ fontSize: '1.2rem', color: '#444', marginTop: '20px' }}>
      The <strong>9th Amendment</strong> reminds us that our rights don’t end where the Constitution’s text stops. It tells us:
      <br />
      <em>
        "The enumeration in the Constitution, of certain rights, shall not be construed to deny or disparage others retained by the people."
      </em>
    </p>
    <p style={{ fontSize: '1.1rem', color: '#555', marginTop: '30px' }}>
      Today, both government and corporations are working together to sidestep your constitutional protections. But your rights — to <strong>privacy</strong>, <strong>dignity</strong>, <strong>safe housing</strong>, <strong>health</strong>, and <strong>freedom from corporate control</strong> — still belong to you.
    </p>

    <h3 style={{ marginTop: '40px', fontSize: '1.5rem', color: '#222' }}>
      💬 What rights do <em>you</em> believe we hold — even if they’re not written?
    </h3>
    <p style={{ color: '#555', marginBottom: '20px' }}>
      Help build the People’s Archive of Unenumerated Rights.
    </p>

    <form action="https://formspree.io/f/your-form-id" method="POST" style={{ marginTop: '30px' }}>
      <input
        type="text"
        name="name"
        placeholder="Your name (optional)"
        style={{
          padding: '12px',
          width: '90%',
          maxWidth: '400px',
          marginBottom: '15px'
        }}
      />
      <br />
      <textarea
        name="right"
        placeholder="What right do you believe the people retain?"
        required
        style={{
          padding: '12px',
          width: '90%',
          maxWidth: '600px',
          height: '120px'
        }}
      />
      <br />
      <button
        type="submit"
        style={{
          backgroundColor: '#0056b3',
          color: '#fff',
          padding: '12px 30px',
          border: 'none',
          fontSize: '1rem',
          cursor: 'pointer',
          borderRadius: '5px',
          marginTop: '15px'
        }}
      >
        Submit to the Archive
      </button>
    </form>
  </div>
</section>

  

        {/* Categories of Harm and Rights Section */}
        <section className="mt-16 bg-white p-6 rounded-lg shadow border border-gray-200 text-left">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">The Harms We Face — And the Rights That Protect Us</h2>
          <p className="text-base text-gray-700 mb-6">
            Our country was founded on the idea that power belongs to the people. But across America, that power has been taken from us — through corporate greed, government inaction, and constitutional betrayal. Below are the major categories of harm we are documenting — and the rights we still hold that allow us to fight back.
          </p>

          <div className="space-y-6">
            {/* Harm 1 */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700">1. Federal Overreach & Violation of State Sovereignty</h3>
              <p className="text-sm text-gray-700">
                The federal government was created by the states — not to rule them, but to coordinate limited functions. Today, it imposes mandates, taxes, and forced corporate relationships (like for-profit insurance) that violate the 10th Amendment.
              </p>
            </div>

            {/* Harm 2 */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700">2. Private Equity Takeover of Essential Systems</h3>
              <p className="text-sm text-gray-700">
                From healthcare to housing, food to prisons — private equity firms have acquired essential infrastructure, driving prices up and compassion down. This is economic violence backed by policy silence.
              </p>
            </div>

            {/* Harm 3 */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700">3. Systemic Poverty, Wage Suppression, and Over-Taxation</h3>
              <p className="text-sm text-gray-700">
                We are taxed, tolled, and fined into poverty — while billionaires and corporations pay less than their share. This violates the Equal Protection Clause when the burden is unequally distributed by law.
              </p>
            </div>

            {/* Harm 4 */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700">4. Health and Housing Mandates That Serve Corporations</h3>
              <p className="text-sm text-gray-700">
                When the government forces you to buy from a for-profit company (like health or car insurance), that is not freedom — it is economic coercion. If we are required to comply, the option must be nonprofit.
              </p>
            </div>

            {/* Harm 5 */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700">5. Civil Rights Violations Across States</h3>
              <p className="text-sm text-gray-700">
                Homelessness is criminalized. Protesters are suppressed. People of color are policed differently. These are violations of the 1st, 4th, 8th, and 14th Amendments — and we have the right to challenge them under 42 U.S.C. § 1983.
              </p>
            </div>

            {/* Harm 6 */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700">6. Censorship, Digital Manipulation, and Media Consolidation</h3>
              <p className="text-sm text-gray-700">
                Media and tech giants shape what we see and believe. This affects elections, health decisions, and unity. The First Amendment protects our right to challenge narrative monopolies that suppress truth.
              </p>
            </div>
          </div>

          <div className="mt-8 text-base text-gray-800">
            <h3 className="text-xl font-semibold mb-2 text-green-700">What We Can Do Together</h3>
            <p>
              When our rights are violated as a class of people — not just as individuals — we can file a <strong>mass tort</strong>. This is not just about compensation. It's about forcing change:
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700 space-y-2">
              <li>Demanding the government provide nonprofit alternatives to corporate mandates</li>
              <li>Exposing unconstitutional taxation and financial coercion</li>
              <li>Restoring state and personal sovereignty through legal pressure</li>
              <li>Holding corporate actors accountable in civil court for systemic harm</li>
              <li>Creating a public record of injustice that cannot be denied</li>
            </ul>
            <p className="mt-4 font-semibold text-gray-900">
              This is how we fight — not just for ourselves, but for future generations.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
