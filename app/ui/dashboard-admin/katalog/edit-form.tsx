'use client';

import { useState, useCallback, useEffect } from 'react';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateProdukAction } from '@/app/lib/actions';
import { shadowsIntoLightTwo, newRocker } from '@/app/ui/fonts';
import { useRouter } from 'next/navigation'; 
import { startTransition } from 'react';// Ganti dari next/router ke next/navigation

// Type untuk produk
export type Produk = {
  id: string;
  nama_produk: string;
  harga_produk: number;
  image_produk: string;
  stok: number;
};

// Type untuk state form - sesuaikan dengan State di actions.ts
type FormState = {
  message: string;
  success?: undefined; // Change success type to undefined explicitly
  errors: {
    id?: string[];
    nama_produk?: string[];
    harga_produk?: string[];
    image_produk?: string[];
    stok?: string[];
  };
};


export default function EditProdukForm({ produk }: { produk: Produk }) {
  const router = useRouter();
  const initialState: FormState = { 
    message: '',
    errors: {} 
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(produk.image_produk || '');
  
  const updateProdukWithId = updateProdukAction.bind(null, produk.id);
  const [state, dispatch] = React.useActionState(updateProdukWithId, initialState);

  // Handle success redirect
  useEffect(() => {
    if (state.success) {
      // Delay sedikit untuk memastikan user melihat pesan success
      setTimeout(() => {
        router.push('/dashboard-admin/katalog-admin');
      }, 1000); // 1 detik delay
    }
  }, [state.success, router]);

  // Convert file to base64
  const convertToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('File reading error'));
      reader.readAsDataURL(file);
    });
  }, []);

  // Handle image change
  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert('Hanya file PNG, JPG, dan JPEG yang diperbolehkan');
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert('Ukuran file maksimal 5MB');
        return;
      }

      setSelectedImage(file);
      
      // Create preview URL and clean up previous one
      if (imagePreview && imagePreview !== produk.image_produk) {
        URL.revokeObjectURL(imagePreview);
      }
      
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  }, [imagePreview, produk.image_produk]);

  // Custom form submission handler
const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (isSubmitting) return; // Prevent double submission
  setIsSubmitting(true);

  try {
    const formData = new FormData(e.currentTarget);

    if (selectedImage) {
      const base64String = await convertToBase64(selectedImage);
      formData.set('image_produk', base64String);
    } else {
      formData.set('image_produk', produk.image_produk);
    }

    startTransition(() => {
      dispatch(formData);
    });

  } catch (error) {
    console.error('Terjadi kesalahan saat submit:', error);
  } finally {
    setIsSubmitting(false);
  }
}, [isSubmitting, selectedImage, convertToBase64, dispatch, produk.image_produk]);



  // Clean up preview URL on unmount
  React.useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== produk.image_produk) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, produk.image_produk]);

  return (
    <div className="w-full max-w-[1444px] h-[700px] relative bg-white rounded-[10px] overflow-hidden p-4">
      <h1 className={`absolute left-[26px] top-[12px] text-black text-4xl ${shadowsIntoLightTwo.className}`}>
        Edit Produk
      </h1>

      <form onSubmit={handleSubmit} noValidate>
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
            className="absolute left-[51px] top-[117px] w-[970px] h-14 bg-slate-50 rounded-xl outline outline-1 outline-slate-300 px-4 py-2 font-['New_Rocker'] text-black focus:outline-2 focus:outline-blue-500"
            aria-describedby="nama_produk-error"
            required
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
            min="1"
            step="1"
            className="absolute left-[1062px] top-[117px] w-80 h-14 bg-slate-50 rounded-xl outline outline-1 outline-slate-300 px-4 py-2 font-['New_Rocker'] text-black focus:outline-2 focus:outline-blue-500"
            aria-describedby="harga_produk-error"
            required
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
            min="0"
            step="1"
            className="absolute left-[51px] top-[219px] w-[200px] h-14 bg-slate-50 rounded-xl outline outline-1 outline-slate-300 px-4 py-2 font-['New_Rocker'] text-black focus:outline-2 focus:outline-blue-500"
            aria-describedby="stok-error"
            required
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
                alt="Preview produk" 
                className="w-32 h-32 object-contain mb-2 rounded"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded">
                No Image
              </div>
            )}

            <label className="text-black/40 text-base font-['New_Rocker'] cursor-pointer text-center hover:text-black/60 transition-colors">
              {selectedImage ? selectedImage.name : 'Upload gambar baru atau gunakan yang lama'}
              <input 
                id="image_produk"
                name="image_produk"
                type="file" 
                accept=".png,.jpg,.jpeg,image/png,image/jpeg,image/jpg" 
                className="hidden" 
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div className="absolute left-[287px] top-[490px] text-neutral-400 text-sm font-['New_Rocker']">
            PNG, JPG, maksimal 5MB
          </div>
          <div id="image_produk-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image_produk &&
              state.errors.image_produk.map((error: string) => (
                <p className="absolute left-[287px] top-[505px] text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Error message */}
        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="absolute left-[51px] top-[520px] text-sm text-green-500">
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
              isSubmitting 
                ? 'bg-orange-300 cursor-not-allowed' 
                : 'bg-orange-500 hover:bg-orange-600'
            } rounded-xl border border-black transition-colors focus:outline-2 focus:outline-blue-500`}
          >
            <span className="absolute left-[213px] top-[15px] text-white text-2xl font-['New_Rocker']">
              {isSubmitting ? 'Updating...' : 'UPDATE'}
            </span>
          </button>
          
          <Link
            href="/dashboard-admin/katalog-admin"
            className="absolute left-[753px] top-[581px] w-[485px] h-16 bg-red-600 hover:bg-red-700 rounded-xl border border-black flex items-center justify-center transition-colors focus:outline-2 focus:outline-blue-500"
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