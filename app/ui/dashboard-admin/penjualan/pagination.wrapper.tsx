// app/ui/penjualan/pagination.wrapper.tsx  
'use client';  

import Pagination from '../katalog/pagination';  
import React from 'react';  

export default function PaginationWrapper({  
  totalPages,  
  currentPage  
}: {  
  totalPages: number;  
  currentPage: number;  
}) {  
  return <Pagination totalPages={totalPages} currentPage={currentPage} />;  
}  