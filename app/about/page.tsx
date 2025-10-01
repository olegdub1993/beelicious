import Navbar from '../../components/Navbar';
import Image from 'next/image';
export default function About() {
  return (
    <>
      <Navbar />
  <main className="min-h-screen bg-white font-sans flex flex-col items-center pt-16">
        <section className="max-w-3xl w-full text-black mb-3.5 bg-white rounded-2xl shadow-lg  p-10 mx-auto mt-8">
         <Image src="/mission.webp" unoptimized alt="Beekeeper" width={320} height={460} className="object-cover w-full h-full" />
          <h1 className="text-5xl mt-2.5 font-serif font-extrabold text-black mb-6 text-center">About Beelicious</h1>
          <p className="mb-6 text-lg">Nestled deep in the heart of the Carpathian Mountains, Beelicios is a small family-driven apiary that celebrates the harmony between bees, nature, and tradition. Every drop of our honey is born in the untouched valleys and forest meadows of Western Ukraine — a land rich in wildflowers, herbs, and pure mountain air.</p>
          <p className="mb-6 text-lg">At Beelicios, we believe that true quality begins with care. Our bees roam freely among the diverse blossoms of linden, acacia, sunflower, and forest plants, gathering nectar that reflects the very essence of the Carpathians. We work hand in hand with nature, avoiding industrial methods and focusing on natural beekeeping practices passed down through generations.</p>
          <p className="mb-6 text-lg">Each jar of Beelicios honey is a reflection of our values — purity, honesty, and respect for the land. From the moment nectar is collected to the final packaging, every step is done with love and attention to detail. We don’t just produce honey — we preserve a living piece of our region’s soul, bringing the taste of mountain freshness to your table.</p>
          <p className="mb-6 text-lg">Our mission is to share the authentic sweetness of the Carpathians with people who value real, unprocessed food and sustainable production. Beelicios stands for more than just honey — it’s a symbol of connection between humans and nature, a reminder that every small bee contributes to something greater.</p>
          <p className="mb-6 text-lg">So when you open a jar of Beelicios, you’re not just tasting honey. You’re tasting the sunlight that warmed the meadows, the rain that nourished wild herbs, and the devotion of beekeepers who honor their craft.</p>
          <p className="text-lg font-bold">Pure. Natural. Beelicios — crafted by bees, perfected by the mountains.</p>
        </section>
      </main>
    </>
  );
}
