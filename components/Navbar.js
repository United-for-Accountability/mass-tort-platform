import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = (
    <>
      <Link href="/sign" className="hover:underline">Sign</Link>
      <Link href="/stories" className="hover:underline">Stories</Link>
      <Link href="/declaration" className="hover:underline">Declaration</Link>
      <Link href="/mass-tort-framework" className="hover:underline">Mass Tort Framework</Link>
    </>
  );

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
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="hidden md:flex space-x-4">
          {links}
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 flex flex-col items-start">
          {links}
        </div>
      )}
    </nav>
  );
}
