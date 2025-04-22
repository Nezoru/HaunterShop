// This file should be placed in app/dashboard/tentang-cus/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { shadowsIntoLightTwo, newRocker } from '@/app/ui/fonts';

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Lebron James",
      image: "/lebron.png",
      rating: 4,
      quote: "Kostume di sini membuat saya tampil percaya diri di pesta Halloween"
    },
    {
      name: "Berren Yesra",
      image: "/berren.png",
      rating: 5,
      quote: "Saya merasa menjadi Harley Quinn di dunia nyata untuk sesaat setelah membeli kostumnya di sini"
    },
    {
      name: "Evan Abel",
      image: "/evan.png",
      rating: 5,
      quote: "Kostum di sini cocok untuk orang yang bergaya elegan seperti saya"
    }
  ];

  return (
    <div className="min-h-screen bg-black bg-gradient-to-b from-black to-gray-900 text-white">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <h1 className={`${newRocker.className} text-center text-6xl font-bold mb-20 `}>Kata Mereka</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 relative w-32 h-32 rounded-full overflow-hidden">
                <Image 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              
              <h3 className={`${newRocker.className} text-3xl mb-3`}>{testimonial.name}</h3>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i}
                    className={`w-12 h-12 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className={`${newRocker.className} text-2xl md:text-3xl font-medium max-w-xs`}>{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}