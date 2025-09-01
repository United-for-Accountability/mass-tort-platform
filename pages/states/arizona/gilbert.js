import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function Gilbert() {
  return (
    <>
      <Head>
        <title>Gilbert, Arizona | United for Accountability</title>
        <meta name="description" content="Information and engagement for residents of Gilbert, Arizona." />
        <link rel="canonical" href="https://www.unitedforaccountability.org/states/arizona/gilbert" />
      </Head>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Gilbert, Arizona</h1>
        <p>City-specific content will be available soon.</p>
      </main>
      <Footer />
    </>
  );
}
