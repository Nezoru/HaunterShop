// app/dashboard/tentang-cus/page.tsx

import Image from 'next/image';
import { shadowsIntoLightTwo, newRocker } from '@/app/ui/fonts';

export default function TentangKami() {
  return (
    <div className="min-h-screen bg-black bg-gradient-to-b from-black to-gray-900 text-white">
      <main className="px-6 md:px-12 py-16 flex flex-col items-center">
        {/* Ghost Icon */}
        <Image 
          src="/Ghost01.png" 
          alt="Ghost Logo"
          width={100}
          height={100}
          className="mb-4"
        />

        {/* Nama Toko */}
        <h1 className={`${shadowsIntoLightTwo.className} text-4xl md:text-5xl font-bold mb-6`}>
          Haunter Shop
        </h1>

        {/* Deskripsi */}
        <p className={`${shadowsIntoLightTwo.className} w-screen text-3xl px-12 mb-20 text-left`}>
          Haunter adalah toko kostum halloween yang menyediakan berbagai jenis kostum bertemakan halloween. 
          Haunter berdiri sejak 30 Oktober 2019, memiliki 3 pendiri yang membangun Haunter dengan 
          keputusan-keputusan yang menguntungkan Haunter hingga bisa berdiri sampai sekarang.
        </p>

        {/* Section Alamat + Tim */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Alamat & Peta */}
          <div className="flex flex-col items-center">
            <p className={`${shadowsIntoLightTwo.className} text-3xl mb-4 text-center`}>
              Jalan Babarsari RT00/RW005 Catur Tunggal,<br />
              Depok, DI YOGYAKARTA
            </p>
            <Image 
              src="/maphaunter.png" // ganti dengan map yang kamu pakai
              alt="Lokasi Peta"
              width={450}
              height={350}
              className="rounded-md border-gray-500"
            />
          </div>

          {/* Tim Pendiri */}
          <div className="flex flex-col gap-6 items-center justify-center text-left">
            {/* Person 1 */}
            <p className={`${shadowsIntoLightTwo.className} text-3xl text-start mb-4`}>
              Pendiri Haunter Shop
            </p>
            <div className="flex items-center gap-4">
              <Image src="/erlan.png" alt="Erlan" width={60} height={60} className="rounded-full border border-white" />
              <div>
                <h3 className={`${shadowsIntoLightTwo.className} text-3xl font-bold underline`}>Erlan Frylin Lamba</h3>
                <p className={`${shadowsIntoLightTwo.className} text-2xl`}>CEO Haunter Shop</p>
              </div>
            </div>
            {/* Person 2 */}
            <div className="flex items-center gap-4">
              <Image src="/faiz.png" alt="Faiz" width={60} height={60} className="rounded-full border border-white" />
              <div>
                <h3 className={`${shadowsIntoLightTwo.className} text-3xl font-bold underline`}>Faiz Rizq Farhanna</h3>
                <p className={`${shadowsIntoLightTwo.className} text-2xl`}>CTO Haunter Shop</p>
              </div>
            </div>
            {/* Person 3 */}
            <div className="flex items-center gap-4">
              <Image src="/noel.png" alt="Noel" width={60} height={60} className="rounded-full border border-white" />
              <div>
                <h3 className={`${shadowsIntoLightTwo.className} text-3xl font-bold underline`}>Noel Yudistira   </h3>
                <p className={`${shadowsIntoLightTwo.className} text-2xl`}>CMO Haunter Shop</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}