import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const items = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  heading: `Headline for project ${i + 1}`,
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  tags: ['Fintech', 'AI', 'DeFi', 'SaaS'].slice(0, (i % 4) + 1),
  image: `https://picsum.photos/seed/${i + 1}/1600/900`
}));

const FullscreenPanel = ({ item }) => {
  return (
    <div className="relative h-screen w-full snap-start shrink-0">
      <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 h-full flex">
        <div className="flex-1 flex items-end md:items-center p-6 md:p-12">
          <div className="max-w-2xl text-white">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">{item.title}</h2>
            <h3 className="text-2xl md:text-3xl text-white/90 mb-4">{item.heading}</h3>
            <p className="text-white/80 max-w-xl">{item.text}</p>
          </div>
        </div>
        <div className="w-56 hidden md:flex items-center justify-center p-6">
          <div className="flex flex-wrap gap-2 items-start">
            {item.tags.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/10 text-xs">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollGallery = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();

  // Ensure snapping to full panels only
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      const panelHeight = window.innerHeight;
      const target = Math.round((el.scrollTop + direction * panelHeight) / panelHeight) * panelHeight;
      controls.start({ scrollTop: target, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } });
    };

    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        onWheel({ preventDefault: () => {}, deltaY: 1 });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        onWheel({ preventDefault: () => {}, deltaY: -1 });
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, [controls]);

  return (
    <motion.div
      ref={containerRef}
      animate={controls}
      className="h-[calc(100vh-4rem)] w-full overflow-y-scroll snap-y snap-mandatory"
      style={{ scrollBehavior: 'auto' }}
    >
      {items.map((item) => (
        <FullscreenPanel key={item.id} item={item} />
      ))}
    </motion.div>
  );
};

export default ScrollGallery;
