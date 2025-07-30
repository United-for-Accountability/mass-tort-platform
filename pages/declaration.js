import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const declarationSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Declaration of Harm | United for Accountability",
  description:
    "Read the Declaration of Harm that unites stories of injustice and calls for sweeping accountability across government and corporate systems.",
  url: "https://www.unitedforaccountability.org/declaration",
  author: {
    "@type": "Organization",
    name: "United for Accountability",
  },
};

export default function Declaration() {
  return (
    <>
      <Head>
        <title>The Declaration of Harm | United for Accountability</title>
        <meta
          name="description"
          content="Read the Declaration of Harm that unites stories of injustice and calls for sweeping accountability across government and corporate systems."
        />
        <meta property="og:title" content="The Declaration of Harm" />
        <meta
          property="og:description"
          content="Read the Declaration of Harm that unites stories of injustice and calls for sweeping accountability across government and corporate systems."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.unitedforaccountability.org/declaration" />
        <meta
          property="og:image"
          content="https://www.unitedforaccountability.org/images/united-for-accountability-logo.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Declaration of Harm | United for Accountability" />
        <meta
          name="twitter:description"
          content="Mass Tort | Civil Rights | Justice Movement"
        />
        <meta
          name="twitter:image"
          content="https://www.unitedforaccountability.org/images/united-for-accountability-logo.png"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(declarationSchema) }}
        />
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