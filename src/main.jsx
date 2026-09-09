import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ConnectedAuth from './Auth';
import { supabase } from './lib/supabase';

const nav = [
  ['dashboard', '+ New Chat'],
  ['documents', '▧ My Documents'],
  ['jobs', '◷ Recent Jobs'],
  ['templates', '▣ Templates'],
  ['prompts', '☆ Saved Prompts'],
  ['settings', '⚙ Settings']
];

const jobs = [
  { name: 'Networks_Document.docx', prompt: 'Filled Experiment 5 on ARQ', status: 'Completed', time: '2 min ago' },
  { name: 'DBMS_Lab_Record.docx', prompt: 'Filled Normalization Experiment', status: 'Completed', time: '1 hour ago' },
  { name: 'OS_Document.docx', prompt: 'Filled Scheduling Experiment', status: 'Processing', time: '8 min ago' }
];

const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/* Transparent Vector Cat Logo Badge */
function CatLogoIcon({ className = 'h-9 w-9' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 22 42 L 10 18 L 38 28 Z" fill="#9d7cfd" stroke="#2e2a42" strokeWidth="4" strokeLinejoin="round" />
      <path d="M 78 42 L 90 18 L 62 28 Z" fill="#9d7cfd" stroke="#2e2a42" strokeWidth="4" strokeLinejoin="round" />
      <path d="M 23 38 L 16 23 L 34 30 Z" fill="#f472b6" />
      <path d="M 77 38 L 84 23 L 66 30 Z" fill="#f472b6" />
      <ellipse cx="50" cy="56" rx="42" ry="34" fill="#a78bfa" stroke="#2e2a42" strokeWidth="4" />
      <ellipse cx="36" cy="50" rx="4.5" ry="6" fill="#2e2a42" />
      <ellipse cx="64" cy="50" rx="4.5" ry="6" fill="#2e2a42" />
      <circle cx="34.5" cy="48.5" r="1.5" fill="#ffffff" />
      <circle cx="62.5" cy="48.5" r="1.5" fill="#ffffff" />
      <polygon points="50,58 46,55 54,55" fill="#f472b6" />
      <path d="M 44 62 Q 50 67 50 62 Q 50 67 56 62" stroke="#2e2a42" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <circle cx="27" cy="58" r="5" fill="#f472b6" opacity="0.6" />
      <circle cx="73" cy="58" r="5" fill="#f472b6" opacity="0.6" />
    </svg>
  );
}

