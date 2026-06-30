import { motion } from 'framer-motion';
import { useRef } from 'react';
import Icon from './Icon';
import { fadeUp, stagger } from '../utils';

function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px) scale(1.02)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)';
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: 'transform 0.14s ease-out', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

const points = [
  {
    icon: 'globe',
    title: 'Built for African Businesses',
    desc: 'We understand Zambian and African business contexts — offline scenarios, connectivity limits, and local workflows are built into our thinking.',
  },
  {
    icon: 'zap',
    title: 'Scalable Systems',
    desc: 'Start small, grow big. Our architecture handles teams of 5 or 5,000. Your system evolves without needing a full rebuild.',
  },
  {
    icon: 'layout',
    title: 'Modern UI/UX',
    desc: 'Interfaces your team actually wants to use. Clean, intuitive, fast — built with real user testing and feedback loops.',
  },
  {
    icon: 'shield',
    title: 'Reliable Support',
    desc: "We're not a build-and-vanish agency. Dedicated post-launch support and a team that picks up the phone.",
  },
  {
    icon: 'cog',
    title: 'Custom-Built Solutions',
    desc: 'No off-the-shelf software that almost fits. Every system is architected around your exact workflows and business rules.',
  },
  {
    icon: 'shield',
    title: 'Security First',
    desc: 'Role-based access, encrypted data, audit logs, and compliance-ready architecture — security is never an afterthought.',
  },
];

export default function WhyAuralink() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-xl mb-16"
        >
          <motion.span variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.22em] font-semibold text-neutral-400">
            Why Auralink
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="mt-4 font-bold tracking-[-0.025em] leading-tight">
            <span className="block text-[2rem] sm:text-[2.6rem] text-neutral-300">
              Not just a vendor.
            </span>
            <span className="block text-[2rem] sm:text-[2.6rem] text-[#0A0A0A]">
              A long-term partner.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[15px] text-neutral-500 leading-relaxed">
            Growing organizations in Zambia choose Auralink because we build systems
            that last — and stay with you long after launch.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {points.map((pt, idx) => (
            <motion.div key={`${pt.title}-${idx}`} variants={fadeUp}>
              <TiltCard className="group rounded-2xl border border-neutral-100 bg-[#FAFAFA] p-7 hover:shadow-lift hover:border-neutral-200 hover:bg-white transition-all duration-200">
                <div className="h-10 w-10 rounded-xl bg-white border border-neutral-200 grid place-items-center mb-5 group-hover:bg-[#0A0A0A] group-hover:border-[#0A0A0A] transition-all duration-200">
                  <Icon name={pt.icon} size={18} className="text-neutral-500 group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="text-[14px] font-semibold text-[#0A0A0A] mb-2 tracking-tight">{pt.title}</h3>
                <p className="text-[13px] text-neutral-500 leading-relaxed">{pt.desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-7 py-4 text-[14px] font-semibold text-white hover:bg-neutral-800 hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            Start a conversation
            <Icon name="arrowRight" size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
