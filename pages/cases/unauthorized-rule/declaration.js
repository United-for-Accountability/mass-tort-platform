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
