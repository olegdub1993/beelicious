import Navbar from '../../components/Navbar';

export default function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FFFDF6] flex flex-col items-center pt-16 font-sans">
        <section className="max-w-3xl w-full bg-white rounded-2xl shadow-lg border-2 border-[#FFD966] p-10 mx-auto mt-8">
          <h1 className="text-5xl font-serif font-extrabold text-[#B8860B] mb-6 text-center">About Mellifera Honey</h1>
          <p className="text-xl text-[#8B5C2A] mb-6 text-center">Mellifera Honey is dedicated to producing the purest, most natural honey products, straight from our sustainable apiaries. Our mission is to protect bees, support local ecosystems, and deliver exceptional honey to your table.</p>
          <p className="text-lg text-[#8B5C2A] mb-4">Founded by passionate beekeepers, our company combines tradition and innovation to create a range of honey and beekeeping products loved by families and chefs alike. We believe in transparency, quality, and the wellbeing of our bees.</p>
          <p className="text-lg text-[#8B5C2A]">Join us in celebrating the magic of honey and the vital role bees play in our world. Mellifera Honey—pure, local, and crafted with care.</p>
        </section>
      </main>
    </>
  );
}
