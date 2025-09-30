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
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold">Add Product</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        className="w-full border p-2 rounded"
        required
        min="0"
        step="0.01"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        className="w-full border p-2 rounded"
        required
        min="0"
      />
      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files?.[0] || null)}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="w-full bg-yellow-500 text-white py-2 rounded font-bold"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Product'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
