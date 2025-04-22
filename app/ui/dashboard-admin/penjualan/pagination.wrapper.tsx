'use client';

import Pagination from '../katalog/pagination';
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function PaginationWrapper({
    totalPages,
  }: {
    totalPages: number;
  }) {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
  
    return <Pagination totalPages={totalPages} hideArrows />;
  }