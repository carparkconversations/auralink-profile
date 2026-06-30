import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Nav               from './components/Nav';
import Hero              from './components/Hero';
import About             from './components/About';
import Services          from './components/Services';
import Process           from './components/Process';
import FeatureShowcase   from './components/FeatureShowcase';
import WhyAuralink       from './components/WhyAuralink';
import Contact           from './components/Contact';
import Footer            from './components/Footer';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 35 });

  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    const isLg = window.matchMedia('(min-width: 1024px)').matches;
    if (!isLg) return;

    let frame;
    const handler = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        dot.style.left    = `${e.clientX}px`;
        dot.style.top     = `${e.clientY}px`;
        dot.style.opacity = '1';
      });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handler);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden bg-[#FAFAFA]">

      {/* Scroll progress bar — thin near-black line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[999] origin-left pointer-events-none bg-[#0A0A0A]"
        style={{ scaleX }}
      />

      {/* Small cursor dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[201] h-2 w-2 rounded-full opacity-0 -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A]"
        style={{
          transition: 'left 0.04s linear, top 0.04s linear',
          willChange: 'left, top',
        }}
      />

      <Nav />

      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <FeatureShowcase />
        <WhyAuralink />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
