// Product detail page with add to cart
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cartMsg, setCartMsg] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      if (error) setError(error.message);
      setProduct(data);
      setLoading(false);
    };
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Simple localStorage cart for MVP
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartMsg('Added to cart!');
  };

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error || !product) return <div className="mt-10 text-center text-red-500">{error || 'Product not found.'}</div>;

  return (
    <main className="min-h-screen bg-white flex flex-col items-center pt-10">
      <div className="max-w-xl w-full p-6 bg-white rounded shadow">
        {product.image_url && (
          <img src={product.image_url} alt={product.name} className="w-full h-64 object-cover mb-4 rounded" />
        )}
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="mb-2">{product.description}</p>
        <p className="text-yellow-700 font-bold mb-2">${product.price}</p>
        <p className="text-xs mb-4">Stock: {product.quantity}</p>
        <div className="flex gap-2 items-center mb-4">
          <input
            type="number"
            min={1}
            max={product.quantity}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="border p-2 rounded w-20"
          />
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded font-bold"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
        {cartMsg && <p className="text-green-600 text-sm">{cartMsg}</p>}
      </div>
    </main>
  );
}
