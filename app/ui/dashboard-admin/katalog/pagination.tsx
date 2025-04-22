'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { newRocker } from '@/app/ui/fonts';

export default function 
Pagination({
  totalPages,
  hideArrows = false, // default: tampilkan arrows
}: {
  totalPages: number;
  hideArrows?: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center space-x-1">
      {/* Previous page */}
      {!hideArrows && (
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />
      )}
      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        // Display current page, first, last, and pages around current
        const shouldDisplay = 
          page === 1 || 
          page === totalPages || 
          Math.abs(page - currentPage) <= 1;
        
        if (shouldDisplay) {
          return (
            <PaginationNumber
              key={page}
              href={createPageURL(page)}
              page={page}
              isActive={page === currentPage}
            />
          );
        }

        // Show ellipsis for page gaps (after first page and before last)
        if (page === 2 && currentPage > 3) {
          return <div key="ellipsis-1">...</div>;
        }
        
        if (page === totalPages - 1 && currentPage < totalPages - 2) {
          return <div key="ellipsis-2">...</div>;
        }

        return null;
      })}

      {!hideArrows && (
        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      )}
    </div>
  );
}

function PaginationNumber({ page, href, isActive }: { page: number, href: string, isActive: boolean }) {
  return (
    <Link
      href={href}
      className={clsx(
        `${newRocker.className}`, 
        'px-3 py-1 border border-gray-300',
        {
          'bg-black text-white': isActive,
          'bg-white text-black hover:bg-gray-200': !isActive,
        }
      )}
    >
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled: boolean;
}) {
  const icon = direction === 'left' ? <ArrowLeftIcon className="w-4" /> : <ArrowRightIcon className="w-4" />;

  if (isDisabled) {
    return (
      <div className="px-3 py-1 border border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed">
        {icon}
      </div>
    );
  }

  return (
    <Link href={href} className="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-200">
      {icon}
    </Link>
  );
}