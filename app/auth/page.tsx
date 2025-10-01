// app/auth/page.tsx - Authentication page
'use client';
import AuthForm from '../../components/AuthForm';
import Navbar from '../../components/Navbar';

export default function AuthPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-honey-light flex flex-col items-center justify-center pt-12">
        <div className="max-w-xl w-full text-center mb-10">
          <h1 className="text-4xl font-serif font-extrabold text-honey-dark mb-4 tracking-tight flex items-center justify-center gap-2">
            <span className="text-5xl">🐝</span>
            Sign In / Register
          </h1>
        </div>
        <AuthForm />
      </main>
    </>
  );
}
