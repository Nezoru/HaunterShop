// app/dashboard/penjualan/page.tsx  
import React from 'react';  
import Search from '@/app/ui/dashboard-admin/penjualan/search';  
import PenjualanTable from '@/app/ui/dashboard-admin/penjualan/penjualan-table';  
import { shadowsIntoLightTwo } from '@/app/ui/fonts';  
import { fetchPenjualan } from '@/app/lib/query/dataUtils';  
import Link from 'next/link';  

// Mock data penjualan  
const mockPenjualan = [  
  { id: 1, tanggal: '2024-03-23', harga: 250000, nama_pembeli: 'Jajang', produk_dibeli: 'Casper  ' },  
  { id: 2, tanggal: '2024-03-22', harga: 400000, nama_pembeli: 'Udin', produk_dibeli: 'Michael Myers  ' },  
  { id: 3, tanggal: '2024-03-21', harga: 500000, nama_pembeli: 'Berren', produk_dibeli: 'Annabelle  ' },  
  { id: 4, tanggal: '2024-03-20', harga: 400000, nama_pembeli: 'Dadang', produk_dibeli: 'Joker  ' },  
  { id: 5, tanggal: '2024-03-19', harga: 400000, nama_pembeli: 'Rina', produk_dibeli: 'Harley Quinn  ' },  
  { id: 6, tanggal: '2024-03-18', harga: 300000, nama_pembeli: 'Wati', produk_dibeli: 'Chucky  ' },  
  { id: 7, tanggal: '2024-03-17', harga: 320000, nama_pembeli: 'Dewi', produk_dibeli: 'Scream Mask' },  
  { id: 8, tanggal: '2024-03-16', harga: 350000, nama_pembeli: 'Bambang', produk_dibeli: 'Freddy Krueger Glove' },  
  { id: 9, tanggal: '2024-03-15', harga: 375000, nama_pembeli: 'Sinta', produk_dibeli: 'Saw Mask' },  
  { id: 10, tanggal: '2024-03-14', harga: 390000, nama_pembeli: 'Yoga', produk_dibeli: 'Zombie Makeup Kit' }  
];  

// Fungsi fetchPenjualan yang tidak bergantung pada searchParams  
function fetchPenjualanData(query: string = '', page: number = 1) {  
  const itemsPerPage = 5;  

  // Filter berdasarkan query  
  let filtered = query   
    ? mockPenjualan.filter((item) =>   
        item.nama_pembeli.toLowerCase().includes(query.toLowerCase())  
      )   
    : mockPenjualan;  

  // Pagination  
  const start = (page - 1) * itemsPerPage;  
  const end = start + itemsPerPage;  
  const penjualan = filtered.slice(start, end);  

  return {  
    penjualan,  
    totalPages: Math.ceil(filtered.length / itemsPerPage)  
  };  
}  

export default function PenjualanPage() {  
  // Gunakan default values  
  const query = '';  
  const currentPage = 1;  

  const { penjualan, totalPages } = fetchPenjualanData(query, currentPage);  

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