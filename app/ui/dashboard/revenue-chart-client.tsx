'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana, newRocker } from '@/app/ui/fonts';

interface RevenueData {
  month: string;
  revenue: number;
}

export default function RevenueChartClient({ revenue }: { revenue: RevenueData[] }) {
  const monthOrder = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const sortedRevenue = [...revenue].sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );

  // Format angka ke format Rupiah
  const formatToRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format untuk YAxis (lebih ringkas)
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `Rp${value / 1000000}Jt`;
    } else if (value >= 1000) {
      return `Rp${value / 1000}Rb`;
    }
    return `Rp${value}`;
  };

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${newRocker.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={sortedRevenue}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatYAxis} />
            <Tooltip 
              formatter={(value: number) => [formatToRupiah(value), 'Revenue']} 
              labelFormatter={(label) => `Bulan: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="black"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}