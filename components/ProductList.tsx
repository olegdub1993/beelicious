// ProductList.tsx - Buyer product listing
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

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
    <div className="mt-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Browse Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="border rounded p-4 hover:shadow cursor-pointer">
                {product.image_url && (
                  <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
                )}
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-yellow-700 font-bold">${product.price}</p>
                <p className="text-xs">Stock: {product.quantity}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
