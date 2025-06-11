// app/ui/dashboard-admin/penjualan/penjualan-table.tsx  
'use client';
import React, { useState, useTransition } from 'react';  
import PaginationWrapper from './pagination.wrapper';  
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'; 
import { shadowsIntoLightTwo } from '@/app/ui/fonts';
import Link from 'next/link';
import { deleteTransaksiAction } from '@/app/lib/actions';

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
  
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    
    startTransition(async () => {
      try {
        const result = await deleteTransaksiAction(id);
        
        if (result.success) {
          alert(result.message);
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error('Error deleting transaction:', error);
        alert('Terjadi kesalahan saat menghapus transaksi');
      } finally {
        setDeletingId(null);
        setShowConfirmModal(null);
      }
    });
  };

  const confirmDelete = (id: string) => {
    setShowConfirmModal(id);
  };

  return (
    <div className="relative">
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
                      {/* <Link href={`/dashboard-admin/penjualan-admin/edit?id=${item.id}`}>
                        <button className={`bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded flex items-center border border-black ${shadowsIntoLightTwo.className}`}>
                          <PencilSquareIcon className="h-4 w-4 mr-1" />
                          Edit
                        </button> 
                      </Link> */}
                      <button 
                        onClick={() => confirmDelete(item.id)}
                        disabled={deletingId === item.id || isPending}
                        className={`${
                          deletingId === item.id || isPending
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-red-500 hover:bg-red-600'
                        } text-white px-4 py-1 rounded flex items-center border border-black ${shadowsIntoLightTwo.className}`}
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
                        {deletingId === item.id ? 'Menghapus...' : 'Hapus'}
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

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className={`text-lg font-semibold mb-4 text-black ${shadowsIntoLightTwo.className}`}>
              Konfirmasi Hapus
            </h3>
            <p className={`text-gray-600 mb-6 ${shadowsIntoLightTwo.className}`}>
              Apakah Anda yakin ingin menghapus transaksi dengan ID: <strong>{showConfirmModal}</strong>?
              <br />
              <span className="text-red-500">Tindakan ini tidak dapat dibatalkan.</span>
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(null)}
                className={`px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded border border-gray-400 ${shadowsIntoLightTwo.className}`}
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(showConfirmModal)}
                disabled={deletingId === showConfirmModal || isPending}
                className={`px-4 py-2 ${
                  deletingId === showConfirmModal || isPending
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-500 hover:bg-red-600'
                } text-white rounded border border-red-600 ${shadowsIntoLightTwo.className}`}
              >
                {deletingId === showConfirmModal ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );  
}