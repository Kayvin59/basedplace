import Image from 'next/image';
import Link from 'next/link';

import { useActiveAccount } from 'thirdweb/react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import userLogo from '../public/user.svg';


export default function AccountDropdown() {
    const account = useActiveAccount();
    return (
        <>
            {account && (
                <div className='mr-4 sm:mr-8'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='border border-foreground focus-visible:ring-offset-0 focus-visible:ring-transparent'>
                                <Image src={userLogo} alt="user logo" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Link href="/#playground">Playground</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/#dashboard">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/marketplace">Marketplace</Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem className='hover:cursor-not-allowed'>Docs</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </>
    );
}