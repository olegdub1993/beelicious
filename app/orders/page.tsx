// Orders page - integrates OrderList for buyer order tracking
'use client';
import { useEffect, useState } from 'react';
import OrderList from '../../components/OrderList';
import Navbar from '../../components/Navbar';
import { supabase } from '../../lib/supabaseClient';

export default function OrdersPage() {
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.id) {
        setUserId(data.user.id);
      }
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!userId) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Please log in to view your orders.</div>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
      <OrderList userId={userId} />
    </main>
    </>
  );
}
