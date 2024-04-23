import Dashboard from '@/components/Dashboard';
import Playground from '@/components/Playground';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 font-primary">
      <h1 className="text-7xl mb-24 font-secondary">Based Place</h1>
      <p className="w-full flex flex-col text-center text-xl mb-24">
        <span>
          Welcome to Based Place, where pixels art meets gamified minting.
        </span>
        <span>
          Most active community wins it all.
        </span>
        <span>
          Rally your troops.
        </span>
      </p>
      <div className="w-full">
        <section className="mb-10">
          <h2 className="font-bold text-2xl mb-6 underline">About</h2>
        </section>
        <section className="mb-10">
          <h2 className="font-bold text-2xl mb-6 underline">Playground</h2>
          <Playground />
        </section>
        <section className="mb-10">
          <h2 className="font-bold text-2xl mb-6 underline">Dashboard</h2>
          <Dashboard />
        </section>
      </div>
    </main>
  );
}
