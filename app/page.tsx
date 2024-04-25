import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';
import Playground from '@/components/Playground';

export default function Home() {

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center px-6 font-primary">
        <h1 className="text-7xl text-center mt-12 mb-24 font-secondary">Based Place</h1>
        <p className="w-full flex flex-col text-center text-xl mb-24">
          <span>
            There is a based canvas.
          </span>
          <span>
            Connect your wallet and play
          </span>
          <span>
            Individually you earn something.
          </span>
          <span>
            Together you earn more.
          </span>
        </p>
        <div className="w-full">
          <section className="mb-10">
          </section>
          <section className="mb-10">
            <Playground />
          </section>
          <section className="mb-10">
            <Dashboard />
          </section>
        </div>
      </main>
    </>
  );
}
