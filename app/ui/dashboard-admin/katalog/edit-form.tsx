// app/ui/katalog/edit-form.tsx
'use client';

import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateProdukAction } from '@/app/lib/actions';
import { shadowsIntoLightTwo, newRocker } from '@/app/ui/fonts';

// Type untuk produk
export type Produk = {
  id: string;
  nama_produk: string;
  harga_produk: number;
  image_produk: string;
  stok: number;
};

// Type untuk state form
type FormState = {
  message: string;
  errors: {
    id?: string[];
    nama_produk?: string[];
    harga_produk?: string[];
    image_produk?: string[];
    stok?: string[];
  };
};

export default function EditProdukForm({ produk }: { produk: Produk }) {
  const initialState: FormState = { 
    message: '',
    errors: {} 
  };
  
  const updateProdukWithId = updateProdukAction.bind(null, produk.id);
  const [isSubmitting, setIsSubmitting] = useState(false);
const [state, dispatch] = React.useActionState(updateProdukWithId, initialState);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(produk.image_produk);
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Custom form submission handler
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = new FormData(e.currentTarget);

  try {
    if (selectedImage) {
      const base64String = await convertToBase64(selectedImage);
      formData.set('image_produk', base64String);
    } else {
      formData.set('image_produk', produk.image_produk);
    }

    dispatch(formData);
  } catch (error) {
    console.error('Terjadi kesalahan saat submit:', error);
  } finally {
    setIsSubmitting(false);
  }
};

// Tambahkan helper function ini di luar komponen:
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};


  return (
    <div className="w-full max-w-[1444px] h-[700px] relative bg-white rounded-[10px] overflow-hidden p-4">
      <h1 className={`absolute left-[26px] top-[12px] text-black text-4xl ${shadowsIntoLightTwo.className}`}>
        Edit Produk
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Nama Produk */}
        <div className="mb-4">
          <label 
            htmlFor="nama_produk" 
            className="absolute left-[64px] top-[94px] text-black text-base font-['New_Rocker']"
          >
            Nama Produk
          </label>
          <input
            id="nama_produk"
            name="nama_produk"
            type="text"
            defaultValue={produk.nama_produk}
            placeholder="Masukkan nama produk"
            className="absolute left-[51px] top-[117px] w-[970px] h-14 bg-slate-50 rounded-xl outline outline-1 outline-slate-300 px-4 py-2 font-['New_Rocker'] text-black"
            aria-describedby="nama_produk-error"
          />
          <div id="nama_produk-error" aria-live="polite" aria-atomic="true">
            {state.errors?.nama_produk &&
              state.errors.nama_produk.map((error: string) => (
                <p className="absolute left-[51px] top-[175px] text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Harga Produk */}
        <div className="mb-4">
          <label 
            htmlFor="harga_produk" 
            className="absolute left-[1072px] top-[89px] text-black text-base font-['New_Rocker']"
          >
            Harga Produk
          </label>
          <input
            id="harga_produk"
            name="harga_produk"
            type="number"
            defaultValue={produk.harga_produk}
            placeholder="Masukkan harga"
            className="absolute left-[1062px] top-[117px] w-80 h-14 bg-slate-50 rounded-xl outline outline-1 outline-slate-300 px-4 py-2 font-['New_Rocker'] text-black"
            aria-describedby="harga_produk-error"
          />
          <div id="harga_produk-error" aria-live="polite" aria-atomic="true">
            {state.errors?.harga_produk &&
              state.errors.harga_produk.map((error: string) => (
                <p className="absolute left-[1062px] top-[175px] text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Stok */}
        <div className="mb-4">
          <label 
            htmlFor="stok" 
            className="absolute left-[64px] top-[196px] text-black text-base font-['New_Rocker']"
          >
            Stok
          </label>
          <input
            id="stok"
            name="stok"
            type="number"
            defaultValue={produk.stok}
            placeholder="Masukkan stok"
            className="absolute left-[51px] top-[219px] w-[200px] h-14 bg-slate-50 rounded-xl outline outline-1 outline-slate-300 px-4 py-2 font-['New_Rocker'] text-black"
            aria-describedby="stok-error"
          />
          <div id="stok-error" aria-live="polite" aria-atomic="true">
            {state.errors?.stok &&
              state.errors.stok.map((error: string) => (
                <p className="absolute left-[51px] top-[277px] text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label 
            htmlFor="image_produk" 
            className="absolute left-[300px] top-[196px] text-black text-base font-['New_Rocker']"
          >
            Gambar Produk (Opsional)
          </label>
          <div className="absolute left-[287px] top-[219px] w-[400px] h-64 bg-slate-50 rounded-xl outline outline-2 outline-slate-300 flex flex-col justify-center items-center">
{imagePreview ? (
  <img 
    src={imagePreview} 
    alt="Preview" 
    className="w-32 h-32 object-contain mb-2 rounded"
  />
) : (
  <div className="w-32 h-32 flex items-center justify-center text-gray-400">No Image</div>
)}

            <label className="text-black/40 text-base font-['New_Rocker'] cursor-pointer text-center">
              {selectedImage ? selectedImage.name : 'Upload gambar baru atau gunakan yang lama'}
              <input 
                id="image_produk"
                name="image_produk"
                type="file" 
                accept=".png,.jpg,.jpeg" 
                className="hidden" 
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div className="absolute left-[287px] top-[490px] text-neutral-400 text-sm font-['New_Rocker']">
            PNG, JPG, maksimal 5MB
          </div>
        </div>

        {/* Error message */}
        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="absolute left-[51px] top-[520px] text-sm text-red-500">
              {state.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-4">
<button 
  type="submit"
  disabled={isSubmitting}
  className={`absolute left-[248px] top-[581px] w-[485px] h-16 ${
    isSubmitting ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
  } rounded-xl border border-black transition-colors`}
>
  <span className="absolute left-[213px] top-[15px] text-white text-2xl font-['New_Rocker']">
    {isSubmitting ? 'Updating...' : 'UPDATE'}
  </span>
</button>

          
          <Link
            href="/dashboard-admin/katalog-admin"
            className="absolute left-[753px] top-[581px] w-[485px] h-16 bg-red-600 hover:bg-red-700 rounded-xl border border-black flex items-center justify-center transition-colors"
          >
            <span className="text-white text-2xl font-['New_Rocker']">
              BATAL
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}