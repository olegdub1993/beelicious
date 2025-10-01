// Seller dashboard page
import ProductForm from '../../components/ProductForm';
import SellerProductList from '../../components/SellerProductList';
import Navbar from '../../components/Navbar';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-honey-light flex flex-col items-center pt-12">
        <div className="max-w-3xl w-full text-center mb-10">
          <h1 className="text-4xl font-serif font-extrabold text-honey-dark mb-4 tracking-tight flex items-center justify-center gap-2">
            <span className="text-5xl">🛍️</span>
            Seller Dashboard
          </h1>
        </div>
        <div className="max-w-xl w-full mb-8">
          <ProductForm />
        </div>
        <div className="max-w-2xl w-full">
          <SellerProductList />
        </div>
      </main>
    </>
  );
}
