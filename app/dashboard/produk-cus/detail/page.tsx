// app/dashboard/produk-cus/page.tsx
import Image from 'next/image';
import { newRocker, shadowsIntoLightTwo } from '@/app/ui/fonts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  searchParams: {
    id?: string;
  };
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  gender?: string;
}

export default function ProductDetail({ searchParams }: ProductPageProps) {
  const productId = searchParams.id ? parseInt(searchParams.id) : null;
  
  // This would typically come from a database or API
  const products: Product[] = [
    {
      id: 1,
      name: "Casper",
      price: 250000,
      image: "/casper.png"
    },
    {
      id: 2,
      name: "Walter White",
      price: 380000,
      image: "/suityellow.png"
    },
    {
      id: 3,
      name: "Annabelle",
      price: 500000,
      image: "/suitwhite.png"
    },
    {
      id: 4,
      name: "Michael Myers",
      price: 400000,
      image: "/killer.png"
    },
    {
      id: 5,
      name: "Harley Quinn - Women Jumpsuit",
      gender: "Female",
      price: 400000,
      image: "/suit1.png"
    },
    {
      id: 6,
      name: "Harley Quinn",
      gender: "Female",
      price: 400000,
      image: "/suit2.png"
    },
    {
      id: 7,
      name: "Terrifier",
      price: 500000,
      image: "/clown.png"
    },
    {
      id: 8,
      name: "Joker",
      gender: "Male",
      price: 400000,
      image: "/joker.png"
    },
    {
        id: 9,
        name: "Casper",
        price: 250000,
        image: "/casper.png"
      },
      {
        id: 10,
        name: "Walter White",
        price: 380000,
        image: "/suityellow.png"
      },
      {
        id: 11,
        name: "Annabelle",
        price: 500000,
        image: "/suitwhite.png"
      },
      {
        id: 12,
        name: "Michael Myers",
        price: 400000,
        image: "/killer.png"
      },
      {
        id: 13,
        name: "Harley Quinn - Women Jumpsuit",
        price: 400000,
        image: "/suit1.png"
      },
      {
        id: 14,
        name: "Harley Quinn",
        price: 400000,
        image: "/suit2.png"
      },
      {
        id: 15,
        name: "Terrifier",
        price: 500000,
        image: "/clown.png"
      },
      {
        id: 16,
        name: "Joker",
        price: 400000,
        image: "/joker.png"
      }
  ];

  // Find the selected product
  const product = products.find(p => p.id === productId);
  
  // If product doesn't exist, show 404
  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-black bg-gradient-to-b from-black to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white text-black rounded-lg overflow-hidden items-center">
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
          {/* Left side - Product Image */}
          <div className="md:w-1/2">
            <div className="relative h-96 w-full">
              <Image 
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          {/* Right side - Product Details */}
          <div className="md:w-1/2 flex flex-col">
            <h2 className={`${newRocker.className} text-3xl mb-4 font-bold`}>Nama Kostum</h2>
            <div className="border border-gray-300 rounded-lg p-4 mb-6">
              <p className={`${shadowsIntoLightTwo.className} text-xl`}>{product.name}{product.gender ? ` - ${product.gender}` : ''}</p>
            </div>
            
            <h2 className={`${newRocker.className} text-3xl mb-4 font-bold`}>Harga Kostum</h2>
            <div className="border border-gray-300 rounded-lg p-4 mb-6">
              <p className={`${shadowsIntoLightTwo.className} text-xl`}>Rp{product.price.toLocaleString()}</p>
            </div>
            
            <h2 className={`${newRocker.className} text-3xl mb-4 font-bold`}>Size Kostum</h2>
            <div className="mb-6">

            {/* Change Size */}
            <div className="relative">
                <select className={`${shadowsIntoLightTwo.className} w-full bg-transparent appearance-none outline-none border border-gray-300 rounded-lg p-4 pr-10`}>
                    <option value="S" selected>S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </div>

            </div>
            <button className={`${shadowsIntoLightTwo.className} text-2xl bg-gray-300 hover:bg-gray-400 text-black py-3 px-6 rounded-lg flex items-center justify-center mt-auto`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </button>
            
            {/* Back to shop link */}
            <Link href="/dashboard" className={`${shadowsIntoLightTwo.className} text-2xl text-center mt-4 text-blue-600 hover:underline`}>
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}