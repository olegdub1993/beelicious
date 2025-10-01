// Home page
import Link from 'next/link';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white font-sans relative overflow-x-hidden">
        {/* Header bee/honey accents */}
        <div className="absolute top-0 left-0 w-full h-8 pointer-events-none select-none">
          {/* Example bee/honey SVG accents */}
        </div>
        {/* Hero Section */}
        <section className="w-full flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto pt-16 pb-12 px-6 gap-8">
          <div className="flex-1 flex flex-col justify-center items-start">
            <h1 className="text-6xl font-serif font-extrabold text-[#2C1A00] mb-4 leading-tight tracking-tight">HONEYBEE</h1>
            <p className="text-xl text-[#8B5C2A] mb-6 max-w-lg">Pure honey, straight from the hive. Discover our mission, products, and the world of beekeeping.</p>
            <Link href="/about" className="bg-[#d9420b] hover:bg-[#F6C700] text-white px-8 py-3 rounded-xl font-bold shadow-lg text-xl transition-colors duration-200">LEARN MORE</Link>
          </div>
          <div className="flex-1 flex justify-center items-center relative">
           <Image src="/honey.jpg" alt="Honey Jar"  width={160} height={160} className="object-contain"/>
              <span className="absolute top-6 right-4 text-2xl font-bold text-black">Honey<br/>100% Pure</span>
          </div>
        </section>
        {/* Mission & News Section */}
        <section className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-6 mb-12">
          <div className="flex-1 bg-white rounded-2xl shadow-lg  p-8 flex flex-col gap-4">
            <div className="w-full h-40 rounded-xl overflow-hidden mb-4">
              {/* Replace with actual beekeeper image */}
              <Image src="/placeholder-beekeeper.jpg" alt="Beekeeper" width={320} height={160} className="object-cover w-full h-full" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#B8860B] mb-2">OUR MISSION</h2>
            <p className="text-black text-base">We believe in sustainable beekeeping and delivering the purest honey to your table. Our passion is to protect bees and share their gifts with the world.</p>
            <span className="font-serif text-black italic">— BeeLicious Team</span>
          </div>
        </section>
        {/* Products Section */}
        <section className="max-w-6xl mx-auto mt-8 px-6">
          {/* Custom product cards to match screenshot */}
          <ProductList />
        </section>
        {/* Testimonial Section */}
        <section className="max-w-4xl mx-auto mt-8 px-6">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-[#FFD966] p-8 flex flex-col items-center">
            <p className="text-xl text-[#8B5C2A] italic mb-4">“The first step to becoming a successful beekeeper is to learn to watch and enjoy what the bees are doing in their hives.”</p>
            <span className="font-serif text-[#B8860B] font-bold">— Mellifera Founder</span>
            <span className="inline-block bg-[#FFD966] text-[#B8860B] px-4 py-1 rounded-full font-bold mt-2">Gold Badge</span>
          </div>
        </section>
        {/* Gallery Section */}
        <section className="max-w-6xl mx-auto mt-8 px-6">
          <h2 className="text-2xl font-serif font-bold text-[#B8860B] mb-6 text-center">OUR GALLERY</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Gallery image placeholders */}
            <div className="bg-[#FFFDF6] rounded-2xl shadow-lg h-32 flex items-center justify-center text-4xl">🐝</div>
            <div className="bg-[#FFFDF6] rounded-2xl shadow-lg h-32 flex items-center justify-center text-4xl">🍯</div>
            <div className="bg-[#FFFDF6] rounded-2xl shadow-lg h-32 flex items-center justify-center text-4xl">🌻</div>
            <div className="bg-[#FFFDF6] rounded-2xl shadow-lg h-32 flex items-center justify-center text-4xl">🌼</div>
            <div className="bg-[#FFFDF6] rounded-2xl shadow-lg h-32 flex items-center justify-center text-4xl">🐝</div>
            <div className="bg-[#FFFDF6] rounded-2xl shadow-lg h-32 flex items-center justify-center text-4xl">🍯</div>
            <div className="bg-[#FFFDF6] rounded-2xl shadow-lg h-32 flex items-center justify-center text-4xl">🌻</div>
            <div className="bg-[#FFFDF6] rounded-2xl shadow-lg h-32 flex items-center justify-center text-4xl">🌼</div>
          </div>
        </section>
        {/* Newsletter Section */}
        <section className="max-w-3xl mx-auto mt-8 px-6">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-[#FFD966] p-8 flex flex-col items-center">
            <h2 className="text-2xl font-serif font-bold text-[#B8860B] mb-2">NEWSLETTER SIGN UP</h2>
            <p className="text-[#8B5C2A] text-base mb-4">Get the latest honey news, offers, and beekeeping tips.</p>
            <form className="flex gap-2 w-full max-w-md">
              <input type="email" placeholder="Your email" className="flex-1 border-2 border-[#FFD966] p-3 rounded-xl font-sans text-lg focus:ring-2 focus:ring-honey bg-white" />
              <button type="submit" className="bg-[#E88C2B] hover:bg-[#F6C700] text-white px-6 py-3 rounded-xl font-bold shadow-lg border-2 border-[#B8860B] text-lg transition-colors duration-200">SUBSCRIBE</button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