function Mascot({ small = false, className = '' }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 rounded-2xl bg-violet-200/80 p-1 border border-violet-400 shadow-sm ${small ? 'h-9 w-9' : 'h-12 w-12'} ${className}`}>
      <CatLogoIcon className="h-full w-full" />
    </div>
  );
}

function Glass({ children, className = '' }) {
  return <section className={`glass ${className}`}>{children}</section>;
}

function Button({ children, secondary = false, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`${
        secondary
          ? 'rounded-full border border-slate-300 bg-white/90 px-5 py-2.5 font-hand text-base font-bold text-slate-700 shadow-sm hover:bg-white transition-all cursor-pointer'
          : 'rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 font-hand text-base font-bold text-white shadow-md shadow-violet-500/25 hover:from-violet-700 hover:to-indigo-700 transition-all cursor-pointer'
      } ${className}`}
    >
      {children}
    </button>
  );
}

function Landing({ go }) {
  return (
    <div className="cozy-auth-container landing-shell min-h-screen px-6 py-6 overflow-hidden relative">
      
      {/* Top Left Pinned Sticky Note Doodle */}
      <div className="absolute top-10 left-10 z-20 hidden lg:block -rotate-6">
        <div className="w-16 h-4 bg-amber-200/70 border border-amber-300/60 absolute -top-2 left-6 rotate-[3deg] opacity-80" />
        <div className="rounded-2xl border border-amber-300/90 bg-[#fffbeb] p-3.5 shadow-md font-hand text-base font-bold text-amber-900 text-center leading-tight">
          Better<br />documents<br />Brighter<br />future ♡
        </div>
      </div>

      {/* Top Right Window Pinned Sticky Note Doodle */}
      <div className="absolute top-12 right-12 z-20 hidden lg:block rotate-6">
        <div className="w-16 h-4 bg-amber-200/70 border border-amber-300/60 absolute -top-2 left-6 rotate-[-4deg] opacity-80" />
        <div className="rounded-2xl border border-amber-300/90 bg-[#fffbeb] p-3.5 shadow-md font-hand text-base font-bold text-amber-900 text-center leading-tight">
          Small<br />steps<br />Big<br />dreams ♡
        </div>
      </div>

      {/* Floating Translucent Capsule Top Navigation Bar */}
      <header className="sticky top-4 z-30 mx-auto max-w-5xl rounded-full border border-white/80 bg-white/70 backdrop-blur-md px-6 py-2.5 shadow-sm flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <Mascot small />
          <strong className="font-hand text-3xl font-bold text-slate-900">
            Yokai <em className="not-italic text-violet-600">AI</em>
          </strong>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden items-center gap-7 font-hand text-lg font-bold text-slate-700 md:flex">
          <button onClick={() => scrollTo('how')} className="flex items-center gap-1.5 hover:text-violet-600 transition-colors">
            <span className="text-violet-500">✧</span> How it works
          </button>
          <button onClick={() => scrollTo('showcase')} className="flex items-center gap-1.5 hover:text-violet-600 transition-colors">
            <span className="text-violet-500">📄</span> Showcase
          </button>
          <button onClick={() => scrollTo('plans')} className="flex items-center gap-1.5 hover:text-violet-600 transition-colors">
            <span className="text-amber-500">👑</span> Plans
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => go('auth', 'signin')}
            className="rounded-full border border-slate-300 bg-white/80 px-4 py-1.5 font-hand text-base font-bold text-slate-700 hover:bg-white transition-all cursor-pointer"
          >
            Sign In
          </button>
          <Button onClick={() => go('auth', 'signup')} className="px-5 py-1.5 text-base">
            ✨ Get started
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="mx-auto grid min-h-[calc(100vh-100px)] max-w-6xl items-center gap-10 py-12 lg:grid-cols-2 z-10 relative">
          
          {/* Left Column Text & Pitch */}
          <div className="reveal-up relative">
            <p className="eyebrow font-hand text-base font-bold tracking-wider text-violet-600 uppercase mb-2">
              YOUR DOCUMENT ASSISTANT
            </p>

            <h1 className="font-hand text-6xl sm:text-7xl font-normal leading-[0.95] text-slate-900">
              Your documents.<br />
              <span className="text-violet-600 font-bold relative inline-block">
                Perfected by AI.✨
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-violet-400 opacity-70" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M 0 10 Q 50 18 100 10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-lg font-hand text-2xl leading-relaxed text-slate-600">
              Yokai AI understands your existing Word documents and fills them without breaking their original formatting.
            </p>

            {/* Buttons Row */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button onClick={() => go('auth', 'signup')} className="px-7 py-3 text-lg font-bold">
                ✨ Start Creating →
              </Button>

              <button
                onClick={() => scrollTo('how')}
                className="rounded-full border border-slate-300 bg-white/90 px-6 py-3 font-hand text-lg font-bold text-slate-700 shadow-sm hover:bg-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>📄</span> See How It Works
              </button>
            </div>

            {/* Below Button Arrow Doodle */}
            <div className="mt-6 flex items-center gap-2 font-hand text-lg font-bold text-violet-600 rotate-[-1deg] ml-4">
              <span>⤶</span>
              <span>Your formatting stays intact. ♡</span>
            </div>
          </div>

          {/* Right Column Interactive App Workstation Window */}
          <div className="relative">
            {/* Top Right Doodle Note Pointer */}
            <div className="absolute -top-7 right-8 z-20 font-hand text-base font-bold text-violet-700 rotate-3 flex items-center gap-1">
              <span>Almost there! ♡</span>
              <span>⤦</span>
            </div>

            <div className="rounded-[28px] border border-white/90 bg-white/90 p-6 shadow-2xl backdrop-blur-md relative">
              {/* Window Header Dots */}
              <div className="flex items-center gap-2 mb-4">
                <span className="h-3 w-3 rounded-full bg-slate-300 inline-block" />
                <span className="h-3 w-3 rounded-full bg-slate-300 inline-block" />
                <span className="h-3 w-3 rounded-full bg-slate-300 inline-block" />
              </div>

              {/* Status Header */}
              <div className="flex items-center gap-3 mb-5">
                <Mascot small />
                <div>
                  <b className="font-hand text-2xl font-bold text-slate-900">Yokai is working... ✨</b>
                  <small className="block font-hand text-base text-slate-500">Your document is being processed with care.</small>
                </div>
              </div>

              {/* File Card Container */}
              <div className="rounded-2xl border border-slate-200 bg-violet-50/60 p-4 mb-5 flex items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-9 rounded-lg bg-blue-600 text-white font-bold grid place-items-center text-xs shadow-sm">
                    DOCX
                  </div>
                  <div>
                    <strong className="block font-hand text-lg text-slate-900">Experiment 5.docx</strong>
                    <small className="font-hand text-sm text-slate-500">Network Lab Report</small>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-violet-300 bg-white px-3 py-1 text-xs font-bold text-violet-700 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-violet-500 animate-ping" />
                  <span>Processing...</span>
                </div>
              </div>

              {/* Progress Steps Timeline */}
              <div className="grid grid-cols-4 gap-2 text-center my-6 py-2 border-t border-b border-slate-200/80">
                <div>
                  <div className="mx-auto h-6 w-6 rounded-full bg-emerald-500 text-white font-bold text-xs grid place-items-center mb-1">
                    ✓
                  </div>
                  <span className="font-hand text-xs font-bold text-slate-700 block leading-tight">Analyzing structure</span>
                </div>

                <div>
                  <div className="mx-auto h-6 w-6 rounded-full bg-violet-600 text-white font-bold text-xs grid place-items-center mb-1 animate-pulse">
                    🟣
                  </div>
                  <span className="font-hand text-xs font-bold text-violet-700 block leading-tight">Understanding your content</span>
                </div>

                <div>
                  <div className="mx-auto h-6 w-6 rounded-full border border-slate-300 bg-slate-100 text-slate-400 font-bold text-xs grid place-items-center mb-1">
                    ⚪
                  </div>
                  <span className="font-hand text-xs font-semibold text-slate-400 block leading-tight">Filling missing sections</span>
                </div>

                <div>
                  <div className="mx-auto h-6 w-6 rounded-full border border-slate-300 bg-slate-100 text-slate-400 font-bold text-xs grid place-items-center mb-1">
                    ⚪
                  </div>
                  <span className="font-hand text-xs font-semibold text-slate-400 block leading-tight">Finalizing format</span>
                </div>
              </div>

              {/* Success Banner */}
              <div className="rounded-2xl border border-emerald-300 bg-emerald-50/90 p-3 text-center font-hand text-base font-bold text-emerald-800 shadow-sm flex items-center justify-center gap-2">
                <span className="h-5 w-5 rounded-full bg-emerald-500 text-white grid place-items-center text-xs">✓</span>
                <span>Your original formatting is 100% safe ♡ ✨</span>
              </div>
            </div>
          </div>

        </section>

        {/* Bottom Right Desk Checklist Note Doodle */}
        <div className="absolute bottom-6 right-10 z-20 hidden xl:block rotate-[-3deg]">
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-md font-hand text-base font-bold text-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-700">✓ Understand</div>
            <div className="flex items-center gap-2 text-violet-700">✓ Fill</div>
            <div className="flex items-center gap-2 text-indigo-700">✓ Complete ♡</div>
          </div>
        </div>

        {/* How It Works Section */}
        <section id="how" className="landing-section mx-auto max-w-6xl py-16">
          <p className="eyebrow text-center font-hand text-lg text-violet-600">SMOOTH FROM UPLOAD TO DOWNLOAD</p>
          <h2 className="mx-auto max-w-2xl text-center font-hand text-5xl font-normal text-slate-900">
            A calmer way to finish document work
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {['Upload your DOCX', 'Tell Yokai what to fill', 'Download the finished file'].map((x, i) => (
              <Glass className="p-6 rounded-2xl" key={x}>
                <b className="step-number">{i + 1}</b>
                <h3 className="mt-5 font-hand text-3xl font-normal text-slate-900">{x}</h3>
                <p className="font-hand text-lg leading-relaxed text-slate-600 mt-2">
                  Keep the original layout, headings, tables, and spacing while the content gets completed automatically.
                </p>
              </Glass>
            ))}
          </div>
        </section>

        {/* Showcase Section */}
        <section id="showcase" className="landing-section mx-auto grid max-w-6xl items-center gap-8 py-16 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow font-hand text-lg text-violet-600">FULL-PAGE WORKSPACE</p>
            <h2 className="font-hand text-5xl font-normal text-slate-900">Every page now has room to breathe</h2>
            <p className="mt-4 font-hand text-xl leading-relaxed text-slate-600">
              Dashboards, previews, templates, and job states use richer spacing, soft lo-fi motion, and scroll-friendly layouts so your workspace feels cozy and productive.
            </p>
          </div>
          <Glass className="p-6 rounded-2xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-5">
                <b className="font-hand text-4xl font-bold text-slate-900">12</b>
                <small className="block font-hand text-base text-slate-500">docs processed</small>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-5">
                <b className="font-hand text-4xl font-bold text-slate-900">98%</b>
                <small className="block font-hand text-base text-slate-500">format preserved</small>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 sm:col-span-2">
                <JobList />
              </div>
            </div>
          </Glass>
        </section>

        {/* Plans Section */}
        <section id="plans" className="landing-section mx-auto max-w-6xl pb-20 pt-16">
          <Glass className="p-10 text-center rounded-3xl relative overflow-hidden">
            <div className="flex justify-center mb-3">
              <Mascot />
            </div>
            <h2 className="mt-3 font-hand text-5xl font-normal text-slate-900">
              Ready when your document is.
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-hand text-xl text-slate-600">
              Start with one upload, then keep your prompts, recent jobs, and templates inside the Yokai workspace. ♡
            </p>
            <div className="mt-8 flex justify-center">
              <Button onClick={() => go('auth', 'signup')} className="px-8 py-3 text-xl font-bold">
                Open Yokai AI ✨
              </Button>
            </div>
          </Glass>
        </section>

      </main>
    </div>
  );
}

function Sidebar({ page, setPage, onLogout }) {
  return (
    <aside className="sidebar glass rounded-[28px] p-5 flex flex-col justify-between min-h-[calc(100vh-40px)]">
      <div>
        <div className="mb-7 flex items-center gap-3 px-2">
          <Mascot />
          <div>
            <strong className="font-hand text-3xl font-bold text-slate-900">Yokai <em className="not-italic text-violet-600">AI</em></strong>
            <small className="block font-hand text-xs text-slate-500">Your Document Assistant</small>
          </div>
        </div>

        <nav className="space-y-1.5">
          {nav.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`nav w-full font-hand text-lg font-bold rounded-xl px-4 py-2.5 text-left border transition-all ${
                page === id
                  ? 'bg-violet-200/80 border-violet-400 text-violet-950 font-semibold'
                  : 'border-transparent text-slate-600 hover:bg-white/50 hover:text-slate-900'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-4">
        {/* Usage Box Without Upgrade Plan Button */}
        <div className="rounded-2xl border border-amber-300/80 bg-amber-100/60 p-4 shadow-sm">
          <p className="m-0 font-hand text-sm font-bold text-amber-900">Usage this month</p>
          <b className="font-hand text-4xl font-normal text-slate-900">
            12 <span className="font-sans text-base text-slate-500">/ 50</span>
          </b>
          <small className="block font-hand text-sm text-slate-500">documents processed</small>
          <div className="my-2.5 h-2.5 rounded-full border border-amber-800/40 bg-white overflow-hidden p-0.5">
            <i className="block h-full w-1/4 rounded-full bg-violet-600" />
          </div>
        </div>

        {/* User Profile Info */}
        <button onClick={() => setPage('profile')} className="w-full flex items-center gap-3 border-t border-slate-200 pt-4 text-left">
          <span className="avatar border border-slate-200">AM</span>
          <span className="truncate">
            <b className="block font-hand text-base font-bold text-slate-900 truncate">Ashlin Mirsha</b>
            <small className="font-hand text-xs text-slate-500 truncate block">ashlin@karunya.edu.in</small>
          </span>
        </button>

        <button onClick={onLogout} className="w-full font-hand text-base font-bold text-red-600 hover:underline text-left pt-1">
          ← Sign out
        </button>
      </div>
    </aside>
  );
}

