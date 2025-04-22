'use client';  

import { useState } from 'react';  
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';  
import { shadowsIntoLightTwo } from '@/app/ui/fonts';  

interface SearchProps {  
  onSearch?: (query: string) => void;  
  placeholder: string;  
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
    <div className={`relative flex w-75 ${shadowsIntoLightTwo.className}`}>  
      <label htmlFor="search" className="sr-only">  
        Search  
      </label>  
      <input  
        className={`w-full rounded-l-md border border-gray-200 py-2 pl-3 pr-8 text-sm outline-none`}  
        placeholder={placeholder}  
        value={searchTerm}  
        onChange={(e) => setSearchTerm(e.target.value)}  
      />  
      <div className="absolute right-2 top-1/2 -translate-y-1/2">  
        {searchTerm ? (  
          <button onClick={handleClear}>  
            <XMarkIcon className="h-5 w-5 text-gray-500" />  
          </button>  
        ) : (  
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />  
        )}  
      </div>  
      <button   
        onClick={handleSearch}   
        className="bg-white rounded-r-md border-r border-t border-b border-gray-200 px-2"  
      >  
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />  
      </button>  
    </div>  
  );  
} 