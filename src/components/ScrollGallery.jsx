import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const items = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  heading: `Headline for project ${i + 1}`,
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  tags: ['Fintech', 'AI', 'DeFi', 'SaaS', 'Infra', 'Growth', 'Seed', 'Series A'],
  image: `https://picsum.photos/seed/${i + 1}/1600/900`
}));

const TagPills = ({ tags }) => {
  // Break tags into 3 roughly equal rows
  const perRow = Math.ceil(tags.length / 3);
  const rows = [
    tags.slice(0, perRow),
    tags.slice(perRow, perRow * 2),
    tags.slice(perRow * 2)
  ];
  return (
    <div className="flex flex-col gap-2">
      {rows.map((row, idx) => (
        <div key={idx} className="flex flex-wrap gap-2">
          {row.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/10 text-xs">
              {t}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

const FullscreenPanel = ({ item }) => {
  return (
    <div className="relative h-screen w-full snap-start shrink-0">
      <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 h-full flex">
        <div className="flex-1 p-6 md:p-12">
          {/* Content at top-left, not vertically centered */}
          <div className="max-w-2xl text-white">
            <h2 className="text-5xl md:text-7xl font-bold mb-3">{item.title}</h2>
            <h3 className="text-2xl md:text-3xl text-white/90 mb-3">{item.heading}</h3>
            <p className="text-white/80 max-w-xl">{item.text}</p>
          </div>
        </div>
        <div className="w-64 hidden md:block p-6 md:p-12">
          {/* Tags aligned to top-right in three rows */}
          <TagPills tags={item.tags} />
        </div>
      </div>
    </div>
  );
};

const ScrollDots = ({ count, active }) => {
  return (
    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`block h-2 w-2 rounded-full ${i === active ? 'bg-white' : 'bg-white/40'}`}
        />
      ))}
    </div>
  );
};

const ScrollGallery = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [active, setActive] = useState(0);

  // Ensure snapping to full panels only and support wheel/trackpad
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let isAnimating = false;

    const snapTo = (index) => {
      const clamped = Math.max(0, Math.min(items.length - 1, index));
      const target = clamped * window.innerHeight;
      isAnimating = true;
      controls.start({ scrollTop: target, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } }).then(() => {
        isAnimating = false;
        setActive(clamped);
      });
    };

    const onWheel = (e) => {
      e.preventDefault();
      if (isAnimating) return;
      const direction = e.deltaY > 0 ? 1 : -1;
      const currentIndex = Math.round(el.scrollTop / window.innerHeight);
      snapTo(currentIndex + direction);
    };

    const onKey = (e) => {
      const currentIndex = Math.round(el.scrollTop / window.innerHeight);
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        snapTo(currentIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        snapTo(currentIndex - 1);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);

    // Update active on scroll end (manual scrollbar or touch)
    const onScroll = () => {
      const idx = Math.round(el.scrollTop / window.innerHeight);
      setActive(Math.max(0, Math.min(items.length - 1, idx)));
    };
    el.addEventListener('scroll', onScroll);

    return () => {
      el.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      el.removeEventListener('scroll', onScroll);
    };
  }, [controls]);

  return (
    <div className="relative">
      <motion.div
        ref={containerRef}
        animate={controls}
        className="gallery-scroll h-[calc(100vh-4rem)] w-full overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollBehavior: 'auto' }}
      >
        {items.map((item) => (
          <FullscreenPanel key={item.id} item={item} />
        ))}
      </motion.div>
      <ScrollDots count={items.length} active={active} />
    </div>
  );
};

export default ScrollGallery;
