import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Playground from '@/components/Playground';
import ProfileCard from '@/components/ProfileCard';

export default function Home() {

  return (
    <>
      <Header />
      <main className="flex max-w-6xl mx-auto min-h-screen flex-col items-center py-24 px-6 font-primary">
          <section className='w-full flex mb-16'>
            <Hero />
          </section>
          <section id="playground" className="w-full mb-16 border rounded-lg bg-background">
            <h2 className='p-6 text-2xl font-secondary border-b'>Playground</h2>
            <Playground />
          </section>
          <section id="profile" className="w-full mb-16 border rounded-lg bg-background">
            <div>
              <h2 className='p-6 text-2xl font-secondary border-b'>My stats</h2>
            </div>
            <ProfileCard />
          </section>
          <section id='dashboard' className="w-full mb-16">
            <h2 className='p-6 text-2xl font-secondary border-b'>Dashboard</h2>
            <Dashboard />
          </section>
      </main>
    </>
  );
}
