"use client";
// Navbar component
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    getUser();
  }, []);

  return (
    <header className="w-full bg-yellow-100 py-4 px-6 flex items-center justify-between shadow">
      <Link href="/" className="text-2xl font-bold text-yellow-700">🍯 Honey Marketplace</Link>
      <nav>
        {!user && (
          <Link href="/auth">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold shadow transition-colors duration-200">
              Login
            </button>
          </Link>
        )}
        <div className="flex gap-6">
          <Link href="/cart" className="text-gray-700 font-medium hover:text-yellow-600 transition-colors">Cart</Link>
          <Link href="/orders" className="text-gray-700 font-medium hover:text-yellow-600 transition-colors">Orders</Link>
          <Link href="/dashboard" className="text-gray-700 font-medium hover:text-yellow-600 transition-colors">Seller Dashboard</Link>
        </div>
      </nav>
    </header>
  );
}
