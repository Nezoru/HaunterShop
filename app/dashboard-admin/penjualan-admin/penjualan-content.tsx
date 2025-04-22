// app/dashboard/penjualan/penjualan-content.tsx  
'use client';  

import { useState } from 'react';  
import PenjualanTable from '@/app/ui/dashboard-admin/penjualan/penjualan-table';  

// Mock data penjualan  
const mockPenjualan = [  
  { id: 1, tanggal: '2024-03-23', harga: 250000, nama_pembeli: 'Jajang', produk_dibeli: 'Casper' }, 
  { id: 2, tanggal: '2024-03-22', harga: 400000, nama_pembeli: 'Udin', produk_dibeli: 'Michael Myers  ' },
  { id: 3, tanggal: '2024-03-21', harga: 500000, nama_pembeli: 'Berren', produk_dibeli: 'Annabelle  ' },
  { id: 4, tanggal: '2024-03-20', harga: 400000, nama_pembeli: 'Dadang', produk_dibeli: 'Joker  ' },
  { id: 5, tanggal: '2024-03-19', harga: 400000, nama_pembeli: 'Rina', produk_dibeli: 'Harley Quinn  ' }, 
];  

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

export default function PenjualanPageContent() {  
  const [currentPage, setCurrentPage] = useState(1);  
  const [searchQuery, setSearchQuery] = useState('');  
  const [penjualanList, setPenjualanList] = useState(mockPenjualan);  

  const { penjualan, totalPages } = fetchPenjualanData(searchQuery, currentPage);  

  const handleSearch = (query: string) => {  
    setSearchQuery(query);  
    setCurrentPage(1);  
  };  

  const handleDelete = (id: number) => {  
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data penjualan ini?');  
    if (confirmDelete) {  
      const updatedPenjualan = penjualanList.filter(item => item.id !== id);  
      setPenjualanList(updatedPenjualan);  
    }  
  };  

  return (  
    <PenjualanTable   
      penjualan={penjualan}  
      totalPages={totalPages}  
      currentPage={currentPage}  
      onDelete={handleDelete}  
    />  
  );  
}