// app/auth/reset/page.tsx - Password reset page for Supabase
'use client';
import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Navbar from '../../../components/Navbar';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) setError(error.message);
    else setSuccess('Your password has been reset! You can now log in.');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-honey-light flex flex-col items-center justify-center pt-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-honey border-2 border-honey-dark p-10 mx-auto">
          <h1 className="text-3xl font-serif font-extrabold text-honey-dark mb-6 text-center">Reset Password</h1>
          <form onSubmit={handleReset} className="space-y-6">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-2 border-honey-dark p-3 rounded-xl font-sans text-lg focus:ring-2 focus:ring-honey"
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="w-full border-2 border-honey-dark p-3 rounded-xl font-sans text-lg focus:ring-2 focus:ring-honey"
              required
            />
            <button
              type="submit"
              className="w-full bg-honey hover:bg-bee text-brown py-3 rounded-xl font-bold shadow-honey border-2 border-honey-dark text-xl transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Reset Password'}
            </button>
            {error && <p className="text-red-500 text-base font-bold text-center mt-2">{error}</p>}
            {success && <p className="text-green-600 text-base font-bold text-center mt-2">{success}</p>}
          </form>
        </div>
      </main>
    </>
  );
}
