"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { newRocker } from '@/app/ui/fonts';

export default function VerificationCodeForm() {
  const [code, setCode] = useState('');
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your verification logic here
    console.log("Verification code submitted:", code);
  };

  
  const buttonClasses = code.trim() 
    ? "w-full bg-gray-600 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-900 transition duration-100" 
    : "w-full bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-100";

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="relative">
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
          <div className="w-100 h-100 relative">
            <Image 
              src="/spider.png" 
              alt="Spider" 
              width={120} 
              height={120} 
              className="object-contain"
            />
          </div>
        </div>
        
        
        <div className={`${newRocker.className} bg-white rounded-lg p-6 w-96 shadow-lg`}>
          <div className="mb-2">
            <button 
            className="text-gray-400"
            onClick={() => router.push('/auth/reset-password')} // ubah destinasi kembali disini
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <h1 className={`${newRocker.className} text-2xl font-bold mb-4`}>Kode Verifikasi</h1>
          <p className={`${newRocker.className} text-sm text-gray-600 mb-6`}>
            Masukkan kode verifikasi yang telah dikirimkan ke email anda
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="code" className={`${newRocker.className} block text-sm font-medium text-gray-700 mb-1`}>
                Kode
              </label>
              <input
                type="text"
                id="code"
                placeholder="Masukkan Kode"
                className={`${newRocker.className} w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400`}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6 text-sm">
              <span className={`${newRocker.className} text-gray-600`}>Belum menerima kode? </span>
              <Link href="#" className={`${newRocker.className} text-black-600 font-medium hover:underline`}>
                Kirim Ulang
              </Link>
            </div>
            
            <button
              type="submit"
              onClick={() => router.push('/auth/reset-password/atur-pass')} // page tujuan setelah verify      
              className={buttonClasses}
              disabled={code.trim() === ''}
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}