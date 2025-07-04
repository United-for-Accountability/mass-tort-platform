import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Stories() {
  return (
    <>
      <Head>
        <title>Stories of Harm | United for Accountability</title>
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