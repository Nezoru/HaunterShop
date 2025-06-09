import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana, newRocker, shadowsIntoLightTwo } from '@/app/ui/fonts';
import { getAllProduk } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const semuaproduk = await getAllProduk();
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
      <Card title="Kostum Terlaris Hari ini" value="Tidak ada" type="invoices" />
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
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="border border-white rounded-xl bg-black shadow-sm">
      <div className="flex p-1">
        {/* {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null} */}
        <h3 className={`${newRocker.className} px-4 py-2 text-sm font-medium`}>{title}</h3>
      </div>
      <p
        className={`${shadowsIntoLightTwo.className}
          truncate rounded-b-lg bg-white px-4 py-8 text-center text-2xl text-black`}
      >
        {value}
      </p>
    </div>
  );
}
