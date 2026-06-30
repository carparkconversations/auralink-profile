import Icon from './Icon';

const navLinks = [
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#showcase' },
  { label: 'Process',  href: '#process'  },
  { label: 'Contact',  href: '#contact'  },
];

const services = [
  'Custom Web & Mobile Systems',
  'Business Automation',
  'School Management',
  'Sales & Stock Systems',
  'Loan & Financial Platforms',
  'Social Media Management',
  'Digital Transformation',
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">

      {/* Main footer content */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <div className="inline-block rounded-xl bg-white p-2.5 shadow-xs" style={{ lineHeight: 0 }}>
                <img
                  src="/logo.png"
                  alt="Auralink Systems Limited"
                  className="h-12 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="text-neutral-500 text-[13px] leading-relaxed max-w-xs mb-7">
              Zambia's trusted partner for custom digital systems — from internal platforms to
              full-scale business applications. Built to last. Supported long-term.
            </p>
            <div className="flex items-center gap-2.5">
              <a
                href="mailto:info@auralinksystems.org"
                className="h-9 w-9 rounded-full border border-neutral-800 grid place-items-center text-neutral-500 hover:border-neutral-600 hover:text-white transition-all"
              >
                <Icon name="mail" size={14} />
              </a>
              <a
                href="tel:+260973924433"
                className="h-9 w-9 rounded-full border border-neutral-800 grid place-items-center text-neutral-500 hover:border-neutral-600 hover:text-white transition-all"
              >
                <Icon name="phone" size={14} />
              </a>
              <a
                href="https://wa.me/260973924433?text=Hello%20Auralink%2C%20I%20want%20to%20book%20a%20consultation."
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-full border border-neutral-800 grid place-items-center text-neutral-500 hover:border-neutral-600 hover:text-white transition-all"
              >
                <Icon name="message" size={14} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-600 mb-4">Navigation</div>
            <ul className="space-y-2.5">
              {navLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-[13px] text-neutral-500 hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-600 mb-4">Services</div>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <a href="#services" className="text-[13px] text-neutral-500 hover:text-white transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* CTA strip */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <div className="text-[16px] font-semibold text-white mb-1">Ready to build your system?</div>
            <div className="text-[13px] text-neutral-500">Book a free consultation today — no commitment.</div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 shrink-0 rounded-full bg-white px-6 py-3 text-[13px] font-semibold text-[#0A0A0A] hover:bg-neutral-100 hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            Book Consultation
            <Icon name="arrowRight" size={13} className="text-[#0A0A0A]" />
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[12px] text-neutral-600">
            &copy; {new Date().getFullYear()} Auralink Systems Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-neutral-600">
            <Icon name="mapPin" size={11} className="text-neutral-700" />
            Lusaka, Zambia
          </div>
        </div>
      </div>

    </footer>
  );
}