function Rail() {
  return (
    <div className="space-y-4">
      <Glass className="p-5 rounded-2xl">
        <h3 className="section-heading font-hand text-2xl font-bold">How Yokai AI works ✨</h3>
        {['Upload Document', 'Provide Instructions', 'AI Understands', 'Generate & Fill', 'Download'].map((x, i) => (
          <div className="workflow-step flex items-center gap-3 my-2.5" key={x}>
            <b className="step-number">{i + 1}</b>
            <span>
              <strong className="font-hand text-lg font-normal text-slate-900">{x}</strong>
              <small className="block font-hand text-xs text-slate-500">Yokai guides every step.</small>
            </span>
          </div>
        ))}
      </Glass>

      <Glass className="p-5 rounded-2xl">
        <h3 className="section-heading font-hand text-2xl font-bold">Format Guard 🛡️</h3>
        <div className="space-y-2 mt-2">
          {['Tables preserved', 'Headings matched', 'Images aligned', 'Spacing checked'].map(x => (
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/70 px-3 py-2 font-hand text-sm font-bold text-slate-800 shadow-sm" key={x}>
              <span>{x}</span>
              <b className="text-emerald-600">Ready</b>
            </div>
          ))}
        </div>
      </Glass>

      <Glass className="p-5 rounded-2xl">
        <h3 className="section-heading font-hand text-2xl font-bold flex justify-between items-center">
          <span>Recent Jobs</span>
          <button className="font-hand text-sm text-violet-600 font-bold hover:underline">View all</button>
        </h3>
        <JobList />
      </Glass>
    </div>
  );
}

