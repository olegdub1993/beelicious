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
  phone?: string;
  buyer?: { name?: string; email?: string, };
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
        .select('*, products(name, seller_id), orders(id, status, created_at, total_price, phone_number, users(name, email))')
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
            phone: item.orders.phone_number,
            buyer: item.orders.users ? { name: item.orders.users.name, email: item.orders.users.email } : { },
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

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    // Optimistically update the UI
    const originalOrders = orders;
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      setError(`Failed to update status for order #${orderId}. Please try again.`);
      // Revert the UI change if the update fails
      setOrders(originalOrders);
    } else {
      // Clear any previous errors on success
      setError('');
    }
  };
 
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-serif font-extrabold mb-8 text-black text-center flex items-center justify-center gap-2">
        <span className="text-3xl">📦</span> Your Orders
      </h2>
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <span className="text-4xl animate-bounce">📦</span>
          <span className="ml-4 text-lg text-black font-semibold">Loading...</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <span className="text-6xl mb-4">📦</span>
          <p className="text-xl text-black font-semibold">No orders found.</p>
          <p className="text-base text-gray-500 mt-2">Your honey orders will appear here.</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {orders.map(order => (
            <li key={order.id} className="group bg-white border-2 border-[#FFD966] p-6 rounded-2xl shadow-lg transition-transform duration-200 hover:scale-[1.02]">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <span className="font-serif font-bold text-lg text-black">Order #{order.id}</span>
            <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border p-1 rounded text-sm bg-white text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                    </select>
                <span className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString()}</span>
              </div>
              {order.buyer && (
                <div className="mt-2 text-sm text-gray-700">
                  Buyer: <span className="font-bold text-black">{order.buyer.name || 'Unknown'}</span>
                  {order.buyer.email && (
                    <span> (<a href={`mailto:${order.buyer.email}`} className="underline text-blue-600">{order.buyer.email}</a>)</span>
                  )}
                  {order.phone && (
                    <span> (<a href={`tel:${order.phone}`} className="underline text-blue-600">{order.phone}</a>)</span>
                  )}
                </div>
              )}
              <ul className="mt-4">
                {order.order_items.map((item) => (
                  <li key={item.id} className="text-base text-black">
                    {item.products?.name || 'Product'} <span className="font-bold">× {item.quantity}</span> <span className="text-gray-500">(${item.price})</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-right font-extrabold text-lg text-black">Total: <span className="text-honey-dark">${order.total_price}</span></div>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-red-500 text-sm mt-6 text-center">{error}</p>}
    </div>
  );
}
