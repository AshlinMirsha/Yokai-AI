import { useState } from 'react';
import { supabase } from './lib/supabase';

/* Clean Purple Cat Face Logo (SVG with transparent background) */
function CatLogoIcon({ className = 'h-10 w-10' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ears */}
      <path d="M 22 42 L 10 18 L 38 28 Z" fill="#9d7cfd" stroke="#2e2a42" strokeWidth="4" strokeLinejoin="round" />
      <path d="M 78 42 L 90 18 L 62 28 Z" fill="#9d7cfd" stroke="#2e2a42" strokeWidth="4" strokeLinejoin="round" />
      <path d="M 23 38 L 16 23 L 34 30 Z" fill="#f472b6" />
      <path d="M 77 38 L 84 23 L 66 30 Z" fill="#f472b6" />
      {/* Head */}
      <ellipse cx="50" cy="56" rx="42" ry="34" fill="#a78bfa" stroke="#2e2a42" strokeWidth="4" />
      {/* Eyes */}
      <ellipse cx="36" cy="50" rx="4.5" ry="6" fill="#2e2a42" />
      <ellipse cx="64" cy="50" rx="4.5" ry="6" fill="#2e2a42" />
      <circle cx="34.5" cy="48.5" r="1.5" fill="#ffffff" />
      <circle cx="62.5" cy="48.5" r="1.5" fill="#ffffff" />
      {/* Nose & Smile */}
      <polygon points="50,58 46,55 54,55" fill="#f472b6" />
      <path d="M 44 62 Q 50 67 50 62 Q 50 67 56 62" stroke="#2e2a42" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <circle cx="27" cy="58" r="5" fill="#f472b6" opacity="0.6" />
      <circle cx="73" cy="58" r="5" fill="#f472b6" opacity="0.6" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  );
}

