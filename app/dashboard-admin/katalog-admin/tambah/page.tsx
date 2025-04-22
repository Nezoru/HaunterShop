// app/dashboard/katalog/tambah/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { shadowsIntoLightTwo, newRocker } from '@/app/ui/fonts';

export default function TambahKatalogPage() {
  const [namaProduk, setNamaProduk] = useState('');
  const [harga, setHarga] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    console.log({ namaProduk, harga });
    router.push('/dashboard-admin/katalog-admin');
  };

  return (
    <div className="w-[1448px] h-[700px] relative bg-white rounded-[10px] overflow-hidden">
      <div className={`absolute left-[26px] top-[12px] text-black text-4xl font-normal ${shadowsIntoLightTwo.className}`}>
        Tambah Produk
      </div>

      <label className={`absolute left-[64px] top-[94px] text-black text-base font-normal ${newRocker.className}`}>
        Nama Produk
      </label>
      <input
        type="text"
        value={namaProduk}
        onChange={(e) => setNamaProduk(e.target.value)}
        placeholder="Masukkan Nama Produk"
        className={`absolute left-[51px] top-[117px] w-[970px] h-14 bg-slate-50 rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-3 py-2.5 text-black/40 text-base ${newRocker.className}`}
      />

      <label className={`absolute left-[1072px] top-[89px] text-black text-base font-normal ${newRocker.className}`}>
        Harga Produk
      </label>
      <input
        type="text"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
        placeholder="Masukkan Harga"
        className={`absolute left-[1062px] top-[117px] w-80 h-14 bg-slate-50 rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-3 py-2.5 text-black/40 text-base ${newRocker.className}`}
      />

      <label className={`absolute left-[64px] top-[196px] text-black text-base font-normal ${newRocker.className}`}>
        Image
      </label>
      <div className="absolute left-[51px] top-[219px] w-[1342px] h-64 bg-slate-50 rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(231,235,238,0.20)] outline outline-2 outline-offset-[-2px] outline-slate-300">
        <div className={`absolute left-[481px] top-[118px] text-black/40 text-2xl font-normal ${newRocker.className}`}>
          Upload a file or drag and drop here
        </div>
      </div>
      <div className={`absolute left-[64px] top-[475px] text-neutral-400 text-base font-normal ${newRocker.className}`}>
        PNG, JPG, up to 5MB
      </div>

      {/* Tombol TAMBAH */}
      <button
        onClick={handleSubmit}
        className="absolute left-[248px] top-[581px] w-[485px] h-16 bg-lime-400 rounded-xl border border-black"
      >
        <span className={`absolute left-[188px] top-[15px] text-white text-2xl font-normal ${newRocker.className}`}>
          TAMBAH
        </span>
      </button>

      {/* Tombol BATAL */}
      <button
        onClick={() => router.push('/dashboard-admin/katalog-admin')}
        className="absolute left-[753px] top-[581px] w-[485px] h-16 bg-red-600 rounded-xl border border-black"
      >
        <span className={`absolute left-[188px] top-[15px] text-white text-2xl font-normal ${newRocker.className}`}>
          BATAL
        </span>
      </button>
    </div>
  );
}