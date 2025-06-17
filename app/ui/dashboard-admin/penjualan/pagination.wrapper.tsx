'use client';

import Pagination from '../penjualan/pagination';
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function PaginationWrapper({
  totalPages,
}: {
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  return (
    <Pagination 
      totalPages={totalPages} 
      currentPage={currentPage} // Pass currentPage yang sudah ada
    />
  );
}