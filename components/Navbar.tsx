"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Image from 'next/image';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
      if (data?.user?.id) {
        const { data: userRow } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single();
        setIsSeller(userRow?.role === 'seller');
      } else {
        setIsSeller(false);
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
    <header className="w-full bg-white py-4 px-8 flex items-center justify-between ">
      <Link href="/" className="flex items-center gap-2 text-3xl font-bold text-black tracking-tight">
        <Image src="/bee.jpg" alt="Bee Icon" width={40} height={40} unoptimized />
        <span>BeeLicious</span>
      </Link>
      <nav className="flex items-center gap-6 font-sans">
        <Link href="/cart" className="text-black font-semibold hover:text-honey-dark transition-colors">Cart</Link>
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
          <button
            onClick={handleLogout}
            className="bg-transparent hover:shadow-md text-black px-5 py-2 rounded-xl font-bold shadow transition-colors duration-200 border-2 border-red-700"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
