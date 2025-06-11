// app/dashboard/page.tsx
import { shadowsIntoLightTwo, poppins, newRocker } from "@/app/ui/fonts";
import { Card } from "../ui/dashboard-cus/cards";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import RevenueChartClient from "../ui/dashboard/revenue-chart-client";
import { Suspense } from "react";
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from "../ui/skeletons";
import { getAllProduk } from "@/app/lib/data";
import CardWrapper from "../ui/dashboard-cus/cards";
import Link from 'next/link';

export default async function DashboardPage() {
  // Guided
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  // Mock data - bisa diganti nanti pakai fetch atau props
  const topCustomer = {
    name: "Jajang",
    count: 5,
  };

  const mostOrdered = {
    name: "Kostum Joker ",
    quantity: 3,
  };

  const semuaproduk = await getAllProduk();

  return (
    <div className={`${poppins.className} bg-black min-h-screen p-6 text-white`}>
      {/* Tombol Profile */}
      <div className="flex justify-end mb-6">
        <button
          className={`border border-white text-white px-4 py-2 rounded ${shadowsIntoLightTwo.className}`}
        > <Link href="/dashboard-admin/profile">
          Profile </Link>
        </button>
      </div>

      {/* Guided */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <Suspense fallback={<CardsSkeleton/>}>
          <CardWrapper/>
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton/>}>
          <RevenueChart/>
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton/>}>
          <LatestInvoices/>
        </Suspense>
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </div>
  );
}