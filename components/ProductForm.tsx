'use client';
// ProductForm.tsx - Seller product CRUD (Add/Edit)
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ProductForm({ onProductAdded }: { onProductAdded?: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sellerId, setSellerId] = useState<string>('');

  // Get seller_id from Supabase authenticated user
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.id) {
        setSellerId(data.user.id);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    let imageUrl = '';
    if (image) {
      // Upload image to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(`products/${Date.now()}_${image.name}`, image);
      if (uploadError) {
        setError(uploadError.message);
        setLoading(false);
        return;
      }
  imageUrl = supabase.storage.from('product-images').getPublicUrl(data.path).data.publicUrl;
    }
    // Insert product
    if (!sellerId) {
      setError('No seller ID found. Please log in.');
      setLoading(false);
      return;
    }
    const { error: insertError } = await supabase.from('products').insert({
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      image_url: imageUrl,
      seller_id: sellerId,
    });
    if (insertError) setError(insertError.message);
    setLoading(false);
    setName('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setImage(null);
    if (onProductAdded) onProductAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-honey-light rounded-2xl shadow-honey border-2 border-honey-dark max-w-xl mx-auto">
      <h2 className="text-3xl font-serif font-extrabold text-honey-dark mb-4 text-center flex items-center justify-center gap-2">
        <span className="text-4xl">🍯</span>
        Add Product
      </h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full border-2 border-honey-dark p-3 rounded-xl font-serif text-lg focus:ring-2 focus:ring-honey"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full border-2 border-honey-dark p-3 rounded-xl font-sans text-base focus:ring-2 focus:ring-honey"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        className="w-full border-2 border-honey-dark p-3 rounded-xl font-sans text-lg focus:ring-2 focus:ring-honey"
        required
        min="0"
        step="0.01"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        className="w-full border-2 border-honey-dark p-3 rounded-xl font-sans text-lg focus:ring-2 focus:ring-honey"
        required
        min="0"
      />
      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files?.[0] || null)}
        className="w-full border-2 border-honey-dark p-3 rounded-xl font-sans text-lg focus:ring-2 focus:ring-honey bg-white"
      />
      <button
        type="submit"
        className="w-full bg-honey hover:bg-bee text-brown py-3 rounded-xl font-bold shadow-honey border-2 border-honey-dark text-xl transition-colors duration-200"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Product'}
      </button>
  {error && <p className="text-red-500 text-base font-bold text-center mt-2">{error}</p>}
    </form>
  );
}
