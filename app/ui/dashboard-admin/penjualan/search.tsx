// app/ui/penjualan/search.tsx  
'use client';  

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
}