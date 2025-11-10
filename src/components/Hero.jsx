import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/QrI46EbSvyxcmozb/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 pointer-events-none flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <img
            src="https://the-eye.eu/static/eye-logo.png"
            alt="The Eye Logo"
            className="mx-auto h-40 w-40 object-contain opacity-100"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
