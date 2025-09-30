// app/auth/page.tsx - Authentication page
'use client';
import AuthForm from '../../components/AuthForm';
import Navbar from '../../components/Navbar';

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">Sign In / Register</h1>
        <AuthForm />
      </main>
    </>
  );
}
