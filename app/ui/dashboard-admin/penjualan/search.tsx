// app/ui/penjualan/search.tsx  
'use client';  

<<<<<<< HEAD
import { useState } from 'react';  
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';  

interface SearchProps {  
  placeholder: string;  
  onSearch?: (query: string) => void;  
}  

export default function Search({ placeholder, onSearch }: SearchProps) {  
  const [searchTerm, setSearchTerm] = useState('');  

  const handleSearch = () => {  
    if (onSearch) {  
      onSearch(searchTerm);  
    }  
  };  

  const handleClear = () => {  
    setSearchTerm('');  
    if (onSearch) {  
      onSearch('');  
    }  
  };  

  return (  
    <div className="relative flex w-[300px]">  
      <input  
        type="text"  
        placeholder={placeholder}  
        value={searchTerm}  
        onChange={(e) => setSearchTerm(e.target.value)}  
        className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-8 text-sm outline-none"  
      />  
      <div className="absolute left-3 top-1/2 -translate-y-1/2">  
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />  
      </div>  
      {searchTerm && (  
        <button   
          onClick={handleClear}   
          className="absolute right-2 top-1/2 -translate-y-1/2"  
        >  
          <XMarkIcon className="h-5 w-5 text-gray-500" />  
        </button>  
      )}  
      <button   
        onClick={handleSearch}  
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2"  
      >  
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />  
      </button>  
    </div>  
  );  
=======
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
      <div className="relative">
        <input
          className="pl-10 pr-10 py-2 rounded-md text-black w-64 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        {inputValue && (
          <button 
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            type="button"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
>>>>>>> simpan-perubahan
}