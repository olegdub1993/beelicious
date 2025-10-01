// Cart page
import Navbar from '../../components/Navbar';
import CartList from '../../components/CartList';

export default function Cart() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-honey-light flex flex-col items-center pt-12">
        <div className="max-w-3xl w-full text-center mb-10">
          <h1 className="text-4xl font-serif font-extrabold text-honey-dark mb-4 tracking-tight flex items-center justify-center gap-2">
            <span className="text-5xl">🛒</span>
            Your Cart
          </h1>
        </div>
        <CartList />
      </main>
    </>
  );
}