function Field({label, placeholder, type = 'text', value, onChange, icon}) {
  return (
    <div className="mb-4 text-left">
      <label className="mb-1.5 block font-hand text-base font-bold text-slate-800">
        {label}
      </label>
      <div className="group relative flex items-center rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-sm focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-400/20 transition-all">
        {icon && <span className="mr-3 shrink-0">{icon}</span>}
        <input
          required
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent font-hand text-lg text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}

function getErrorMessage(error) {
  const message = error?.message?.toLowerCase() || '';
  if (message.includes('invalid login credentials')) return 'Invalid email or password.';
  if (message.includes('already registered') || message.includes('user already')) return 'An account with this email already exists.';
  if (message.includes('password')) return 'Password must be at least 6 characters.';
  if (message.includes('email')) return 'Enter a valid email address.';
  return error?.message || 'Authentication failed. Please try again.';
}

export default function ConnectedAuth({mode, setMode, enter}) {
  const forgot = mode === 'forgot';
  const [form, setForm] = useState({name: '', email: '', password: '', confirmPassword: ''});
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const update = field => event => setForm({...form, [field]: event.target.value});

  const googleSignIn = async () => {
    setMessage('');
    if (!supabase) { setMessage('Connect your Supabase project with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY first.'); return; }
    setBusy(true);
    const {error} = await supabase.auth.signInWithOAuth({provider: 'google', options: {redirectTo: window.location.origin}});
    if (error) { setMessage(getErrorMessage(error)); setBusy(false); }
  };

  const submit = async event => {
    event.preventDefault();
    setMessage('');
    if (!supabase) { setMessage('Connect your Supabase project with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY first.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setMessage('Enter a valid email address.'); return; }
    if (!forgot && form.password.length < 6) { setMessage('Password must be at least 6 characters.'); return; }
    if (mode === 'signup' && form.password !== form.confirmPassword) { setMessage('Passwords do not match.'); return; }
    setBusy(true);
    try {
      let result;
      if (forgot) result = await supabase.auth.resetPasswordForEmail(form.email, {redirectTo: window.location.origin});
      else if (mode === 'signup') result = await supabase.auth.signUp({email: form.email, password: form.password, options: {data: {full_name: form.name}}});
      else result = await supabase.auth.signInWithPassword({email: form.email, password: form.password});
      if (result.error) { setMessage(getErrorMessage(result.error)); return; }
      if (forgot) { setMessage('Check your email for a password reset link.'); return; }
      if (mode === 'signup' && !result.data.session) { setMessage('Check your email to confirm your account.'); return; }
      enter(result.data.session);
    } catch {
      setMessage('Unable to reach Supabase. Check your connection and try again.');
    } finally {
      setBusy(false);
    }
  };

  const modeSwitch = forgot
    ? <button type="button" onClick={() => setMode('signin')} className="font-hand text-base font-bold text-violet-600 hover:underline">← Back to Sign In</button>
    : mode === 'signin'
      ? <>Don’t have an account? <button type="button" onClick={() => setMode('signup')} className="font-hand text-base font-bold text-violet-600 hover:underline font-semibold">Create one →</button></>
      : <>Already have an account? <button type="button" onClick={() => setMode('signin')} className="font-hand text-base font-bold text-violet-600 hover:underline font-semibold">Sign in →</button></>;

  return (
    <div className="cozy-auth-container relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden">
      
      {/* Top Right Window Sticky Note */}
      <div className="absolute top-10 right-14 z-20 hidden lg:block rotate-6">
        <div className="w-20 h-5 bg-amber-200/70 border border-amber-300/60 absolute -top-2.5 left-6 rotate-[-4deg] opacity-80" />
        <div className="rounded-2xl border border-amber-300/90 bg-[#fffbeb] p-4 shadow-sm font-hand text-lg font-bold text-amber-900 text-center leading-tight">
          Small<br />steps<br />Big<br />dreams<br />♡
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2 z-10 py-6">
        
        {/* Left Hero Column: Lo-Fi Desk Artwork Layout */}
        <div className="hidden lg:flex flex-col justify-between min-h-[580px] p-4 relative">
          
          {/* Header Logo */}
          <div className="flex items-center gap-3">
            <CatLogoIcon className="h-11 w-11 shrink-0 filter drop-shadow-sm" />
            <div>
              <h1 className="font-hand text-4xl font-normal text-slate-900 leading-none">
                Yokai <em className="not-italic text-violet-600 font-bold">AI</em>
              </h1>
              <p className="font-hand text-xl text-slate-600 mt-0.5">
                Smarter documents. Happier you. ♡
              </p>
            </div>
          </div>

          {/* Center Content: Workflow Sticky Note & Speech Bubble over Background Cat */}
          <div className="relative my-4 flex items-center justify-center h-64">
            {/* Left Sticky Note Paper */}
            <div className="absolute -left-6 top-2 z-20 rotate-[-4deg]">
              <div className="w-16 h-4 bg-amber-200/70 border border-amber-300/60 absolute -top-2 left-6 rotate-[3deg] opacity-80" />
              <div className="rounded-2xl border border-amber-300/90 bg-[#fffbeb] p-4 shadow-md font-hand text-base text-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <span className="text-violet-600">📄</span> Upload
                </div>
                <div className="text-center text-slate-400 text-xs font-bold">↓</div>
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <span className="text-violet-600">✨</span> Understand
                </div>
                <div className="text-center text-slate-400 text-xs font-bold">↓</div>
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <span className="text-violet-600">✔️</span> Complete
                </div>
              </div>
            </div>

            {/* Speech Bubble floating directly over the cozy-bg painted cat */}
            <div className="absolute top-2 right-8 z-20 rounded-2xl border border-slate-700 bg-white px-4 py-1.5 shadow-sm font-hand text-base font-bold text-slate-800 rotate-3 float-cozy">
              Ready when you are! 💬
              <div className="absolute -bottom-2 left-6 h-3 w-3 rotate-45 border-r border-b border-slate-700 bg-white" />
            </div>
          </div>

          {/* Bottom Left Greeting & Notebook */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-hand text-4xl font-normal text-slate-900">
                Hello, Ashlin! ♡
              </h2>
              <p className="font-hand text-xl text-slate-600 mt-1">
                Your documents, your way.
              </p>
              <div className="w-32 h-1 bg-violet-400/60 rounded-full mt-1 rotate-[-1deg]" />
            </div>

            {/* Bottom Notebook Doodle */}
            <div className="rotate-[-3deg] relative">
              <div className="w-16 h-4 bg-blue-200/70 border border-blue-300/60 absolute -top-2 left-4 rotate-[-2deg] opacity-80" />
              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-md font-hand text-base font-bold text-slate-800 leading-snug text-center">
                Better<br />Reports<br />Brighter<br />Future ♡
              </div>
            </div>
          </div>

        </div>

        {/* Right Auth Glass Paper Card */}
        <div className="mx-auto w-full max-w-md rounded-[32px] border border-white/80 bg-white/90 p-8 sm:p-10 shadow-[0_20px_60px_rgba(100,80,160,0.15)] backdrop-blur-md relative">
          
          <form onSubmit={submit}>
            {/* Mobile Header Logo */}
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <CatLogoIcon className="h-10 w-10 shrink-0" />
              <div>
                <b className="font-hand text-3xl text-slate-900">Yokai <em className="not-italic text-violet-600 font-bold">AI</em></b>
                <small className="block font-hand text-sm text-slate-600">Smarter documents. Happier you. ♡</small>
              </div>
            </div>

            <h2 className="font-hand text-4xl sm:text-5xl font-normal text-slate-900 leading-tight mb-1">
              {forgot ? 'Reset your password' : mode === 'signup' ? 'Create your account' : 'Sign in to Yokai AI'}
            </h2>

            <p className="mb-6 font-hand text-lg text-slate-600">
              {forgot ? 'Enter your email and we’ll send a reset link.' : mode === 'signup' ? 'Start filling documents with AI magic ✨' : 'Continue your document journey ✨'}
            </p>

            {mode === 'signup' && (
              <Field
                label="Full Name"
                placeholder="Your name"
                value={form.name}
                onChange={update('name')}
                icon={<UserIcon />}
              />
            )}

            <Field
              label="Email"
              placeholder="you@example.com"
              type="email"
              value={form.email}
              onChange={update('email')}
              icon={<MailIcon />}
            />

            {!forgot && (
              <>
                <Field
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={form.password}
                  onChange={update('password')}
                  icon={<LockIcon />}
                />

                {mode === 'signup' && (
                  <Field
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    type="password"
                    value={form.confirmPassword}
                    onChange={update('confirmPassword')}
                    icon={<LockIcon />}
                  />
                )}
              </>
            )}

            {!forgot && mode === 'signin' && (
              <div className="-mt-2 mb-5 text-right">
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="font-hand text-base font-semibold text-violet-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {mode === 'signup' && (
              <label className="my-4 flex items-center gap-2 font-hand text-base text-slate-700 cursor-pointer">
                <input type="checkbox" required className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                <span>I agree to Terms & Privacy Policy</span>
              </label>
            )}

            {message && (
              <div className="mb-4 rounded-xl border border-red-300 bg-red-50 p-3 font-hand text-base font-bold text-red-600 text-center shadow-sm">
                {message}
              </div>
            )}

            {/* Solid Vibrant Soft Purple Primary Action Button */}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 font-hand text-xl font-bold text-white shadow-lg shadow-violet-500/25 hover:from-violet-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{busy ? 'Please wait...' : forgot ? 'Send Reset Link →' : mode === 'signup' ? 'Create Account ✨' : 'Sign In → ✨'}</span>
            </button>

            {!forgot && (
              <>
                <div className="my-6 flex items-center gap-3 font-hand text-base text-slate-400">
                  <span className="h-px flex-1 bg-slate-200" />
                  <span>or continue with</span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>

                <button
                  type="button"
                  onClick={googleSignIn}
                  disabled={busy}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 font-hand text-lg font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </button>
              </>
            )}

            <p className="mt-7 text-center font-hand text-lg text-slate-600">
              {modeSwitch}
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
