import { motion } from 'framer-motion';
import Icon from './Icon';
import { fadeUp, stagger } from '../utils';

const steps = [
  {
    number: '01',
    title: 'Consultation',
    desc: 'We listen deeply. We map your operations, understand your bottlenecks, and define what a great solution looks like for your team.',
    icon: 'message',
  },
  {
    number: '02',
    title: 'Planning & Design',
    desc: 'We architect the solution with precision — user flows, data structures, interface design, and technical planning before a line of code is written.',
    icon: 'layout',
  },
  {
    number: '03',
    title: 'Development',
    desc: 'We build with modern, secure technology. You get progress updates, demos, and the ability to provide feedback throughout the entire process.',
    icon: 'monitor',
  },
  {
    number: '04',
    title: 'Deployment & Support',
    desc: "We launch your system, train your team, and stay with you. Ongoing support, feature additions, and performance monitoring — we don't disappear.",
    icon: 'zap',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden">

      {/* Very subtle noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }}
      />
      {/* Faint dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-xl mb-20"
        >
          <motion.span variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.22em] font-semibold text-neutral-500">
            How We Work
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="mt-4 font-bold tracking-[-0.025em] leading-tight">
            <span className="block text-[2rem] sm:text-[2.8rem] text-neutral-500">
              A process built for
            </span>
            <span className="block text-[2rem] sm:text-[2.8rem] text-white">
              clarity.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[15px] text-neutral-400 leading-relaxed">
            No surprises. No disappearing acts. Just a clear, structured journey from idea to live system.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-12 left-0 right-0 hidden lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-px bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-700 mx-16 origin-left"
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative"
          >
            {steps.map((step) => (
              <motion.div key={step.title} variants={fadeUp} className="group">

                {/* Step number bubble */}
                <div className="relative flex justify-center lg:justify-start mb-8">
                  <div className="relative h-24 w-24 rounded-2xl bg-neutral-900 border border-neutral-700 grid place-items-center group-hover:bg-neutral-800 group-hover:border-neutral-600 transition-all duration-300">
                    <Icon name={step.icon} size={26} className="text-white" strokeWidth={1.6} />
                    <div className="absolute -top-2.5 -right-2.5 h-7 w-7 rounded-full bg-white grid place-items-center shadow-xs">
                      <span className="text-[10px] font-bold text-[#0A0A0A]">{step.number}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-[16px] font-semibold text-white mb-2.5 tracking-tight text-center lg:text-left">
                  {step.title}
                </h3>
                <p className="text-[13px] text-neutral-400 leading-relaxed text-center lg:text-left">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20"
        >
          <div className="inline-flex items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 px-6 py-4">
            <div className="h-8 w-8 rounded-xl bg-neutral-800 grid place-items-center">
              <Icon name="zap" size={15} className="text-neutral-300" />
            </div>
            <span className="text-[13px] text-neutral-400">
              Most projects go from consultation to launch in{' '}
              <span className="font-semibold text-white">4–10 weeks.</span>
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
