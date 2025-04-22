// app/dashboard/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { shadowsIntoLightTwo, newRocker } from '@/app/ui/fonts';

export default function HaunterShop() {
  return (
    <div className="min-h-screen bg-black bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Main Content */}
      <main className="h-screen px-6 md:px-12 py-8">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between py-24">
          {/* Text Section */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className={`${newRocker.className} text-7xl md:text-6xl font-bold mb-4`}>
              Selamat Datang<br />DI HaunterShop
            </h1>
            <p className={`${shadowsIntoLightTwo.className} text-5xl md:text-4xl text-xl mb-8`}>
              Temukan Gaya Serammu...
            </p>
            
            <div className="flex space-x-4">
              <Link href="/" className={`${shadowsIntoLightTwo.className} text-2xl md:text-2xl text-xl mb-8 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition-colors`}>
                Login
              </Link>
              <Link href="/dashboard/produk-cus" className={`${shadowsIntoLightTwo.className} text-2xl md:text-2xl text-xl mb-8 border border-white px-8 py-3 rounded hover:bg-white hover:text-black transition-colors`}>
                Lihat produk
              </Link>
            </div>
          </div>
          
          {/* Image Section */}
          <div className="md:w-1/2 relative h-[300px] md:h-[400px]">
            <div className="absolut w-full h-full flex items-center justify-center">
              {/* Add your Halloween characters here - using placeholder divs */}
              <div className="relative">
                {/* Bat at the top */}
                <div className="absolute top-[-0px] left-[0px]">
                  <div className="relative w-16 h-8">
                    <Image 
                      src="/bat02.png" 
                      alt="Bat"
                      width={64}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </div>
                
                {/* Central Cat Character + Pumpkin + Doll */}
                <div className="relative w-700 h-750">
                  <Image 
                    src="/GroupIcon.png" 
                    alt="Cat Character"
                    width={700}
                    height={750}
                    className="object-contain"
                  />
                </div>
                
                {/* White BG */}
                <div className="absolute left-[-0px] bottom-[0px]">
                  <div className="relative w-1000 h-700">
                    <Image 
                      src="/Image.png" 
                      alt="White BG"
                      width={1000}
                      height={700}
                      className="object-contain"
                    />
                  </div>
                </div>
                
                {/* Spider Web */}
                <div className="absolute right-[-0px] top-[-0px]">
                  <div className="relative w-24 h-24">
                    <Image 
                      src="/Web02.png" 
                      alt="Spider Web"
                      width={1080}
                      height={1080}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}