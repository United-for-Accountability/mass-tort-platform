import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

export default function MassTortFramework() {
  return (
    <>
      <Head>
        <title>Mass Tort Framework | United for Accountability</title>
        <meta name="description" content="Explore the full Mass Tort Framework to challenge systemic injustice, including legal violations, constitutional rights, and harm classification affecting everyday Americans." />
        <meta property="og:title" content="Mass Tort Framework" />
        <meta property="og:description" content="Access the legal framework to expose systemic harm, special interest capture, and constitutional violations through a national mass tort." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.unitedforaccountability.org/mass-tort-framework" />
        <link rel="canonical" href="https://www.unitedforaccountability.org/mass-tort-framework" />
      </Head>

      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mass Tort Legal Framework</h1>
          <p className="text-lg text-gray-700 mb-8">
            This is the foundational legal document that supports a national mass tort campaign. It includes definitions of harm, supporting constitutional law, statutory citations, real-world examples, and arguments for legal standing.
          </p>

          <a
            href="/documents/Master-Framework-for-a-National-Mass-Tort-Campaign.pdf"
            download
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            📄 Download Full Framework (PDF)
          </a>
        </div>

        <div className="mt-12 max-w-3xl mx-auto text-left">
          <h2 className="text-2xl font-semibold mb-4">What It Covers</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-800">
            <li>Constitutional and Civil Rights Violations (1st, 8th, 9th, 14th Amendments)</li>
            <li>Federal Civil Rights Statutes (42 U.S.C. § 1983, § 1985, etc.)</li>
            <li>Harm to Everyday Americans: Mandatory insurance, property tax seizures, healthcare denial</li>
            <li>Public Trust Doctrine and State Complicity in Privatization</li>
            <li>Special Interest Capture of Congress and Violations of Public Representation</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
