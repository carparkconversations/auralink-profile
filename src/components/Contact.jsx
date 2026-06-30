import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import officeImg    from '../assets/img/office.webp';
import officeMobile from '../assets/img/office-mobile.webp';
import Icon from './Icon';
import { fadeUp, stagger, cn } from '../utils';

const info = [
  { icon: 'mail',    label: 'Email us',     value: 'info@auralinksystems.org',  href: 'mailto:info@auralinksystems.org?subject=Consultation%20Request&body=Hi%20Auralink%2C%20I%27d%20like%20to%20book%20a%20consultation.' },
  { icon: 'phone',   label: 'Call us',      value: '+260 973 924 433',           href: 'tel:+260973924433' },
  { icon: 'mapPin',  label: 'Find us',      value: 'Lusaka, Zambia',             href: null },
  { icon: 'message', label: 'Chat with us', value: 'WhatsApp +260 973 924 433',  href: 'https://wa.me/260973924433?text=Hello%20Auralink%2C%20I%20want%20to%20book%20a%20consultation.' },
];

export default function Contact() {
  // Form state — Supabase submission logic preserved exactly
  const [leadName,    setLeadName]    = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [submitting,  setSubmitting]  = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // submitLead — logic preserved exactly
  async function submitLead() {
    setSubmitting(true);
    setSubmitStatus({ type: '', message: '' });
    const payload = {
      name:    leadName.trim(),
      company: leadCompany.trim() || null,
      contact: leadContact.trim(),
      message: leadMessage.trim(),
      source:  'company-profile',
    };
    if (!payload.name || !payload.contact || !payload.message) {
      setSubmitStatus({ type: 'error', message: 'Please enter your name, contact, and message.' });
      setSubmitting(false);
      return;
    }
    try {
      const { error } = await supabase.from('leads').insert([payload]);
      if (error) throw error;
      setSubmitStatus({ type: 'success', message: "Sent — we'll get back to you within 24 hours." });
      setLeadName(''); setLeadCompany(''); setLeadContact(''); setLeadMessage('');
    } catch (err) {
      console.error(err);
      setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = `w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-[14px]
    text-[#0A0A0A] placeholder:text-neutral-400
    outline-none focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-100
    transition-all duration-200`;

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-white overflow-hidden">

      {/* Faint dot grid */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-xl mb-14"
        >
          <motion.span variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.22em] font-semibold text-neutral-400">
            Get in Touch
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="mt-4 font-bold tracking-[-0.025em] leading-tight">
            <span className="block text-[2rem] sm:text-[2.6rem] text-neutral-300">
              Let's build something
            </span>
            <span className="block text-[2rem] sm:text-[2.6rem] text-[#0A0A0A]">
              great.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[15px] text-neutral-500 leading-relaxed">
            Book a free consultation and we'll map the right system solution for your
            organization — no commitment, no jargon.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {/* Office photo */}
            <motion.div
              variants={fadeUp}
              className="relative rounded-2xl overflow-hidden shadow-lift border border-neutral-200 mb-6"
            >
              <picture>
                <source media="(max-width: 640px)" srcSet={officeMobile} type="image/webp" />
                <source srcSet={officeImg} type="image/webp" />
                <img
                  src={officeImg}
                  alt="Our team ready to help you"
                  className="w-full object-cover object-top"
                  style={{ height: 220, filter: 'grayscale(10%)' }}
                  loading="lazy"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-white font-semibold text-[14px]">Ready to transform your operations?</div>
                <div className="text-neutral-300 text-[11px] mt-0.5">Reach out — our first call is free.</div>
              </div>
            </motion.div>

            {/* Quick email CTA */}
            <motion.a
              variants={fadeUp}
              href="mailto:info@auralinksystems.org?subject=Consultation%20Request&body=Hi%20Auralink%2C%20I%27d%20like%20to%20book%20a%20consultation."
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs hover:shadow-lift hover:border-neutral-300 transition-all duration-200 mb-5 group"
            >
              <div className="h-11 w-11 rounded-2xl bg-[#0A0A0A] grid place-items-center shrink-0">
                <Icon name="mail" size={18} className="text-white" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#0A0A0A] group-hover:text-neutral-600 transition-colors">
                  Email a consultation request
                </div>
                <div className="text-[12px] text-neutral-400 mt-0.5">info@auralinksystems.org</div>
              </div>
              <Icon name="arrowRight" size={15} className="text-neutral-300 group-hover:text-neutral-500 ml-auto transition-colors" />
            </motion.a>

            {/* Contact info cards */}
            <motion.div variants={stagger} className="space-y-2.5">
              {info.map(item => (
                <motion.div key={item.label} variants={fadeUp}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="flex items-center gap-4 rounded-xl border border-neutral-100 bg-neutral-50 p-4 hover:border-neutral-200 hover:bg-white transition-all duration-200 group"
                    >
                      <div className="h-9 w-9 rounded-xl bg-white border border-neutral-200 grid place-items-center shrink-0 group-hover:bg-[#0A0A0A] group-hover:border-[#0A0A0A] transition-all duration-200">
                        <Icon name={item.icon} size={15} className="text-neutral-500 group-hover:text-white transition-colors duration-200" />
                      </div>
                      <div>
                        <div className="text-[11px] text-neutral-400 font-medium">{item.label}</div>
                        <div className="text-[13px] font-semibold text-[#0A0A0A]">{item.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-xl border border-neutral-100 bg-neutral-50 p-4">
                      <div className="h-9 w-9 rounded-xl bg-white border border-neutral-200 grid place-items-center shrink-0">
                        <Icon name={item.icon} size={15} className="text-neutral-500" />
                      </div>
                      <div>
                        <div className="text-[11px] text-neutral-400 font-medium">{item.label}</div>
                        <div className="text-[13px] font-semibold text-[#0A0A0A]">{item.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Trust note */}
            <motion.div variants={fadeUp} className="mt-5 rounded-xl bg-neutral-50 border border-neutral-100 p-4">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-[#0A0A0A] grid place-items-center shrink-0">
                  <Icon name="check" size={10} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="text-[12px] font-semibold text-[#0A0A0A]">No sales pressure</span>
              </div>
              <p className="mt-1.5 text-[12px] text-neutral-500 leading-relaxed pl-7">
                Our first call is purely to understand your needs. We'll tell you honestly if we're the right fit.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: contact form (Supabase logic untouched) */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-neutral-200 bg-white p-7 sm:p-8 shadow-lift"
          >
            <div className="text-[16px] font-semibold text-[#0A0A0A] mb-1">Quick inquiry form</div>
            <p className="text-[13px] text-neutral-500 mb-7">Fill this in and we'll reach out within 24 hours.</p>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5">
                    Your name *
                  </label>
                  <input
                    value={leadName}
                    onChange={e => setLeadName(e.target.value)}
                    placeholder="Full name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5">
                    Organization
                  </label>
                  <input
                    value={leadCompany}
                    onChange={e => setLeadCompany(e.target.value)}
                    placeholder="Company name"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5">
                  Phone / Email *
                </label>
                <input
                  value={leadContact}
                  onChange={e => setLeadContact(e.target.value)}
                  placeholder="How should we reach you?"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5">
                  What do you need? *
                </label>
                <textarea
                  rows={4}
                  value={leadMessage}
                  onChange={e => setLeadMessage(e.target.value)}
                  placeholder="Describe what you're looking to build (e.g. school system, sales dashboard, custom portal...)"
                  className={cn(inputClass, 'resize-none')}
                />
              </div>

              {submitStatus.message && (
                <div className={cn(
                  'rounded-xl border px-4 py-3.5 text-[13px] font-medium',
                  submitStatus.type === 'success'
                    ? 'border-neutral-200 bg-neutral-50 text-[#0A0A0A]'
                    : 'border-red-200 bg-red-50 text-red-700'
                )}>
                  {submitStatus.message}
                </div>
              )}

              <motion.button
                type="button"
                disabled={submitting}
                onClick={submitLead}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.97 }}
                className="w-full rounded-full bg-[#0A0A0A] py-4 text-[15px] font-semibold text-white hover:bg-neutral-800 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending...' : 'Send Inquiry'}
              </motion.button>

              <p className="text-center text-[11px] text-neutral-400">
                Or email us directly at{' '}
                <a href="mailto:info@auralinksystems.org" className="text-[#0A0A0A] hover:underline font-medium">
                  info@auralinksystems.org
                </a>
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
