import React from 'react';
import Search from '@/app/ui/dashboard-admin/penjualan/search';
import PenjualanTable from '@/app/ui/dashboard-admin/penjualan/penjualan-table';
import { shadowsIntoLightTwo } from '@/app/ui/fonts';
import Link from 'next/link';
import { 
  getAllTransaksiWithDetails, 
  fetchFilteredTransaksi, 
  fetchTransaksiPages 
} from '@/app/lib/data';
import { Suspense } from 'react';
import { PenjualanSkeleton } from '@/app/ui/skeletons';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function PenjualanPage({ searchParams }: Props) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // Jika ada query, gunakan fungsi filtered, jika tidak gunakan getAllTransaksiWithDetails
  const allTransaksi = query 
    ? await fetchFilteredTransaksi(query, currentPage)
    : await getAllTransaksiWithDetails();
    
  const totalPages = query 
    ? await fetchTransaksiPages(query)
    : Math.ceil((await getAllTransaksiWithDetails()).length / 6); // Assuming ITEMS_PER_PAGE = 6
  
  return (
    <div className="bg-[#000000] min-h-screen p-6 text-white">
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

      <Suspense fallback={<PenjualanSkeleton />}>
        <PenjualanTable
          allTransaksi={allTransaksi}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </Suspense>
    </div>
  );
}