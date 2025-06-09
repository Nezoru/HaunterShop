import { fetchRevenue } from '@/app/lib/data';
import RevenueChartClient from './revenue-chart-client';

export default async function RevenueChart() {
  const revenue = await fetchRevenue();

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return <RevenueChartClient revenue={revenue} />;
}