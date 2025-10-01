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
  <div className="mt-8 p-8 bg-honey-light rounded-2xl shadow-honey border-2 border-honey-dark max-w-2xl mx-auto">
  <h2 className="text-3xl font-serif font-extrabold mb-6 text-honey-dark text-center flex items-center justify-center gap-2">
    <span className="text-4xl">🍯</span>
    Your Products
  </h2>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
  <ul className="space-y-6">
          {products.map(product => (
            <li key={product.id} className="bg-honey-light border-2 border-honey rounded-2xl shadow-honey flex justify-between items-center p-6">
              <div>
                <p className="font-serif font-bold text-2xl text-honey-dark mb-1">{product.name}</p>
                <p className="text-brown text-base mb-2 font-sans">{product.description}</p>
                <p className="text-honey-dark font-bold text-lg">${product.price}</p>
                <p className="text-xs text-brown">Stock: {product.quantity}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-honey hover:bg-bee text-brown px-4 py-2 rounded-xl font-bold shadow-honey border-2 border-honey-dark transition-colors duration-200"
                  onClick={() => setEditingProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-bold shadow transition-colors duration-200 border-2 border-red-700"
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
