'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    // Handle search on client side
    // If you need to navigate/refresh with new data, you can use router.push
    // For now, let's just use a state variable
    console.log("Search term:", searchTerm);
    
    // If you want to implement actual navigation:
    // router.push(`/dashboard/penjualan?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        className="pl-4 pr-10 py-2 rounded-md text-black w-64"
        placeholder={placeholder}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <button 
        onClick={handleSearch}
        className="absolute right-3 text-gray-500"
      >
        🔍
      </button>
    </div>
  );
}