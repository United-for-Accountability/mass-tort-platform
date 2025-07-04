
import { NextSeo } from 'next-seo';

export default function JoinTheCase() {
  return (
    <>
      <NextSeo
        title="Join the Case | United for Accountability"
        description="Sign the Declaration of Harm and share your story with the United for Accountability movement."
        canonical="https://unitedforaccountability.org/join-the-case"
      />
      <main className="py-20 px-6 max-w-2xl mx-auto text-gray-900">
        <h1 className="text-4xl font-bold mb-8 text-center">Join the Case</h1>
        <p className="mb-6 text-center">
          Sign your name to the Declaration of Harm and, if you wish, share your story of how unjust systems have affected you.
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-medium">Name *</label>
            <input type="text" id="name" name="name" required className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label htmlFor="state" className="block font-medium">State (optional)</label>
            <input type="text" id="state" name="state" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label htmlFor="story" className="block font-medium">Your Story (optional)</label>
            <textarea id="story" name="story" rows="5" className="w-full border border-gray-300 p-2 rounded"></textarea>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="affirm" name="affirm" required className="mr-2" />
            <label htmlFor="affirm" className="text-sm">I affirm I have experienced or witnessed harm under unjust policies and systems.</label>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition">
              ✅ Submit
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
