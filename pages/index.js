// Home page template
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black p-8">
      <Head>
        <title>United for Accountability</title>
        <meta name="description" content="Join millions demanding justice and truth. Add your name to the Declaration of Harm." />
      </Head>
      <main className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold">This Is Our Declaration. We’ve Been Harmed. We Refuse to Stay Silent.</h1>
        <p className="text-xl">Join millions of Americans documenting the truth: that policies, politics, and profit-driven systems have caused suffering, and it's time for justice.</p>
        <div className="space-x-4">
          <Link href="/join-the-case" className="inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">🖊 Add Your Story</Link>
          <Link href="/declaration-of-harm" className="inline-block border border-black py-2 px-4 rounded hover:bg-black hover:text-white transition">📜 Read the Declaration</Link>
        </div>
      </main>
    </div>
  )
}
