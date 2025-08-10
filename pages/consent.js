import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CONSENT_VERSION = 'v1.3 – 2025-08-10';

export default function Consent() {
  return (
    <>
      <Head>
        <title>Consent & Use Terms</title>
      </Head>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-4">
        <h1 className="text-2xl font-bold">Consent &amp; Use Terms ({CONSENT_VERSION})</h1>
        <p>
          I agree to the Consent &amp; Use terms, authorize United for Accountability to store and use this submission for legal evaluation and potential litigation support, and certify that the information provided is true and correct.
        </p>
        <p>
          When signing on behalf of someone else, I further certify I am authorized to sign on behalf of the named individual and, if requested, will provide documentation of my authority.
        </p>
      </main>
      <Footer />
    </>
  );
}

export { CONSENT_VERSION };
