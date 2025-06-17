// app/ui/penjualan/pagination.tsx  
'use client';  

import React from 'react';  
import { newRocker } from '@/app/ui/fonts';  
import clsx from 'clsx';  

<<<<<<< HEAD
export default function Pagination({  
  totalPages,  
  currentPage,  
  onPageChange,  
}: {  
  totalPages: number;  
  currentPage: number;  
  onPageChange: (page: number) => void;  
}) {  
  const pageNumbers: React.ReactNode[] = [];  

  for (let i = 1; i <= totalPages; i++) {  
    pageNumbers.push(  
      <PaginationNumber  
        key={i}  
        page={i}  
        isActive={i === currentPage}  
        onClick={() => onPageChange(i)}  
      />  
    );  
  }  
=======
export default function Pagination({
  totalPages,
  currentPage,
  hideArrows = false, // Tambahkan prop untuk hide arrows jika diperlukan
}: {
  totalPages: number;
  currentPage: number;
  hideArrows?: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
>>>>>>> simpan-perubahan

  return pageNumbers;  
}  

<<<<<<< HEAD
function PaginationNumber({  
  page,  
  isActive,  
  onClick,  
}: {  
  page: number;  
  isActive: boolean;  
  onClick: () => void;  
}) {  
  return (  
    <button  
     onClick={onClick}  
      className={clsx(  
        `${newRocker.className}`,  
        'px-3 py-1 flex items-center justify-center text-sm',  
        {  
          // Ubah rounded-full menjadi rounded-md untuk sudut persegi  
          'bg-black text-white rounded-md': isActive,  
          'bg-white text-black border border-gray-300 rounded-md': !isActive,  
          'hover:bg-gray-100': typeof page === 'number'  
        }  
      )}  
    >  
      {page}  
    </button>  
  );  
}  
=======
  return (
    <div className="flex justify-center items-center space-x-1 bg-white">
      {/* Previous Arrow */}
      {!hideArrows && (
        <PaginationArrow
          href={createPageURL(currentPage - 1)}
          direction="left"
          isDisabled={currentPage <= 1}
        />
      )}

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        const isEdge = page === 1 || page === totalPages;
        const isNearCurrent = Math.abs(page - currentPage) <= 1;

        if (isEdge || isNearCurrent) {
          return (
            <PaginationNumber
              key={page}
              href={createPageURL(page)}
              page={page}
              isActive={page === currentPage}
            />
          );
        }

        if (page === 2 && currentPage > 4) {
          return <div key="ellipsis-1" className="px-3 py-1 text-gray-500">...</div>;
        }

        if (page === totalPages - 1 && currentPage < totalPages - 3) {
          return <div key="ellipsis-2" className="px-3 py-1 text-gray-500">...</div>;
        }

        return null;
      })}

      {/* Next Arrow */}
      {!hideArrows && (
        <PaginationArrow
          href={createPageURL(currentPage + 1)}
          direction="right"
          isDisabled={currentPage >= totalPages}
        />
      )}
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number;
  href: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        `${newRocker.className}`,
        'px-3 py-1 border border-gray-300 transition-colors duration-200',
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
  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  if (isDisabled) {
    return (
      <div className="px-3 py-1 border border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed">
        {icon}
      </div>
    );
  }

  return (
    <Link 
      href={href} 
      className="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-200 transition-colors duration-200"
    >
      {icon}
    </Link>
  );
}
>>>>>>> simpan-perubahan
