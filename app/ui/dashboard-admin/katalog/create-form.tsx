// app/ui/katalog/create-form.tsx

'use client';

import { useState, useRef, useTransition, useEffect } from 'react';
import { createProdukAction } from '@/app/lib/actions';
import { shadowsIntoLightTwo, newRocker } from '@/app/ui/fonts';
import Link from 'next/link';

export default function CreateProdukForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{
    errors?: {
      nama_produk?: string[];
      harga_produk?: string[];
      image_produk?: string[];
      stok?: string[];
    };
    message?: string | null;
    success?: boolean;
  }>({ errors: {}, message: null, success: false });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle success message display
  useEffect(() => {
    if (state.success) {
      setShowSuccessMessage(true);
      // Reset form after successful submission
      if (formRef.current) {
        formRef.current.reset();
      }
      setSelectedFile(null);
      setImagePreview('');
      
      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        setState({ errors: {}, message: null, success: false });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear image error if file is selected
      if (state.errors?.image_produk) {
        setState(prev => ({
          ...prev,
          errors: {
            ...prev.errors,
            image_produk: undefined
          }
        }));
      }
    } else {
      alert('Pilih file gambar dengan ukuran maksimal 10MB');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (formData: FormData) => {
    // Clear previous messages
    setShowSuccessMessage(false);
    
    startTransition(async () => {
      const result = await createProdukAction(state, formData);
      setState(result);
    });
  };

  // Success Message Component
  const SuccessMessage = () => (
    showSuccessMessage && (
      <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3">
        <div className="text-2xl">✅</div>
        <div>
          <p className={`font-medium ${newRocker.className}`}>Berhasil!</p>
          <p className="text-sm opacity-90">Produk berhasil ditambahkan</p>
        </div>
      </div>
    )
  );

  // Error Alert Component
  const ErrorAlert = () => (
    state.message && !state.success && (
      <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          {/* <div className="text-red-500 text-xl">❌</div> */}
          <div>
            {/* <h3 className={`text-red-800 font-medium ${newRocker.className}`}>
              Gagal Menambahkan Produk
            </h3> */}
            <p className="text-red-600 text-1xl mt-1">
              {state.message}
            </p>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="w-full min-h-screen bg-black">
      <SuccessMessage />
      
      {/* Main Content */}
      <div className="mb-8">
        <div className="bg-white rounded-lg p-8 w-full">
          <h1 className={`text-4xl text-black mb-8 ${shadowsIntoLightTwo.className}`}>
            Tambah Produk
          </h1>

          <ErrorAlert />

          <form ref={formRef} action={handleSubmit}>
            <div className="grid grid-cols-3 gap-8 mb-6">
              {/* Nama Produk */}
              <div>
                <label className={`block text-black text-base mb-2 ${newRocker.className}`}>
                  Nama Produk
                </label>
                <input
                  id="nama_produk"
                  name="nama_produk"
                  type="text"
                  placeholder="Masukkan Nama Produk"
                  className={`w-full h-14 bg-slate-50 rounded-xl shadow-inner border px-4 py-3 text-black placeholder-gray-400 text-base ${newRocker.className} focus:outline-none focus:ring-2 transition-all ${
                    state.errors?.nama_produk 
                      ? 'border-red-300 focus:ring-red-400' 
                      : 'border-slate-300 focus:ring-lime-400'
                  }`}
                  aria-describedby="nama_produk-error"
                />
                <div id="nama_produk-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.nama_produk && (
                    <div className="mt-2 flex items-center gap-2">
                      {/* <span className="text-red-500 text-sm">⚠️</span> */}
                      <p className="text-sm text-red-600">
                        {state.errors.nama_produk[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Harga Produk */}
              <div>
                <label className={`block text-black text-base mb-2 ${newRocker.className}`}>
                  Harga Produk
                </label>
                <input
                  id="harga_produk"
                  name="harga_produk"
                  type="number"
                  step="1"
                  min="0"
                  placeholder="Masukkan Harga"
                  className={`w-full h-14 bg-slate-50 rounded-xl shadow-inner border px-4 py-3 text-black placeholder-gray-400 text-base ${newRocker.className} focus:outline-none focus:ring-2 transition-all ${
                    state.errors?.harga_produk 
                      ? 'border-red-300 focus:ring-red-400' 
                      : 'border-slate-300 focus:ring-lime-400'
                  }`}
                  aria-describedby="harga_produk-error"
                />
                <div id="harga_produk-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.harga_produk && (
                    <div className="mt-2 flex items-center gap-2">
                      {/* <span className="text-red-500 text-sm">⚠️</span> */}
                      <p className="text-sm text-red-600">
                        {state.errors.harga_produk[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Stok */}
              <div>
                <label className={`block text-black text-base mb-2 ${newRocker.className}`}>
                  Stok
                </label>
                <input
                  id="stok"
                  name="stok"
                  type="number"
                  step="1"
                  min="0"
                  defaultValue="0"
                  placeholder="Masukkan Stok"
                  className={`w-full h-14 bg-slate-50 rounded-xl shadow-inner border px-4 py-3 text-black placeholder-gray-400 text-base ${newRocker.className} focus:outline-none focus:ring-2 transition-all ${
                    state.errors?.stok 
                      ? 'border-red-300 focus:ring-red-400' 
                      : 'border-slate-300 focus:ring-lime-400'
                  }`}
                  aria-describedby="stok-error"
                />
                <div id="stok-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.stok && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-red-500 text-sm">⚠️</span>
                      <p className="text-sm text-red-600">
                        {state.errors.stok[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className={`block text-black text-base mb-2 ${newRocker.className}`}>
                Image
              </label>
              <div
                className={`w-full h-64 bg-slate-50 rounded-xl border-2 border-dashed transition-colors cursor-pointer ${
                  state.errors?.image_produk
                    ? 'border-red-300 bg-red-50'
                    : isDragOver 
                      ? 'border-lime-400 bg-lime-50' 
                      : 'border-slate-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleFileAreaClick}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  {selectedFile ? (
                    <div className="text-center">
                      {imagePreview && (
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-h-32 max-w-32 object-contain mb-2 rounded"
                        />
                      )}
                      <div className="text-green-600 text-xl mb-2">✅</div>
                      <p className={`text-black text-lg ${newRocker.className}`}>
                        {selectedFile.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className={`text-gray-400 text-2xl ${newRocker.className}`}>
                        Upload a file or drag and drop here
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <p className={`text-gray-400 text-base mt-2 ${newRocker.className}`}>
                PNG, JPG, up to 10MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
              
              {/* Hidden input for base64 image data */}
              <input
                type="hidden"
                name="image_produk"
                value={imagePreview}
              />
              
              <div id="image_produk-error" aria-live="polite" aria-atomic="true">
                {state.errors?.image_produk && (
                  <div className="mt-2 flex items-center gap-2">
                    {/* <span className="text-red-500 text-sm">⚠️</span> */}
                    <p className="text-sm text-red-600">
                      {state.errors.image_produk[0]}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                disabled={isPending}
                className="w-96 h-16 bg-lime-400 hover:bg-lime-500 rounded-xl border border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span className={`text-white text-2xl font-normal ${newRocker.className}`}>
                      MENYIMPAN...
                    </span>
                  </>
                ) : (
                  <span className={`text-white text-2xl font-normal ${newRocker.className}`}>
                    TAMBAH
                  </span>
                )}
              </button>

              <Link
                href="/dashboard-admin/katalog-admin"
                className="w-96 h-16 bg-red-600 hover:bg-red-700 rounded-xl border border-black transition-colors flex items-center justify-center"
              >
                <span className={`text-white text-2xl font-normal ${newRocker.className}`}>
                  BATAL
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}