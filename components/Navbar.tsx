// Navbar component
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full py-4 bg-yellow-100 flex justify-between items-center px-6">
      <span className="font-bold text-xl">Honey Market</span>
      <div className="flex gap-6">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/cart" className="hover:underline">Cart</Link>
        <Link href="/orders" className="hover:underline">Orders</Link>
        <Link href="/dashboard" className="hover:underline">Seller Dashboard</Link>
      </div>
    </nav>
  );
}
