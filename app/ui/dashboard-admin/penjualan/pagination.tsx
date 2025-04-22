// app/ui/penjualan/pagination.tsx  
'use client';  

import React from 'react';  
import { newRocker } from '@/app/ui/fonts';  
import clsx from 'clsx';  

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

  return pageNumbers;  
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