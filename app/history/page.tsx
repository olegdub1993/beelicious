// History page - Bee facts and information
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function History() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-serif font-extrabold text-[#2C1A00] mb-8 text-center">
            🌼 Bees — Nature&apos;s Tiny Heroes
          </h1>
          
          {/* Bees Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="space-y-4 text-lg text-black">
              <p className="flex items-start gap-3">
                <span className="text-2xl">🐝</span>
                <span>A single bee can visit up to 5,000 flowers per day.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">💃</span>
                <span>Bees share food locations through a &quot;waggle dance.&quot;</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">👑</span>
                <span>A queen bee lays around 2,000 eggs daily in high season.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">👀</span>
                <span>Bees have five eyes — two big and three small ones.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">💪</span>
                <span>Worker bees are all females — they clean, guard, and forage.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🌞</span>
                <span>No matter the weather, bees keep their hive at 35°C (95°F).</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🧠</span>
                <span>Bees can recognize human faces and remember them.</span>
              </p>
            </div>
          </section>

          {/* Honey Section */}
          <h2 className="text-4xl font-serif font-extrabold text-[#2C1A00] mb-6 text-center">
            🍯 Honey — Liquid Gold
          </h2>
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="space-y-4 text-lg text-black">
              <p className="flex items-start gap-3">
                <span className="text-2xl">🕰️</span>
                <span>Honey never spoils — ancient honey jars are still edible!</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🌸</span>
                <span>The floral source defines each honey&apos;s color and taste.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">💧</span>
                <span>It&apos;s packed with vitamins, minerals, and enzymes — pure energy.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">✈️</span>
                <span>To make 1kg of honey, bees fly over 100,000 km and visit 4 million flowers.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🔥</span>
                <span>Honey helps heal wounds and soothe sore throats naturally.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🌈</span>
                <span>Lighter honey is mild, darker honey is stronger and richer.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">❄️</span>
                <span>Crystallized honey is 100% natural — proof of purity, not spoilage.</span>
              </p>
            </div>
          </section>

          {/* Beekeeping Section */}
          <h2 className="text-4xl font-serif font-extrabold text-[#2C1A00] mb-6 text-center">
            🧑‍🌾 Beekeeping — Art of the Mountains
          </h2>
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="space-y-4 text-lg text-black">
              <p className="flex items-start gap-3">
                <span className="text-2xl">🐝</span>
                <span>The science of beekeeping is called apiculture, and hives live in an apiary.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🤍</span>
                <span>Beekeepers wear white suits to stay calm around bees.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🍌</span>
                <span>The smell of banana can upset bees — it mimics an alarm pheromone.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🏠</span>
                <span>A single hive holds 20,000–80,000 bees in summer.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🔥</span>
                <span>Beeswax from hives is used in candles, cosmetics, and polishes.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">📦</span>
                <span>Modern hives let keepers harvest honey gently without harm.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-2xl">🏔️</span>
                <span>The Carpathian Mountains are home to floral honey known for its pure aroma and mountain freshness.</span>
              </p>
            </div>
          </section>

          {/* Back to Home Button */}
          <div className="text-center mt-8">
            <Link href="/" className="bg-[#d9420b] hover:bg-white hover:text-[#d9420b] text-white px-8 py-3 rounded-xl font-bold shadow-lg text-xl transition-colors duration-200 inline-block border-2 border-[#d9420b]">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
