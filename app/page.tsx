
import ActionPanel from '@/components/ActionPanel';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Playground from '@/components/Playground';
import { getPixels } from '@/lib/supabase/action';
import { createSupabaseClient } from '@/lib/supabase/client';


export default async function Home() {
  const pixels = await getPixels();
  const client = createSupabaseClient();
  
  // Join the realtime room
  const realtimeRoom = client.channel('realtime', {
    config: {
      broadcast: { self: true}
    }
  });

  // Listen for changes
  realtimeRoom.on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
    },
    (payload) => console.log(payload)
  ).subscribe()

  // TODO: Add cleanup room ?

  return (
    <>
      <Header />
      <main className="flex max-w-6xl mx-auto min-h-screen flex-col items-center py-16 font-primary">
          <section className='w-full flex flex-col lg:flex-row items-center mb-16'>
            <Hero />
          </section>
          <ActionPanel />
          <section id="playground" className="w-11/12 mb-16 border rounded-lg bg-white">
            {/* // TODO: Add suspense wrapper + playground skeleton */}
            <Playground initialPixels={pixels ?? []}/>
          </section>
          <section id="profile" className="w-11/12 mb-16 border rounded-lg bg-white">
            {/* <ProfileCard /> */}
          </section>
          <section id='dashboard' className="w-11/12 mb-16 border rounded-lg bg-white">
            <Dashboard />
          </section>
      </main>
      <Footer />
    </>
  );
}

