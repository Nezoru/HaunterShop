// app/dashboard/penjualan/edit/edit-form.tsx  
'use client';  

import { useState, useEffect } from 'react';  
import { useRouter, useSearchParams } from 'next/navigation';  
import { shadowsIntoLightTwo, newRocker } from '@/app/ui/fonts';  
import { getPenjualanById } from '@/app/lib/query/dataUtils';  
import { mockKatalog } from '@/app/lib/query/dataUtils'; // Impor katalog untuk list produk  

export default function EditPenjualanForm() {  
  const [namaPembeli, setNamaPembeli] = useState('');  
  const [produkDibeli, setProdukDibeli] = useState('');  
  const [harga, setHarga] = useState('');  
  const [tanggal, setTanggal] = useState('');  
  const [isLoading, setIsLoading] = useState(true);  
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
    setIsLoading(false);  
  }, [penjualanId]);  

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();  
    
    try {  
      // Validasi input  
      if (!namaPembeli.trim()) {  
        alert('Nama pembeli tidak boleh kosong');  
        return;  
      }  

      const parsedHarga = parseInt(harga, 10);  
      if (isNaN(parsedHarga) || parsedHarga <= 0) {  
        alert('Harga harus angka positif');  
        return;  
      }  

      if (!tanggal) {  
        alert('Tanggal harus diisi');  
        return;  
      }  

      const updatedPenjualan = {  
        nama_pembeli: namaPembeli,  
        produk_dibeli: produkDibeli,  
        harga: parsedHarga,  
        tanggal: tanggal  
      };  

      console.log('Data Penjualan Diupdate:', updatedPenjualan);  
      router.push('/dashboard-admin/penjualan-admin');  
    } catch (error) {  
      console.error('Error updating penjualan:', error);  
      alert('Gagal memperbarui data penjualan');  
    }  
  };  

  if (isLoading) return <div className="p-4">Loading...</div>;  

  return (  
    <div className="w-[1448px] h-[700px] relative bg-white rounded-[10px] overflow-hidden">  
      <h1 className={`absolute left-[26px] top-[12px] text-black text-4xl font-normal ${shadowsIntoLightTwo.className}`}>  
        Edit Penjualan  
      </h1>  

      <form onSubmit={handleSubmit}>  
        {/* Nama Produk */}  
        <label className="absolute left-[64px] top-[94px] text-black text-base font-['New_Rocker']">Nama Produk</label>  
        <select  
          value={produkDibeli}  
          onChange={(e) => {  
            setProdukDibeli(e.target.value);  
            // Set harga otomatis berdasarkan produk yang dipilih  
            const selectedProduct = mockKatalog.find(p => p.name === e.target.value);  
            if (selectedProduct) {  
              setHarga(selectedProduct.price.toString());  
            }  
          }}  
          className={`w-[761px] h-14 absolute left-[51px] top-[117px] bg-slate-50 rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 text-black ${newRocker.className}`}  
        >  
          <option value="">Pilih Produk</option>  
          {mockKatalog.map((produk) => (  
            <option key={produk.id} value={produk.name}>  
              {produk.name}  
            </option>  
          ))}  
        </select>  

        {/* Harga Produk */}  
        <label className="absolute left-[840px] top-[89px] text-black text-base font-['New_Rocker']">Harga Produk</label>  
        <input  
          type="number"  
          value={harga}  
          onChange={(e) => setHarga(e.target.value)}  
          className={`w-80 h-14 absolute left-[830px] top-[117px] bg-slate-50 rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 text-black ${newRocker.className}`}  
          min="0"  
          required  
        />  

        {/* List Produk Pembelian - bisa dihapus atau disesuaikan */}  
        <div className="w-[1263px] h-44 absolute left-[51px] top-[219px] bg-slate-50 rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300">  
          <span className="absolute left-[13px] top-[-20px] text-black text-base font-['New_Rocker']">List Produk Pembelian</span>  
          {/* Isi list produk bisa disesuaikan */}  
        </div>  

        {/* Nama Pembeli */}  
        <label className="absolute left-[64px] top-[472px] text-black text-base font-['New_Rocker']">Nama Pembeli</label>  
        <input  
          value={namaPembeli}  
          onChange={(e) => setNamaPembeli(e.target.value)}  
          className={`text-black w-80 h-14 absolute left-[51px] top-[495px] bg-slate-50 rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 ${newRocker.className}`}  
          required  
        />  

        {/* Tanggal Penjualan */}  
        <label className="absolute right-[64px] top-[472px] text-black text-base font-['New_Rocker']">Tanggal Penjualan</label>  
        <input  
          type="date"  
          value={tanggal}  
          onChange={(e) => setTanggal(e.target.value)}  
          className={`w-80 h-14 absolute right-[50px] top-[495px] bg-slate-50 rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 text-black ${newRocker.className}`}  
          required  
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
      </form>  
    </div>  
  );  
}