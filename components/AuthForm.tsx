// AuthForm.tsx - Registration/Login form using Supabase Auth
'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('buyer');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (isLogin) {
      // Login
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
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
    }
    setLoading(false);
  };

  return (
  <div className="max-w-md mx-auto mt-10 p-8 bg-[#FFFDF6] rounded-2xl shadow-lg border border-yellow-100">
  <h2 className="text-2xl font-extrabold mb-6 text-yellow-700 text-center">{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
      className="w-full border border-yellow-200 p-2 rounded-lg focus:ring-2 focus:ring-yellow-400"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
    className="w-full border border-yellow-200 p-2 rounded-lg focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
    className="w-full border border-yellow-200 p-2 rounded-lg focus:ring-2 focus:ring-yellow-400"
          required
        />
        {!isLogin && (
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
      className="w-full border border-yellow-200 p-2 rounded-lg focus:ring-2 focus:ring-yellow-400"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        )}
        <button
          type="submit"
    className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-lg font-bold shadow transition-colors duration-200"
          disabled={loading}
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      <button
  className="mt-4 text-yellow-700 underline text-center block"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
}
