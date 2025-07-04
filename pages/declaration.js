import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Declaration() {
  return (
    <>
      <Head>
        <title>The Declaration of Harm | United for Accountability</title>
      </Head>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">🧾 The Declaration of Harm</h1>
        <p className="text-gray-700">This is where the long-form public statement will live. Content coming soon.</p>
      </main>
      <Footer />
    </>
  );
}