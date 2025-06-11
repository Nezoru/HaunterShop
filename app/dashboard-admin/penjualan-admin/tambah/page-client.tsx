'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { shadowsIntoLightTwo, newRocker } from '@/app/ui/fonts';
import { tambahTransaksi } from '@/app/lib/actions';

type Produk = {
  id: string;          // id disamakan dengan tipe dari db
  nama_produk: string;
  harga_produk: number;
};

interface TambahPenjualanPageProps {
  produkList: Produk[];
}

export default function TambahPenjualanPage({ produkList }: TambahPenjualanPageProps) {
  const [produk, setProduk] = useState('');
  const [harga, setHarga] = useState('');
  const [namaPembeli, setNamaPembeli] = useState('');
  const [emailPembeli, setEmailPembeli] = useState('');
  const [tanggal, setTanggal] = useState('');
  
  const router = useRouter();

  const handleProdukChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduk = produkList.find(p => p.id === e.target.value);
    setProduk(e.target.value);
     setHarga(selectedProduk?.harga_produk?.toString() || ''); // jika ada harga di produkList
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await tambahTransaksi({
        produk,
        namaPembeli,
        emailPembeli,
        harga: Number(harga),
        tanggal,
      });
      router.push('/dashboard-admin/penjualan-admin');
    } catch (error) {
      console.error('Gagal simpan transaksi:', error);
      alert('Gagal menyimpan transaksi');
    }
  };
  return (
    <div className="w-full max-w-[1444px] h-[700px] relative bg-white rounded-[10px] overflow-hidden">
      <h1 className={`absolute left-[26px] top-[25px] text-black text-4xl font-normal ${shadowsIntoLightTwo.className}`}>
        Tambah Penjualan
      </h1>


      <label className="absolute left-[64px] top-[94px] text-black text-base font-['New_Rocker']">Nama Produk</label>
      <select
        value={produk}
        onChange={handleProdukChange}
        className="absolute left-[51px] top-[117px] w-[761px] h-14 bg-slate-50 rounded-xl shadow-[inset_0_2px_0_0_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 text-black/80 font-['New_Rocker']"
      >
        <option value="">-- Pilih Produk --</option>
        {produkList.map(p => (
          <option key={p.id} value={p.id}>
            {p.nama_produk}
          </option>
        ))}
      </select>

      <label className="absolute left-[840px] top-[89px] text-black text-base font-['New_Rocker']">Harga Produk</label>
      <input
        type="text"
        value={harga}
        readOnly
        placeholder="Harga Otomatis"
        className="absolute left-[830px] top-[117px] w-80 h-14 bg-gray-200 rounded-xl shadow-[inset_0_2px_0_0_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 text-black/80 font-['New_Rocker']"
      />


      {/* List Produk
      <div className="absolute left-[51px] top-[219px] w-[1263px] h-44 bg-slate-50 rounded-xl shadow-[inset_0_2px_0_0_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300">
        <p className="absolute left-[13px] top-[-20px] text-black text-base font-['New_Rocker']">List Produk Pembelian</p>
        <div className="absolute left-[17px] top-[15px] w-3.5 h-3.5 bg-white border border-black" />
        <div className="absolute left-[61px] top-[8px] w-96 px-3 py-2.5 inline-flex items-center gap-2.5">
          <span className="text-black/40 text-base font-['New_Rocker']">Nama Produk</span>
        </div>
        <div className="absolute left-[17px] top-[47px] w-[1220px] h-[1px] bg-zinc-400" />

      </div> */}

      {/* Nama Pembeli */}
      <label className="absolute left-[64px] top-[470px] text-black text-base font-['New_Rocker']">Nama Pembeli</label>
      <input
        type="text"
        value={namaPembeli}
        onChange={(e) => setNamaPembeli(e.target.value)}
        placeholder="Masukkan Nama Pembeli"
        className="absolute left-[51px] top-[495px] w-80 h-14 bg-slate-50 rounded-xl shadow-[inset_0_2px_0_0_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 text-black/80 font-['New_Rocker']"
      />

      <label className="absolute left-[400px] top-[470px] text-black text-base font-['New_Rocker']">Email Pembeli</label>
      <input
        type="email"
        value={emailPembeli}
        onChange={(e) => setEmailPembeli(e.target.value)}
        placeholder="Masukkan Email Pembeli"
        className="absolute left-[400px] top-[496px] w-80 h-14 bg-slate-50 rounded-xl shadow-[inset_0_2px_0_0_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 text-black/80 font-['New_Rocker']"
      />


      {/* Tanggal Penjualan */}
      <label className="absolute right-[64px] top-[472px] text-black text-base font-['New_Rocker']">Tanggal Penjualan</label>
      <input
        type="date"
        value={tanggal}
        onChange={(e) => setTanggal(e.target.value)}
        className={`w-80 h-14 absolute right-[60px] top-[495px] bg-slate-50 rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 text-black ${newRocker.className}`}
      />

      {/* Tombol TAMBAH */}
      <button
        onClick={handleSubmit}
        className="absolute left-[248px] top-[581px] w-[485px] h-16 bg-lime-400 rounded-xl border border-black"
      >
        <span className="text-white text-2xl font-['New_Rocker']">TAMBAH</span>
      </button>

      {/* Tombol BATAL */}
      <button
        type="button"
        onClick={() => router.push('/dashboard-admin/penjualan-admin')}
        className="absolute left-[753px] top-[581px] w-[485px] h-16 bg-red-600 rounded-xl border border-black"
      >
        <span className="text-white text-2xl font-['New_Rocker']">BATAL</span>
      </button>
    </div>
  );
}