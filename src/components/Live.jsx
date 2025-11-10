import React from 'react';
import Navbar from './Navbar';
import ScrollGallery from './ScrollGallery';

const Live = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-16">
        <ScrollGallery />
      </main>
    </div>
  );
};

export default Live;