import { motion, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import heroImg    from '../assets/img/hero.webp';
import heroMobile from '../assets/img/hero-mobile.webp';
import Icon from './Icon';
import { fadeUp, stagger, slideLeft, slideRight } from '../utils';

function CountUp({ target, suffix = '', decimals = 0 }) {
  const containerRef = useRef(null);
  const numRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.6 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const controls = animate(0, target, {
      duration: 2,
      ease: 'easeOut',
      onUpdate(v) {
        if (numRef.current) numRef.current.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return controls.stop;
  }, [inView, target, suffix, decimals]);

  return (
    <div ref={containerRef} className="text-[3.2rem] sm:text-[4rem] lg:text-[4.8rem] font-bold tracking-[-0.03em] leading-none text-[#0A0A0A]">
      <span ref={numRef}>0{suffix}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">

      {/* ── Stats Band ── */}
      <div className="bg-white border-y border-neutral-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0"
          >
            {[
              { target: 97,  suffix: '%',    label: 'Client satisfaction rate',  decimals: 0 },
              { target: 50,  suffix: '+',    label: 'Digital systems delivered', decimals: 0 },
              { target: 4,   suffix: ' wks', label: 'Average time to launch',    decimals: 0 },
            ].map(({ target, suffix, label, decimals }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className={`text-center sm:px-10 ${i > 0 ? 'sm:border-l sm:border-neutral-100' : ''}`}
              >
                <CountUp target={target} suffix={suffix} decimals={decimals} />
                <div className="mt-2 text-[13px] text-neutral-400 font-medium">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── About Content ── */}
      <div className="bg-[#FAFAFA] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">

          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="max-w-2xl mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-neutral-400">
                About Auralink
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-bold tracking-[-0.025em] leading-tight"
            >
              <span className="block text-[2rem] sm:text-[2.6rem] text-neutral-300">
                Africa-ready technology,
              </span>
              <span className="block text-[2rem] sm:text-[2.6rem] text-[#0A0A0A]">
                built for real businesses.
              </span>
            </motion.h2>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

            {/* Left: story */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={slideLeft}
            >
              <p className="text-[15px] text-neutral-500 leading-relaxed mb-5">
                Auralink Systems Limited was built with one mission: to give Zambian and African
                businesses access to world-class digital systems without the complexity or cost
                of offshore solutions.
              </p>
              <p className="text-[15px] text-neutral-500 leading-relaxed mb-5">
                We've seen too many organizations running on WhatsApp groups, spreadsheets, and
                paper trails when they could have clean, secure, and scalable digital platforms
                doing the heavy lifting.
              </p>
              <p className="text-[15px] text-neutral-500 leading-relaxed mb-10">
                From school management systems to financial platforms and workflow automation —
                we build systems that don't just look good. They run organizations better.
              </p>

              {/* Value pillars */}
              <div className="space-y-4">
                {[
                  { icon: 'monitor', title: 'Custom-Built Systems',        desc: 'Architected around your exact workflows — not adapted from a generic template.'     },
                  { icon: 'shield',  title: 'Security & Reliability',      desc: 'Role-based access, encrypted data, and audit-ready infrastructure by default.'       },
                  { icon: 'globe',   title: 'Built for African Businesses', desc: 'Designed for local realities: connectivity, local context, and practical scale.'     },
                ].map(p => (
                  <div key={p.title} className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-xl bg-neutral-100 border border-neutral-200 grid place-items-center shrink-0 mt-0.5">
                      <Icon name={p.icon} size={16} className="text-neutral-600" />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-[#0A0A0A]">{p.title}</div>
                      <div className="text-[12px] text-neutral-500 leading-relaxed">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pill tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {['Custom Systems', 'Scalable Architecture', 'Security First', 'African Context', 'Post-Launch Support'].map(tag => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-[11px] font-medium text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: team photo */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={slideRight}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lift-lg border border-neutral-200">
                <picture>
                  <source media="(max-width: 640px)" srcSet={heroMobile} type="image/webp" />
                  <source srcSet={heroImg} type="image/webp" />
                  <img
                    src={heroImg}
                    alt="Auralink team collaborating on digital systems"
                    className="w-full object-cover"
                    style={{ height: 460, filter: 'grayscale(12%)' }}
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-white font-semibold text-[14px] leading-tight">Our team, your systems.</div>
                  <div className="text-neutral-300 text-[12px] mt-0.5">
                    Real professionals building real solutions for Zambian businesses.
                  </div>
                </div>
              </div>

              {/* Floating accent */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 rounded-2xl border border-neutral-200 bg-white shadow-lift px-4 py-3 hidden sm:block"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-neutral-100 grid place-items-center">
                    <Icon name="check" size={13} className="text-[#0A0A0A]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#0A0A0A]">No commitment required</div>
                    <div className="text-[10px] text-neutral-400">First call is always free</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
