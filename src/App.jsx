import { useEffect, useRef, useState } from "react";
import { supabase } from "./supabaseClient";

// ✅ Local images (WebP)
import heroImg from "./assets/img/hero.webp";
import abstractImg from "./assets/img/abstract.webp";
import officeImg from "./assets/img/office.webp";

// ✅ Mobile WebP versions
import heroImgMobile from "./assets/img/hero-mobile.webp";
import abstractImgMobile from "./assets/img/abstract-mobile.webp";
import officeImgMobile from "./assets/img/office-mobile.webp";

// ✅ HERO matte background image (fallback JPG)
import heroBg from "./assets/img/hero-bg.jpg";

/** -----------------------
 * utils
------------------------ */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** -----------------------
 * tiny scroll reveal hook
------------------------ */
function useInView(options = { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);

    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return { ref, inView };
}

/** -----------------------
 * UI building blocks
------------------------ */
function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-navy to-teal shadow-xl ring-1 ring-white/20 grid place-items-center">
        <span className="text-white font-semibold tracking-tight">A</span>
      </div>
      <div className="leading-tight">
        <div className="font-semibold tracking-tight text-ink">Auralink</div>
        <div className="text-xs text-muted -mt-0.5">Systems Limited</div>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <div className="text-xs uppercase tracking-[0.22em] text-muted">{eyebrow}</div>
      ) : null}
      <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      {desc ? <p className="mt-3 text-muted leading-relaxed">{desc}</p> : null}
    </div>
  );
}

/** premium glass card */
function GlassCard({ children, className = "" }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/20 bg-white/35 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.14)]",
        "ring-1 ring-black/5",
        className
      )}
    >
      {children}
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-line bg-white shadow-soft",
        "transition will-change-transform hover:-translate-y-0.5 hover:shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
}

function IconBox({ children }) {
  return (
    <div className="h-10 w-10 rounded-2xl border border-white/25 bg-white/40 backdrop-blur grid place-items-center text-ink shadow-sm">
      {children}
    </div>
  );
}

function NavLink({ href, children }) {
  return (
    <a href={href} className="text-sm text-muted hover:text-ink transition">
      {children}
    </a>
  );
}

/** ✅ SmartImage: WebP + Mobile WebP + blur-up */
function SmartImage({ src, mobileSrc, alt, className = "", priority = false, width, height }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!loaded && <div className="absolute inset-0 bg-black/10 animate-pulse" />}

      <picture>
        {mobileSrc && (
          <source media="(max-width: 640px)" srcSet={mobileSrc} type="image/webp" />
        )}

        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          fetchpriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={cn(
            "h-full w-full object-cover transition duration-700",
            loaded ? "opacity-100 blur-0" : "opacity-0 blur-xl"
          )}
        />
      </picture>
    </div>
  );
}

