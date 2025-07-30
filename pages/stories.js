import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const storiesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Stories of Harm | United for Accountability",
  description:
    "Browse real stories submitted by people impacted by systemic injustice and learn why a united mass tort effort is needed.",
  url: "https://www.unitedforaccountability.org/stories",
};

export default function Stories() {
  return (
    <>
      <Head>
        <title>Stories of Harm | United for Accountability</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storiesSchema) }}
        />
      </Head>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">📖 Stories of Harm</h1>
        <p className="text-gray-700">Submitted stories will appear here once the Airtable integration is active.</p>
      </main>
      <Footer />
    </>
  );
}