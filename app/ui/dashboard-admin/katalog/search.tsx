'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { shadowsIntoLightTwo } from '@/app/ui/fonts';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const handleSearch = useDebouncedCallback((term) => {
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
<div className={`relative flex w-75 ${shadowsIntoLightTwo.className}`}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className={`text-black w-full rounded-l-md border border-gray-200 py-2 pl-3 pr-8 text-sm outline-none`}
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        {searchParams.get('query') ? (
          <button onClick={handleClear}>
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        ) : (
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        )}
      </div>
      <button className="bg-white rounded-r-md border-r border-t border-b border-gray-200 px-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  );
}