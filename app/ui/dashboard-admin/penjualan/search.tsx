'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleClear = () => {
    const input = document.querySelector('input');
    if (input) input.value = '';
    const params = new URLSearchParams(searchParams);
    params.delete('query');
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex w-[300px]">
      <input
        className="text-black w-full rounded-md border border-gray-300 py-2 pl-10 pr-8 text-sm outline-none absolute-right"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {searchParams.get('query') ? (
          <button onClick={handleClear}>
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        ) : (
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        )}
      </div>
    </div>
  );
}