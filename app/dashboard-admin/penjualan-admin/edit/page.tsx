'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { shadowsIntoLightTwo, newRocker } from '@/app/ui/fonts';
import { getPenjualanById } from '@/app/lib/query/route';

export default function EditPenjualanPage() {
  const [namaPembeli, setNamaPembeli] = useState('');
  const [produkDibeli, setProdukDibeli] = useState('');
  const [harga, setHarga] = useState('');
  const [tanggal, setTanggal] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const penjualanId = searchParams.get('id');

  useEffect(() => {
    if (penjualanId) {
      const data = getPenjualanById(parseInt(penjualanId));
      if (data) {
        setNamaPembeli(data.nama_pembeli);
        setProdukDibeli(data.produk_dibeli);
        setHarga(data.harga.toString());
        setTanggal(data.tanggal);
      }
    }
  }, [penjualanId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Data Penjualan Diupdate:', { namaPembeli, produkDibeli, harga, tanggal });
    router.push('/dashboard-admin/penjualan-admin');
  };

  return (
    <div className="w-[1448px] h-[700px] relative bg-white rounded-[10px] overflow-hidden">
      <h1 className={`absolute left-[26px] top-[12px] text-black text-4xl font-normal ${shadowsIntoLightTwo.className}`}>
        Edit Penjualan
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Nama Produk */}
        <label className="absolute left-[64px] top-[94px] text-black text-base font-['New_Rocker']">Nama Produk</label>
        <input
          value={produkDibeli}
          onChange={(e) => setProdukDibeli(e.target.value)}
          className={`w-[761px] h-14 absolute left-[51px] top-[117px] bg-slate-50 rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 text-black ${newRocker.className}`}
        />

        {/* Harga Produk */}
        <label className="absolute left-[840px] top-[89px] text-black text-base font-['New_Rocker']">Harga Produk</label>
        <input
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          className={`w-80 h-14 absolute left-[830px] top-[117px] bg-slate-50 rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 text-black ${newRocker.className}`}
        />


        {/* List Produk Pembelian */}
        <div className="w-[1263px] h-44 absolute left-[51px] top-[219px] bg-slate-50 rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300">
          <span className="absolute left-[13px] top-[-20px] text-black text-base font-['New_Rocker']">List Produk Pembelian</span>
          <div className="absolute w-[1246px] h-10 left-[8px] top-[6px] overflow-hidden">
            <div className="absolute left-[61px] top-[1px] w-96 px-3 py-2.5 inline-flex items-center gap-2.5">
              <div className="w-36 text-black text-base font-['New_Rocker']">Casper</div>
            </div>
            <div className="absolute left-[17px] top-[15px] w-3.5 h-3.5 bg-white border border-black" />
          </div>
          <div className="absolute left-[1237px] top-[47px] w-[1210px] h-0 rotate-180 origin-top-left outline outline-1 outline-offset-[-0.5px] outline-zinc-400" />
        </div>


        {/* Nama Pembeli */}
        <label className="absolute left-[64px] top-[472px] text-black text-base font-['New_Rocker']">Nama Pembeli</label>
        <input
          value={namaPembeli}
          onChange={(e) => setNamaPembeli(e.target.value)}
          className={`text-black w-80 h-14 absolute left-[51px] top-[495px] bg-slate-50 rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 ${newRocker.className} `}
        />

        {/* Tanggal Penjualan */}
        <label className="absolute right-[64px] top-[472px] text-black text-base font-['New_Rocker']">Tanggal Penjualan</label>
        <input
        type="date"
        value={tanggal}
        onChange={(e) => setTanggal(e.target.value)}
        className={`w-80 h-14 absolute right-[50px] top-[495px] bg-slate-50 rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 text-black ${newRocker.className}`}
        />


        {/* Tombol EDIT */}
        <button
          type="submit"
          className="absolute left-[248px] top-[581px] w-[485px] h-16 bg-orange-500 rounded-xl border border-black"
        >
          <span className="absolute left-[213px] top-[15px] text-white text-2xl font-['New_Rocker']">EDIT</span>
        </button>

        {/* Tombol BATAL */}
        <button
          type="button"
          onClick={() => router.push('/dashboard-admin/penjualan-admin')}
          className="absolute left-[753px] top-[581px] w-[485px] h-16 bg-red-600 rounded-xl border border-black"
        >
          <span className="absolute left-[188px] top-[15px] text-white text-2xl font-['New_Rocker']">BATAL</span>
        </button>

        {/* Tombol Input Dummy */}
        <div className="absolute left-[1187px] top-[126px] w-32 h-9 bg-lime-400 rounded-[10px] border border-black" />
        <span className="absolute left-[1222px] top-[130px] text-white text-2xl font-['New_Rocker']">Input</span>
      </form>
    </div>
  );
}