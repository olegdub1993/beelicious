// EditProductModal.tsx - Modal for editing a product
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function EditProductModal({ product, onClose, onProductUpdated }: {
  product: any,
  onClose: () => void,
  onProductUpdated: () => void
}) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: updateError } = await supabase.from('products').update({
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity)
    }).eq('id', product.id);
    if (updateError) setError(updateError.message);
    setLoading(false);
    onProductUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Product</h2>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border p-2 rounded mb-2"
          required
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border p-2 rounded mb-2"
          required
        />
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="w-full border p-2 rounded mb-2"
          required
          min="0"
          step="0.01"
        />
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="w-full border p-2 rounded mb-2"
          required
          min="0"
        />
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 px-4 rounded font-bold"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
          <button
            type="button"
            className="bg-gray-300 text-black py-2 px-4 rounded font-bold"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}
