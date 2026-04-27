import Head from 'next/head';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';

export default function CaseLandingPage({ caseData }) {
  return (
    <>
      <Head>
        <title>{caseData.title} | United for Accountability</title>
        <meta name="description" content={caseData.metaDescription} />
        <link rel="canonical" href={`https://www.unitedforaccountability.org/cases/${caseData.slug}`} />
      </Head>

      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-blue-900">{caseData.heroTitle}</h1>

        <p className="text-lg mb-10">{caseData.heroIntro}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">What This Case Is About</h2>
          <div className="space-y-4">
            {caseData.grounds.map((ground) => (
              <div key={ground.title}>
                <h3 className="text-xl font-semibold mb-2">{ground.title}</h3>
                <p>{ground.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Why This Matters</h2>
          <ul className="list-disc list-inside space-y-3">
            {caseData.whyItMatters.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">How You Can Participate</h2>
          <p className="mb-6">{caseData.callToAction}</p>
          <Link
            href={`/cases/${caseData.slug}/declaration`}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded shadow transition duration-200"
          >
            Sign the Declaration
          </Link>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg mt-16 p-8 text-center shadow-md">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">{caseData.declarationTitle}</h2>
          <p className="text-lg text-gray-800 mb-6">{caseData.declarationDescription}</p>
          <Link
            href={`/cases/${caseData.slug}/declaration`}
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-lg shadow transition"
          >
            Open Declaration Form
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}