// Home page
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTelegram } from 'react-icons/fa';
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
            <p className="text-xl text-black mb-6 max-w-lg">Pure honey, straight from the hive. Discover our mission, products, and the world of beekeeping.</p>
            <Link href="/about" className="bg-[#d9420b] hover:bg-white hover:text-[#d9420b] text-white px-8 py-3 rounded-xl font-bold shadow-lg text-xl transition-colors duration-200">LEARN MORE</Link>
          </div>
          <div className="flex-1 flex justify-center gap-12 items-center relative">
           <Image src="/honey.jpg" alt="Honey Jar"  width={260} height={260} className="object-contain"/>
              {/* <span className=" text-center text-4xl font-bold text-black">Honey<br/>100% Pure</span> */}
          </div>
        </section>
        {/* Mission & News Section */}
        <section className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-6 mb-12">
          <div className="flex-1 bg-white rounded-2xl shadow-lg  p-8 flex flex-col gap-4">
            <div className="w-full h-150 rounded-xl overflow-hidden mb-4">
              {/* Replace with actual beekeeper image */}
              <Image src="/mission.webp" unoptimized alt="Beekeeper" width={320} height={460} className="object-cover w-full h-full" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-black mb-2">OUR MISSION</h2>
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
        <section className="max-w-4xl mx-auto mt-8 mb-12 px-6">
          <div className="bg-white rounded-2xl shadow-lg  p-8 flex flex-col items-center">
            <p className="text-xl text-black italic mb-4">“The first step to becoming a successful beekeeper is to learn to watch and enjoy what the bees are doing in their hives.”</p>
            <span className="font-serif text-black font-bold">— BeeLicious Founder</span>
            <span className="inline-block  text-black px-4 py-1 rounded-full font-bold mt-2">Gold Badge</span>
          </div>
        </section>
        {/* Gallery Section */}
        {/* <section className="max-w-6xl mx-auto mt-8 px-6">
          <h2 className="text-2xl font-serif font-bold text-black mb-6 text-center">OUR GALLERY</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 center">
            <Image src="/gallery/beekeeper.webp" alt="Beekeeper" width={150} height={150} className="rounded-2xl shadow-lg h-32 object-cover"/>
            <Image src="/gallery/honey-jar.webp" alt="Honey Jar" width={150} height={150} className="rounded-2xl shadow-lg h-32 object-cover"/>
            <Image src="/gallery/bee-garden.webp" alt="Bee Garden" width={150} height={150} className="rounded-2xl shadow-lg h-32 object-cover"/>
            <Image src="/gallery/beekeeper2.webp" alt="Beekeeper 2" width={150} height={150} className="rounded-2xl shadow-lg h-32 object-cover"/>
            <Image src="/gallery/honeycomb.webp" alt="Honeycomb" width={150} height={150} className="rounded-2xl shadow-lg h-32 object-cover"/>
            <Image src="/gallery/bees-closeup.webp" alt="Bees Closeup" width={150} height={150} className="rounded-2xl shadow-lg h-32 object-cover"/>
      </div>
        </section> */}
        {/* Newsletter Section */}
        {/* <section className="max-w-3xl mx-auto mt-8 px-6">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-[#FFD966] p-8 flex flex-col items-center">
            <h2 className="text-2xl font-serif font-bold text-black mb-2">NEWSLETTER SIGN UP</h2>
            <p className="text-black text-base mb-4">Get the latest honey news, offers, and beekeeping tips.</p>
            <form className="flex gap-2 w-full max-w-md">
              <input type="email" placeholder="Your email" className="flex-1 border-2 border-[#FFD966] p-3 rounded-xl font-sans text-lg focus:ring-2 focus:ring-honey bg-white" />
              <button type="submit" className="bg-[#E88C2B] hover:bg-[#F6C700] text-white px-6 py-3 rounded-xl font-bold shadow-lg border-2 border-[#B8860B] text-lg transition-colors duration-200">SUBSCRIBE</button>
            </form>
          </div>
        </section> */}
      </main>
      <footer className="w-full bg-white border-t-2  py-10 px-6 ">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-black mb-2">Contact Us</h3>
            <p className="text-black">Email: <a href="mailto:info@beelicious.com" className="underline text-honey-dark">info@beelicious.com</a></p>
            <p className="text-black">Phone: <a href="tel:+380123456789" className="underline text-honey-dark">+380 12 345 6789</a></p>
            <p className="text-black">Location: Carpathian Mountains, Western Ukraine</p>
          </div>
          <div className="flex-1 text-center">
            <h3 className="text-xl font-bold text-black mb-2">Follow Us</h3>
            <div className="flex justify-center gap-4 mt-2">
              <a href="https://instagram.com/beelicious" target="_blank" rel="noopener" className="text-black hover:text-honey-dark text-2xl flex items-center">
                <FaInstagram />
              </a>
              <a href="https://facebook.com/beelicious" target="_blank" rel="noopener" className="text-black hover:text-honey-dark text-2xl flex items-center">
                <FaFacebook />
              </a>
              <a href="https://t.me/beelicious" target="_blank" rel="noopener" className="text-black hover:text-honey-dark text-2xl flex items-center">
                <FaTelegram />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">© {new Date().getFullYear()} BeeLicious. All rights reserved.</div>
      </footer>
    </>
  );
}
