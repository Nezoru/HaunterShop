//app/dashboard/penjualan/page.tsx
import React from 'react';
import Search from '@/app/ui/dashboard-admin/penjualan/search';
import PenjualanTable from '@/app/ui/dashboard-admin/penjualan/penjualan-table';
import { shadowsIntoLightTwo } from '@/app/ui/fonts';
import { fetchPenjualan } from '@/app/lib/query/route';
import Link from 'next/link';

export default async function PenjualanPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const { penjualan, totalPages } = await fetchPenjualan(query, currentPage);

  return (
    <div className="bg-[#00000] min-h-screen p-6 text-white">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="self-end">
          <button
            className={`
              bg-transparent
              text-white
              hover:bg-white/10
              py-2
              px-4
              rounded
              border
              border-white
              ${shadowsIntoLightTwo.className}
            `}
          >
            Profile
          </button>
        </div>

        <div className={`w-full flex justify-end items-center gap-4 mb-4 ${shadowsIntoLightTwo.className}`}>
          <Search placeholder="Cari User Disini..." />
          <Link href="/dashboard-admin/penjualan-admin/tambah">
          <button className={`bg-green-400 hover:bg-green-500 px-4 py-2 rounded-md font-semibold text-black ${shadowsIntoLightTwo.className}`}>
            Tambah Penjualan
          </button>
          </Link>

        </div>
      </div>

      <PenjualanTable penjualan={penjualan} totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}