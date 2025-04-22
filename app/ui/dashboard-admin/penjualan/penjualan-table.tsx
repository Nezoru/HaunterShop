// app/ui/penjualan/penjualan-table.tsx  
'use client';  

import React from 'react';  
import PaginationWrapper from './pagination.wrapper';  
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';   
import { shadowsIntoLightTwo } from '@/app/ui/fonts';  
import Link from 'next/link';  

type Penjualan = {  
  id: number;  
  tanggal: string;  
  harga: number;  
  nama_pembeli: string;  
  produk_dibeli: string;  
}  

interface Props {  
  penjualan: Penjualan[];  
  totalPages: number;  
  currentPage: number;  
  onDelete?: (id: number) => void;  
}  

export default function PenjualanTable({   
  penjualan,   
  totalPages,   
  currentPage,  
  onDelete   
}: Props) {  
  const handleDelete = (id: number) => {  
    if (onDelete) {  
      onDelete(id);  
    }  
  };  

  return (  
    <div className="overflow-x-auto bg-white rounded-lg">  
      <table className="min-w-full">  
        <thead className="bg-black text-white border border-white">  
          <tr>  
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>ID</th>  
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Tanggal</th>  
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Harga</th>  
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Nama Pembeli</th>  
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Produk Dibeli</th>  
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Aksi</th>  
          </tr>  
        </thead>  
        <tbody className="divide-y divide-gray-200">  
          {penjualan.map((item) => (  
            <tr key={item.id} className="hover:bg-gray-50">  
              <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${shadowsIntoLightTwo.className}`}>{item.id}</td>  
              <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${shadowsIntoLightTwo.className}`}>  
                {new Date(item.tanggal).toLocaleDateString('id-ID')}  
              </td>  
              <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${shadowsIntoLightTwo.className}`}>Rp{item.harga.toLocaleString()}</td>  
              <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${shadowsIntoLightTwo.className}`}>{item.nama_pembeli}</td>  
              <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${shadowsIntoLightTwo.className}`}>{item.produk_dibeli}</td>  
              <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${shadowsIntoLightTwo.className}`}>  
                <div className="flex space-x-2">  
                  <Link href={`/dashboard/penjualan/edit?id=${item.id}`}>  
                    <button className={`bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded flex items-center border border-black ${shadowsIntoLightTwo.className}`}>  
                      <PencilSquareIcon className="h-4 w-4 mr-1" />  
                      Edit  
                    </button>  
                  </Link>  
                  <button   
                    onClick={() => handleDelete(item.id)}  
                    className={`bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded flex items-center border border-black ${shadowsIntoLightTwo.className}`}  
                  >  
                    <TrashIcon className="h-4 w-4 mr-1" />  
                    Hapus  
                  </button>  
                </div>  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
      
      <div className="p-4 flex justify-center">  
        <PaginationWrapper   
          totalPages={totalPages}   
          currentPage={currentPage}   
        />  
      </div>  
    </div>  
  );  
} 