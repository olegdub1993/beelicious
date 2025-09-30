// OrderList.tsx - Buyer order tracking
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  products?: { name: string };
};

type Order = {
  id: string;
  status: string;
  created_at: string;
  total_price: number;
  order_items: OrderItem[];
};

export default function OrderList({ userId }: { userId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(name))')
        .eq('user_id', userId);
      if (error) setError(error.message);
      setOrders(data || []);
      setLoading(false);
    };
  // userId is required to fetch the current user's orders
  if (userId) fetchOrders();
  }, [userId]);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="border p-4 rounded">
              <div className="flex justify-between items-center">
                <span className="font-bold">Order #{order.id}</span>
                <span className="text-xs">{order.status}</span>
                <span className="text-xs">{new Date(order.created_at).toLocaleString()}</span>
              </div>
              <ul className="mt-2">
                {order.order_items.map((item) => (
                  <li key={item.id} className="text-sm">
                    {item.products?.name || 'Product'} x {item.quantity} (${item.price})
                  </li>
                ))}
              </ul>
              <div className="mt-2 text-right font-bold">Total: ${order.total_price}</div>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
