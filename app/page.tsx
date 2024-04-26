import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Playground from '@/components/Playground';
import ProfileCard from '@/components/ProfileCard';


export default function Home() {

  return (
    <>
      <Header />
      <main className="flex max-w-6xl mx-auto min-h-screen flex-col items-center py-12 px-6 font-primary">
        <Hero />
        <div className="w-full">
          <section id="playground" className="mb-10 border-2 border-transparent rounded-lg bg-background">
            <h2 className='p-6 text-2xl font-secondary border-b'>Playground</h2>
            <Playground />
          </section>
          <section id="profile" className="mb-10">
            <ProfileCard />
          </section>
          <section id='dashboard' className="mb-10">
            <Dashboard />
          </section>
        </div>
      </main>
    </>
  );
}
