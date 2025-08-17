import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function EndingEstateInheritanceTax() {
  return (
    <>
      <Head>
        <title>Ending the Estate Inheritance Tax | United for Accountability</title>
        <meta
          name="description"
          content="A constitutional challenge to the estate inheritance tax. Learn why this tax violates the 5th, 9th, and 14th Amendments — and why every American has a duty to protect their family and future generations."
        />
        <link
          rel="canonical"
          href="https://www.unitedforaccountability.org/cases/ending-the-estate-inheritance-tax"
        />
      </Head>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-blue-900">
          Ending the Estate Inheritance Tax
        </h1>
        <img
          src="/images/ending-the-estate-inheritance-tax.png"
          alt="Ending the Estate Inheritance Tax"
          className="mx-auto my-4"
        />
        <p className="text-lg mb-10">
          The estate inheritance tax is more than a policy issue — it is a
          constitutional violation and a direct assault on the security of
          American families. This case asserts that the government has no right
          to act as an “unwanted heir,” seizing property at death and destroying
          generational wealth. Our goal is clear: abolish this tax and restore
          the constitutional protections guaranteed to the people.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            ⚖️ Constitutional Grounds
          </h2>
          <ul className="list-disc list-inside space-y-4">
            <li>
              <strong>5th Amendment — Takings Clause:</strong> Private property
              cannot be taken for public use without just compensation. The
              estate tax is a seizure at death that provides no compensation and
              no public benefit.
            </li>
            <li>
              <strong>14th Amendment — Due Process & Liberty:</strong> Families
              are stripped of property not for any wrongdoing, but simply
              because of death. This deprives them of liberty and security
              without due process of law.
            </li>
            <li>
              <strong>9th Amendment — Retained Rights of the People:</strong> The
              people retain rights not enumerated in the Constitution —
              including the natural right to preserve, protect, and pass down
              family property. By taxing inheritance, the government violates
              this retained right.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            📊 Why This Matters
          </h2>
          <ul className="list-disc list-inside space-y-4">
            <li>
              <strong>Family Farms & Homes:</strong> Many families are forced to
              sell farms and small businesses just to pay inheritance taxes.
            </li>
            <li>
              <strong>Double Taxation:</strong> Estates are taxed again at death
              even though property was already taxed during the owner’s life.
            </li>
            <li>
              <strong>Middle-Class Harm:</strong> Wealthy elites shield assets
              with trusts and loopholes, while working families carry the
              burden.
            </li>
            <li>
              <strong>Generational Wealth Destruction:</strong> Instead of
              securing the future, this tax robs families of stability,
              education, and opportunity for their children.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            🛡️ The Duty of Every American
          </h2>
          <p className="mb-6">
            The Constitution is not self-enforcing — it relies on the people to
            uphold it. Every American has a duty to protect their rights, their
            families, and the next generation from unconstitutional government
            overreach. If we fail to act, we surrender these rights not just for
            ourselves, but for our children and grandchildren.
          </p>
          <p className="font-semibold">
            By uniting in this mass tort, we fulfill our responsibility as
            citizens: to preserve liberty, defend property, and secure the
            future.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            🚨 The Bottom Line
          </h2>
          <p className="mb-6">
            The estate inheritance tax is unconstitutional. It seizes private
            property without just cause, punishes families at their most
            vulnerable, and undermines the spirit of liberty the Constitution
            was written to protect.
          </p>
          <p className="font-semibold">
            Abolishing it is not only good policy — it is a restoration of
            constitutional rights and a safeguard for future generations.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            ✍️ How You Can Help
          </h2>
          <p className="mb-4">
            This case is part of the United for Accountability national mass
            tort campaign. Every family’s story strengthens our case. If you or
            your loved ones have been harmed by estate inheritance taxes, you
            can add your testimony.
          </p>
          <a
            href="/sign"
            className="inline-block bg-blue-700 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-800 transition"
          >
            ➡️ Submit Your Story
          </a>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg mt-16 p-8 text-center shadow-md">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">✍️ Stand Against the Estate Inheritance Tax — Sign the Declaration</h2>
          <p className="text-lg text-gray-800 mb-6">
            Your signature is a lawful stand to protect family property and restore constitutional rights.
          </p>
          <a
            href="/cases/ending-the-estate-inheritance-tax/declaration"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded shadow transition duration-200"
          >
            ✅ Sign the Declaration to End the Estate Inheritance Tax
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}

