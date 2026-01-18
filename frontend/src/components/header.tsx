"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 px-6 py-4 relative z-20 border-b border-gray-800">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <span className="font-bold text-xl text-red-400">Club Finder App</span>

        <button
          className="md:hidden text-red-400 focus:outline-none cursor-pointer z-30"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        <ul
          className={`
            /* Layout logic */
            flex flex-col md:flex md:flex-row absolute md:static left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-6 md:p-0 gap-6 md:border-none top-full
            
            /* The "Fade & Pop" Transition Logic */
            transition-all duration-300 ease-out
            
            ${
              isOpen
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-4 invisible pointer-events-none"
            }

            /* Desktop reset */
            md:opacity-100 md:translate-y-0 md:visible md:pointer-events-auto
          `}
        >
          <li>
            <Link
              href="/"
              className="text-red-400 font-bold hover:text-white block transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/saved"
              className="text-red-400 font-bold hover:text-white block transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Saved
            </Link>
          </li>
          <li>
            <Link
              href="/clubs"
              className="text-red-400 font-bold hover:text-white block transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Clubs
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
