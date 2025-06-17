// revenue-chart.tsx (Server Component)
import { fetchRevenueFromTransaksi } from '@/app/lib/data';
import RevenueChartClient from './revenue-chart-client';

export default async function RevenueChart() {
  try {
    // Menggunakan data transaksi nyata untuk revenue chart
    const revenue = await fetchRevenueFromTransaksi();

    if (!revenue || revenue.length === 0) {
      return (
        <div className="w-full md:col-span-4">
          <div className="rounded-xl bg-gray-50 p-8 text-center">
            <p className="text-gray-400">No transaction data available.</p>
            <p className="text-sm text-gray-300 mt-2">
              Revenue chart will appear when transactions are recorded.
            </p>
          </div>
        </div>
      );
    }

    return <RevenueChartClient revenue={revenue} />;
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    return (
      <div className="w-full md:col-span-4">
        <div className="rounded-xl bg-red-50 p-8 text-center">
          <p className="text-red-500">Failed to load revenue data.</p>
          <p className="text-sm text-red-400 mt-2">
            Please check your database connection.
          </p>
        </div>
      </div>
    );
  }
}