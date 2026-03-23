'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Properties', href: '/properties' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-0 shadow-none ${isScrolled
          ? 'bg-black/60 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full pl-1 pr-3 sm:pl-2 sm:pr-4 lg:pl-3 lg:pr-6">
          <div className="w-full flex items-center justify-between h-[64px] sm:h-[72px]">
            {/* LEFT - Logo */}
            <div className="flex items-center justify-start -ml-3 md:-ml-4">
              <Link href="/" className="block m-0 p-0">
                <Logo className="w-[140px] md:w-[140px] lg:w-[180px] h-auto" />
              </Link>
            </div>

            {/* CENTER - Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-white hover:text-gray-300 transition-colors duration-200 text-lg font-medium tracking-wide"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT - Auth Buttons + Enquire Now */}
            <div className="hidden md:flex items-center space-x-4">
              {!session ? (
                <Link
                  href="/login"
                  className="px-6 py-2.5 rounded-full text-sm font-semibold bg-[#C4973F] text-black hover:bg-[#b38730] transition-all duration-200 shadow-md inline-flex items-center justify-center"
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    href="/admin/write-blog"
                    className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
                  >
                    Write Blog
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              )}

              <Link
                href="/#contact"
                className="px-6 py-2.5 rounded-full text-sm font-semibold bg-[#C4973F] text-black hover:bg-[#b38730] transition-all duration-200 shadow-md inline-flex items-center justify-center"
              >
                Enquire Now
              </Link>
            </div>

            {/* RIGHT - Mobile menu button */}
            <div className="ml-auto md:hidden flex items-center justify-center p-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-gray-300 focus:outline-none p-1"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Side Panel */}
          <div className="md:hidden fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-black z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col">
            {/* Menu Header - Logo and Close Button */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <Logo className="w-[120px] h-auto" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-gray-300 focus:outline-none p-2"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Body with Scrollable Links */}
            <div className="flex-1 overflow-y-auto">
              {/* Nav Links */}
              <div className="flex flex-col px-5 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-4 text-left text-3xl font-medium text-white border-b border-white/10 hover:text-gray-300 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Auth Actions Section */}
              <div className="px-4 py-6 border-t border-white/10 mt-3 flex flex-col items-center gap-2">
                <div className="flex flex-col  w-full"></div>
                {!session ? (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full max-w-[260px] mx-auto flex items-center justify-center px-6 py-3 mb-4 rounded-full text-sm font-semibold bg-[#C4973F] text-black hover:bg-[#b38730] transition-all duration-200 shadow-md text-center"
                  >

                    Login
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/admin/write-blog"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full max-w-[260px] mx-autoflex items-center justify-center px-6 py-3 mb-4 rounded-full text-sm font-semibold bg-[#C4973F] text-black hover:bg-[#b38730] transition-all duration-200 shadow-md text-center"
                    >
                      Write Blog
                    </Link>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: '/' });
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full max-w-[260px] mx-autoflex items-center justify-center px-6 py-3 mb-4 rounded-full text-sm font-semibold bg-[#C4973F] text-black hover:bg-[#b38730] transition-all duration-200 shadow-md text-center"
                    >
                      Logout
                    </button>
                  </>
                )}

                <Link
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full max-w-[260px] mx-auto flex items-center justify-center px-6 py-3 mb-4 rounded-full text-sm font-semibold bg-[#C4973F] text-black hover:bg-[#b38730] transition-all duration-200 shadow-md text-center"
                >

                  Enquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-[64px] sm:h-[72px]"></div>
    </>
  );
};

export default Navbar;