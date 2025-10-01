"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Image from 'next/image';

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
    <header className="w-full bg-white py-4 px-8 flex items-center justify-between ">
      <Link href="/" className="flex items-center gap-2 text-3xl font-bold text-black tracking-tight">
       <Image src="/bee.jpg" alt="Bee Icon" width={40} height={40} unoptimized/>
        <span>BeeLicious</span>
      </Link>
      <nav className="flex items-center gap-6 font-sans">
        <Link href="/cart" className="text-black font-semibold hover:text-honey-dark transition-colors">Cart</Link>
        <Link href="/orders" className="text-black font-semibold hover:text-honey-dark transition-colors">Orders</Link>
        <Link href="/dashboard" className="text-black font-semibold hover:text-honey-dark transition-colors">Dashboard</Link>
        {!user && (
          <Link href="/auth">
            <button className="bg-honey hover:bg-bee text-white px-5 py-2 rounded-xl font-bold shadow-honey transition-colors duration-200 border-2 border-honey-dark">
              Login
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
}
