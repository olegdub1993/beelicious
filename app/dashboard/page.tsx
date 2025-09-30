
// Seller dashboard page
import ProductForm from '../../components/ProductForm';
import SellerProductList from '../../components/SellerProductList';
import Navbar from '../../components/Navbar';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-white">
      <h1 className="text-2xl font-bold mt-10">Seller Dashboard</h1>
      <div className="max-w-xl mx-auto mt-8">
        <ProductForm />
      </div>
      <Navbar />
      <div className="max-w-2xl mx-auto">
        {/* Seller product list and management */}
        <SellerProductList />
      </div>
    </main>
  );
}
