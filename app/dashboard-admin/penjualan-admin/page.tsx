// app/dashboard/penjualan/page.tsx   AWAL

import React from 'react';  
import Search from '@/app/ui/dashboard-admin/penjualan/search';  
import PenjualanTable from '@/app/ui/dashboard-admin/penjualan/penjualan-table';  
import { shadowsIntoLightTwo } from '@/app/ui/fonts';  
import { fetchPenjualan } from '@/app/lib/query/dataUtils';  
import Link from 'next/link';  

export default async function PenjualanPage() {  
  // Mendapatkan query dan halaman dari URL dengan cara berbeda  
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');  
  const query = searchParams.get('query') || '';  
  const page = searchParams.get('page') || '1';  
  const currentPage = Number(page);  

  const { penjualan, totalPages } = await fetchPenjualan(query, currentPage);  

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

      <PenjualanTable   
        penjualan={penjualan}   
        totalPages={totalPages}   
        currentPage={currentPage}   
      />  
    </div>  
  );  
}