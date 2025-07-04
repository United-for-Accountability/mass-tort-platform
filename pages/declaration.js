// pages/declaration.js
import Head from 'next/head';

export default function Declaration() {
  return (
    <>
      <Head>
        <title>The Declaration of Harm | United for Accountability</title>
      </Head>
      <main className="min-h-screen bg-white text-gray-900 px-6 py-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">The Declaration of Harm</h1>

        <p className="text-lg mb-4">
          This is our public statement. Our collective testimony. Our charge sheet against the systems and individuals who have profited from our pain.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Who This Holds Accountable</h2>
        <p className="mb-4">
          We hold accountable those in power who enabled, profited from, or failed to stop harm — including former President Donald Trump, corporations, and members of Congress who ignored the cries of the people.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Why We Are Uniting</h2>
        <p className="mb-4">
          We unite not out of political allegiance but in moral clarity — to document, expose, and demand justice for the harm inflicted on millions of Americans.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Categories of Harm</h2>
        <ul className="list-disc ml-6 space-y-1 mb-6">
          <li>Immigration detention & family separation</li>
          <li>Medical bankruptcy & insurance abuse</li>
          <li>Corporate profiteering</li>
          <li>Labor exploitation</li>
          <li>Environmental destruction</li>
          <li>Mental health crisis</li>
          <li>Systemic racism</li>
          <li>Privatized prisons & mass incarceration</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Our Final Words</h2>
        <p className="mb-12">
          We, the People, submit this as a unified charge sheet against injustice. This is our record, our resistance, and our demand for accountability.
        </p>

        <a
          href="/sign"
          className="inline-block bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          📜 Add Your Name to the Case File
        </a>
      </main>
    </>
  );
}
