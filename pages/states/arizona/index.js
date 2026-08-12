import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const cities = [
  { name: 'Phoenix', slug: 'phoenix' },
  { name: 'Tucson', slug: 'tucson' },
  { name: 'Mesa', slug: 'mesa' },
  { name: 'Chandler', slug: 'chandler' },
  { name: 'Gilbert', slug: 'gilbert' },
  { name: 'Glendale', slug: 'glendale' },
  { name: 'Scottsdale', slug: 'scottsdale' },
  { name: 'Tempe', slug: 'tempe' },
  { name: 'Peoria', slug: 'peoria' },
  { name: 'Surprise', slug: 'surprise' },
];

export default function Arizona() {
  return (
    <>
      <Head>
        <title>Arizona Cities | United for Accountability</title>
        <meta name="description" content="Explore city pages for Arizona within the United for Accountability mass tort platform." />
        <link rel="canonical" href="https://www.unitedforaccountability.org/states/arizona" />
      </Head>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Arizona</h1>
        <p className="mb-4">Select a city to learn more and participate.</p>
        <ul className="list-disc list-inside space-y-2">
          {cities.map(({ name, slug }) => (
            <li key={slug}>
              <Link href={`/states/arizona/${slug}`} className="text-blue-600 hover:underline">{name}</Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
