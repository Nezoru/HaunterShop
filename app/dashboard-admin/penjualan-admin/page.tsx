// app/dashboard/penjualan/page.tsx  
import React from 'react';  
import Search from '@/app/ui/dashboard-admin/penjualan/search';  
import PenjualanTable from '@/app/ui/dashboard-admin/penjualan/penjualan-table';  
import { shadowsIntoLightTwo } from '@/app/ui/fonts';  
import Link from 'next/link';  

// Data mock di dalam file yang sama  
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

// Fungsi fetching penjualan  
function fetchPenjualan(query: string, page: number) {  
  const itemsPerPage = 5;  

  let filtered = mockPenjualan;  
  if (query) {  
    filtered = filtered.filter((item) =>  
      item.nama_pembeli.toLowerCase().includes(query.toLowerCase())  
    );  
  }  

  const start = (page - 1) * itemsPerPage;  
  const end = start + itemsPerPage;  
  const paginated = filtered.slice(start, end);  

  return {  
    penjualan: paginated,  
    totalPages: Math.ceil(filtered.length / itemsPerPage),  
  };  
}  

export default function PenjualanPage() {  
  // Mendapatkan query dan halaman dari URL menggunakan Next.js 13 built-in  
  const query = '';  // Default kosong  
  const currentPage = 1;  // Default halaman pertama  

  const { penjualan, totalPages } = fetchPenjualan(query, currentPage);  

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