function JobList() {
  return (
    <>
      {jobs.map(j => (
        <div className="job-row flex items-center gap-3 py-2.5 border-b border-slate-200/80 last:border-0" key={j.name}>
          <b className="grid h-8 w-7 shrink-0 place-items-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm">W</b>
          <div className="min-w-0 flex-1">
            <strong className="block truncate font-hand text-base text-slate-900">{j.name}</strong>
            <small className="block truncate font-hand text-xs text-slate-500">{j.prompt}</small>
            <span className={`status ${j.status === 'Processing' ? 'purple' : ''}`}>{j.status}</span>
            <small className="ml-1 font-hand text-xs text-slate-400">{j.time}</small>
          </div>
        </div>
      ))}
    </>
  );
}

function Dashboard({ setPage }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  return (
    <>
      <header className="dashboard-hero mb-6 glass p-6 rounded-3xl">
        <div>
          <p className="eyebrow font-hand text-base text-violet-600 font-bold">COZY WORKSPACE</p>
          <h1 className="font-hand text-5xl font-normal text-slate-900 max-md:text-4xl">Hello, Ashlin! 👋</h1>
          <p className="font-hand text-xl text-slate-600">Let’s fill your document with <span className="magic-text">AI magic</span>. ♡</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Format safe 🛡️', 'DOCX ready 📄', '3 recent jobs ◷'].map(x => (
              <span className="prompt-chip font-hand text-sm font-bold" key={x}>{x}</span>
            ))}
          </div>
        </div>
        <div className="hero-actions">
          <Button onClick={() => setPage('documents')} className="shrink-0">
            + New Job
          </Button>
        </div>
      </header>

      <div className="dashboard-grid">
        <section className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            {[['Documents', '12'], ['Success rate', '98%'], ['Avg. time', '2m']].map(([x, n]) => (
              <Glass className="p-4 text-center rounded-2xl" key={x}>
                <b className="font-hand text-4xl font-bold text-slate-900">{n}</b>
                <small className="block font-hand text-sm font-bold text-slate-500">{x}</small>
              </Glass>
            ))}
          </div>

          <Glass className="p-8 max-md:p-5 rounded-3xl flex items-center gap-6 max-md:flex-col">
            <div className="upload-art">
              <span>DOCX</span>
              <div>↑</div>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-hand text-4xl font-normal text-slate-900">Drop your document here ✨</h2>
              <p className="max-w-2xl font-hand text-lg leading-relaxed text-slate-600 mt-1">
                Upload your existing Word document and Yokai will fill it without breaking the original formatting, tables, headings, and page spacing.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <label className="primary inline-block cursor-pointer rounded-xl px-5 py-2.5 font-hand text-base font-bold text-white shadow-md">
                  Choose File
                  <input type="file" accept=".docx" onChange={e => setFile(e.target.files?.[0])} className="hidden" />
                </label>
                <small className="font-hand text-sm text-slate-500">Maximum file size: 50MB {file && `• ${file.name}`}</small>
              </div>
            </div>
          </Glass>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              <label className="section-label font-hand text-xl font-bold">What should Yokai AI do?</label>
              <Glass className="p-4 rounded-2xl">
                <textarea
                  className="h-32 w-full resize-none bg-transparent font-hand text-lg text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder="Fill Experiment 5 on Stop-and-Wait ARQ protocol..."
                />
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/80 pt-3">
                  <button className="font-hand text-base font-bold text-violet-600 hover:underline">✧ Enhance with AI</button>
                  <div className="flex flex-wrap gap-2">
                    {['Lab record', 'Summary', 'Algorithm'].map(x => (
                      <span className="prompt-chip font-hand text-xs font-bold" key={x}>{x}</span>
                    ))}
                  </div>
                </div>
              </Glass>
            </div>

            <div>
              <label className="section-label font-hand text-xl font-bold">Add images <small className="text-slate-500">(optional)</small></label>
              <label className="image-drop border border-emerald-300 bg-emerald-50/70 p-4 rounded-2xl shadow-sm">
                <span className="text-3xl text-emerald-700">▧</span>
                <span>
                  <b className="block font-hand text-base font-bold text-slate-900">Reference images</b>
                  <small className="font-hand text-xs text-slate-500">Diagrams, charts, screenshots</small>
                </span>
                <input type="file" accept="image/*" className="hidden" />
              </label>

              <Glass className="mt-4 p-4 rounded-2xl">
                <h3 className="font-hand text-2xl font-bold text-slate-900">Quick prompts</h3>
                <div className="mt-3 grid gap-2">
                  {['Complete missing theory', 'Add result section', 'Improve observation table'].map(x => (
                    <button className="quick-prompt font-hand text-sm font-bold" key={x}>{x}</button>
                  ))}
                </div>
              </Glass>
            </div>
          </div>

          <Glass className="p-5 rounded-2xl flex items-center justify-between gap-4 max-md:flex-col max-md:items-start">
            <div>
              <b className="font-hand text-3xl font-normal text-slate-900">Ready to generate?</b>
              <small className="block font-hand text-base text-slate-500">Yokai will preserve formatting before creating your filled DOCX.</small>
            </div>
            <Button onClick={() => file ? setPage('processing') : setMessage('Choose a DOCX file first.')}>
              Generate Document →
            </Button>
          </Glass>
          {message && <Glass className="p-3 font-hand text-base font-bold text-violet-700 text-center rounded-xl">{message}</Glass>}
        </section>

        <Rail />
      </div>
    </>
  );
}

