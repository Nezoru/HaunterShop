// app/ui/katalog/katalog-table.tsx
import Image from 'next/image';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { shadowsIntoLightTwo, newRocker } from '@/app/ui/fonts';
import Link from 'next/link';
import { getPaginatedSearchProduk } from '@/app/lib/data';
import { getProdukById } from '@/app/lib/data';
import { DeleteButton } from './delete-form';


// Update the Produk type to match your database structure
export type Produk = {
  id: string;
  nama_produk: string;
  harga_produk: number;
  image_produk: string;
  stok: number;
  id_transaksis_produk_id: string;
};

export default async function KatalogTable({ 
  query = '',
  currentPage = 1, 
}: {
  query?: string;
  currentPage?: number 
}) {
  // Use the new search function with pagination
  const { products, totalPages, totalItems } = await getPaginatedSearchProduk(
    query, 
    currentPage, 
    5 // items per page
  );

  return (
    <div className="overflow-x-auto bg-white rounded-lg">
      {/* Search Results Info */}
      {query && (
        <div className={`p-4 bg-gray-50 border-b ${shadowsIntoLightTwo.className}`}>
          <p className="text-sm text-gray-600">
            Menampilkan {products.length} dari {totalItems} hasil untuk "{query}"
          </p>
        </div>
      )}

      <table className="min-w-full">
        <thead className="bg-black text-white border border-white">
          <tr>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>ID</th>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Produk</th>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Harga</th>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Stok</th>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${shadowsIntoLightTwo.className}`}>
                  {product.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-20 w-20 flex items-center justify-center overflow-hidden">
                      <Image
                        src={product.image_produk}
                        alt={product.nama_produk}
                        width={64}
                        height={54}
                        className="object-contain rounded"
                      />
                    </div>
                    <div className="ml-4">
                      <div className={`text-sm font-medium text-gray-900 ${shadowsIntoLightTwo.className}`}>
                        {product.nama_produk}
                      </div>
                    </div>
                  </div>
                </td>
                <td className={`${shadowsIntoLightTwo.className} px-6 py-4 whitespace-nowrap text-sm text-black`}>
                  Rp{product.harga_produk.toLocaleString()}
                </td>
                <td className={`${shadowsIntoLightTwo.className} px-6 py-4 whitespace-nowrap text-sm text-black`}>
                  {product.stok}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <Link href={`/dashboard-admin/katalog-admin/edit?id=${product.id}`}>
                      <button className={`bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded flex items-center border border-black ${shadowsIntoLightTwo.className}`}>
                        <PencilSquareIcon className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                    </Link>
                    <DeleteButton 
                        id={product.id} 
                        nama_produk={product.nama_produk}
                      />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className={`px-6 py-8 text-center text-gray-500 ${shadowsIntoLightTwo.className}`}>
                {query ? `Tidak ada produk yang ditemukan untuk "${query}"` : 'Tidak ada produk'}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination - only show if there are results */}
      {totalPages > 1 && (
        <div className="flex justify-center p-4 bg-white">
          <nav className={`flex space-x-1 ${newRocker.className}`}>
            {/* Previous button */}
            {currentPage > 1 && (
              <Link
                href={`?${query ? `query=${encodeURIComponent(query)}&` : ''}page=${currentPage - 1}`}
                className="px-3 py-1 bg-white text-black hover:bg-gray-200 border border-gray-300"
              >
                ‹ Prev
              </Link>
            )}
            
            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`?${query ? `query=${encodeURIComponent(query)}&` : ''}page=${page}`}
                className={`px-3 py-1 ${
                  page === currentPage ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'
                } border border-gray-300`}
              >
                {page}
              </Link>
            ))}
            
            {/* Next button */}
            {currentPage < totalPages && (
              <Link
                href={`?${query ? `query=${encodeURIComponent(query)}&` : ''}page=${currentPage + 1}`}
                className="px-3 py-1 bg-white text-black hover:bg-gray-200 border border-gray-300"
              >
                Next ›
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}