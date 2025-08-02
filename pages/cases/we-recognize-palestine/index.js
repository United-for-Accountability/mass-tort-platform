import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>United for Accountability | Global Legal Movement to Recognize Palestine</title>
        <meta name="description" content="Join the global and domestic legal campaign to recognize Palestine as a sovereign state. Assert your rights under the 9th Amendment and international law. Sign the declaration and take action today." />
        <meta name="keywords" content="Recognize Palestine, 9th Amendment, Global Mass Tort, Legal Declaration, United for Accountability, Human Rights, Sovereignty, Constitutional Rights, End Genocide, Public Interest Lawsuit" />
        <link rel="canonical" href="https://www.unitedforaccountability.org/" />
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-10 text-gray-900">
        <section className="text-center">
          <h1 className="text-5xl font-extrabold text-green-700 mb-6">We the People Recognize Palestine — Not as a favor. As a right.</h1>
          <p className="text-xl max-w-3xl mx-auto mb-6">
            United for Accountability is a global mass tort initiative and constitutional movement that calls for immediate recognition of Palestine as a sovereign state. This campaign uses domestic and international law to end complicity in genocide, restore the right to self-determination, and hold governments accountable.
          </p>
          <p className="text-lg max-w-4xl mx-auto mb-8">
            For too long, the rights of the Palestinian people have been denied, ignored, and undermined by powerful nations who place geopolitics and private interest above human life. The refusal to recognize Palestine is not a matter of diplomacy — it is a legal and moral failure that perpetuates violence, erases history, and obstructs peace. Every bullet fired without accountability, every home demolished without justice, and every child buried without recognition is a stain on the global conscience.
          </p>
          <p className="text-lg max-w-4xl mx-auto mb-8">
            We declare: The people are not powerless. We are not complicit. We do not recognize occupation, apartheid, or silence as policy. We recognize the dignity and sovereignty of Palestine, and we invoke the full power of constitutional and international law to demand change. We act not in protest, but in purpose — as lawful guardians of justice, equity, and truth.
          </p>
          <Link href="/cases/recognize-palestine">
            <a className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition">
              ✍️ Sign the Petition
            </a>
          </Link>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">🌍 Global Call to Action</h2>
            <p className="mb-4">Over 147 nations already recognize Palestine. Yet the United States and other powerful actors continue to block formal recognition through vetoes, funding apartheid, and arming systemic oppression. We’re changing that — by filing a coordinated legal action backed by thousands of voices and constitutional rights.</p>
            <p className="mb-4">You don’t need to be Palestinian to take action. You just need to believe in sovereignty, dignity, and lawful governance by consent — not power.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">🛡️ U.S.-Based Legal Power</h2>
            <p className="mb-4">Under the <strong>9th Amendment</strong>, the people retain rights even if not enumerated. This includes the right to refuse complicity in war crimes and unauthorized foreign policy. When your tax dollars fund destruction, <strong>you have the right to withdraw consent and file a constitutional objection</strong>.</p>
            <p className="mb-4">Join the filing: <strong>United States v. The People’s Conscience</strong> — a 9th Amendment mass tort to end U.S. obstruction of Palestinian sovereignty and global peace.</p>
          </div>
        </section>

        <section className="bg-gray-50 border-t border-b py-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-red-700 mb-4">Why Your Signature Matters</h2>
            <p className="text-lg mb-4">
              Every signature is legal evidence. Every story strengthens the case. Every submission is a stand for truth and a rejection of silence.
            </p>
            <p className="text-lg mb-4">
              You are not symbolic. You are the firewall. Add your name. Add your story. Demand recognition.
            </p>
            <Link href="/cases/recognize-palestine">
              <a className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded shadow-lg mt-4">
                ✅ Sign the Petition Now
              </a>
            </Link>
          </div>
        </section>

        <section className="pt-10 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">📋 How to Participate</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>✅ Read the full petition and legal campaign overview.</li>
            <li>✍️ Sign your name and optionally upload a statement or testimony.</li>
            <li>🗣️ Share this with your network: friends, faith communities, organizations, and global allies.</li>
            <li>📜 Return soon to sign the formal Declaration of Recognition — launching shortly.</li>
            <li>🎯 Know that this is not a protest — it’s a legal strike rooted in law, not politics.</li>
          </ul>
        </section>

        <section className="bg-green-100 p-6 mt-12 rounded shadow-lg max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-green-900 mb-2">Legal Tools You Are Invoking:</h2>
          <ul className="list-disc list-inside space-y-1 text-md">
            <li><strong>9th Amendment</strong> – Retained rights of the people, including the right to moral autonomy and legal objection to genocide</li>
            <li><strong>42 U.S.C. § 1983, 1985</strong> – Civil rights statutes for filing against governments and conspiracies violating constitutional protections</li>
            <li><strong>International Law</strong> – UN Charter, Geneva Conventions, Rome Statute, and the Right to Self-Determination</li>
            <li><strong>Public Trust Doctrine</strong> – The government has no right to weaponize public resources or withhold recognition from any sovereign people</li>
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}
