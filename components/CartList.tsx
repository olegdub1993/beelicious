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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTotal(newCart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0));
  window.dispatchEvent(new Event('cart-updated'));
  };
  type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  };
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setTotal(cartData.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0));
  }, []);

  const handleRemove = (id: string) => {
    const newCart = cart.filter(item => item.id !== id);
  setCart(newCart);
  localStorage.setItem('cart', JSON.stringify(newCart));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTotal(newCart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0));
  window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="relative max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg ">
   
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <span className="text-6xl mb-4">🍯</span>
          <p className="text-xl text-black font-semibold">Your cart is empty.</p>
          <p className="text-base text-gray-500 mt-2">Add some delicious honey to get started!</p>
        </div>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map(item => (
              <li key={item.id} className="group bg-white shadow-2xl p-5 rounded-2xl flex items-center gap-6 shadow-lg transition-transform duration-200 hover:scale-[1.02]">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl border border-[#FFD966] shadow" />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center bg-[#FFFDF6] rounded-xl border border-[#FFD966] text-4xl">🍯</div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-bold text-xl text-black truncate">{item.name}</p>
                  <p className="text-lg text-black font-bold mt-1">${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="bg-[#FFD966] hover:bg-yellow-300 text-black px-3 py-1 rounded-full font-bold shadow transition-all duration-200"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      <span className="text-lg">−</span>
                    </button>
                    <span className="text-base font-bold px-3 py-1 rounded bg-[#FFFDF6] border border-[#FFD966]">{item.quantity}</span>
                    <button
                      className="bg-[#FFD966] hover:bg-yellow-300 text-black px-3 py-1 rounded-full font-bold shadow transition-all duration-200"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label="Increase quantity"
                    >
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>
                <button
                  className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow transition-all duration-200 flex items-center gap-1"
                  onClick={() => handleRemove(item.id)}
                  aria-label="Remove item"
                >
                  <span className="hidden sm:inline">Remove</span>
                </button>
              </li>
            ))}
          </ul>
          {/* Sticky total and checkout bar for desktop */}
          <div className="sticky bottom-0 left-0 w-full bg-white border-t-2 border-[#FFD966] py-6 px-4 mt-10 flex flex-col sm:flex-row items-center justify-between rounded-b-2xl shadow-lg z-10">
            <div className="font-extrabold text-2xl text-black">
              Total: <span className="text-honey-dark">${total.toFixed(2)}</span>
            </div>
            <button
              className="mt-4 sm:mt-0 w-full sm:w-auto bg-honey hover:bg-bee text-black py-3 px-8 rounded-xl font-bold shadow-honey border-2 border-honey-dark text-xl transition-colors duration-200"
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
                setBuyMsg('Thank you for your purchase! Your order has been placed.');
                setTimeout(() => {
                localStorage.removeItem('cart');
                setCart([]);
                setTotal(0);
                window.dispatchEvent(new Event('cart-updated'))}
                , 3000);
                } catch {
                  setBuyMsg('Error placing order. Please try again.');
                }
                setBuying(false);
              }}
            >
              {buying ? 'Processing...' : 'Buy Now'}
            </button>
          </div>
          {buyMsg && (
            <div className="mt-6 text-center text-xl font-bold text-green-600">
              {buyMsg}
              {buyMsg.includes('Thank you for your purchase') && (
                <div className="mt-2 text-base font-normal text-gray-700">We will contact you at your email address with order details and next steps.</div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