function Special({ page, setPage }) {
  if (page === 'processing') {
    return (
      <div className="mx-auto max-w-2xl py-10">
        <Glass className="p-10 text-center rounded-3xl">
          <div className="flex justify-center">
            <Mascot />
          </div>
          <h1 className="mt-5 font-hand text-5xl font-normal text-slate-900">Yokai is working... ✨</h1>
          <p className="font-hand text-xl text-slate-600 mt-1">Reading your document and understanding its structure.</p>
          <div className="my-8 h-4 rounded-full border border-violet-300 bg-violet-100 p-0.5 overflow-hidden">
            <div className="h-full w-[62%] animate-pulse rounded-full bg-violet-600" />
          </div>
          <div className="space-y-3 text-left font-hand text-lg font-bold text-violet-900 max-w-xs mx-auto">
            <div>✓ Reading document</div>
            <div>✓ Understanding structure</div>
            <div>◌ Generating content</div>
            <div className="text-slate-400">○ Updating document</div>
            <div className="text-slate-400">○ Finalizing</div>
          </div>
          <Button onClick={() => setPage('completed')} className="mt-8">
            Show completed state →
          </Button>
        </Glass>
      </div>
    );
  }

  if (page === 'completed') {
    return (
      <div className="mx-auto max-w-2xl py-10 text-center">
        <Glass className="p-10 rounded-3xl">
          <div className="text-4xl mb-2">✦ ✧ ✦</div>
          <div className="flex justify-center">
            <Mascot />
          </div>
          <h1 className="mt-4 font-hand text-5xl font-normal text-slate-900">Done! 🎉</h1>
          <p className="font-hand text-xl text-slate-600 mt-1">Your document has been updated while keeping its original structure.</p>

          <div className="mx-auto mt-7 flex max-w-md items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm">
            <b className="grid h-10 w-9 place-items-center rounded-lg bg-blue-600 text-white font-bold">W</b>
            <span>
              <strong className="block font-hand text-lg text-slate-900">CN_Document_Record_Filled.docx</strong>
              <small className="font-hand text-sm text-slate-500">2.4 MB • DOCX</small>
            </span>
          </div>

          <div className="mt-7 flex justify-center gap-4">
            <Button secondary onClick={() => setPage('preview')}>Preview</Button>
            <Button>Download ↓</Button>
          </div>
        </Glass>
      </div>
    );
  }

  return (
    <Glass className="max-w-3xl mx-auto p-8 rounded-3xl">
      <h1 className="font-hand text-5xl font-normal text-slate-900">Document Preview</h1>
      <span className="inline-block mt-2 rounded-full border border-emerald-300 bg-emerald-100 px-4 py-1.5 font-hand text-base font-bold text-emerald-800">
        Formatting preserved ✓
      </span>
      <article className="document-page mt-6 rounded-2xl border border-slate-200">
        <h2>Computer Networks Document</h2>
        <h3>Experiment 5: Stop-and-Wait ARQ</h3>
        <p><b>Aim</b><br />To study the Stop-and-Wait Automatic Repeat Request protocol.</p>
        <p className="highlight"><b>Algorithm</b><br />The sender transmits one frame and waits for an acknowledgement.</p>
        <div className="diagram">Diagram section<br /><span>Reference image added here</span></div>
        <p><b>Result</b><br />The protocol was studied successfully.</p>
      </article>
    </Glass>
  );
}

