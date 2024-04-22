import Image from 'next/image';
import Link from 'next/link';
import mirrorLogo from '../public/mirror.svg';
import twitterLogo from '../public/twitter.svg';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 font-primary">
      <h1 className="text-5xl md:text-7xl mb-24 font-secondary">Based Place</h1>
      <p className="mt-24 text-lg">
        Coming soon...
      </p>
      <p className="mt-24 text-lg">
        Presale is live on <a href="https://www.basejump.pro/viewpresale?tokenAddress=0x5e72435d6211884Cc0c80d3f65BACADCB2abc46A" className="hover:underline">@basejumpdotpro</a>
      </p>
      <footer className='flex justify-center mt-auto gap-2'>
        <Link href="https://twitter.com/BasedPlace_">
          <Image src={twitterLogo} alt="Twitter" />
        </Link>
        <Link href="https://twitter.com/BasedPlace_">
          <Image src={mirrorLogo} alt="Mirror" />
        </Link>
      </footer>
    </main>
  );
}
