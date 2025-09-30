// Home page
import AuthForm from '../components/AuthForm';
import ProductList from '../components/ProductList';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-center mt-10">Honey Marketplace</h1>
  <AuthForm />
  <ProductList />
    </main>
  );
}
