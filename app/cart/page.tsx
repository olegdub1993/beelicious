// Cart page
import Navbar from '../../components/Navbar';
import CartList from '../../components/CartList';

export default function Cart() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <CartList />
    </main>
  );
}
