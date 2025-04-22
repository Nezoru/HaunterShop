// sidenav.tsx
import Link from 'next/link';
import Image from 'next/image';  
import NavLinks from '@/app/ui/dashboard-admin/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { shadowsIntoLightTwo, poppins } from '@/app/ui/fonts'; // Pastikan import fonts sudah benar

export default function SideNav() {
  return (
    <div className={`flex h-full flex-col px-3 py-4 md:px-2 bg-[#000000] ${poppins.variable}`}>
      <div
        className="mb-2 flex h-20 items-center justify-center rounded-md bg-[#000000] p-4 md:h-40"
      >
        <div className="flex flex-col items-center justify-center text-center">
          {/* Logo hantu */}
          <div className="w-16 h-16 mb-2">
            <Image
              src="/Ghost01.png"
              alt="Ghost Logo"
              width={70}
              height={70}
              className="object-contain"
            />
          </div>
          
          {/* Teks Haunter Shop */}
          <h1 className={`${shadowsIntoLightTwo.className} text-2xl text-white`}>
            Haunter Shop
          </h1>
        </div>
      </div>
      
      {/* Bagian navigasi yang sudah ada */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-[#000000] md:block"></div>
      </div>
    </div>
  );
}