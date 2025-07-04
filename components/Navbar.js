import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold hover:text-blue-300 transition">
          United for Accountability
        </Link>
        <div className="space-x-4 text-sm sm:text-base">
          <Link href="/sign" className="hover:underline hover:text-blue-300">Sign</Link>
          <Link href="/stories" className="hover:underline hover:text-blue-300">Stories</Link>
          <Link href="/declaration" className="hover:underline hover:text-blue-300">Declaration</Link>
        </div>
      </div>
    </nav>
  );
}

