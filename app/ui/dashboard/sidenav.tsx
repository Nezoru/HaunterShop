'use client';

import Link from 'next/link';
import Image from 'next/image';  
import { PowerIcon } from '@heroicons/react/24/outline';
import { shadowsIntoLightTwo } from '@/app/ui/fonts';
import { usePathname } from 'next/navigation';

export default function SideNav() {
  const pathname = usePathname();
  
  // Function to check if the link is active
  const isActive = (path: string) => {
    return pathname === path || (path !== '/dashboard' && pathname?.startsWith(path));
  };

  return (
    <div className="flex-grow min-h-1 bg-black from-black to-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center py-10 px-6 md:px-12">
        <div className="flex items-center space-x-8">
          <div className="flex h-12 w-12 justify-center">
            <Image 
              src="/Ghost01.png" 
              alt="Ghost Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        </div>
        
        <div className="hidden md:flex space-x-8 text-md gap-4">
          {/* Navigation links with active indicator */}
          <div className="relative">
            <Link href="/dashboard" className={`${shadowsIntoLightTwo.className} justify-start text-white text-3xl font-normal hover:text-gray-300`}>
              Beranda
            </Link>
            {isActive('/dashboard') && (
              <div className="absolute h-1 bg-white w-full bottom-[-8px]"></div>
            )}
          </div>
          
          <div className="relative">
            <Link href="/dashboard/produk-cus" className={`${shadowsIntoLightTwo.className} justify-start text-white text-3xl font-normal hover:text-gray-300`}>
              Produk
            </Link>
            {isActive('/dashboard/produk-cus') && (
              <div className="absolute h-1 bg-white w-full bottom-[-8px]"></div>
            )}
          </div>
          
          <div className="relative">
            <Link href="/dashboard/newarrival-cus" className={`${shadowsIntoLightTwo.className} justify-start text-white text-3xl font-normal hover:text-gray-300`}>
              New Arrivals
            </Link>
            {isActive('/dashboard/newarrival-cus') && (
              <div className="absolute h-1 bg-white w-full bottom-[-8px]"></div>
            )}
          </div>
          
          <div className="relative">
            <Link href="/dashboard/ulasan-cus" className={`${shadowsIntoLightTwo.className} justify-start text-white text-3xl font-normal hover:text-gray-300`}>
              Ulasan
            </Link>
            {isActive('/dashboard/ulasan-cus') && (
              <div className="absolute h-1 bg-white w-full bottom-[-8px]"></div>
            )}
          </div>
          
          <div className="relative">
            <Link href="/dashboard/tentang-cus" className={`${shadowsIntoLightTwo.className} justify-start text-white text-3xl font-normal hover:text-gray-300`}>
              Tentang Kami
            </Link>
            {isActive('/dashboard/tentang-cus') && (
              <div className="absolute h-1 bg-white w-full bottom-[-8px]"></div>
            )}
          </div>
        </div>
        
        <Link href="/" className={`${shadowsIntoLightTwo.className} justify-start text-white text-2xl font-normal px-10 py-4 outline outline-[2.67px] outline-offset-[-2.67px] outline-white hover:text-black-300 border border-white rounded hover:bg-white hover:text-black transition-colors`}>
          Login
        </Link>
      </nav>
    </div>
  );
}