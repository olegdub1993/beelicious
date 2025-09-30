// Checkout page
'use client';
import { useState } from 'react';

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
      setError('Your cart is empty.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Checkout failed.');
      }
    } catch (err) {
      setError('Checkout failed.');
    }
    setLoading(false);
  };

  // Show confirmation if redirected from Stripe
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success')) {
      localStorage.removeItem('cart');
      return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mt-10 text-green-600">Order Placed!</h1>
          <p className="mt-4">Thank you for your purchase.</p>
        </main>
      );
    }
    if (params.get('canceled')) {
      return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mt-10 text-red-600">Checkout Canceled</h1>
          <p className="mt-4">You can try again.</p>
        </main>
      );
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mt-10">Checkout</h1>
      <button
        className="bg-yellow-500 text-white py-2 px-6 rounded font-bold mt-8"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? 'Redirecting...' : 'Pay with Stripe'}
      </button>
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </main>
  );
}
