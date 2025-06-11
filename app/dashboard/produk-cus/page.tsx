// app/dashboard/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { shadowsIntoLightTwo } from '@/app/ui/fonts';
import { Card } from '@/app/ui/dashboard-cus/cards';
import { getAllProduk, searchProduk } from '@/app/lib/data';
import SearchBar from '@/app/ui/dashboard/search-bar';

interface PageProps {
  searchParams?: Promise<{
    query?: string;
  }>;
}

export default async function HalloweenShop({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || '';
  
  // Gunakan fungsi search yang sudah ada di data.ts
  const products = query ? await searchProduk(query) : await getAllProduk();

  return (
    <div className="min-h-screen bg-black bg-gradient-to-b from-black to-gray-900 text-white pb-20">
      {/* Search Bar */}
      <div className="flex w-screen justify-end mx-auto px-6 md:px-12 mb-8">
        <SearchBar placeholder="Cari produk..." />
      </div>

      {/* Search Results Info */}
      {query && (
        <div className="px-12 mb-4">
          <p className={`${shadowsIntoLightTwo.className} text-lg text-gray-300`}>
            {products.length > 0 
              ? `Menampilkan ${products.length} produk untuk "${query}"`
              : `Tidak ada produk yang ditemukan untuk "${query}"`
            }
          </p>
        </div>
      )}
      
      {/* Product Grid */}
      <div className="w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-12">
        {products.length > 0 ? (
          products.map((product) => (
            <Link href={`/dashboard/produk-cus/detail?id=${product.id}`} key={product.id}>
              <div className="bg-white rounded-lg overflow-hidden text-center p-4 h-full transition-transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                <div className="mb-4 h-48 relative">
                  <Image 
                    src={product.image_produk}
                    alt={product.nama_produk}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className={`${shadowsIntoLightTwo.className} text-2xl md:text-3xl text-black mb-2`}>
                  {product.nama_produk}
                </h3>
                <p className={`${shadowsIntoLightTwo.className} text-xl md:text-2xl text-black font-bold`}>
                  Rp{product.harga_produk.toLocaleString()}
                </p>
                {product.stok <= 5 && product.stok > 0 && (
                  <p className="text-sm text-red-500 mt-1">Stok tersisa: {product.stok}</p>
                )}
                {product.stok === 0 && (
                  <p className="text-sm text-red-600 font-bold mt-1">Stok habis</p>
                )}
              </div>
            </Link>  
          ))
        ) : query ? (
          <div className="col-span-full text-center py-16">
            <div className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.291-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p className={`${shadowsIntoLightTwo.className} text-xl`}>
                Tidak ada produk yang ditemukan
              </p>
              {/* <Link 
                href="/dashboard"
                className="inline-block mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Lihat Semua Produk
              </Link> */}
            </div>
          </div>
        ) : (
          <div className="col-span-full text-center py-16">
            <p className={`${shadowsIntoLightTwo.className} text-xl text-gray-400`}>
              Tidak ada produk tersedia
            </p>
          </div>
        )}
      </div>
    </div>
  );
}