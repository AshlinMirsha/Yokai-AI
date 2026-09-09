import { useState } from 'react';
import { supabase } from './lib/supabase';

function Mascot({small = false}) {
  return (
    <div className={`mascot ${small ? 'small' : ''}`}>
      <i className="horn left-1"/>
      <i className="horn right-1"/>
      <b className="eye left-2.5"/>
      <b className="eye right-2.5"/>
      <span className="smile"/>
    </div>
  );
}

function Glass({children, className = ''}) {
  return <section className={`glass ${className}`}>{children}</section>;
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
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  );
}

function Button({children, className = '', disabled = false}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-violet-600/25 transition-all duration-200 hover:from-violet-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-violet-600/35 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

function Field({label, placeholder, type = 'text', value, onChange, icon}) {
  return (
    <div className="mb-5">
      <label className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-700">
        {label}
      </label>
      <div className="group relative flex items-center rounded-xl border border-slate-200/90 bg-white/70 px-4 py-3 shadow-xs backdrop-blur-sm transition-all duration-200 focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-500/10 hover:border-slate-300">
        {icon && <span className="mr-3 text-slate-400 transition-colors group-focus-within:text-violet-600">{icon}</span>}
        <input
          required
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400"
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
    ? <button type="button" onClick={() => setMode('signin')} className="font-semibold text-violet-600 hover:text-violet-700 hover:underline">← Back to Sign In</button>
    : mode === 'signin'
      ? <>Don’t have an account? <button type="button" onClick={() => setMode('signup')} className="font-semibold text-violet-600 hover:text-violet-700 hover:underline">Create one →</button></>
      : <>Already have an account? <button type="button" onClick={() => setMode('signin')} className="font-semibold text-violet-600 hover:text-violet-700 hover:underline">Sign in →</button></>;

  return (
    <div className="flex min-h-screen items-center justify-center p-6 sm:p-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Left Hero Column */}
        <div className="hidden text-center lg:block">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-violet-400/30 to-indigo-400/30 blur-xl animate-pulse"/>
            <Mascot />
          </div>
          
          <h1 className="font-hand text-5xl sm:text-6xl font-normal leading-tight text-slate-800">
            {forgot ? 'Forgot your password?' : mode === 'signup' ? (
              <>Let’s create your <span className="text-violet-600 font-sans font-bold">Yokai</span> space! ✨</>
            ) : (
              <>Welcome back to <span className="text-violet-600 font-sans font-bold">Yokai AI</span> 👋</>
            )}
          </h1>
          
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-600">
            {forgot ? 'No worries. Yokai will help you get back in safely. ✨' : mode === 'signup' ? 'One intelligent workspace for all your technical documents, templates, and AI edits.' : 'Your technical lab experiments, papers, and structured reports stay 100% format-safe.'}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/60 px-4 py-2.5 shadow-xs backdrop-blur-md">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-100 text-xs font-bold text-violet-700">📄</span>
              <span className="text-xs font-semibold text-slate-700">100% DOCX Layout Safe</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/60 px-4 py-2.5 shadow-xs backdrop-blur-md">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-700">⚡</span>
              <span className="text-xs font-semibold text-slate-700">Run-Level Mutation</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/60 px-4 py-2.5 shadow-xs backdrop-blur-md">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-700">🤖</span>
              <span className="text-xs font-semibold text-slate-700">3-Tier AI Resilience</span>
            </div>
          </div>
        </div>
        
        {/* Right Auth Glass Card */}
        <Glass className="mx-auto w-full max-w-md rounded-[32px] border border-white/90 p-8 shadow-2xl shadow-violet-900/10 backdrop-blur-2xl sm:p-10">
          <form onSubmit={submit}>
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <Mascot small/>
              <b className="font-hand text-3xl text-slate-800">Yokai <em className="not-italic text-violet-600">AI</em></b>
            </div>
            
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-100/70 px-3.5 py-1.5 text-[10px] font-bold text-violet-700 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-600"></span>
              </span>
              <span className="uppercase tracking-widest">YOUR DOCUMENT ASSISTANT</span>
            </div>

            <h2 className="font-hand text-4xl sm:text-5xl font-normal text-slate-900 leading-tight mb-2">
              {forgot ? 'Reset your password' : mode === 'signup' ? 'Create your account' : (
                <>Sign in to <span className="font-sans font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Yokai AI</span></>
              )}
            </h2>

            <p className="mb-7 text-sm leading-relaxed text-slate-500">
              {forgot ? 'Enter your email and we’ll send a reset link.' : mode === 'signup' ? 'Start filling documents with AI magic.' : 'Continue your document journey with intelligent formatting. ✨'}
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
              <div className="-mt-2 mb-6 text-right">
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-xs font-medium text-violet-600 hover:text-violet-700 hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}
            
            {mode === 'signup' && (
              <label className="my-4 flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" required className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                <span>I agree to the Terms of Service and Privacy Policy</span>
              </label>
            )}
            
            {message && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-xs font-medium text-red-600 shadow-xs">
                {message}
              </div>
            )}
            
            <Button disabled={busy} className="mt-1">
              {busy ? 'Please wait...' : forgot ? 'Send Reset Link →' : mode === 'signup' ? 'Create Account ✨' : 'Sign In →'}
            </Button>
            
            {!forgot && (
              <>
                <div className="my-6 flex items-center gap-3 text-xs font-medium text-slate-400">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-slate-300"/>
                  <span>or continue with</span>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-300 to-slate-300"/>
                </div>
                
                <button
                  type="button"
                  onClick={googleSignIn}
                  disabled={busy}
                  className="relative flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200/90 bg-white/80 py-3.5 px-4 text-sm font-medium text-slate-700 shadow-xs backdrop-blur-sm transition-all duration-200 hover:bg-white hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                >
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </button>
              </>
            )}
            
            <p className="mt-8 text-center text-xs text-slate-500">
              {modeSwitch}
            </p>
          </form>
        </Glass>
      </div>
    </div>
  );
}

