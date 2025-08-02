import Head from 'next/head';

export default function DeclarationForm() {
  return (
    <>
      <Head>
        <title>Declaration of Unauthorized Rule | United for Accountability</title>
        <meta name="description" content="Sign the public declaration to lawfully reject unauthorized rule and defend your rights under the 9th Amendment." />
      </Head>

      <main className="bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-red-700 mb-6">✍️ Declaration of Unauthorized Rule</h1>
          <p className="text-lg text-gray-700 mb-6">
            You are joining a national legal action to assert your constitutional rights under the 9th Amendment. This declaration affirms that you do not consent to unauthorized rule and support legal action to defend democracy.
          </p>

          <form id="declarationForm" className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
              <input type="text" id="fullName" name="fullName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
              <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">City & State <span className="text-red-500">*</span></label>
              <input type="text" id="location" name="location" required placeholder="City, State" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
            </div>

            <div>
              <label htmlFor="statement" className="block text-sm font-medium text-gray-700">Why are you signing? (optional)</label>
              <textarea id="statement" name="statement" rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" placeholder="Your personal thoughts or message..."></textarea>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="consent" name="consent" type="checkbox" required className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded" />
              </div>
              <div className="ml-3 text-sm text-gray-700">
                I affirm that this declaration is submitted voluntarily and may be used in a public-interest legal filing. I understand that my name will not be published without consent.
              </div>
            </div>

            <div>
              <button type="submit" className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                ✅ Submit My Declaration
              </button>
            </div>
          </form>

          <p id="formMessage" className="mt-6 text-sm text-green-600 hidden">Thank you for your declaration. It has been recorded.</p>

          {/* 🌱 Why This Is Bigger Than Money */}
          <div className="mt-16 border-t pt-10">
            <h2 className="text-2xl font-bold text-green-700 mb-4">🌱 Why This Is Bigger Than Money</h2>
            <p className="text-gray-800 text-lg mb-6">
              We understand that people are struggling. That the system has pushed many to the edge — financially, emotionally, even spiritually. And yes, if this mass tort succeeds, it may result in financial damages for some plaintiffs.
            </p>
            <p className="text-gray-800 text-lg mb-6">
              But this case is not just about that.
            </p>
            <p className="text-gray-800 text-lg mb-6">
              This is about reclaiming what money can’t buy:
            </p>
            <ul className="list-disc ml-6 text-gray-700 text-base mb-6">
              <li>Your right to live without fear of eviction, illness, or silence.</li>
              <li>Your right to be represented by a government that actually serves you.</li>
              <li>Your right to build a future — not just survive another year.</li>
            </ul>
            <p className="text-gray-800 text-lg mb-6">
              By joining this movement, you are helping to:
            </p>
            <ul className="list-disc ml-6 text-gray-700 text-base mb-6">
              <li>End government by corporate decree</li>
              <li>Reassert the dignity of every human life</li>
              <li>Force accountability into a system designed to forget you</li>
            </ul>
            <p className="text-gray-800 text-lg mb-6">
              If we win — and we will — we don’t just get restitution.<br />
              We get something deeper:<br />
              <strong className="text-red-700">The chance to live a fulfilling life, free from systemic control.</strong><br />
              The kind of life <em>you were always meant to live.</em>
            </p>
            <p className="text-lg text-red-700 font-semibold">
              This is not a lawsuit for dollars.<br />
              It’s a lawsuit for your future.
            </p>
          </div>
        </div>
      </main>

      <script>
        {`
          document.getElementById('declarationForm')?.addEventListener('submit', function (e) {
            e.preventDefault();
            document.getElementById('formMessage')?.classList.remove('hidden');
            e.target.reset();
          });
        `}
      </script>
    </>
  );
}
