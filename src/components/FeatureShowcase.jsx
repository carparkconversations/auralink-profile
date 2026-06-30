import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import { fadeUp, stagger } from '../utils';

const tabs = ['Analytics Dashboard', 'School System', 'Inventory & Sales'];

// ── Mock UI panels (pure CSS/Tailwind, no images) — internals unchanged ──────

function DashboardMockup() {
  return (
    <div className="flex gap-0 h-full">
      {/* Sidebar */}
      <div className="w-36 bg-slate-900 p-3 shrink-0 flex flex-col gap-1">
        <div className="mb-4 px-2 py-1">
          <div className="text-[9px] font-black text-white">AURALINK</div>
          <div className="text-[8px] text-slate-500">Analytics Pro</div>
        </div>
        {['Dashboard', 'Analytics', 'Reports', 'Users', 'Settings'].map((item, i) => (
          <div key={item} className={`px-2 py-1.5 rounded-lg text-[9px] font-medium cursor-pointer transition
            ${i === 0 ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
            {item}
          </div>
        ))}
      </div>
      {/* Main */}
      <div className="flex-1 bg-slate-50 p-4 overflow-auto">
        <div className="text-[11px] font-bold text-slate-900 mb-3">Overview — March 2026</div>
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Total Revenue', value: 'K 482K', change: '+12.5%' },
            { label: 'Active Users',  value: '1,247',  change: '+8.3%'  },
            { label: 'Total Orders',  value: '3,821',  change: '+24.1%' },
          ].map(kpi => (
            <div key={kpi.label} className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
              <div className="text-[8px] text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</div>
              <div className="text-sm font-black text-slate-900">{kpi.value}</div>
              <div className="text-[9px] text-emerald-500 font-semibold mt-0.5">{kpi.change}</div>
            </div>
          ))}
        </div>
        {/* Bar chart */}
        <div className="bg-white rounded-xl p-3 border border-slate-100 mb-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
          <div className="text-[9px] font-semibold text-slate-700 mb-2">Monthly Revenue (K)</div>
          <div className="flex items-end gap-1 h-20">
            {[42,58,44,78,52,88,65,82,55,94,71,96].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-[2px]"
                style={{ height: `${h}%`, background: `rgba(99,102,241,${0.22 + (h/100)*0.78})` }} />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {['J','F','M','A','M','J','J','A','S','O','N','D'].map(m => (
              <span key={m} className="flex-1 text-center text-[7px] text-slate-400">{m}</span>
            ))}
          </div>
        </div>
        {/* Recent transactions */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
          <div className="text-[9px] font-semibold text-slate-700 px-3 pt-2.5 pb-2 border-b border-slate-100">Recent Transactions</div>
          {[
            ['Zambia Telecom Ltd',   'K 48,200', 'Paid'],
            ['BancABC Portal',       'K 32,500', 'Pending'],
            ['ZCAS Management',      'K 27,100', 'Paid'],
            ['Lumwana Mining Co.',   'K 19,800', 'Overdue'],
          ].map(([name, amt, status]) => (
            <div key={name} className="flex items-center justify-between px-3 py-2 border-b border-slate-50 last:border-0">
              <span className="text-[8px] font-medium text-slate-700 flex-1">{name}</span>
              <span className="text-[8px] font-bold text-slate-900 mr-3">{amt}</span>
              <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full
                ${status === 'Paid' ? 'bg-emerald-100 text-emerald-600' :
                  status === 'Pending' ? 'bg-amber-100 text-amber-600' :
                  'bg-red-100 text-red-600'}`}>
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SchoolMockup() {
  return (
    <div className="bg-slate-50 h-full p-4 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[11px] font-black text-slate-900">Copperbelt Academy</div>
          <div className="text-[8px] text-slate-400">School Management System · Term 2, 2026</div>
        </div>
        <div className="flex gap-2">
          <div className="bg-brand-100 text-brand-700 text-[8px] font-bold px-2 py-1 rounded-full">+ Add Student</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[['845', 'Students'],['62', 'Teachers'],['34', 'Classes'],['98%', 'Attendance']].map(([n,l]) => (
          <div key={l} className="bg-white rounded-xl p-2 border border-slate-100 text-center shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <div className="text-sm font-black text-slate-900">{n}</div>
            <div className="text-[7px] text-slate-400 mt-0.5">{l}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        <div className="flex text-[8px] font-bold text-slate-500 uppercase tracking-wider px-3 py-2 border-b border-slate-100 bg-slate-50">
          <span className="flex-1">Student Name</span>
          <span className="w-16 text-center">Class</span>
          <span className="w-14 text-center">Grade</span>
          <span className="w-16 text-center">Fees</span>
          <span className="w-14 text-center">Status</span>
        </div>
        {[
          ['Mwansa Banda',       'Grade 12A', 'A',  'Paid',    'Enrolled'],
          ['Chilufya Mutale',    'Grade 11B', 'B+', 'Paid',    'Enrolled'],
          ['Kapembwa Phiri',     'Grade 12A', 'A-', 'Pending', 'Enrolled'],
          ['Natasha Mulenga',    'Grade 10C', 'B',  'Paid',    'Enrolled'],
          ['Bwalya Katongo',     'Grade 11A', 'A+', 'Overdue', 'Enrolled'],
          ['Lumbwe Chipimo',     'Grade 9B',  'B-', 'Paid',    'Enrolled'],
        ].map(([name, cls, grade, fees, status]) => (
          <div key={name} className="flex items-center px-3 py-2 border-b border-slate-50 last:border-0 hover:bg-slate-50">
            <div className="flex-1 text-[8px] font-medium text-slate-800">{name}</div>
            <div className="w-16 text-[8px] text-slate-500 text-center">{cls}</div>
            <div className="w-14 text-center">
              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded
                ${grade.startsWith('A') ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'}`}>
                {grade}
              </span>
            </div>
            <div className="w-16 text-center">
              <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full
                ${fees === 'Paid' ? 'bg-emerald-100 text-emerald-600' :
                  fees === 'Pending' ? 'bg-amber-100 text-amber-600' :
                  'bg-red-100 text-red-600'}`}>
                {fees}
              </span>
            </div>
            <div className="w-14 text-center text-[7px] font-medium text-emerald-600">{status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryMockup() {
  const products = [
    { name: 'Solar Panel 300W', sku: 'SP-300', cat: 'Energy',     stock: 42, max: 100, price: 'K 1,200', status: 'In Stock'     },
    { name: 'Maize Flour 25kg', sku: 'MF-25K', cat: 'Food',       stock: 8,  max: 100, price: 'K 180',   status: 'Low Stock'    },
    { name: 'Cement 50kg Bag',  sku: 'CM-50K', cat: 'Materials',  stock: 0,  max: 80,  price: 'K 95',    status: 'Out of Stock' },
    { name: 'Generator 5KVA',   sku: 'GN-5K',  cat: 'Equipment',  stock: 15, max: 50,  price: 'K 8,500', status: 'In Stock'     },
    { name: 'Office Chair',     sku: 'OC-PRO', cat: 'Furniture',  stock: 22, max: 60,  price: 'K 450',   status: 'In Stock'     },
    { name: 'Diesel 200L',      sku: 'DS-200', cat: 'Fuel',       stock: 5,  max: 200, price: 'K 4,200', status: 'Low Stock'    },
  ];
  return (
    <div className="bg-slate-50 h-full p-4 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[11px] font-black text-slate-900">Inventory Control</div>
          <div className="text-[8px] text-slate-400">Kitwe Distribution Centre · March 2026</div>
        </div>
        <div className="bg-emerald-100 text-emerald-700 text-[8px] font-bold px-2 py-1 rounded-full">+ Add Item</div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[['248', 'Total SKUs','slate'],['14', 'Low Stock','amber'],['3', 'Out of Stock','red']].map(([n,l,c]) => (
          <div key={l} className={`bg-white rounded-xl p-2.5 border shadow-[0_1px_4px_rgba(0,0,0,0.06)]
            ${c === 'amber' ? 'border-amber-200' : c === 'red' ? 'border-red-200' : 'border-slate-100'}`}>
            <div className={`text-sm font-black ${c === 'amber' ? 'text-amber-600' : c === 'red' ? 'text-red-600' : 'text-slate-900'}`}>{n}</div>
            <div className="text-[8px] text-slate-400 mt-0.5">{l}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100 bg-slate-50">
          <span className="flex-1 text-[8px] font-bold text-slate-500 uppercase tracking-wider">Product</span>
          <span className="w-20 text-[8px] font-bold text-slate-500 uppercase tracking-wider">Stock Level</span>
          <span className="w-14 text-[8px] font-bold text-slate-500 uppercase tracking-wider">Price</span>
          <span className="w-16 text-[8px] font-bold text-slate-500 uppercase tracking-wider text-center">Status</span>
        </div>
        {products.map(p => {
          const pct = Math.round((p.stock / p.max) * 100);
          const barColor = p.stock === 0 ? 'bg-red-400' : p.stock / p.max < 0.15 ? 'bg-amber-400' : 'bg-emerald-400';
          const statusColor = p.status === 'In Stock'
            ? 'bg-emerald-100 text-emerald-600'
            : p.status === 'Low Stock'
            ? 'bg-amber-100 text-amber-600'
            : 'bg-red-100 text-red-600';
          return (
            <div key={p.sku} className="flex items-center px-3 py-2.5 border-b border-slate-50 last:border-0 hover:bg-slate-50">
              <div className="flex-1">
                <div className="text-[9px] font-semibold text-slate-800">{p.name}</div>
                <div className="text-[7px] text-slate-400">{p.sku} · {p.cat}</div>
              </div>
              <div className="w-20">
                <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                </div>
                <div className="text-[7px] text-slate-400 mt-0.5">{p.stock}/{p.max} units</div>
              </div>
              <div className="w-14 text-[9px] font-bold text-slate-900">{p.price}</div>
              <div className="w-16 text-center">
                <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${statusColor}`}>
                  {p.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mockups = [<DashboardMockup />, <SchoolMockup />, <InventoryMockup />];

export default function FeatureShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section id="showcase" className="py-24 sm:py-32 bg-[#FAFAFA]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-2xl mb-12"
        >
          <motion.span variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.22em] font-semibold text-neutral-400">
            Systems We Build
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="mt-4 font-bold tracking-[-0.025em] leading-tight">
            <span className="block text-[2rem] sm:text-[2.6rem] text-neutral-300">
              See it in action.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-[15px] text-neutral-500 leading-relaxed">
            Real-world interfaces for the systems we deliver — analytics platforms, school management, and inventory control.
          </motion.p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-start mb-8"
        >
          <div className="inline-flex gap-1 rounded-2xl border border-neutral-200 bg-white p-1.5">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActive(i)}
                className={`relative rounded-xl px-4 py-2 text-[13px] font-semibold transition-all duration-200
                  ${active === i
                    ? 'bg-[#0A0A0A] text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-700'}`}
              >
                {active === i && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-xl bg-[#0A0A0A]"
                    style={{ zIndex: -1 }}
                  />
                )}
                <span className="relative">{tab}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Browser frame */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-neutral-200 shadow-lift-lg overflow-hidden bg-white"
          style={{ height: 460 }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 bg-neutral-100 border-b border-neutral-200 px-4 py-2.5">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-neutral-300" />
              <div className="h-3 w-3 rounded-full bg-neutral-300" />
              <div className="h-3 w-3 rounded-full bg-neutral-300" />
            </div>
            <div className="ml-2 flex-1 max-w-xs bg-white rounded-md h-6 flex items-center px-3 gap-1.5 border border-neutral-200">
              <Icon name="globe" size={10} className="text-neutral-400" />
              <span className="text-[10px] text-neutral-400 truncate">
                app.auralink.systems/{['dashboard','school','inventory'][active]}
              </span>
            </div>
          </div>

          {/* Mockup content */}
          <div className="h-[calc(100%-41px)] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="h-full"
              >
                {mockups[active]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-5 text-[12px] text-neutral-400"
        >
          Live demo interfaces — all data shown is illustrative.{' '}
          <a href="#contact" className="text-[#0A0A0A] font-semibold hover:underline">
            Request a real demo
          </a>
        </motion.p>

      </div>
    </section>
  );
}
