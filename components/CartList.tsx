// CartList.tsx - Display and manage cart items
'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function CartList() {
  const [buying, setBuying] = useState(false);
  const [buyMsg, setBuyMsg] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  // Get current user id for order association
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data?.user?.id || null);
    };
    getUser();
  }, []);
  const updateQuantity = (id: string, delta: number) => {
    const newCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setTotal(newCart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0));
  };
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartData);
    setTotal(cartData.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0));
  }, []);

  const handleRemove = (id: string) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setTotal(newCart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0));
  };

  return (
  <div className="max-w-2xl mx-auto mt-10 p-6 bg-[#FFFDF6] rounded-2xl shadow-lg border border-yellow-100">
    <h2 className="text-2xl font-extrabold mb-6 text-yellow-700 text-center">Your Cart</h2>
    {cart.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <>
        <ul className="space-y-4">
          {cart.map(item => (
            <li key={item.id} className="bg-white border border-yellow-100 p-4 rounded-xl flex justify-between items-center shadow">
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-yellow-700 font-bold">${item.price}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    className="bg-yellow-200 hover:bg-yellow-300 text-yellow-900 px-2 py-1 rounded-full font-bold"
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold">{item.quantity}</span>
                  <button
                    className="bg-yellow-200 hover:bg-yellow-300 text-yellow-900 px-2 py-1 rounded-full font-bold"
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg shadow transition-colors duration-200"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-right font-extrabold text-xl text-yellow-700">
          Total: ${total.toFixed(2)}
        </div>
        <button
          className="mt-8 w-full bg-honey hover:bg-bee text-brown py-3 rounded-xl font-bold shadow-honey border-2 border-honey-dark text-xl transition-colors duration-200"
          disabled={buying}
          onClick={async () => {
            setBuying(true);
            setBuyMsg('');
            try {
              if (!userId) {
                setBuyMsg('You must be logged in to place an order.');
                setBuying(false);
                return;
              }
              // 1. Insert order
              const { data: orderData, error: orderError } = await supabase.from('orders').insert({
                user_id: userId,
                total_price: total,
                // status: 'placed', // default
                created_at: new Date().toISOString(),
              }).select('id');
              if (orderError || !orderData || !orderData[0]?.id) {
                setBuyMsg('Error placing order. Please try again.');
                setBuying(false);
                return;
              }
              const orderId = orderData[0].id;
              // 2. Insert order_items
              const orderItems = cart.map(item => ({
                order_id: orderId,
                product_id: item.id,
                quantity: item.quantity,
                price: item.price,
              }));
              const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
              if (itemsError) {
                setBuyMsg('Error saving order items. Please try again.');
                setBuying(false);
                return;
              }
              localStorage.removeItem('cart');
              setCart([]);
              setTotal(0);
              setBuyMsg('Thank you for your purchase! Your order has been placed.');
            } catch {
              setBuyMsg('Error placing order. Please try again.');
            }
            setBuying(false);
          }}
        >
          {buying ? 'Processing...' : 'Buy Now'}
        </button>
        {buyMsg && <div className="mt-4 text-center text-lg font-bold text-honey-dark">{buyMsg}</div>}
      </>
    )}
  </div>
  );
}
