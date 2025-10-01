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
  buyer?: { name?: string; email?: string };
};

export default function OrderList({ userId }: { userId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSellerOrders = async () => {
      setLoading(true);
      // 1. Get all order_items for products where seller_id = userId
      const { data: orderItemsData, error: orderItemsError } = await supabase
        .from('order_items')
        .select('*, products(name, seller_id), orders(id, status, created_at, total_price, users(name, email))')
        .eq('products.seller_id', userId);
      if (orderItemsError) {
        setError(orderItemsError.message);
        setLoading(false);
        return;
      }
      // 2. Group order_items by order
      const ordersMap: { [orderId: string]: Order } = {};
      for (const item of orderItemsData || []) {
        const orderId = item.orders.id;
        if (!ordersMap[orderId]) {
          ordersMap[orderId] = {
            id: orderId,
            status: item.orders.status,
            created_at: item.orders.created_at,
            total_price: item.orders.total_price,
            order_items: [],
            buyer: item.orders.users ? { name: item.orders.users.name, email: item.orders.users.email } : {},
          };
        }
        ordersMap[orderId].order_items.push({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
          products: { name: item.products?.name },
        });
      }
      setOrders(Object.values(ordersMap));
      setLoading(false);
    };
    if (userId) fetchSellerOrders();
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
              {order.buyer && (
                <div className="mt-1 text-sm text-gray-700">
                  Buyer: <span className="font-bold">{order.buyer.name || 'Unknown'}</span>
                  {order.buyer.email && (
                    <span> (<a href={`mailto:${order.buyer.email}`} className="underline text-blue-600">{order.buyer.email}</a>)</span>
                  )}
                </div>
              )}
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
