import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">United for Accountability</Link>
        <div className="space-x-4">
          <Link href="/sign" className="hover:underline">Sign</Link>
          <Link href="/stories" className="hover:underline">Stories</Link>
          <Link href="/declaration" className="hover:underline">Declaration</Link>
        </div>
      </div>
    </nav>
  );
}