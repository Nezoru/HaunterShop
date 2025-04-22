// app/dashboard/penjualan/page.tsx  
import React, { Suspense } from 'react';  
import PenjualanPageContent from './penjualan-content';  
import { shadowsIntoLightTwo } from '@/app/ui/fonts';  
import Link from 'next/link';  
import Search from '@/app/ui/dashboard-admin/penjualan/search';  

export default function PenjualanPage() {  
  return (  
    <div className="bg-[#00000] min-h-screen p-6 text-white">  
      <div className="flex flex-col space-y-4 mb-6">  
        <div className="self-end">  
          <button  
            className={`bg-transparent text-white hover:bg-white/10 py-2 px-4 rounded border border-white  
            ${shadowsIntoLightTwo.className}  
            `}  
          >  
            Profile  
          </button>  
        </div>  

        <div className={`w-full flex justify-end items-center gap-4 mb-4 ${shadowsIntoLightTwo.className}`}>  
          <Search placeholder="Cari User Disini..." />  
          <Link href="/dashboard/penjualan/tambah">  
            <button   
              className={`bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-md font-semibold text-black ${shadowsIntoLightTwo.className}`}  
            >  
              Tambah Penjualan  
            </button>  
          </Link>  
        </div>  
      </div>  

      <Suspense fallback={<div>Loading...</div>}>  
        <PenjualanPageContent />  
      </Suspense>  
    </div>  
  );  
}