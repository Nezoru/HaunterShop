// app/dashboard/page.tsx
import { shadowsIntoLightTwo, poppins, newRocker } from "@/app/ui/fonts";
import { TopCustomer } from "@/app/ui/dashboard-admin/top-customer";
import { MostOrderedCostume } from "@/app/ui/dashboard-admin/most-ordered-customer";

export default function DashboardPage() {
  // Mock data - bisa diganti nanti pakai fetch atau props
  const topCustomer = {
    name: "Jajang",
    count: 5,
  };

  const mostOrdered = {
    name: "Kostum Joker ",
    quantity: 3,
  };

  return (
    <div className={`${poppins.className} bg-black min-h-screen p-6 text-white`}>
      {/* Tombol Profile */}
      <div className="flex justify-end mb-6">
        <button
          className={`border border-white text-white px-4 py-2 rounded ${shadowsIntoLightTwo.className}`}
        >
          Profile
        </button>
      </div>

      {/* Kartu Pemasukan dan Pengeluaran */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white text-black rounded-lg border border-white">
          <div
            className={`bg-black text-white px-4 py-2 rounded-t-lg ${newRocker.className}`}
          >
            Pemasukan
          </div>
          <div className={`px-4 py-6 text-center text-xl ${shadowsIntoLightTwo.className}`}>
            + Rp6.800.000
          </div>
        </div>
        <div className="bg-white text-black rounded-lg border border-white">
          <div
            className={`bg-black text-white px-4 py-2 rounded-t-lg ${newRocker.className}`}
          >
            Pengeluaran
          </div>
          <div className={`px-4 py-6 text-center text-xl ${shadowsIntoLightTwo.className}`}>
            - Rp4.750.000
          </div>
        </div>
      </div>

      {/* Komponen Top Customer & Most Ordered Costume */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <TopCustomer name={topCustomer.name} count={topCustomer.count} />
        <MostOrderedCostume name={mostOrdered.name} quantity={mostOrdered.quantity} />
      </div>

      {/* Tabel Histori Transaksi */}
      <div className="bg-white text-black rounded-lg border border-white">
        <div
          className={`bg-black text-white px-4 py-2 rounded-t-lg text-center text-lg ${newRocker.className}`}
        >
          Histori Transaksi
        </div>
        <table className="min-w-full table-fixed text-sm">
          <thead className="border-t border-b border-black">
            <tr className={shadowsIntoLightTwo.className}>
              <th className="px-4 py-2 w-1/12 border">ID</th>
              <th className="px-4 py-2 w-2/12 border">Nama</th>
              <th className="px-4 py-2 w-2/12 border">Harga</th>
              <th className="px-4 py-2 w-2/12 border">Jumlah</th>
              <th className="px-4 py-2 w-2/12 border">Tanggal</th>
              <th className="px-4 py-2 w-2/12 border">Waktu</th>
            </tr>
          </thead>
          <tbody>
            <tr className={shadowsIntoLightTwo.className}>
              <td className="px-4 py-2 border">1</td>
              <td className="px-4 py-2 border">Jajang</td>
              <td className="px-4 py-2 border">Rp250.000</td>
              <td className="px-4 py-2 border">1</td>
              <td className="px-4 py-2 border">2024-03-23</td>
              <td className="px-4 py-2 border">10:15</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}