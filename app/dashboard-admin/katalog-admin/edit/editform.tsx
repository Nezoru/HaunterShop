'use client';  

import { useState, useEffect } from 'react';  
import { useSearchParams, useRouter } from 'next/navigation';  
import { getKatalogById } from '@/app/lib/query/dataUtils';  
import { shadowsIntoLightTwo } from '@/app/ui/fonts';  

export default function EditKatalogForm() {  
  const router = useRouter();  
  const searchParams = useSearchParams();  
  const [product, setProduct] = useState<any | null>(null);  
  const [name, setName] = useState('');  
  const [price, setPrice] = useState('');  
  const [image, setImage] = useState<File | null>(null);  
  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {  
    const idParam = searchParams.get('id');  
    const id = idParam ? parseInt(idParam, 10) : null;  

    if (id) {  
      const found = getKatalogById(id);  
      if (found) {  
        setProduct(found);  
        setName(found.name);  
        setPrice(found.price.toString());  
      } else {  
        setProduct(null);  
      }  
    }  

    setIsLoading(false);  
  }, [searchParams]);  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {  
    const file = e.target.files?.[0];  
    if (file) {  
      setImage(file);  
    }  
  };  

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();  
    
    try {  
      // Validasi input  
      if (!name.trim()) {  
        alert('Nama produk tidak boleh kosong');  
        return;  
      }  

      const parsedPrice = parseInt(price, 10);  
      if (isNaN(parsedPrice) || parsedPrice <= 0) {  
        alert('Harga produk harus angka positif');  
        return;  
      }  

      // Persiapkan data update  
      const updatedProduct = {  
        ...product,  
        name,  
        price: parsedPrice,  
        image: image ? URL.createObjectURL(image) : product.image  
      };  

      // Simulasi update (ganti dengan logic update sebenarnya)  
      console.log('Produk diupdate:', updatedProduct);  

      // Redirect setelah update  
      router.push('/dashboard-admin/katalog-admin');  
    } catch (error) {  
      console.error('Error updating product:', error);  
      alert('Gagal memperbarui produk');  
    }  
  };  

  if (isLoading) return <div className="p-4">Loading...</div>;  

  if (!product) {  
    return (  
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">  
        Produk tidak ditemukan.  
      </div>  
    );  
  }  

  return (  
    <div className="w-full max-w-[1444px] h-[700px] relative bg-white rounded-[10px] overflow-hidden p-4">  
      <h1 className={`absolute left-[26px] top-[12px] text-black text-4xl ${shadowsIntoLightTwo.className}`}>  
        Edit Produk  
      </h1>  

      <form onSubmit={handleSubmit}>  
        <label className="absolute left-[64px] top-[94px] text-black text-base font-['New_Rocker']">  
          Nama Produk  
        </label>  
        <input  
          value={name}  
          onChange={(e) => setName(e.target.value)}  
          className="absolute left-[51px] top-[117px] w-[970px] h-14 bg-slate-50 rounded-xl outline outline-1 outline-slate-300 px-4 py-2 font-['New_Rocker'] text-black"  
          required  
        />  

        <label className="absolute left-[1072px] top-[89px] text-black text-base font-['New_Rocker']">  
          Harga Produk  
        </label>  
        <input  
          type="number"  
          value={price}  
          onChange={(e) => setPrice(e.target.value)}  
          className="absolute left-[1062px] top-[117px] w-80 h-14 bg-slate-50 rounded-xl outline outline-1 outline-slate-300 px-4 py-2 font-['New_Rocker'] text-black"  
          required  
          min="0"  
        />  

        <label className="absolute left-[64px] top-[196px] text-black text-base font-['New_Rocker']">  
          Image  
        </label>  
        <div className="absolute left-[51px] top-[219px] w-[1342px] h-64 bg-slate-50 rounded-xl outline outline-2 outline-slate-300 flex justify-center items-center">  
          <label className="text-black/40 text-2xl font-['New_Rocker'] cursor-pointer">  
            {image ? image.name : 'Upload a file or drag and drop here'}  
            <input   
              type="file"   
              accept=".png,.jpg,.jpeg"   
              className="hidden"   
              onChange={handleImageUpload}  
            />  
          </label>  
        </div>  

        <div className="absolute left-[64px] top-[475px] text-neutral-400 text-base font-['New_Rocker']">  
          PNG, JPG, up to 5MB  
        </div>  

        <button   
          type="submit"   
          className="absolute left-[248px] top-[581px] w-[485px] h-16 bg-orange-500 rounded-xl border border-black"  
        >  
          <span className="absolute left-[213px] top-[15px] text-white text-2xl font-['New_Rocker']">EDIT</span>  
        </button>  

        <button   
          type="button"   
          onClick={() => router.push('/dashboard-admin/katalog-admin')}   
          className="absolute left-[753px] top-[581px] w-[485px] h-16 bg-red-600 rounded-xl border border-black"  
        >  
          <span className="absolute left-[188px] top-[15px] text-white text-2xl font-['New_Rocker']">BATAL</span>  
        </button>  
      </form>  
    </div>  
  );  
}  