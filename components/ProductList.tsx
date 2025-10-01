// ProductList.tsx - Buyer product listing
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*');
      if (error) setError(error.message);
      setProducts(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="mt-10 max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-serif font-extrabold mb-8 text-center text-black tracking-tight flex items-center justify-center gap-2">
       Our Products
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></span>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500">No products available.</div>
      ) : (
  <div className="grid grid-cols-1 center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map(product => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="hover:shadow-xl rounded-2xl transition-shadow duration-300 overflow-hidden flex flex-col h-full cursor-pointer">
                {product.image_url ? (
                  <div className="w-full h-48 mb-3 relative">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-2xl border-b-4 border-honey-dark"
                      priority={false}
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-honey flex items-center justify-center text-bee text-6xl rounded-t-2xl mb-3 border-b-4 border-honey-dark">🍯</div>
                )}
                <div className="px-6 pb-6 flex-1 flex flex-col items-center  justify-between">
                  <h3 className="font-serif font-bold text-2xl mb-2 transition-colors duration-300">{product.name}</h3>
                  <p className="text-black text-base mb-3 line-clamp-2 font-sans">{product.description}</p>
                  <span className="text-red-600 text-2xl font-extrabold mb-2">${product.price}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${product.quantity > 0 ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300'}`}>
                        { `Volume ${product.quantity} ml`}
                  </span>
                  <button
                    className="mt-4 w-full bg-[#ff5c2bdd] text-brown py-2 rounded-xl font-bold shadow-honey border-2 border-honey-dark text-base transition-colors duration-200"
                    disabled={product.quantity <= 0}
                    onClick={() => {
                      // Add to cart in localStorage
                      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                      const existing = cart.find((item: any) => item.id === product.id);
                      if (existing) {
                        existing.quantity += 1;
                      } else {
                        cart.push({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          quantity: 1,
                        });
                      }
                      localStorage.setItem('cart', JSON.stringify(cart));
                    }}
                  >
                    {product.quantity > 0 ? 'Buy' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
    </div>
  );
}
