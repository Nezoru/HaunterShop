'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteProduct } from '@/app/lib/actions';
import { shadowsIntoLightTwo } from '@/app/ui/fonts';
import { useState } from 'react';

interface DeleteButtonProps {
  id: string;
  nama_produk: string;
}

export function DeleteButton({ id, nama_produk }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm(
      `Apakah Anda yakin ingin menghapus produk "${nama_produk}"? Tindakan ini tidak dapat dibatalkan.`
    );
    
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await deleteProduct(id);
      // Revalidation and redirect handled in server action
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Gagal menghapus produk. Silakan coba lagi.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`${
        isDeleting 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-red-500 hover:bg-red-600'
      } text-white px-4 py-1 rounded flex items-center border border-black ${shadowsIntoLightTwo.className}`}
    >
      <TrashIcon className="h-4 w-4 mr-1" />
      {isDeleting ? 'Menghapus...' : 'Hapus'}
    </button>
  );
}
