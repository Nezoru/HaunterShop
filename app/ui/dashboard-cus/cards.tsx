import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana, newRocker, shadowsIntoLightTwo } from '@/app/ui/fonts';
import { getAllProduk, getKostumTerlarisBulanIni } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const semuaproduk = await getAllProduk();
  const kostumTerlaris = await getKostumTerlarisBulanIni();
  
  return (
    <>
      <Card 
        title="Kostum Terlaris Bulan Ini" 
        value={kostumTerlaris ? kostumTerlaris.nama_produk : "Tidak ada data"} 
        type="invoices" 
        // subtitle={kostumTerlaris ? `${kostumTerlaris.total_transaksi} transaksi` : undefined}
      />
      <Card
        title="Total Produk"
        value={semuaproduk.length}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
  subtitle,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
  subtitle?: string;
}) {
  const Icon = iconMap[type];

  return (
    <div className="border border-white rounded-xl bg-black shadow-sm">
      <div className="flex p-1">
        <h3 className={`${newRocker.className} px-4 py-2 text-sm font-medium`}>{title}</h3>
      </div>
      <div
        className={`${shadowsIntoLightTwo.className}
          truncate rounded-b-lg bg-white px-4 py-8 text-center text-black`}
      >
        <p className="text-2xl font-bold">
          {value}
        </p>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-2">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}