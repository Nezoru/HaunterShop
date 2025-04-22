// app/dashboard/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { shadowsIntoLightTwo } from '@/app/ui/fonts';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function HalloweenShop() {
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
      price: 400000,
      image: "/suit1.png"
    },
    {
      id: 6,
      name: "Harley Quinn",
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

  return (
    <div className="min-h-screen bg-black bg-gradient-to-b from-black to-gray-900 text-white pb-20">

      {/* Search Bar */}
      <div className="flex w-screnn justify-end mx-auto px-6 md:px-12 mb-8">
        <div className="relative w-full max-w-md">
          <input 
            type="text" 
            placeholder="Cari Disini..." 
            className={`${shadowsIntoLightTwo.className} w-full px-4 py-2 bg-white text-gray-500 rounded-md pr-12 text-lg`}
          />
          <button className="absolute border border-black right-0 top-0 bottom-0 px-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="absolute right-16 top-0 bottom-0 px-2 flex items-center justify-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Product Grid */}
      <div className="w-screnn grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-12">
        {products.map((product) => (
          <Link href={`/dashboard/produk-cus/detail?id=${product.id}`} key={product.id}>
            <div className="bg-white rounded-lg overflow-hidden text-center p-4 h-full transition-transform hover:scale-105 cursor-pointer">
              <div className="mb-4 h-48 relative">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className={`${shadowsIntoLightTwo.className} text-2xl md:text-3xl text-black`}>{product.name}</h3>
              <p className={`${shadowsIntoLightTwo.className} text-1xl md:text-2xl text-black`}>Rp{product.price.toLocaleString()}</p>
            </div>
          </Link>  
        ))}
      </div>
    </div>
  );
}