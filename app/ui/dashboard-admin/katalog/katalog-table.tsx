// app/ui/katalog/katalog-table.tsx
import Image from 'next/image';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { shadowsIntoLightTwo, newRocker } from '@/app/ui/fonts';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function KatalogTable({
  products,
  totalPages,
  currentPage,
}: {
  products: {
    id: number;
    name: string;
    price: number;
    image: string;
  }[];
  totalPages: number;
  currentPage: number;
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg">
      <table className="min-w-full">
        <thead className="bg-black text-white border border-white">
          <tr>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>ID</th>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Produk</th>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Harga</th>
            <th className={`px-6 py-3 text-left text-sm font-medium ${shadowsIntoLightTwo.className}`}>Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${shadowsIntoLightTwo.className}`}>{product.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-20 w-20 flex items-center justify-center overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={54}
                      className="object-contain rounded"
                    />
                  </div>
                  <div className="ml-4">
                    <div className={`text-sm font-medium text-gray-900 ${shadowsIntoLightTwo.className}`}>{product.name}</div>
                  </div>
                </div>
              </td>
              <td className={`${shadowsIntoLightTwo.className} px-6 py-4 whitespace-nowrap text-sm text-black `}>
                Rp{product.price.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex space-x-2">
                <Link href={`/dashboard-admin/katalog-admin/edit?id=${product.id}`}>
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
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center p-4 bg-white">
        <nav className={`flex space-x-1 ${newRocker.className}`}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <a
              key={page}
              href={`?page=${page}`}
              className={`px-3 py-1 ${
                page === currentPage ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'
              } border border-gray-300`}
            >
              {page}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}