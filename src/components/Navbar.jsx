import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="h-16 w-full fixed top-0 left-0 right-0 z-20 bg-black/60 backdrop-blur-md">
      <div className="relative max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Left: Home logo only on non-home routes */}
        <div className="flex items-center gap-3">
          {!isHome && (
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="https://the-eye.eu/static/eye-logo.png"
                alt="Home"
                className="h-8 w-8 object-contain opacity-90 group-hover:opacity-100 transition"
              />
            </Link>
          )}
        </div>

        {/* Centered links */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8 text-sm font-semibold">
          <Link to="/live" className="flex items-center gap-2 text-white/90 hover:text-white transition">
            <span>live</span>
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </Link>
          <Link to="/legacy" className="text-white/90 hover:text-white transition">
            legacy
          </Link>
        </div>

        {/* Right spacer to balance flex layout */}
        <div className="w-8" />
      </div>
      {/* Subtle bottom gradient to blend into page content */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-8 h-8 bg-gradient-to-b from-black/60 to-transparent" />
    </nav>
  );
};

export default Navbar;
