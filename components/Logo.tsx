import Image from 'next/image';
import Link from 'next/link';

import logo from '../public/logo.png';

export default function Logo() {
    return (
        <span className='w-14 inline-block cursor-pointer'>
            <Link href="/">
                <Image src={logo} alt="Based Place Logo" />
            </Link>
        </span>
    );
}