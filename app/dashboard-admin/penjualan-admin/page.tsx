<<<<<<< HEAD
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
=======
// app/dashboard-admin/penjualan-admin/page.tsx
import React, { Suspense } from 'react';
import Search from '@/app/ui/dashboard-admin/penjualan/search';
import { shadowsIntoLightTwo } from '@/app/ui/fonts';
import Link from 'next/link';
import { PenjualanSkeleton } from '@/app/ui/skeletons';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

// Buat component terpisah untuk data fetching
async function PenjualanContent({ 
  query, 
  currentPage 
}: { 
  query: string; 
  currentPage: number; 
}) {
  const { getPaginatedSearchTransaksi } = await import('@/app/lib/data');
  const PenjualanTable = (await import('@/app/ui/dashboard-admin/penjualan/penjualan-table')).default;
  
  const itemsPerPage = 5;
  
  // Tambahkan artificial delay untuk demonstrasi skeleton
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const paginatedResult = await getPaginatedSearchTransaksi(query, currentPage, itemsPerPage);
  
  return (
    <PenjualanTable
      allTransaksi={paginatedResult.transactions}
      totalPages={paginatedResult.totalPages}
      currentPage={currentPage}
      totalItems={paginatedResult.totalItems}
    />
  );
}

export default async function PenjualanPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || '';
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  return (
    <div className="bg-[#000000] min-h-screen p-6 text-white">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="self-end">
          <Link href="/dashboard-admin/profile">
            <button
              className={`bg-transparent text-white hover:bg-white/10 py-2 px-4 rounded border border-white
              ${shadowsIntoLightTwo.className}
              `}
            >
              Profile
            </button>
          </Link>
        </div>

        <div className={`w-full flex justify-end items-center gap-4 mb-4 ${shadowsIntoLightTwo.className}`}>
          <Search placeholder="Cari transaksi..." />
          <Link href="/dashboard-admin/penjualan-admin/tambah">
            <button
              className={`bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-md font-semibold text-black ${shadowsIntoLightTwo.className}`}
            >
              Tambah Penjualan
            </button>
          </Link>
        </div>
      </div>

      {/* Suspense dengan key yang berubah saat search/pagination berubah */}
      <Suspense 
        key={`${query}-${currentPage}-${Date.now()}`} 
        fallback={<PenjualanSkeleton />}
      >
        <PenjualanContent query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
>>>>>>> simpan-perubahan
}