function Collection({ page }) {
  const title = {
    documents: 'My Documents',
    jobs: 'Recent Jobs',
    templates: 'Templates',
    prompts: 'Saved Prompts',
    settings: 'Settings',
    profile: 'User Profile'
  }[page];

  const docs = [
    ['Networks_Document.docx', 'Experiment 5 on ARQ', 'Completed', '2 min ago'],
    ['DBMS_Lab_Record.docx', 'Normalization experiment', 'Completed', '1 hour ago'],
    ['OS_Document.docx', 'Scheduling experiment', 'Processing', '8 min ago'],
    ['Python_Record.docx', 'File handling lab', 'Draft', 'Yesterday'],
    ['Java_Document.docx', 'Inheritance write-up', 'Ready', 'Aug 29'],
    ['CN_Document_Final.docx', 'Stop-and-Wait ARQ', 'Downloaded', 'Aug 26']
  ];

  const templates = ['Computer Networks', 'DBMS', 'Operating Systems', 'Python', 'Java', 'C Programming', 'General Document', 'Mini Project', 'Observation Table'];
  const prompts = ['Fill Document Experiment', 'Create aim and algorithm', 'Write result section', 'Improve observation table', 'Generate viva questions', 'Summarize theory'];

  if (page === 'profile') {
    return (
      <Page title={title} action="Edit Profile">
        <div className="workspace-grid">
          <section className="space-y-5">
            <Glass className="p-7 rounded-2xl flex items-center gap-6">
              <span className="avatar large border border-slate-200">AM</span>
              <div>
                <h2 className="font-hand text-4xl font-normal text-slate-900">Ashlin Mirsha</h2>
                <p className="font-hand text-lg text-slate-500">ashlin@karunya.edu.in</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Student', 'Document Creator', 'Karunya'].map(x => (
                    <span className="prompt-chip font-hand text-xs font-bold" key={x}>{x}</span>
                  ))}
                </div>
              </div>
            </Glass>
            <div className="grid gap-4 sm:grid-cols-3">
              {[['Documents processed', '12'], ['Successful jobs', '10'], ['Saved prompts', '6']].map(([x, n]) => (
                <Glass className="p-4 text-center rounded-2xl" key={x}>
                  <b className="font-hand text-4xl font-bold text-slate-900">{n}</b>
                  <small className="block font-hand text-sm font-bold text-slate-500">{x}</small>
                </Glass>
              ))}
            </div>
            <Glass className="p-5 rounded-2xl">
              <h3 className="section-heading font-hand text-2xl font-bold">Account Activity</h3>
              <JobList />
            </Glass>
          </section>
          <AsidePanel title="Profile Setup" items={['Email verified', 'Storage connected', 'Templates synced', 'Prompt library ready']} />
        </div>
      </Page>
    );
  }

  if (page === 'settings') {
    return (
      <Page title={title} action="Save Changes">
        <div className="workspace-grid">
          <section className="settings-grid gap-5">
            {['Document formatting', 'AI behavior', 'Export defaults', 'Notifications', 'Privacy', 'Workspace theme'].map((x, i) => (
              <Glass className="p-5 rounded-2xl" key={x}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-hand text-2xl font-bold text-slate-900">{x}</h3>
                    <p className="font-hand text-base text-slate-500 leading-relaxed mt-1">
                      {['Preserve spacing, tables, headings, and margins.', 'Control tone, length, and generated detail.', 'Choose DOCX naming and download behavior.', 'Receive updates for completed jobs.', 'Manage account data and document history.', 'Tune contrast, motion, and visual density.'][i]}
                    </p>
                  </div>
                  <span className="toggle"><i /></span>
                </div>
              </Glass>
            ))}
          </section>
          <AsidePanel title="Workspace Health" items={['12 of 50 documents used', '98% format success', '3 active templates', 'All systems ready']} />
        </div>
      </Page>
    );
  }

  if (page === 'templates') {
    return (
      <Page title={title} action="New Template">
        <Toolbar placeholder="Search templates..." />
        <div className="workspace-grid">
          <section className="card-grid gap-5">
            {templates.map((x, i) => (
              <Glass className="p-5 rounded-2xl flex flex-col justify-between" key={x}>
                <div>
                  <div className="template-icon font-hand text-3xl font-bold">✎</div>
                  <h3 className="font-hand text-2xl font-bold text-slate-900 mt-2">{x}</h3>
                  <p className="font-hand text-base text-slate-500 leading-relaxed mt-1">
                    A polished structure with headings, tables, result space, and formatting rules.
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-slate-200/80 pt-3">
                  <span className="status font-hand text-xs font-bold">Ready</span>
                  <button className="font-hand text-sm font-bold text-violet-600 hover:underline">Use Template →</button>
                </div>
              </Glass>
            ))}
          </section>
          <AsidePanel title="Recommended" items={['Computer Networks template', 'Observation table layout', 'Mini project format', 'General Document']} />
        </div>
      </Page>
    );
  }

  if (page === 'prompts') {
    return (
      <Page title={title} action="New Prompt">
        <Toolbar placeholder="Search saved prompts..." />
        <div className="workspace-grid">
          <section className="card-grid gap-5">
            {prompts.map((x, i) => (
              <Glass className="p-5 rounded-2xl flex flex-col justify-between" key={x}>
                <div>
                  <span className="prompt-chip font-hand text-xs font-bold">Prompt {i + 1}</span>
                  <h3 className="mt-3 font-hand text-2xl font-bold text-slate-900">{x}</h3>
                  <p className="font-hand text-base text-slate-500 leading-relaxed mt-1">
                    Reusable instruction block for completing documents while keeping original structure intact.
                  </p>
                </div>
                <div className="mt-5 flex gap-3">
                  <Button secondary className="px-4 py-1.5 text-sm font-bold">Use</Button>
                  <button className="quick-prompt font-hand text-sm font-bold">Edit</button>
                </div>
              </Glass>
            ))}
          </section>
          <AsidePanel title="Prompt Tips" items={['Mention exact experiment number', 'Ask to preserve tables', 'Include output length', 'Attach references when needed']} />
        </div>
      </Page>
    );
  }

  if (page === 'jobs') {
    return (
      <Page title={title} action="Run New Job">
        <Toolbar placeholder="Search jobs..." />
        <div className="workspace-grid">
          <section>
            <Glass className="p-5 rounded-2xl">
              <div className="job-table">
                {docs.slice(0, 5).map(([name, prompt, status, time]) => (
                  <div className="job-table-row" key={name}>
                    <b className="grid h-9 w-8 place-items-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">W</b>
                    <div className="min-w-0">
                      <strong className="block truncate font-hand text-base text-slate-900">{name}</strong>
                      <small className="font-hand text-xs text-slate-500">{prompt}</small>
                    </div>
                    <span className={`status ${status === 'Processing' ? 'purple' : ''}`}>{status}</span>
                    <small className="font-hand text-xs text-slate-400">{time}</small>
                    <button className="font-hand text-sm font-bold text-violet-600 hover:underline">Open</button>
                  </div>
                ))}
              </div>
            </Glass>
          </section>
          <AsidePanel title="Job Queue" items={['1 document processing', '2 downloads ready', 'No failed jobs', 'Format guard enabled']} />
        </div>
      </Page>
    );
  }

  return (
    <Page title={title} action="Upload Document">
      <Toolbar placeholder="Search documents..." />
      <div className="workspace-grid">
        <section>
          <div className="grid gap-4 sm:grid-cols-3">
            {[['All files', '24'], ['Ready', '18'], ['Processing', '1']].map(([x, n]) => (
              <Glass className="p-4 text-center rounded-2xl" key={x}>
                <b className="font-hand text-4xl font-bold text-slate-900">{n}</b>
                <small className="block font-hand text-sm font-bold text-slate-500">{x}</small>
              </Glass>
            ))}
          </div>

          <div className="document-grid mt-5 gap-5">
            {docs.map(([name, prompt, status, time]) => (
              <Glass className="p-5 rounded-2xl" key={name}>
                <div className="mb-4 flex items-start justify-between gap-3">
                  <b className="grid h-10 w-9 place-items-center rounded-lg bg-blue-600 text-white font-bold shadow-sm">W</b>
                  <span className={`status ${status === 'Processing' ? 'purple' : ''}`}>{status}</span>
                </div>
                <h3 className="truncate font-hand text-lg font-bold text-slate-900">{name}</h3>
                <p className="mt-1 font-hand text-sm text-slate-500 truncate">{prompt}</p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-3">
                  <small className="font-hand text-xs text-slate-400">{time}</small>
                  <button className="font-hand text-sm font-bold text-violet-600 hover:underline">Preview</button>
                </div>
              </Glass>
            ))}
          </div>
        </section>
        <AsidePanel title="Storage" items={['24 total files', '142 MB used', '6 saved prompts', 'Cloud sync ready']} />
      </div>
    </Page>
  );
}

