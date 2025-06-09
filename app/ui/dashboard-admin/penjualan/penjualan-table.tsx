// app/ui/dashboard-admin/penjualan/penjualan-table.tsx  
import React from 'react';  
import PaginationWrapper from './pagination.wrapper';  
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'; 
import { shadowsIntoLightTwo } from '@/app/ui/fonts';
import Link from 'next/link';

// Interface untuk TransaksiWithDetails (sesuai dengan yang di data.ts)
interface TransaksiWithDetails {
  id: string;
  tanggal_transaksi: Date;
  harga: number;
  nama_produk: string;
  harga_produk: number;
  image_produk: string;
  nama_pembeli: string;
  email: string;
  image_url: string;
}

interface Props {
  allTransaksi: TransaksiWithDetails[];
  totalPages: number;
  currentPage: number;
}

export const dynamic = 'force-dynamic';

export default function PenjualanTable({ allTransaksi, totalPages, currentPage }: Props) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg">
      <table className="min-w-full">
        <thead className="bg-black text-white border border-white">
          <tr>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>ID</th>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Tanggal</th>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Harga</th>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Nama Pembeli</th>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Email Pembeli</th>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Produk Dibeli</th>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {allTransaksi.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                Tidak ada data penjualan yang ditemukan
              </td>
            </tr>
          ) : (
            allTransaksi.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${shadowsIntoLightTwo.className}`}>
                  {item.id}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${shadowsIntoLightTwo.className}`}>
                  {new Date(item.tanggal_transaksi).toLocaleDateString('id-ID')}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${shadowsIntoLightTwo.className}`}>
                  Rp{item.harga.toLocaleString('id-ID')}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${shadowsIntoLightTwo.className}`}>
                  {item.nama_pembeli}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${shadowsIntoLightTwo.className}`}>
                  {item.email}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${shadowsIntoLightTwo.className}`}>
                  <div className="flex items-center">
                    {item.image_produk && (
                      <img 
                        src={item.image_produk} 
                        alt={item.nama_produk}
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                      />
                    )}
                    {item.nama_produk}
                  </div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${shadowsIntoLightTwo.className}`}>
                  <div className="flex space-x-2">
                    <Link href={`/dashboard-admin/penjualan-admin/edit?id=${item.id}`}>
                      <button className={`bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded flex items-center border border-black ${shadowsIntoLightTwo.className}`}>
                        <PencilSquareIcon className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                    </Link>
                    <button className={`bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded flex items-center border border-black ${shadowsIntoLightTwo.className}`}>
                      <TrashIcon className="h-4 w-4 mr-1" />
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {totalPages > 1 && (
        <div className="p-4 flex justify-center">
          <PaginationWrapper totalPages={totalPages} />
        </div>
      )}
    </div>  
  );  
}