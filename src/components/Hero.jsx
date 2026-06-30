import { motion, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import abstractImg from '../assets/img/abstract.webp';
import Icon from './Icon';
import { fadeUp, stagger } from '../utils';

function CountUp({ target = 99.9, decimals = 1 }) {
  const ref = useRef(null);
  useEffect(() => {
    const controls = animate(0, target, {
      duration: 2.2,
      delay: 0.8,
      ease: 'easeOut',
      onUpdate(v) {
        if (ref.current) ref.current.textContent = v.toFixed(decimals);
      },
    });
    return controls.stop;
  }, [target, decimals]);
  return <span ref={ref}>0.0</span>;
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">

      {/* Background — off-white + very faint blue/teal radial blobs */}
      <div className="absolute inset-0 -z-10 bg-[#FAFAFA]" />
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(37,99,235,0.05) 0%, transparent 65%), radial-gradient(ellipse 55% 45% at 85% 55%, rgba(20,184,166,0.04) 0%, transparent 65%)',
        }}
      />
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 w-full py-20 sm:py-28">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 xl:gap-20 items-center">

          {/* ── Left: headline + CTAs ── */}
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-xl">

            {/* Eyebrow frosted pill */}
            <motion.div variants={fadeUp}>
              <span
                className="inline-flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.14em]"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
                </span>
                Zambia's Premier Digital Systems Partner
              </span>
            </motion.div>

            {/* Headline — two-tone: grey + near-black */}
            <motion.h1
              variants={fadeUp}
              className="mt-7 font-bold tracking-[-0.03em] leading-[1.02]"
            >
              <span className="block text-[2.6rem] sm:text-[3.8rem] lg:text-[3.2rem] xl:text-[4rem] text-neutral-300">
                We Build
              </span>
              <span className="block text-[2.6rem] sm:text-[3.8rem] lg:text-[3.2rem] xl:text-[4rem] text-[#0A0A0A]">
                Intelligent
              </span>
              <span className="block text-[2.6rem] sm:text-[3.8rem] lg:text-[3.2rem] xl:text-[4rem] text-[#0A0A0A]">
                Digital{' '}
                <span className="text-neutral-300">Systems</span>
              </span>
            </motion.h1>

            {/* Subline */}
            <motion.p variants={fadeUp} className="mt-5 text-[15px] text-neutral-500 leading-relaxed max-w-md">
              We design and develop powerful digital systems that help businesses across
              Zambia operate smarter, move faster, and scale with confidence.
            </motion.p>

            {/* Frosted capability pills */}
            <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-2">
              {['Custom-Built', 'Post-Launch Support', 'Africa-Ready'].map(tag => (
                <span
                  key={tag}
                  className="rounded-full border border-neutral-200 bg-white/70 backdrop-blur-sm px-3.5 py-1 text-[11px] font-medium text-neutral-500 uppercase tracking-[0.1em]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3.5 text-[14px] font-semibold text-white hover:bg-neutral-800 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                Book Consultation
                <Icon name="arrowRight" size={14} />
              </a>
              <a
                href="#showcase"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-3.5 text-[14px] font-semibold text-neutral-700 hover:bg-neutral-50 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                View Our Work
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div variants={fadeUp} className="mt-8 pt-6 border-t border-neutral-100 flex flex-wrap gap-5">
              {[
                ['Custom-Built',  'No off-the-shelf solutions'],
                ['Post-Launch',   'We stay long-term'],
                ['Africa-Ready',  'Built for local context'],
              ].map(([title, sub]) => (
                <div key={title} className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-[#0A0A0A] grid place-items-center shrink-0">
                    <Icon name="check" size={10} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold text-[#0A0A0A]">{title} </span>
                    <span className="text-[11px] text-neutral-400">{sub}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: image + floating stat cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-lift-lg" style={{ height: 490 }}>
              <img
                src={abstractImg}
                alt="Digital systems in use"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                style={{ filter: 'grayscale(15%) brightness(0.97)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating card — top left: uptime */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-7 top-10 bg-white rounded-2xl border border-neutral-200 shadow-lift px-4 py-3.5 min-w-[148px]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wider">Status</span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-slow" />
                  <span className="text-[9px] text-emerald-600 font-bold">Live</span>
                </span>
              </div>
              <div className="text-[1.85rem] font-bold text-[#0A0A0A] leading-none tracking-tight">
                <CountUp target={99.9} decimals={1} />%
              </div>
              <div className="text-[10px] text-neutral-400 mt-0.5 mb-3">Uptime reliability</div>
              <div className="flex items-end gap-0.5 h-7">
                {[55, 72, 48, 85, 60, 92, 68, 88, 58, 96, 74, 90].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-[1px] bg-[#0A0A0A]"
                    style={{ height: `${h}%`, opacity: 0.1 + (h / 100) * 0.65 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Floating card — bottom right: deploy status */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6.2, delay: 1.3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-7 bottom-12 bg-white rounded-2xl border border-neutral-200 shadow-lift px-4 py-3.5 min-w-[164px]"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="h-8 w-8 rounded-xl bg-neutral-100 grid place-items-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#0A0A0A]">System Deployed</div>
                  <div className="text-[9px] text-neutral-400">Lusaka · Production</div>
                </div>
              </div>
              <div className="h-1 rounded-full bg-neutral-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.2, delay: 1 }}
                  className="h-full bg-[#0A0A0A] rounded-full"
                />
              </div>
              <div className="mt-1.5 flex justify-between">
                <span className="text-[9px] text-neutral-400">Build complete</span>
                <span className="text-[9px] text-[#0A0A0A] font-bold">100%</span>
              </div>
            </motion.div>

            {/* Floating badge — top right: powered by */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.5, delay: 0.7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-5 top-7 bg-white rounded-2xl border border-neutral-200 shadow-lift px-4 py-2.5"
            >
              <div className="text-[9px] text-neutral-400 mb-0.5">Powered by</div>
              <div className="text-[12px] font-bold text-[#0A0A0A] tracking-tight">Auralink Systems</div>
              <div className="mt-1.5 flex gap-1">
                {['Web', 'Mobile', 'AI'].map(tag => (
                  <span key={tag} className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neutral-400"
      >
        <span className="text-[10px] uppercase tracking-[0.22em] font-medium">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <Icon name="arrowDown" size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
