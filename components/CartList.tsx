// CartList.tsx - Display and manage cart items
'use client';
import { useState, useEffect } from 'react';

export default function CartList() {
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
  <ul className="space-y-4">
          {cart.map(item => (
            <li key={item.id} className="bg-white border border-yellow-100 p-4 rounded-xl flex justify-between items-center shadow">
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-yellow-700 font-bold">${item.price}</p>
                <p className="text-xs">Quantity: {item.quantity}</p>
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
      )}
      <div className="mt-6 text-right font-extrabold text-xl text-yellow-700">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}
