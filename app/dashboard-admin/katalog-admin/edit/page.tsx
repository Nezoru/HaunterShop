'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { shadowsIntoLightTwo } from '@/app/ui/fonts';
import { getKatalogById } from '@/app/lib/query/dataUtils';

export default function EditProdukPage() {
  const [namaProduk, setNamaProduk] = useState('');
  const [hargaProduk, setHargaProduk] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const produkId = searchParams.get('id');

  useEffect(() => {
    if (produkId) {
      const data = getKatalogById(parseInt(produkId));
      if (data) {
        setNamaProduk(data.name);
        setHargaProduk(data.price.toString());
      }
    }
  }, [produkId]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Produk Diupdate:', { namaProduk, hargaProduk });
    router.push('/dashboard-admin/katalog-admin');
  };

  return (
    <div className="w-full max-w-[1444px] h-[700px] relative bg-white rounded-[10px] overflow-hidden p-4">
      {/* Title */}
      <h1 className={`absolute left-[26px] top-[12px] text-black text-4xl font-normal ${shadowsIntoLightTwo.className}`}>
        Edit Produk
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Label Nama Produk */}
        <label
          htmlFor="namaProduk"
          className="absolute left-[64px] top-[94px] text-black text-base font-normal font-['New_Rocker']"
        >
          Nama Produk
        </label>

        {/* Input Nama Produk */}
        <div className="absolute left-[51px] top-[117px]">
          <input
            id="namaProduk"
            value={namaProduk}
            onChange={(e) => setNamaProduk(e.target.value)}
            className="w-[970px] h-14 bg-slate-50 rounded-xl shadow-[inset_0_2px_0_rgba(231,235,238,0.2)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 py-2 font-['New_Rocker'] text-black"
            placeholder="Nama Produk"
          />
        </div>

        {/* Label Harga Produk */}
        <label
          htmlFor="hargaProduk"
          className="absolute left-[1072px] top-[89px] text-black text-base font-normal font-['New_Rocker']"
        >
          Harga Produk
        </label>

        {/* Input Harga Produk */}
        <div className="absolute left-[1062px] top-[117px]">
          <input
            id="hargaProduk"
            value={hargaProduk}
            onChange={(e) => setHargaProduk(e.target.value)}
            className="w-80 h-14 bg-slate-50 rounded-xl shadow-[inset_0_2px_0_rgba(231,235,238,0.2)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 py-2 font-['New_Rocker'] text-black"
            placeholder="Rp0"
          />
        </div>

        {/* Label Image */}
        <label
          htmlFor="gambar"
          className="absolute left-[64px] top-[196px] text-black text-base font-normal font-['New_Rocker']"
        >
          Image
        </label>

        {/* Upload Area */}
        <div className="absolute left-[51px] top-[219px] w-[1342px] h-64 bg-slate-50 rounded-xl shadow-[inset_0_2px_0_rgba(231,235,238,0.2)] outline outline-2 outline-offset-[-2px] outline-slate-300 flex justify-center items-center">
          <label htmlFor="gambar" className="text-black/40 text-2xl font-normal font-['New_Rocker'] cursor-pointer">
            Upload a file or drag and drop here
            <input
              id="gambar"
              type="file"
              accept=".png,.jpg,.jpeg"
              className="hidden"
            />
          </label>
        </div>

        {/* Keterangan */}
        <div className="absolute left-[64px] top-[475px] text-neutral-400 text-base font-normal font-['New_Rocker']">
          PNG, JPG, up to 5MB
        </div>

        {/* Tombol Edit */}
        <button
          type="submit"
          className="absolute left-[248px] top-[581px] w-[485px] h-16 bg-orange-500 rounded-xl border border-black"
        >
          <span className="absolute left-[213px] top-[15px] text-white text-2xl font-normal font-['New_Rocker']">
            EDIT
          </span>
        </button>

        {/* Tombol Batal */}
        <button
          type="button"
          onClick={() => router.push('/dashboard-admin/katalog-admin')}
          className="absolute left-[753px] top-[581px] w-[485px] h-16 bg-red-600 rounded-xl border border-black"
        >
          <span className="absolute left-[188px] top-[15px] text-white text-2xl font-normal font-['New_Rocker']">
            BATAL
          </span>
        </button>
      </form>
    </div>
  );
}