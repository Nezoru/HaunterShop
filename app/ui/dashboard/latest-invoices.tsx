import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana, newRocker, shadowsIntoLightTwo } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';
import { getAllTransaksiWithDetails } from '@/app/lib/data';
import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
  const allTransactions = await getAllTransaksiWithDetails();

  const latestTransactions = allTransactions
    .sort((a, b) => new Date(b.tanggal_transaksi).getTime() - new Date(a.tanggal_transaksi).getTime())
    .slice(0, 5);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // const formatDate = (dateString: Date) => {
  //   return new Date(dateString).toLocaleDateString('id-ID', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   });
  // };

  return (
     <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${newRocker.className} mb-4 text-xl md:text-2xl`}>
        Riwayat Transaksi
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6 text-black">
          {latestTransactions.length > 0 ? (
            latestTransactions.map((transaction, i) => {
              return (
                <div
                  key={transaction.id}
                  className={clsx(
                    'flex flex-row items-center justify-between py-4',
                    {
                      'border-t': i !== 0,
                    },
                  )}
                >
                  <div className="flex items-center">
                    {/* <Image
                      src={transaction.image_url || '/default-avatar.png'}
                      alt={`${transaction.nama_pembeli}'s profile picture`}
                      className="mr-4 rounded-full"
                      width={32}
                      height={32}
                    /> */}
                    <div className="min-w-0">
                      <p className={`${shadowsIntoLightTwo.className} truncate font-semibold md:text-base`}>
                        {transaction.nama_pembeli}
                      </p>
                      <p className={`${shadowsIntoLightTwo.className} text-sm text-gray-600`}>
                        {transaction.email}
                      </p>
                      {/* <p className={`${shadowsIntoLightTwo.className} text-xs text-gray-500`}>
                        {formatDate(transaction.tanggal_transaksi)}
                      </p> */}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`${shadowsIntoLightTwo.className} truncate text-sm font-medium md:text-base text-green-600`}>
                      {formatCurrency(transaction.harga)}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center">
              <p className={`${shadowsIntoLightTwo.className} text-gray-500`}>
                Belum ada transaksi
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className={`${shadowsIntoLightTwo.className} ml-2 text-sm text-gray-500`}>
            Diperbarui baru saja
          </h3>
        </div>
      </div>
    </div>
  );
}