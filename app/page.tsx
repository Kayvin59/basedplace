import ActionPanel from '@/components/ActionPanel';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Playground from '@/components/Playground';
import ProfileCard from '@/components/ProfileCard';
import Image from 'next/image';
import Link from 'next/link';
import externalLink from '../public/external-link.svg';

export default function Home() {

  return (

    <>
      <Header />
      <main className="flex max-w-6xl mx-auto min-h-screen flex-col items-center py-16 font-primary">
          <section className='w-full flex flex-col lg:flex-row items-center mb-16'>
            <Hero />
          </section>
          <ActionPanel />
          <section id="playground" className="w-11/12 lg:w-full mb-16 border rounded-lg bg-white">
            <h2 className='p-6 text-2xl font-secondary border-b'>Playground</h2>
            <Playground />
          </section>
          <section id="profile" className="w-11/12 lg:w-full mb-16 border rounded-lg bg-white">
            <div className='flex justify-between items-center p-6 border-b'>
              <h2 className='text-2xl font-secondary'>My stats</h2>
              <Link href="/profile" className='flex hover:cursor-not-allowed'>
                Profile
                <span className='ml-2'>
                  <Image src={externalLink} alt="external link" width={25} height={25} />
                </span>
              </Link>
            </div>
            <ProfileCard />
          </section>
          <section id='dashboard' className="w-11/12 lg:w-full mb-16 border rounded-lg bg-white">
            <h2 className='p-6 text-2xl font-secondary'>Dashboard</h2>
            <Dashboard />
          </section>
      </main>
      <Footer />
    </>
  );
}

