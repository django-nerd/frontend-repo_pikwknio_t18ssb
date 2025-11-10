import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="h-16 w-full fixed top-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
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
        <div className="flex items-center gap-6 text-sm">
          <Link to="/live" className="flex items-center gap-2 text-white/90 hover:text-white transition">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>live</span>
          </Link>
          <Link to="/legacy" className="text-white/90 hover:text-white transition">
            legacy
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
