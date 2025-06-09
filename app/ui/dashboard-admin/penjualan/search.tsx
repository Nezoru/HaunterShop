'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    const handleSearch = useDebouncedCallback((term) => {
      console.log(`Searching... ${term}`);
      
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300);
    
    const handleClear = () => {
      const input = document.querySelector('input');
      if (input) input.value = '';
      const params = new URLSearchParams(searchParams);
      params.delete('query');
      replace(`${pathname}?${params.toString()}`);
    };

  return (
    <div className="relative flex items-center">
      <input
        className="pl-4 pr-10 py-2 rounded-md text-black w-64"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
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