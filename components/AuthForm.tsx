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
  <div className="max-w-md mx-auto mt-10 p-10 bg-honey-light rounded-2xl shadow-honey border-2 border-honey-dark">
  <h2 className="text-3xl font-serif font-extrabold mb-6 text-honey-dark text-center flex items-center justify-center gap-2">
    <span className="text-4xl">🐝</span>
    {isLogin ? 'Login' : 'Register'}
  </h2>
  <form onSubmit={handleSubmit} className="space-y-6">
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
        {!isLogin && (
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full border-2 border-honey-dark p-3 rounded-xl font-sans text-lg focus:ring-2 focus:ring-honey bg-white"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        )}
        <button
          type="submit"
          className="w-full bg-honey hover:bg-bee text-brown py-3 rounded-xl font-bold shadow-honey border-2 border-honey-dark text-xl transition-colors duration-200"
          disabled={loading}
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
        </button>
  {error && <p className="text-red-500 text-base font-bold text-center mt-2">{error}</p>}
      </form>
      <button
        className="mt-6 text-honey-dark underline text-center block font-bold text-lg hover:text-bee transition-colors"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
}
