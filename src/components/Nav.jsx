import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import { cn } from '../utils';

const links = [
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#showcase' },
  { label: 'Process',  href: '#process'  },
  { label: 'Contact',  href: '#contact'  },
];

function Logo() {
  return (
    <div
      className="h-8 w-8 rounded-lg overflow-hidden border border-neutral-200 bg-white shadow-xs shrink-0"
      style={{ aspectRatio: '1 / 1' }}
    >
      <img
        src="/logo.png"
        alt="Auralink Systems Limited"
        className="h-full w-full object-contain"
        loading="eager"
      />
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* Floating pill nav */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className={cn(
          'pointer-events-auto flex items-center justify-between gap-4 rounded-full px-4 py-2 w-full max-w-4xl transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-2xl border border-neutral-200 shadow-lift'
            : 'bg-white/80 backdrop-blur-xl border border-neutral-200/70'
        )}>

          {/* Logo + name */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <Logo />
            <div className="leading-tight">
              <div className="text-[13px] font-bold text-[#0A0A0A] tracking-tight">Auralink</div>
              <div className="text-[9px] font-medium text-neutral-400 tracking-wide hidden sm:block">Systems Ltd.</div>
            </div>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-5 flex-1 justify-center">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="text-[13px] font-medium text-neutral-500 hover:text-[#0A0A0A] transition-colors duration-150"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0A] px-4 py-2 text-[12px] font-semibold text-white hover:bg-neutral-800 hover:scale-[1.02] active:scale-95 transition-all duration-200"
            >
              Book Consultation
              <Icon name="arrowRight" size={11} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden h-8 w-8 rounded-full border border-neutral-200 bg-white grid place-items-center text-neutral-600"
            aria-label="Toggle menu"
          >
            <Icon name={menuOpen ? 'x' : 'menu'} size={14} />
          </button>
        </div>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/15 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed right-0 top-0 z-40 h-full w-[80%] max-w-sm bg-white shadow-lift-lg md:hidden"
            >
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Logo />
                  <div className="leading-tight">
                    <div className="text-[14px] font-bold text-[#0A0A0A] tracking-tight">Auralink</div>
                    <div className="text-[10px] font-medium text-neutral-400 tracking-wide">Systems Limited</div>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="h-8 w-8 rounded-full border border-neutral-200 grid place-items-center text-neutral-500"
                >
                  <Icon name="x" size={14} />
                </button>
              </div>

              <nav className="p-6 space-y-1">
                {links.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-neutral-700 font-medium text-sm hover:bg-neutral-50 hover:text-[#0A0A0A] transition"
                  >
                    {l.label}
                    <Icon name="arrowRight" size={13} className="text-neutral-300" />
                  </motion.a>
                ))}
              </nav>

              <div className="px-6">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-[#0A0A0A] py-3.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
                >
                  Book Consultation
                  <Icon name="arrowRight" size={13} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
