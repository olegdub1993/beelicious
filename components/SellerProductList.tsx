// SellerProductList.tsx - List, edit, and delete seller's products
'use client';
import { useEffect, useState } from 'react';
import EditProductModal from './EditProductModal';
import { supabase } from '../lib/supabaseClient';
import { log } from 'console';

export default function SellerProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get seller_id from Supabase authenticated user
  const [sellerId, setSellerId] = useState<string>('');

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      console.log('======= data', data);
      if (data?.user?.id) {
        setSellerId(data.user.id);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      console.log('sellerId', sellerId);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', sellerId);
      if (error) {
      console.log('error', error);

        setError(error.message);
      } else {
      console.log('no error', );

        setError('');
      }
      setProducts(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, [sellerId]);

  const handleDelete = async (id: string) => {
    await supabase.from('products').delete().eq('id', id);
    setProducts(products.filter(p => p.id !== id));
  };

  return (
  <div className="mt-8 p-6 bg-[#FFFDF6] rounded-2xl shadow-lg border border-yellow-100">
  <h2 className="text-2xl font-extrabold mb-6 text-yellow-700 text-center">Your Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
  <ul className="space-y-4">
          {products.map(product => (
            <li key={product.id} className="bg-white border border-yellow-100 p-4 rounded-xl flex justify-between items-center shadow">
              <div>
                <p className="font-bold">{product.name}</p>
                <p className="text-sm">{product.description}</p>
                <p className="text-yellow-700 font-bold">${product.price}</p>
                <p className="text-xs">Stock: {product.quantity}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg shadow transition-colors duration-200"
                  onClick={() => setEditingProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg shadow transition-colors duration-200"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={() => {
            setEditingProduct(null);
            // Refresh products after update
            (async () => {
              setLoading(true);
              const { data, error } = await supabase
                .from('products')
                .select('*')
          .eq('seller_id', sellerId);
              if (error) setError(error.message);
              setProducts(data || []);
              setLoading(false);
            })();
          }}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
