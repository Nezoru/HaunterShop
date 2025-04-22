import {newRocker, shadowsIntoLightTwo } from "@/app/ui/fonts";

export function TopCustomer({
  name,
  count,
}: {
  name: string;
  count: number;
}) {
  return (
    <div className="bg-white text-black rounded-lg border border-white">
      <div className={` bg-black text-white px-4 py-2 rounded-t-lg font-semibold ${newRocker.className} `}>
        Top Customer
      </div>
      <div className={`p-6 ${shadowsIntoLightTwo.className}`}>
        <h2 className="text-lg font-semibold mb-2">
          Transaksi Pelanggan Terbanyak Bulan Ini
        </h2>
        {name ? (
          <>
            <p className="text-xl font-bold">{name}</p>
            <p>Melakukan {count} transaksi</p>
          </>
        ) : (
          <p>Tidak ada data transaksi bulan ini.</p>
        )}
      </div>
    </div>
  );
}