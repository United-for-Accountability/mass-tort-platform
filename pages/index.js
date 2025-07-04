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
      </main>
      <Footer />
    </>
  );
}