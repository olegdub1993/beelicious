// Product detail page with add to cart
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import Navbar from '../../../components/Navbar';
import Image from 'next/image';

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
    <>
      <Navbar />
      <main className="min-h-screen bg-honey-light flex flex-col items-center pt-12">
        <div className="max-w-xl w-full p-8 bg-honey-light rounded-2xl shadow-honey border-2 border-honey-dark">
          {product.image_url ? (
            <div className="w-full h-64 mb-6 relative">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-2xl border-b-4 border-honey-dark"
                priority={false}
              />
            </div>
          ) : (
            <div className="w-full h-64 bg-honey flex items-center justify-center text-bee text-6xl rounded-2xl mb-6 border-b-4 border-honey-dark">🍯</div>
          )}
          <h1 className="font-serif font-bold text-3xl mb-2 text-honey-dark flex items-center gap-2">
            <span className="text-4xl">🍯</span>
            {product.name}
          </h1>
          <p className="text-brown text-lg mb-4 font-sans">{product.description}</p>
          <p className="text-honey-dark font-bold text-xl mb-2">${product.price}</p>
          <p className="text-xs mb-4 text-brown">Stock: {product.quantity}</p>
          <div className="flex gap-4 items-center mb-4">
            <input
              type="number"
              min={1}
              max={product.quantity}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className="border-2 border-honey-dark p-2 rounded-xl w-24 font-sans text-lg focus:ring-2 focus:ring-honey"
            />
            <button
              className="bg-honey hover:bg-bee text-brown py-2 px-6 rounded-xl font-bold shadow-honey border-2 border-honey-dark text-lg transition-colors duration-200"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
          {cartMsg && <p className="text-green-600 text-base font-bold text-center mt-2">{cartMsg}</p>}
        </div>
      </main>
  </>
  );
}
