// app/dashboard/katalog/page.tsx
import React from 'react';
import Search from '@/app/ui/dashboard-admin/katalog/search';   
import KatalogTable from '@/app/ui/dashboard-admin/katalog/katalog-table';
import Link from 'next/link';
import { poppins } from '@/app/ui/fonts';
import { shadowsIntoLightTwo } from '@/app/ui/fonts';  
import { getAllProduk } from '@/app/lib/data';
import { Suspense } from 'react';
import { KatalogSkeleton } from '@/app/ui/skeletons';

export default async function KatalogPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const allProduk = await getAllProduk();
  
  return (
    <div className={`${shadowsIntoLightTwo.className} p-6 bg-black min-h-screen`}>
      <div className="flex justify-end items-center mb-6">
        <button className={`bg-transparent text-white hover:bg-white/10 py-2 px-4 rounded border border-white ${shadowsIntoLightTwo.className}`}> <Link href="./profile">
          Profile
          </Link>
        </button>
      </div>
      
      <div className={`w-full flex justify-end items-center gap-4 mb-4 ${shadowsIntoLightTwo.className}`}>
        <Search placeholder="Cari Disini" />  
        <Link   
          href="/dashboard-admin/katalog-admin/tambah"   
          className={`bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded text-black border border-white ${shadowsIntoLightTwo.className}`}  
        >  
          Tambah Kostum  
        </Link>  
      </div>  
      
      <Suspense key={query + currentPage} fallback={<KatalogSkeleton />}>
        <KatalogTable query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}