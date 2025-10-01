// AuthForm.tsx - Registration/Login form using Supabase Auth
'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AuthForm() {
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('buyer');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerifyMsg, setShowVerifyMsg] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (isLogin) {
      // Login
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      if (!error && data?.user) {
        // Fetch role from users table
        const { data: userRow } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single();
        const userRole = userRow?.role;
        if (userRole === 'seller') {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/';
        }
      }
    } else {
      // Register
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      // Insert user profile (name, role) after registration
      if (data?.user) {
        await supabase.from('users').insert({
          id: data.user.id,
          name,
          email,
          role,
        });
      }
      // Show verify email message if registration succeeded
      if (!error) {
        setShowVerifyMsg(true);
      }
    }
    setLoading(false);
  };

  return (
  <div className="max-w-md mx-auto mt-10 p-10 bg-white rounded-2xl shadow-lg ">
    <h2 className="text-3xl font-serif font-extrabold mb-6 text-black text-center flex items-center justify-center gap-2">
      <span className="text-4xl">🐝</span>
      {showForgot ? 'Forgot Password' : isLogin ? 'Login' : 'Register'}
    </h2>
    {showVerifyMsg ? (
      <div className="bg-[#FFFDF6] border-2 border-[#FFD966] rounded-xl p-6 text-center mb-6">
        <h3 className="text-2xl font-bold text-black mb-2">Check your email!</h3>
        <p className="text-lg text-black">We&apos;ve sent a verification link to <span className="font-bold">{email}</span>. Please verify your email address to activate your account.</p>
      </div>
    ) : showForgot ? (
      <>
        <form
          onSubmit={async e => {
            e.preventDefault();
            setForgotMsg('');
            setError('');
            setLoading(true);
            const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
              redirectTo: `${window.location.origin}/auth/reset`,
            });
            setLoading(false);
            if (error) setError(error.message);
            else setForgotMsg('Password reset email sent! Please check your inbox.');
          }}
          className="space-y-6"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={forgotEmail}
            onChange={e => setForgotEmail(e.target.value)}
            className="w-full border-2 border-honey-dark p-3 rounded-xl font-sans text-lg focus:ring-2 focus:ring-honey"
            required
          />
          <button
            type="submit"
            className="w-full bg-honey hover:bg-bee text-black py-3 rounded-xl font-bold shadow-honey border-2 border-honey-dark text-xl transition-colors duration-200"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Send Reset Link'}
          </button>
          {forgotMsg && <p className="text-green-600 text-base font-bold text-center mt-2">{forgotMsg}</p>}
          {error && <p className="text-red-500 text-base font-bold text-center mt-2">{error}</p>}
        </form>
        <button
          className="mt-6 text-black underline text-center block font-bold text-lg hover:text-honey-dark transition-colors"
          onClick={() => { setShowForgot(false); setError(''); setForgotMsg(''); }}
        >
          Back to Login
        </button>
      </>
    ) : (
      <>
        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border-2 border-honey-dark p-3 rounded-xl font-serif text-lg focus:ring-2 focus:ring-honey"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border-2 border-honey-dark p-3 rounded-xl font-sans text-lg focus:ring-2 focus:ring-honey"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border-2 border-honey-dark p-3 rounded-xl font-sans text-lg focus:ring-2 focus:ring-honey"
            required
          />
          {/* {!isLogin && (
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full border-2 border-honey-dark p-3 rounded-xl font-sans text-lg focus:ring-2 focus:ring-honey bg-white"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          )} */}
          <button
            type="submit"
            className="w-full bg-honey hover:bg-bee text-black py-3 rounded-xl font-bold shadow-honey border-2 border-honey-dark text-xl transition-colors duration-200"
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
          </button>
          {error && <p className="text-red-500 text-base font-bold text-center mt-2">{error}</p>}
        </form>
        {isLogin && (
          <button
            className="mt-4 text-black underline text-center block font-bold text-lg hover:text-honey-dark transition-colors"
            onClick={() => { setShowForgot(true); setError(''); setForgotMsg(''); }}
          >
            Forgot password?
          </button>
        )}
        <button
          className="mt-6 text-black underline text-center block font-bold text-lg hover:text-honey-dark transition-colors"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </>
    )}
  </div>
  );
}
