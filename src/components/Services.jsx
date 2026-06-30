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

const services = [
  { icon: 'monitor',    title: 'Custom Web & Mobile Systems',       desc: 'Full-stack platforms built around your exact workflow — web portals, mobile apps, and admin dashboards.' },
  { icon: 'cog',        title: 'Business Automation Systems',        desc: 'Replace manual approvals, spreadsheets, and WhatsApp processes with clean automated workflows.' },
  { icon: 'academicCap',title: 'School Management Systems',          desc: 'Complete platforms for enrollment, attendance, grades, staff, fees, and parent communication.' },
  { icon: 'package',    title: 'Sales & Stock Systems',              desc: 'Real-time inventory tracking, sales dashboards, and multi-branch stock management.' },
  { icon: 'creditCard', title: 'Loan & Financial Platforms',         desc: 'Secure platforms for loan origination, repayment tracking, client management, and reporting.' },
  { icon: 'layout',     title: 'Website Design & Development',       desc: 'Premium, conversion-focused websites that load fast and represent your brand at the highest level.' },
  { icon: 'share',      title: 'Social Media Management',            desc: 'Consistent content strategy, scheduling, community engagement, and performance analytics.' },
  { icon: 'lightbulb',  title: 'Digital Transformation Consulting',  desc: 'Strategic roadmaps that help businesses move from legacy systems to modern digital infrastructure.' },
];

function ServiceCard({ service }) {
  return (
    <motion.div variants={fadeUp}>
      <TiltCard className="group relative rounded-2xl border border-neutral-100 bg-white p-6 shadow-xs cursor-default overflow-hidden hover:shadow-lift hover:border-neutral-200 transition-all duration-200">
        {/* Top accent line — appears on hover */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-[#0A0A0A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

        {/* Icon */}
        <div className="h-10 w-10 rounded-xl bg-neutral-100 border border-neutral-200 grid place-items-center mb-5 group-hover:bg-[#0A0A0A] group-hover:border-[#0A0A0A] transition-all duration-200">
          <Icon name={service.icon} size={18} className="text-neutral-600 group-hover:text-white transition-colors duration-200" />
        </div>

        <h3 className="text-[14px] font-semibold text-[#0A0A0A] mb-2 tracking-tight leading-tight">{service.title}</h3>
        <p className="text-[12px] text-neutral-500 leading-relaxed">{service.desc}</p>

        {/* Arrow */}
        <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-neutral-400 group-hover:text-[#0A0A0A] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
          Learn more
          <Icon name="arrowRight" size={12} />
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-2xl mb-14"
        >
          <motion.span variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.22em] font-semibold text-neutral-400">
            What We Build
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="mt-4 font-bold tracking-[-0.025em] leading-tight">
            <span className="block text-[2rem] sm:text-[2.6rem] text-neutral-300">
              Touching tomorrow,
            </span>
            <span className="block text-[2rem] sm:text-[2.6rem] text-[#0A0A0A]">
              today.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[15px] text-neutral-500 leading-relaxed max-w-lg">
            Eight capabilities. One partner. Whether you need an internal system, a public platform,
            or digital marketing support — we deliver it end-to-end.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex justify-start"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-3 text-[13px] font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 hover:scale-[1.02] transition-all duration-200"
          >
            Discuss your project
            <Icon name="arrowRight" size={13} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
