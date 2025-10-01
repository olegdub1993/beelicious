// Checkout page
'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';

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
        <main className="min-h-screen bg-honey-light flex flex-col items-center justify-center">
          <h1 className="text-4xl font-serif font-extrabold mt-10 text-green-600 flex items-center gap-2">
            <span className="text-5xl">✅</span>
            Order Placed!
          </h1>
          <p className="mt-4 text-brown text-lg font-sans">Thank you for your purchase.</p>
        </main>
      );
    }
    if (params.get('canceled')) {
      return (
        <main className="min-h-screen bg-honey-light flex flex-col items-center justify-center">
          <h1 className="text-4xl font-serif font-extrabold mt-10 text-red-600 flex items-center gap-2">
            <span className="text-5xl">❌</span>
            Checkout Canceled
          </h1>
          <p className="mt-4 text-brown text-lg font-sans">You can try again.</p>
        </main>
      );
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-honey-light flex flex-col items-center justify-center pt-12">
        <div className="max-w-xl w-full text-center mb-10">
          <h1 className="text-4xl font-serif font-extrabold text-honey-dark mb-4 tracking-tight flex items-center justify-center gap-2">
            <span className="text-5xl">💳</span>
            Checkout
          </h1>
        </div>
        <button
          className="bg-honey hover:bg-bee text-brown py-3 px-8 rounded-xl font-bold shadow-honey border-2 border-honey-dark text-xl transition-colors duration-200 mt-8"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Redirecting...' : 'Pay with Stripe'}
        </button>
        {error && <p className="text-red-500 text-base font-bold text-center mt-4">{error}</p>}
      </main>
    </>
  );
}
