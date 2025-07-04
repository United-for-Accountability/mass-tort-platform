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
      </main>
      <Footer />
    </>
  );
}
