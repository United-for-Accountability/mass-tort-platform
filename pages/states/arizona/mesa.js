import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function Mesa() {
  return (
    <>
      <Head>
        <title>Mesa, Arizona | United for Accountability</title>
        <meta name="description" content="Information and engagement for residents of Mesa, Arizona." />
        <link rel="canonical" href="https://www.unitedforaccountability.org/states/arizona/mesa" />
      </Head>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Mesa, Arizona</h1>
        <p>City-specific content will be available soon.</p>
      </main>
      <Footer />
    </>
  );
}
