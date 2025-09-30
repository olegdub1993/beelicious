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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {!isLogin && (
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        )}
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded font-bold"
          disabled={loading}
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      <button
        className="mt-4 text-blue-500 underline"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
}
