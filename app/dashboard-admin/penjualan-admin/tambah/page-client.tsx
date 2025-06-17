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

// State type untuk error handling
type FormErrors = {
  produk?: string[];
  namaPembeli?: string[];
  emailPembeli?: string[];
  tanggal?: string[];
};

export default function TambahPenjualanPage({ produkList }: TambahPenjualanPageProps) {
  const [produk, setProduk] = useState('');
  const [harga, setHarga] = useState('');
  const [namaPembeli, setNamaPembeli] = useState('');
  const [emailPembeli, setEmailPembeli] = useState('');
  const [tanggal, setTanggal] = useState('');
  
  // State untuk error handling
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  
  const router = useRouter();

  const handleProdukChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduk = produkList.find(p => p.id === e.target.value);
    setProduk(e.target.value);
    setHarga(selectedProduk?.harga_produk?.toString() || '');
    
    // Clear error untuk field produk ketika user memilih produk
    if (errors.produk) {
      setErrors(prev => ({ ...prev, produk: undefined }));
    }
  };

  // Function untuk clear error ketika user mengetik
  const clearFieldError = (fieldName: keyof FormErrors) => {
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  };

  // Validation function
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Validasi nama pembeli
    if (!namaPembeli || namaPembeli.trim() === '') {
      newErrors.namaPembeli = ['Nama pembeli harus diisi!'];
    }

    // Validasi email pembeli
    if (!emailPembeli || emailPembeli.trim() === '') {
      newErrors.emailPembeli = ['Email pembeli harus diisi!'];
    } else {
      // Validasi format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailPembeli)) {
        newErrors.emailPembeli = ['Format email tidak valid!'];
      }
    }

    // Validasi tanggal
    if (!tanggal || tanggal.trim() === '') {
      newErrors.tanggal = ['Tanggal transaksi harus diisi!'];
    }

    // Validasi produk
    if (!produk || produk.trim() === '') {
      newErrors.produk = ['Produk harus dipilih!'];
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Validasi form
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setMessage('Gagal menambahkan penjualan. Periksa form di bawah!');
      setIsSubmitting(false);
      return;
    }

    // Clear errors jika validasi berhasil
    setErrors({});

    try {
      await tambahTransaksi({
        produk,
        namaPembeli: namaPembeli.trim(),
        emailPembeli: emailPembeli.trim(),
        harga: Number(harga),
        tanggal,
      });
      router.push('/dashboard-admin/penjualan-admin');
    } catch (error) {
      console.error('Gagal simpan transaksi:', error);
      setMessage('Gagal menyimpan transaksi. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full justify-center bg-white rounded-[10px] p-6 overflow-hidden">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-black text-4xl font-normal ${shadowsIntoLightTwo.className}`}>
          Tambah Transaksi
        </h1>
      </div>

      {/* Error Message */}
      {message && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
        {/* Baris Pertama: Informasi Pembeli */}
        <div className="flex flex-wrap gap-6">
          {/* Nama Pembeli */}
          <div className="flex flex-col flex-1 min-w-[280px]">
            <label className="text-black text-base font-['New_Rocker'] mb-2">
              Nama Pembeli
            </label>
            <input
              type="text"
              value={namaPembeli}
              onChange={(e) => {
                setNamaPembeli(e.target.value);
                clearFieldError('namaPembeli');
              }}
              placeholder="Masukkan Nama Pembeli"
              className={`h-14 bg-slate-50 rounded-xl shadow-[inset_0_2px_0_0_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] px-4 text-black/80 font-['New_Rocker'] ${
                errors.namaPembeli ? 'outline-red-500 bg-red-50' : 'outline-slate-300'
              }`}
            />
            {errors.namaPembeli && (
              <div className="mt-2 text-sm text-red-600">
                {errors.namaPembeli.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>

          {/* Email Pembeli */}
          <div className="flex flex-col flex-1 min-w-[280px]">
            <label className="text-black text-base font-['New_Rocker'] mb-2">
              Email Pembeli
            </label>
            <input
              type="email"
              value={emailPembeli}
              onChange={(e) => {
                setEmailPembeli(e.target.value);
                clearFieldError('emailPembeli');
              }}
              placeholder="Masukkan Email Pembeli"
              className={`h-14 bg-slate-50 rounded-xl shadow-[inset_0_2px_0_0_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] px-4 text-black/80 font-['New_Rocker'] ${
                errors.emailPembeli ? 'outline-red-500 bg-red-50' : 'outline-slate-300'
              }`}
            />
            {errors.emailPembeli && (
              <div className="mt-2 text-sm text-red-600">
                {errors.emailPembeli.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>

          {/* Tanggal Transaksi */}
          <div className="flex flex-col flex-1 min-w-[280px]">
            <label className="text-black text-base font-['New_Rocker'] mb-2">
              Tanggal Transaksi
            </label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => {
                setTanggal(e.target.value);
                clearFieldError('tanggal');
              }}
              className={`h-14 bg-slate-50 rounded-xl shadow-[inset_0px_2px_0px_0px_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] px-4 text-black ${newRocker.className} ${
                errors.tanggal ? 'outline-red-500 bg-red-50' : 'outline-slate-300'
              }`}
            />
            {errors.tanggal && (
              <div className="mt-2 text-sm text-red-600">
                {errors.tanggal.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Baris Kedua: Informasi Produk */}
        <div className="flex flex-wrap gap-6">
          {/* Select Produk */}
          <div className="flex flex-col flex-[2] min-w-[400px]">
            <label className="text-black text-base font-['New_Rocker'] mb-2">
              Nama Produk
            </label>
            <select
              value={produk}
              onChange={handleProdukChange}
              className={`h-14 bg-slate-50 rounded-xl shadow-[inset_0_2px_0_0_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] px-4 text-black/80 font-['New_Rocker'] ${
                errors.produk ? 'outline-red-500 bg-red-50' : 'outline-slate-300'
              }`}
            >
              <option value="">-- Pilih Produk --</option>
              {produkList.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nama_produk}
                </option>
              ))}
            </select>
            {errors.produk && (
              <div className="mt-2 text-sm text-red-600">
                {errors.produk.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>

          {/* Harga Produk */}
          <div className="flex flex-col flex-1 min-w-[280px]">
            <label className="text-black text-base font-['New_Rocker'] mb-2">
              Harga Produk
            </label>
            <input
              type="text"
              value={harga}
              readOnly
              placeholder="Harga Otomatis"
              className="h-14 bg-gray-200 rounded-xl shadow-[inset_0_2px_0_0_rgba(231,235,238,0.20)] outline outline-1 outline-offset-[-1px] outline-slate-300 px-4 text-black/80 font-['New_Rocker']"
            />
          </div>
        </div>

        {/* Tombol Actions */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-96 h-16 rounded-xl border border-black transition-colors ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-lime-400 hover:bg-lime-500'
            }`}
          >
            <span className="text-white text-2xl font-['New_Rocker']">
              {isSubmitting ? 'MENYIMPAN...' : 'TAMBAH'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => router.push('/dashboard-admin/penjualan-admin')}
            disabled={isSubmitting}
            className={`w-96 h-16 rounded-xl border border-black transition-colors ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            <span className="text-white text-2xl font-['New_Rocker']">BATAL</span>
          </button>
        </div>
      </form>
    </div>
  );
}