function Toolbar({ placeholder }) {
  return (
    <Glass className="mb-5 p-3 flex items-center gap-3 rounded-2xl">
      <input placeholder={placeholder} className="min-w-0 flex-1 bg-transparent px-3 font-hand text-lg text-slate-900 outline-none placeholder:text-slate-400" />
      <button className="secondary rounded-xl px-4 py-1.5 font-hand text-sm font-bold">Filter</button>
      <button className="secondary rounded-xl px-4 py-1.5 font-hand text-sm font-bold">Sort</button>
    </Glass>
  );
}

function AsidePanel({ title, items }) {
  return (
    <aside className="space-y-4">
      <Glass className="p-5 rounded-2xl">
        <h3 className="section-heading font-hand text-2xl font-bold">{title}</h3>
        <div className="space-y-2 mt-2">
          {items.map(x => (
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/70 px-3 py-2 font-hand text-sm font-bold text-slate-800 shadow-sm" key={x}>
              <span>{x}</span>
              <b className="text-violet-600">✓</b>
            </div>
          ))}
        </div>
      </Glass>

      <Glass className="p-5 rounded-2xl">
        <h3 className="font-hand text-2xl font-bold text-slate-900">Quick Actions</h3>
        <div className="mt-3 grid gap-2">
          {['Upload DOCX', 'Use template', 'Open latest', 'Export all'].map(x => (
            <button className="quick-prompt font-hand text-sm font-bold" key={x}>{x}</button>
          ))}
        </div>
      </Glass>
    </aside>
  );
}

