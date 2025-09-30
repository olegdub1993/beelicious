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
      <h2 className="text-3xl font-extrabold mb-8 text-center text-yellow-700 tracking-tight">🍯 Browse Honey Products</h2>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></span>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500">No products available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full cursor-pointer">
                {product.image_url ? (
                  <div className="w-full h-48 mb-3 relative">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
                      priority={false}
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-yellow-50 flex items-center justify-center text-yellow-400 text-5xl rounded-t-xl mb-3">🍯d</div>
                )}
                <div className="px-4 pb-4 flex-1 flex flex-col justify-between">
                  <h3 className="font-bold text-xl mb-1 text-gray-900 group-hover:text-yellow-700 transition-colors duration-300">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold text-base shadow">${product.price}</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${product.quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.quantity > 0 ? `In Stock: ${product.quantity}` : 'Out of Stock'}
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
