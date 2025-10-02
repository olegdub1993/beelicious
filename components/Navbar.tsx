"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Image from 'next/image';
import type { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [isSeller, setIsSeller] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Sync cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cart-updated', updateCartCount);
    // Polling fallback for navigation and missed events
    const interval = setInterval(updateCartCount, 1000);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cart-updated', updateCartCount);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
      if (data?.user?.id) {
        const { data: userRow } = await supabase
          .from('users')
          .select('role, name')
          .eq('id', data.user.id)
          .single();
        setIsSeller(userRow?.role === 'seller');
        setUserName(userRow?.name || '');
      } else {
        setIsSeller(false);
        setUserName('');
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white py-4 px-8 flex items-center justify-between z-50 shadow-lg transition-all duration-300">
      <Link href="/" className="flex items-center gap-2 text-3xl font-bold text-black tracking-tight">
        <Image src="/bee.jpg" alt="Bee Icon" width={40} height={40} unoptimized />
        <span>BeeLicious</span>
      </Link>
      <nav className="flex items-center gap-6 font-sans">
        <Link href="/cart" className="relative text-black font-semibold hover:text-honey-dark transition-colors flex items-center">
          <Image src="/shopping-cart.png" alt="Cart" width={32} height={32} />
          {cartCount > 0 && (
            <span className="ml-1 inline-block bg-honey text-black font-bold rounded-full px-2 py-0.5 text-xs shadow border-2 border-[#FFD966] animate-bounce">
              {cartCount}
            </span>
          )}
        </Link>
        {user && isSeller && (
          <>
            <Link href="/orders" className="text-black font-semibold hover:text-honey-dark transition-colors">Orders</Link>
            <Link href="/dashboard" className="text-black font-semibold hover:text-honey-dark transition-colors">Dashboard</Link>
          </>
        )}
        {!user ? (
          <Link href="/auth">
            <button  className="bg-transparent hover:shadow-md text-black px-5 py-2 rounded-xl font-bold shadow transition-colors duration-200 border-2 border-red-700">
              Login
            </button>
          </Link>
        ) : (
          <>
            {userName && (
              <span className="text-black font-semibold text-lg">
                Welcome, {userName}!
              </span>
            )}
            <button
              onClick={handleLogout}
              className="bg-transparent hover:shadow-md text-black px-5 py-2 rounded-xl font-bold shadow transition-colors duration-200 border-2 border-red-700"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