function Page({ title, action, children }) {
  return (
    <>
      <header className="page-header mb-6 glass p-6 rounded-3xl">
        <div>
          <p className="eyebrow font-hand text-base text-violet-600 font-bold">YOUR NOTEBOOK</p>
          <h1 className="font-hand text-5xl font-normal text-slate-900">{title}</h1>
          <p className="font-hand text-xl text-slate-600">Manage, reuse, and finish document work from one focused workspace.</p>
        </div>
        {action && <Button className="shrink-0">{action}</Button>}
      </header>
      {children}
    </>
  );
}

function App() {
  const [view, setView] = useState('landing');
  const [auth, setAuth] = useState('signin');
  const [page, setPage] = useState('dashboard');
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const go = (next, mode = auth) => {
    history.pushState({ view: next, auth: mode, page: 'dashboard' }, '', next === 'app' ? '#app' : '#' + next);
    setAuth(mode);
    setView(next);
    if (next === 'app') setPage('dashboard');
  };

  const pageGo = next => {
    history.pushState({ view: 'app', page: next }, '', `#app/${next}`);
    setPage(next);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#app')) {
      setView('app');
      setPage(hash.split('/')[1] || 'dashboard');
    } else if (hash === '#auth') {
      setView('auth');
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    supabase?.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (mounted) {
        setSession(currentSession);
        setAuthLoading(false);
      }
    });

    const subscription = supabase?.auth.onAuthStateChange((_event, currentSession) => {
      if (mounted) {
        setSession(currentSession);
        setAuthLoading(false);
      }
    }).data.subscription;

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (session && view === 'auth') {
      history.replaceState({ view: 'app', page: 'dashboard' }, '', '#app');
      setView('app');
      setPage('dashboard');
    } else if (!session && view === 'app') {
      history.replaceState({ view: 'auth', auth: 'signin' }, '', '#auth');
      setView('auth');
      setAuth('signin');
    }
  }, [authLoading, session, view]);

  const logout = async () => {
    await supabase?.auth.signOut();
    history.replaceState({ view: 'auth', auth: 'signin' }, '', '#auth');
    setView('auth');
    setAuth('signin');
  };

  if (authLoading) return null;

  if (view === 'landing') return <Landing go={go} />;

  if (view === 'auth') {
    return (
      <>
        <button
          onClick={() => go('landing')}
          className="fixed left-6 top-6 z-30 flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-2 font-hand text-base font-bold text-slate-700 shadow-sm hover:bg-white transition-all cursor-pointer"
        >
          ← Back to Home
        </button>
        <ConnectedAuth mode={auth} setMode={setAuth} enter={() => go('app')} />
      </>
    );
  }

  if (!session) return null;

  return (
    <div className="app-shell grid min-h-screen w-full grid-cols-[270px_minmax(0,1fr)] gap-6 p-4 max-lg:grid-cols-[230px_minmax(0,1fr)] max-md:block max-md:p-3">
      <Sidebar page={page} setPage={pageGo} onLogout={logout} />
      <main className="min-w-0 px-2 pb-8 pt-1">
        <button onClick={() => history.back()} className="mb-4 rounded-xl border border-slate-300 bg-white/60 px-3 py-1 font-hand text-base font-bold text-violet-700">
          ← Back
        </button>
        {page === 'dashboard' ? (
          <Dashboard setPage={pageGo} />
        ) : ['processing', 'completed', 'preview'].includes(page) ? (
          <Special page={page} setPage={pageGo} />
        ) : (
          <Collection page={page} />
        )}
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
