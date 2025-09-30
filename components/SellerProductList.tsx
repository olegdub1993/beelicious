// SellerProductList.tsx - List, edit, and delete seller's products
import { useEffect, useState } from 'react';
import EditProductModal from './EditProductModal';
import { supabase } from '../lib/supabaseClient';

export default function SellerProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // TODO: Replace with actual seller_id from auth
  const seller_id = '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', seller_id);
      if (error) setError(error.message);
      setProducts(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, [seller_id]);

  const handleDelete = async (id: string) => {
    await supabase.from('products').delete().eq('id', id);
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-4">Your Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-4">
          {products.map(product => (
            <li key={product.id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <p className="font-bold">{product.name}</p>
                <p className="text-sm">{product.description}</p>
                <p className="text-yellow-700 font-bold">${product.price}</p>
                <p className="text-xs">Stock: {product.quantity}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => setEditingProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
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
                .eq('seller_id', seller_id);
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
