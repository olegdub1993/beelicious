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
           <Image src="/honey.jpg" alt="Honey Jar"  width={660} height={660} className="object-contain"/>
              {/* <span className=" text-center text-4xl font-bold text-black">Honey<br/>100% Pure</span> */}
          </div>
        </section>
        {/* Mission & News Section */}
        <section className="max-w-6xl mx-auto grid grid-cols-12 py-12 gap-8 px-6 mb-12">
          <div className="flex-1 bg-white col-span-8 rounded-2xl  flex flex-col gap-4">
            <div className="w-full h-100 overflow-hidden mb-4">
              {/* Replace with actual beekeeper image */}
              <Image src="/mission.webp" unoptimized alt="Beekeeper" width={320} height={460} className="object-cover w-full h-full" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-black mb-2">OUR MISSION</h2>
            <p className="text-black text-base">We believe in sustainable beekeeping and delivering the purest honey to your table. Our passion is to protect bees and share their gifts with the world.</p>
            <span className="font-serif text-black italic">— BeeLicious Team</span>
          </div>
          <div className="flex-1 col-span-4 bg-white rounded-2xl shadow-lg text-black p-8 flex flex-col gap-4">
            <div className="w-full  rounded-xl font-bold text-2xl capitalize overflow-hidden mb-4">
              <h2 className="bg-[#d9420b] text-white px-4 py-2">Did You Know?</h2>
            </div>
            <div className="">
              A single honeybee can visit up to 5,000 flowers a day.
            </div>
            <div>
             Honey never spoils — archaeologists have found 3,000-year-old honey in Egyptian tombs that was still edible.
            </div>
            <div>
              Beekeepers wear white suits because bees are less likely to attack light colors.
            </div>
            <div>
              Bees communicate through a special “waggle dance” that shows others where to find nectar.
            </div>
            <div>
             To make one kilogram of honey, bees must visit around 4 million flowers and fly over 100,000 kilometers.
            </div>
            <Link href="/history" className="mt-4 bg-[#d9420b] hover:bg-white hover:text-[#d9420b] text-white px-6 py-2 rounded-xl font-bold shadow-lg text-lg transition-colors duration-200 inline-block">MORE FACTS</Link>
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
        <section className="max-w-6xl mx-auto mt-8 px-6 mb-12">
          <h2 className="text-2xl font-serif font-bold text-black mb-6 text-center">OUR GALLERY</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            <Image src="/gallery/1.jpg" alt="Beekeeper" width={400} height={400} className="rounded-2xl shadow-lg w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform hover:scale-105 duration-300"/>
            <Image src="/gallery/2.jpg" alt="Honey Jar" width={400} height={400} className="rounded-2xl shadow-lg w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform hover:scale-105 duration-300"/>
            <Image src="/gallery/3.jpg" alt="Bee Garden" width={400} height={400} className="rounded-2xl shadow-lg w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform hover:scale-105 duration-300"/>
            <Image src="/gallery/4.jpg" alt="Beekeeper 2" width={400} height={400} className="rounded-2xl shadow-lg w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform hover:scale-105 duration-300"/>
            <Image src="/gallery/5.webp" alt="Honeycomb" width={400} height={400} className="rounded-2xl shadow-lg w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform hover:scale-105 duration-300"/>
            <Image src="/gallery/6.jpg" alt="Bees Closeup" width={400} height={400} className="rounded-2xl shadow-lg w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform hover:scale-105 duration-300"/>
      </div>
        </section>
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
