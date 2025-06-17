'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [inputValue, setInputValue] = useState(searchParams.get('query')?.toString() || '');
  
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
    
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // Reset ke halaman pertama saat search
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  
  const handleClear = () => {
    setInputValue('');
    const params = new URLSearchParams(searchParams);
    params.delete('query');
    params.set('page', '1'); // Reset ke halaman pertama
    replace(`${pathname}?${params.toString()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handleSearch(value);
  };

  return (
    <div className="relative flex items-center">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        className="pl-10 pr-10 py-2 rounded-md text-black w-64 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-500" />
      {inputValue && (
        <button 
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          type="button"
          aria-label="Clear search"
        >
          <XMarkIcon className="h-[18px] w-[18px]" />
        </button>
      )}
    </div>
  );
}