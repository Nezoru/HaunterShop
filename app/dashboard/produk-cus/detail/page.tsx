// app/dashboard/produk-cus/detail/page.tsx
import Image from 'next/image';
import { newRocker, shadowsIntoLightTwo } from '@/app/ui/fonts';
import Link from 'next/link';
import { getProdukById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

interface PageProps {
  searchParams?: Promise<{
    id?: string;
  }>;
}

export default async function ProductDetail({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const productId = resolvedSearchParams?.id;

  // Redirect to 404 if no ID provided
  if (!productId) {
    notFound();
  }

  // Fetch product data
  const product = await getProdukById(parseInt(productId));

  // Redirect to 404 if product not found
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black bg-gradient-to-b from-black to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white text-black rounded-lg overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
          {/* Left side - Product Image */}
          <div className="md:w-1/2">
            <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                src={product.image_produk}
                alt={product.nama_produk}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Right side - Product Details */}
          <div className="md:w-1/2 flex flex-col">
            <h2 className={`${newRocker.className} text-3xl mb-4 font-bold`}>Nama Kostum</h2>
            <div className="border border-gray-300 rounded-lg p-4 mb-6">
              <p className={`${shadowsIntoLightTwo.className} text-xl`}>
                {product.nama_produk}
              </p>
            </div>
            
            <h2 className={`${newRocker.className} text-3xl mb-4 font-bold`}>Harga Kostum</h2>
            <div className="border border-gray-300 rounded-lg p-4 mb-6">
              <p className={`${shadowsIntoLightTwo.className} text-xl font-semibold text-black`}>
                Rp{product.harga_produk.toLocaleString('id-ID')}
              </p>
            </div>

            {/* Stock Information */}
            <h2 className={`${newRocker.className} text-3xl mb-4 font-bold`}>Stok Tersedia</h2>
            <div className="border border-gray-300 rounded-lg p-4 mb-6">
              <p className={`${shadowsIntoLightTwo.className} text-xl ${
                product.stok === 0 ? 'text-red-600 font-bold' : 
                product.stok <= 5 ? 'text-orange-600 font-semibold' : 
                'text-green-600'
              }`}>
                {product.stok === 0 ? 'Stok Habis' : 
                 product.stok <= 5 ? `Stok Terbatas: ${product.stok} unit` :
                 `${product.stok} unit tersedia`
                }
              </p>
            </div>
            
            {/* Add to Cart Button - Only show if stock available */}
            {/* {product.stok > 0 ? (
              <AddToCartButton 
                productId={product.id}
                productName={product.nama_produk}
                productPrice={product.harga_produk}
                productStock={product.stok}
              />
            ) : (
              <div className={`${shadowsIntoLightTwo.className} text-2xl bg-gray-400 text-gray-600 py-3 px-6 rounded-lg flex items-center justify-center mt-auto cursor-not-allowed`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Stok Habis
              </div>
            )} */}
            
            {/* Back to shop link */}
            <Link 
              href="/dashboard/produk-cus" 
              className={`${shadowsIntoLightTwo.className} text-2xl text-center mt-4 text-blue-600 hover:text-blue-800 hover:underline transition-colors`}
            >
              ← Kembali ke Toko
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}