/** simple accordion */
function AccordionItem({ title, desc }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className={cn(
        "w-full text-left rounded-3xl border border-line bg-white p-4 shadow-soft",
        "transition hover:-translate-y-0.5 hover:shadow-card"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-medium text-ink">{title}</div>
          <div
            className={cn(
              "mt-1 text-sm text-muted leading-relaxed transition-all",
              open ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            )}
          >
            {desc}
          </div>
        </div>
        <div className="mt-0.5 h-10 w-10 rounded-2xl border border-line bg-paper grid place-items-center text-ink">
          {open ? "−" : "+"}
        </div>
      </div>
    </button>
  );
}

function Reveal({ children, className = "" }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={cn(
        "transition duration-700 will-change-transform",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      {children}
    </div>
  );
}

function MobileMenu({ open, onClose }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 md:hidden transition",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-ink/20 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute right-0 top-0 h-full w-[86%] max-w-sm bg-paper/70 border-l border-line shadow-card",
          "backdrop-blur-xl transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-5 border-b border-line bg-paper/50 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <LogoMark />
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-2xl border border-line bg-white/70 backdrop-blur shadow-soft"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-5 space-y-3">
          {[
            ["About", "#about"],
            ["Services", "#services"],
            ["Solutions", "#solutions"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={onClose}
              className="block rounded-2xl border border-line bg-white/70 backdrop-blur px-4 py-3 text-ink shadow-soft"
            >
              {label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={onClose}
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-card hover:opacity-95 transition"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </div>
  );
}

/** -----------------------
 * APP
------------------------ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Quick inquiry form state + submission
  const [leadName, setLeadName] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [leadMessage, setLeadMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  async function submitLead() {
    setSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    const payload = {
      name: leadName.trim(),
      company: leadCompany.trim() || null,
      contact: leadContact.trim(),
      message: leadMessage.trim(),
      source: "company-profile",
    };

    if (!payload.name || !payload.contact || !payload.message) {
      setSubmitStatus({
        type: "error",
        message: "Please enter your name, contact, and message.",
      });
      setSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from("leads").insert([payload]);
      if (error) throw error;

      setSubmitStatus({
        type: "success",
        message: "Sent ✅ We’ll get back to you shortly.",
      });

      setLeadName("");
      setLeadCompany("");
      setLeadContact("");
      setLeadMessage("");
    } catch (err) {
      console.error(err);
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const images = {
    hero: heroImg,
    heroMobile: heroImgMobile,
    abstract: abstractImg,
    abstractMobile: abstractImgMobile,
    office: officeImg,
    officeMobile: officeImgMobile,
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* PREMIUM ATMOSPHERE BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-paper to-paper" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-navy/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-44 -left-40 h-[520px] w-[520px] rounded-full bg-teal/12 blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-[-10rem] h-[520px] w-[520px] rounded-full bg-navy/8 blur-3xl animate-[pulse_12s_ease-in-out_infinite]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* NAV */}
      <header className="sticky top-0 z-30 border-b border-line/70 bg-paper/55 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between gap-3">
            <LogoMark />

            <nav className="hidden md:flex items-center gap-6">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#solutions">Solutions</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-ink px-4 py-2 text-sm font-medium text-white shadow-soft hover:opacity-95 active:opacity-90 transition"
              >
                Book a Consultation
              </a>

              <button
                className="md:hidden h-10 w-10 rounded-2xl border border-line bg-white/70 backdrop-blur shadow-soft"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="relative overflow-hidden">
          {/* HERO BACKGROUND + MATTE */}
          <div className="absolute inset-0 -z-10">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet={new URL("./assets/img/hero-bg-mobile.webp", import.meta.url).href}
                type="image/webp"
              />
              <source
                srcSet={new URL("./assets/img/hero-bg.webp", import.meta.url).href}
                type="image/webp"
              />
              <img
                src={heroBg}
                alt="Auralink technology background"
                className="h-full w-full object-cover object-center"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </picture>

            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-paper" />
            <div className="absolute inset-0 backdrop-blur-[1px]" />
          </div>

          {/* HERO CONTENT */}
          <div className="relative z-10 mx-auto max-w-6xl px-4 pt-10 sm:pt-16 pb-10">
            <div className="grid items-center gap-4 md:gap-8 md:grid-cols-2">
              {/* IMAGE + TEXT INSIDE IMAGE + RLS/REALTIME/SCALABLE */}
              <Reveal className="order-1 md:order-2">
                <GlassCard className="overflow-hidden">
                  <div className="relative h-60 sm:h-72">
                    <SmartImage
                      src={images.hero}
                      mobileSrc={images.heroMobile}
                      alt="African professionals collaborating"
                      priority
                      width={1400}
                      height={900}
                      className="h-full w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/25 p-4 shadow-soft">
                        <div className="text-sm font-medium text-ink">
                          Welcome to Auralink Systems
                        </div>
                        <div className="mt-1 text-xs text-muted leading-relaxed">
                          We help organizations simplify how work gets done, replacing manual processes with secure,easy-to-use digital systems built for everyday operations.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        ["RLS", "Role security"],
                        ["Real-time", "Live updates"],
                        ["Scalable", "Grows cleanly"],
                      ].map(([k, v]) => (
                        <div
                          key={k}
                          className="rounded-3xl border border-white/20 bg-white/35 backdrop-blur-xl p-4"
                        >
                          <div className="text-base sm:text-lg font-semibold text-ink">{k}</div>
                          <div className="text-[11px] sm:text-xs text-muted">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>

                {/* ✅ ONLY CTA UNDER HERO (About button removed) */}
                <div className="mt-4">
                  <a
                    href="#contact"
                    className="inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-card hover:opacity-95 transition"
                  >
                    Book a Consultation
                  </a>
                </div>
              </Reveal>

              {/* ✅ HERO TEXT PANEL REMOVED (to match your new structure) */}
              <div className="hidden md:block order-2 md:order-1" />
            </div>
          </div>
        </section>

        {/* ABOUT (comes immediately after CTA) */}
        <section id="about" className="mx-auto max-w-6xl px-4 py-4">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <Reveal>
              <SectionTitle
                eyebrow="About"
                title="Built for organizations that want operational clarity."
                desc="We focus on practical systems that reduce friction in daily work, turning scattered processes into clean, trackable workflows."
              />
            </Reveal>

            <Reveal>
              <GlassCard className="p-6">
                <div className="text-xs uppercase tracking-[0.22em] text-muted">Our Promise</div>
                <div className="mt-3 text-ink font-semibold tracking-tight text-xl">
                  We don’t just build software, we improve how work gets done.
                </div>
                <p className="mt-3 text-muted leading-relaxed">
                  Our solutions are designed for real teams, real constraints, and real operational
                  needs, with security and scalability as defaults.
                </p>
              </GlassCard>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [
                "Vision",
                "To be a trusted partner in building modern, intelligent systems that power efficient organizations across Africa.",
              ],
              [
                "Mission",
                "To design and deliver secure digital solutions that streamline operations, improve accountability, and unlock data-driven decision-making.",
              ],
              [
                "Values",
                "Clarity • Security • Craft • Alignment • business goals first, technology as the enabler.",
              ],
            ].map(([t, d]) => (
              <Reveal key={t}>
                <GlassCard className="p-6">
                  <div className="text-lg font-semibold tracking-tight text-ink">{t}</div>
                  <p className="mt-2 text-muted leading-relaxed">{d}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-6xl px-4 py-14">
          <Reveal>
            <SectionTitle
              eyebrow="Core Services"
              title="What we do"
              desc="We build internal systems that digitize workflows, improve visibility, and scale with your organization."
            />
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Internal Systems & Portals",
                desc: "Custom internal platforms that centralize work and reduce dependency on scattered tools.",
                bullets: ["Staff portals", "Operations dashboards", "Approval workflows"],
                icon: "⌁",
              },
              {
                title: "Workflow Digitization & Automation",
                desc: "We convert manual or WhatsApp-driven processes into trackable digital workflows.",
                bullets: ["Requests & approvals", "Tracking pipelines", "Digital registers"],
                icon: "↻",
              },
              {
                title: "Dashboards & Operational Reporting",
                desc: "Real-time reporting that helps management see what’s happening across teams and branches.",
                bullets: ["KPIs & trends", "Operational summaries", "Audit-friendly logs"],
                icon: "▦",
              },
              {
                title: "Secure System Design & Integration",
                desc: "Security-first systems with role-based access control and integration-ready architecture.",
                bullets: ["Access controls (RLS)", "Head office vs branch roles", "Scalable foundations"],
                icon: "⛉",
              },
            ].map((s) => (
              <Reveal key={s.title}>
                <GlassCard className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xl font-semibold tracking-tight text-ink">{s.title}</div>
                      <p className="mt-2 text-muted leading-relaxed">{s.desc}</p>
                    </div>
                    <IconBox>{s.icon}</IconBox>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                        <span className="text-muted">{b}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SOLUTIONS */}
        <section id="solutions" className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <Reveal>
                <SectionTitle
                  eyebrow="Solutions"
                  title="Systems we build"
                  desc="Tap to expand each item — quick to scan, detailed when you need it."
                />
              </Reveal>

              <div className="mt-6 grid gap-3">
                {[
                  [
                    "Ticketing & Issue Tracking",
                    "Track issues, requests, and tasks from start to resolution with clear ownership, priorities, and timelines so nothing falls through the cracks.",
                  ],
                  [
                    "Multi-Branch Dashboards",
                    "Give head office real-time visibility across branches, while allowing each branch to manage its own day-to-day operations.",
                  ],
                  [
                    "Client Portals",
                    "Provide clients or staff with a single place to submit requests, upload documents, track progress, and communicate without endless emails or WhatsApp messages.",
                  ],
                  [
                    "Approval Workflows",
                    "Digitize approvals so requests move smoothly through the right people, with clear status updates and a full record of who approved what and when.",
                  ],
                  [
                    "Inventory & Sales Tracking",
                    "Monitor stock levels, sales activity, and branch performance in one system — helping management make informed decisions using accurate data.",
                  ],
                ].map(([t, d]) => (
                  <Reveal key={t}>
                    <AccordionItem title={t} desc={d} />
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal>
              <GlassCard className="overflow-hidden">
                <div className="relative h-64 sm:h-72">
                  <SmartImage
                    src={images.abstract}
                    mobileSrc={images.abstractMobile}
                    alt="Technology background"
                    width={1400}
                    height={900}
                    className="h-full w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="text-xl font-semibold tracking-tight text-ink">
                    Modern architecture. Clean delivery.
                  </div>
                  <p className="mt-2 text-muted leading-relaxed">
                    Clear roles, secure access, and scalable data structures, so your platform grows
                    with your organization.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full border border-line bg-white/70 px-3 py-1 text-xs text-ink shadow-sm">
                      Role-Based Access
                    </span>
                    <span className="inline-flex items-center rounded-full border border-line bg-white/70 px-3 py-1 text-xs text-ink shadow-sm">
                      Audit Trails
                    </span>
                    <span className="inline-flex items-center rounded-full border border-line bg-white/70 px-3 py-1 text-xs text-ink shadow-sm">
                      Multi-Branch
                    </span>
                    <span className="inline-flex items-center rounded-full border border-line bg-white/70 px-3 py-1 text-xs text-ink shadow-sm">
                      Real-time
                    </span>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        {/* WHY */}
        <section className="mx-auto max-w-6xl px-4 py-14">
          <Reveal>
            <GlassCard className="overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-7 sm:p-8">
                  <div className="text-xs uppercase tracking-[0.22em] text-muted">Why Auralink</div>
                  <div className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
                    Premium delivery. Practical outcomes. Secure foundations.
                  </div>
                  <p className="mt-3 text-muted leading-relaxed">
                    Systems that match real workflows, run fast, and scale cleanly — with
                    accountability built-in.
                  </p>

                  <div className="mt-6 grid gap-3">
                    {[
                      ["Business-first thinking", "We map workflows before we code."],
                      ["Security-first design", "Access control and audit logs by default."],
                      ["Scalable architecture", "Built to grow across branches and teams."],
                      ["Premium UX + performance", "Fast, modern, and easy to use."],
                    ].map(([t, d]) => (
                      <div
                        key={t}
                        className="rounded-3xl border border-white/20 bg-white/30 backdrop-blur-xl p-4"
                      >
                        <div className="font-medium text-ink">{t}</div>
                        <div className="text-sm text-muted mt-1">{d}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative min-h-[320px]">
                  <SmartImage
                    src={images.office}
                    mobileSrc={images.officeMobile}
                    alt="African professionals collaborating"
                    width={1400}
                    height={900}
                    className="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-paper/70 via-transparent to-transparent" />
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-6xl px-4 pb-16">
          <Reveal>
            <GlassCard className="p-7 sm:p-10">
              <div className="grid gap-8 md:grid-cols-2 items-start">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-muted">Contact</div>
                  <div className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
                    Ready to modernize your operations?
                  </div>
                  <p className="mt-3 text-muted leading-relaxed">
                    Book a consultation and we’ll map your workflow, define roles, and recommend the
                    best solution path.
                  </p>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://wa.me/260973924433?text=Hello%20Auralink%2C%20I%20want%20to%20book%20a%20consultation."
                      className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-card hover:opacity-95 transition"
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp Consultation
                    </a>

                    <a
                      href="mailto:info@auralinksystems.org?subject=Auralink%20Consultation&body=Hi%20Auralink%2C%20I%20want%20to%20book%20a%20consultation."
                      className="inline-flex items-center justify-center rounded-full border border-line bg-white/70 backdrop-blur px-5 py-3 text-sm font-medium text-ink shadow-soft hover:bg-white/85 transition"
                    >
                      Email Us
                    </a>
                  </div>

                  <div className="mt-6 text-sm text-muted space-y-1">
                    <div>
                      <span className="text-ink font-medium">Phone:</span> +260 973 924 433
                    </div>
                    <div>
                      <span className="text-ink font-medium">Email:</span> info@auralinksystems.org
                    </div>
                    <div>
                      <span className="text-ink font-medium">Location:</span> Lusaka, Zambia
                    </div>
                  </div>
                </div>

                <Card className="p-6">
                  <div className="text-sm font-medium text-ink">Quick inquiry</div>
                  <p className="mt-2 text-sm text-muted">Leave your details and we’ll reach out.</p>

                  <div className="mt-4 grid gap-3">
                    <input
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal/30"
                      placeholder="Your name"
                    />
                    <input
                      value={leadCompany}
                      onChange={(e) => setLeadCompany(e.target.value)}
                      className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal/30"
                      placeholder="Company / Organization"
                    />
                    <input
                      value={leadContact}
                      onChange={(e) => setLeadContact(e.target.value)}
                      className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal/30"
                      placeholder="Phone / Email"
                    />
                    <textarea
                      rows="4"
                      value={leadMessage}
                      onChange={(e) => setLeadMessage(e.target.value)}
                      className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal/30"
                      placeholder="What do you want to build? (ticketing system, dashboards, approvals...)"
                    />

                    {submitStatus.message ? (
                      <div
                        className={cn(
                          "rounded-2xl border px-4 py-3 text-sm",
                          submitStatus.type === "success"
                            ? "border-teal/30 bg-teal/10 text-ink"
                            : "border-red-200 bg-red-50 text-ink"
                        )}
                      >
                        {submitStatus.message}
                      </div>
                    ) : null}

                    <button
                      type="button"
                      disabled={submitting}
                      className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-card hover:opacity-95 transition disabled:opacity-60"
                      onClick={submitLead}
                    >
                      {submitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </Card>
              </div>
            </GlassCard>
          </Reveal>

          <footer className="mt-10 text-center text-xs text-muted">
            © {new Date().getFullYear()} Auralink Systems Limited. All rights reserved.
          </footer>
        </section>
      </main>
    </div>
  );
}