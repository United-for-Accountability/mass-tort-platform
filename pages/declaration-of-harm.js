
import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function DeclarationOfHarm() {
  return (
    <>
      <NextSeo
        title="Declaration of Harm | United for Accountability"
        description="Read the official Declaration of Harm submitted by the American people as part of the United for Accountability movement."
        canonical="https://unitedforaccountability.org/declaration-of-harm"
      />
      <main className="py-20 px-6 max-w-4xl mx-auto text-gray-900">
        <h1 className="text-4xl font-bold mb-8 text-center">The Declaration of Harm</h1>
        <p className="mb-6">
          We, the People, declare that we have been harmed — individually and collectively — by systems and institutions that
          have prioritized profit over people, silence over truth, and exploitation over justice.
        </p>
        <p className="mb-6">
          This declaration is our public charge sheet. It holds accountable those in power — including government officials, 
          private equity firms, insurance companies, major financial institutions, and asset managers like BlackRock, Vanguard, 
          and State Street — for their role in enabling and perpetuating widespread suffering.
        </p>
        <p className="mb-6">
          We document the harms of medical debt, environmental destruction, housing exploitation, labor abuse, systemic racism, 
          mental health crises, mass incarceration, and corporate profiteering.
        </p>
        <p className="mb-6">
          We do not seek revenge. We seek recognition, redress, and the right to live with dignity.
        </p>
        <p className="mb-8 font-semibold">
          If you affirm this declaration, we invite you to add your name and your story to the official case record.
        </p>
        <div className="text-center">
          <Link href="/join-the-case">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition">
              ✍️ Sign the Declaration
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
