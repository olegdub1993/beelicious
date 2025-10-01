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
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map(product => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="bg-honey-light border-2 border-honey rounded-2xl shadow-honey hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full cursor-pointer">
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
                <div className="px-6 pb-6 flex-1 flex flex-col justify-between">
                  <h3 className="font-serif font-bold text-2xl mb-2 text-honey-dark group-hover:text-bee transition-colors duration-300">{product.name}</h3>
                  <p className="text-brown text-base mb-3 line-clamp-2 font-sans">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="bg-honey px-4 py-2 rounded-full text-brown font-bold shadow-honey text-lg border-2 border-honey-dark">${product.price}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${product.quantity > 0 ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300'}`}>
                        { `Weight ${product.quantity} ml`}
                    </span>
                  </div>
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
