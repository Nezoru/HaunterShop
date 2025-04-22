'use client';  

import { useState } from 'react';  
import clsx from 'clsx';  
import { newRocker } from '@/app/ui/fonts';  

export default function Pagination({  
  totalPages,  
  currentPage,  
  onPageChange,  
}: {  
  totalPages: number;  
  currentPage: number;  
  onPageChange?: (page: number) => void;  
}) {  
  const handlePageChange = (page: number) => {  
    if (onPageChange) {  
      onPageChange(page);  
    }  
  };  

  return (  
    <div className="flex justify-center items-center space-x-1 bg-white">  
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {  
        const isEdge = page === 1 || page === totalPages;  
        const isNearCurrent = Math.abs(page - currentPage) <= 1;  

        if (isEdge || isNearCurrent) {  
          return (  
            <PaginationNumber  
              key={page}  
              page={page}  
              isActive={page === currentPage}  
              onClick={() => handlePageChange(page)}  
            />  
          );  
        }  

        if (page === 2 && currentPage > 4) {  
          return <div key="ellipsis-1" className="px-3 py-1">...</div>;  
        }  

        if (page === totalPages - 1 && currentPage < totalPages - 3) {  
          return <div key="ellipsis-2" className="px-3 py-1">...</div>;  
        }  

        return null;  
      })}  
    </div>  
  );  
}  

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
        'px-3 py-1 border border-gray-300',  
        {  
          'bg-black text-white': isActive,  
          'bg-white text-black hover:bg-gray-200': !isActive,  
        }  
      )}  
    >  
      {page}  
    </button>  
  );  
}