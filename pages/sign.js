import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Sign() {
  return (
    <>
      <Head>
        <title>Sign the Declaration | United for Accountability</title>
      </Head>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">📜 Sign the Declaration</h1>
        <p className="text-gray-700">This is where people will submit their name and story. Form coming soon.</p>
      </main>
      <Footer />
    </>
  );
}