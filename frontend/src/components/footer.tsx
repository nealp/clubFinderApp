import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-around items-center md:items-start gap-12 text-center md:text-left">
        <div className="flex flex-col gap-4 max-w-62.5">
          <span className="font-bold text-xl text-red-400">
            Club Finder App
          </span>
          <p className="text-sm leading-relaxed">
            Connecting you with the best clubs for you in UMass
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">
            Explore
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/" className="hover:text-red-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/clubs"
                className="hover:text-red-400 transition-colors"
              >
                Find Clubs
              </Link>
            </li>
            <li>
              <Link
                href="/saved"
                className="hover:text-red-400 transition-colors"
              >
                Saved
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social/Newsletter */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/umasscodecollab/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-red-400 transition-colors"
            >
              IG
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-xs">
        <p>&copy; {currentYear} Club Finder App. All rights reserved.</p>
      </div>
    </footer>
  );
}
