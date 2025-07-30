import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src="/images/united-for-accountability-logo.png"
            alt="United for Accountability logo"
            className="h-8 w-auto"
          />
          <Link href="/" className="text-lg font-bold">United for Accountability</Link>
        </div>
        <div className="space-x-4">
          <Link href="/sign" className="hover:underline">Sign</Link>
          <Link href="/stories" className="hover:underline">Stories</Link>
          <Link href="/declaration" className="hover:underline">Declaration</Link>
          <Link href="/mass-tort-framework" className="hover:underline">Mass Tort Framework</Link>
        </div>
      </div>
    </nav>
  );
}
