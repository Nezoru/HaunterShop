// app/dashboard/katalog/page.tsx
import React from 'react';
import { poppins } from '@/app/ui/fonts';
import Search from '@/app/ui/dashboard-admin/katalog/search';   
import KatalogTable from '@/app/ui/dashboard-admin/katalog/katalog-table';
import { shadowsIntoLightTwo } from '@/app/ui/fonts';  
import Link from 'next/link';
import { fetchKatalog } from '@/app/lib/query/route'; // <- Import fetchKatalog

export default async function KatalogPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const query = typeof searchParams?.query === 'string' ? searchParams.query : '';
  const currentPage = typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1;

  const { katalog, totalPages } = await fetchKatalog(query, currentPage); // Ambil data katalog

  return (
    <div className={`${poppins.className} p-6 bg-black min-h-screen`}>
      <div className="flex justify-end items-center mb-6">
        <button className={`bg-transparent text-white hover:bg-white/10 py-2 px-4 rounded border border-white ${shadowsIntoLightTwo.className}`}>
          Profile
        </button>
      </div>
      
      <div className="flex justify-end items-center gap-4 mb-6">
      <Search placeholder="Cari Disini" />  
        {/* Ubah button Tambah Kostum menjadi Link */}  
        <Link   
          href="/dashboard/katalog/tambah"   
          className={`bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded text-black border border-white ${shadowsIntoLightTwo.className}`}  
        >  
          Tambah Kostum  
        </Link>  
      </div>  
      
      <KatalogTable products={katalog} totalPages={totalPages}  currentPage={currentPage} />
    </div>
  );
}