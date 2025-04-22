// app/dashboard/newarrival-cus/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { shadowsIntoLightTwo, newRocker } from '@/app/ui/fonts';

export default function NewArrivalPage() {
  return (
    <div className="min-h-screen bg-black bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero Section with Featured Product */}
      <div className="h-full flex flex-col md:flex-row items-center justify-between px-12 py-16">
        {/* Left Content */}
        <div className="h-full w-full md:w-1/2 mb-8 md:mb-0 justify-between items-center">
          <h1 className={`${newRocker.className} text-5xl md:text-7xl font-bold mb-6 font-horror tracking-wider `}>
            NEW ARRIVAL
          </h1>
          <p className={`${newRocker.className} text-2xl mb-8 max-w-lg `}>
            Hadir dengan gaya elegan! Jangan sampai kehabisan, beli sekarang!
          </p>
        </div>
        
        {/* Right Content */}
        <div className="md:w-1/2 flex flex-col items-center">
          <h2 className={`${newRocker.className} mb-8 text-4xl md:text-5xl font-bold`}>Joker</h2>
          <div className="relative h-96 w-full items-center">
            <Image 
              src="/jokerremove.png"
              alt="Joker Costume"
              fill
              className="object-contain"
            />
          </div>
          <Link href="/dashboard/produk-cus" className={`${shadowsIntoLightTwo.className} mt-10 bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded text-2xl`}>
            Lihat produk
          </Link>
        </div>
      </div>
    </div>
  );
}