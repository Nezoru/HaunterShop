// app/ui/dashboard-cus/search-bar.tsx
'use client';

import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { shadowsIntoLightTwo } from '@/app/ui/fonts';

interface SearchBarProps {
  placeholder: string;
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query')?.toString() || '');

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);
    
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    handleSearch('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          className={`${shadowsIntoLightTwo.className} w-full px-4 py-2 bg-white text-gray-500 rounded-md pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
        />
        <button 
          type="submit"
          className="absolute border border-black right-0 top-0 bottom-0 px-4 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        {searchTerm && (
          <button 
            type="button"
            onClick={clearSearch}
            className="absolute right-16 top-0 bottom-0 px-2 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </form>
    </div>
  );
}
