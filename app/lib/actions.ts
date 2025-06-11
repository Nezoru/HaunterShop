// app/lib/actions.ts

'use server';

import { z } from 'zod';
import { createProduk, updateProduk, getProdukById, getAllProduk, deleteProduk, createTransaksiLangsung, deleteTransaksi } from './data';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const UpdateProdukSchema = z.object({
  id: z.string(),
  nama_produk: z.string().min(1, 'Nama produk tidak boleh kosong'),
  harga_produk: z.coerce.number().min(1, 'Harga produk harus lebih dari 0'),
  image_produk: z.string().optional(),
  stok: z.coerce.number().min(0, 'Stok tidak boleh negatif'),
});

const CreateTransaksiSchema = z.object({
  customer_id: z.string().min(1, 'Customer ID harus diisi'),
  produk_id: z.string().min(1, 'Produk ID harus diisi'),
  harga: z.number().positive('Harga harus lebih dari 0'),
  tanggal_transaksi: z.string().min(1, 'Tanggal transaksi harus diisi'),
});


// Interface untuk form data
interface CreateTransaksiFormData {
  customer_id: string;
  produk_id: string;
  harga: number;
  tanggal_transaksi: string;
}


export type State = {
  errors?: {
    nama_produk?: string[];
    harga_produk?: string[];
    image_produk?: string[];
    stok?: string[];
  };
  message?: string | null;
  success?: boolean; 
};

// Create function (existing)
export async function createProdukAction(prevState: State, formData: FormData) {
  console.log('=== FORM DATA DEBUG ===');
  console.log('nama_produk:', formData.get('nama_produk'));
  console.log('harga_produk:', formData.get('harga_produk'));
  console.log('stok:', formData.get('stok'));
  console.log('image_produk length:', (formData.get('image_produk') as string)?.length);
  
  const nama_produk = formData.get('nama_produk') as string;
  const harga_produk = formData.get('harga_produk') as string;
  const image_produk = formData.get('image_produk') as string;
  const stokValue = formData.get('stok') as string;
  const stok = stokValue ? Number(stokValue) : 0;

  // Basic validation
  const errors: State['errors'] = {};
  
  if (!nama_produk || nama_produk.trim() === '') {
    errors.nama_produk = ['Nama produk harus diisi'];
  }
  
  if (!harga_produk || harga_produk.trim() === '') {
    errors.harga_produk = ['Harga produk harus diisi'];
  } else if (isNaN(Number(harga_produk)) || Number(harga_produk) <= 0) {
    errors.harga_produk = ['Harga produk harus berupa angka yang valid'];
  }
  
  if (!image_produk || image_produk.trim() === '') {
    errors.image_produk = ['Gambar produk harus diupload'];
  }

  const stokNumber = Number(stok || '0');
  if (isNaN(stokNumber) || stokNumber < 0) {
    errors.stok = ['Stok harus berupa angka yang valid (minimal 0)'];
  }

  // If there are validation errors, return them
  if (Object.keys(errors).length > 0) {
    return {
      errors,
      message: 'Gagal menambahkan produk. Periksa form di bawah.',
    };
  }

  // Try to create the product
  try {
    await createProduk({
      nama_produk: nama_produk.trim(),
      harga_produk: Number(harga_produk),
      image_produk: image_produk,
      stok: Number(stok)
    });
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Gagal menambahkan produk.',
    };
  }

  // Revalidate the cache for the katalog page and redirect
  revalidatePath('/dashboard-admin/katalog-admin');
  redirect('/dashboard-admin/katalog-admin');
}

// UPDATED UPDATE FUNCTION WITH DETAILED LOGGING
export async function updateProdukAction(
  id: string,
  prevState: State,
  formData: FormData,
) {
  console.log('=== UPDATE PRODUK DEBUG START ===');
  console.log('ID yang diterima:', id);
  console.log('Form data entries:');
  
  // Log semua form data
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  // Get current product to compare
  try {
    const currentProduk = await getProdukById(parseInt(id));
    console.log('Current product data:', currentProduk);
  } catch (error) {
    console.error('Error getting current product:', error);
  }

  // Extract form data
  const rawData = {
    id: id,
    nama_produk: formData.get('nama_produk'),
    harga_produk: formData.get('harga_produk'),
    image_produk: formData.get('image_produk'),
    stok: formData.get('stok'),
  };

  console.log('Raw form data:', rawData);

  // Validasi input dengan Zod
  const validatedFields = UpdateProdukSchema.safeParse(rawData);

  console.log('Validation result:', validatedFields);

  // Jika validasi gagal, return error
  if (!validatedFields.success) {
    console.error('Validation errors:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Produk.',
    };
  }

  // Extract data yang sudah divalidasi
  const { nama_produk, harga_produk, image_produk, stok } = validatedFields.data;

  console.log('Validated data:', { nama_produk, harga_produk, image_produk, stok });

  try {
    // Prepare data untuk update
    const updateData = {
      id: parseInt(id),
      nama_produk,
      harga_produk,
      stok,
      ...(image_produk && image_produk.trim() !== '' ? { image_produk } : {}),
    };

    console.log('Update data being sent to database:', updateData);

    // Call fungsi update dari data.ts
    const result = await updateProduk(updateData);
    console.log('Database update result:', result);

    console.log('=== UPDATE BERHASIL ===');
  } catch (error) {
    console.error('Database Error during update:', error);
    return {
      message: `Database Error: Failed to Update Produk. ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }

  console.log('=== UPDATE PRODUK DEBUG END ===');

  // Revalidate cache dan redirect
  revalidatePath('/dashboard-admin/katalog-admin');
  // redirect('/dashboard-admin/katalog-admin');

  return {
  success: true,
  message: 'Produk berhasil diperbarui!',
};
}

// Alternative simpler update function untuk testing
export async function updateProdukActionSimple(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const nama_produk = formData.get('nama_produk') as string;
  const harga_produk = formData.get('harga_produk') as string;
  const image_produk = formData.get('image_produk') as string;
  const stok = formData.get('stok') as string;

  console.log('Simple update - Data received:', {
    id,
    nama_produk,
    harga_produk,
    image_produk: image_produk?.substring(0, 50) + '...', // Only log first 50 chars of image
    stok
  });

  // Basic validation
  if (!nama_produk?.trim()) {
    return {
      errors: { nama_produk: ['Nama produk harus diisi'] },
      message: 'Validation failed'
    };
  }

  if (!harga_produk || isNaN(Number(harga_produk)) || Number(harga_produk) <= 0) {
    return {
      errors: { harga_produk: ['Harga harus berupa angka valid > 0'] },
      message: 'Validation failed'
    };
  }

  if (!stok || isNaN(Number(stok)) || Number(stok) < 0) {
    return {
      errors: { stok: ['Stok harus berupa angka valid >= 0'] },
      message: 'Validation failed'
    };
  }

  try {
    const updateData = {
      id: parseInt(id),
      nama_produk: nama_produk.trim(),
      harga_produk: Number(harga_produk),
      stok: Number(stok),
      ...(image_produk && image_produk.trim() !== '' ? { image_produk } : {})
    };

    console.log('Sending to database:', updateData);
    await updateProduk(updateData);
    console.log('Database update successful');

    revalidatePath('/dashboard-admin/katalog-admin');
    redirect('/dashboard-admin/katalog-admin');
  } catch (error) {
    console.error('Update error:', error);
    return {
      message: `Update failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Hapus

export async function deleteProduct(id: string) {
  try {
    await deleteProduk(id);
    revalidatePath('/dashboard-admin/katalog-admin');
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
}

export async function tambahTransaksi(data: {
  produk: string;
  namaPembeli: string;
  emailPembeli: string;
  harga: number;
  tanggal: string;
}) {
  await createTransaksiLangsung({
    produk: data.produk,
    namaPembeli: data.namaPembeli,
    emailPembeli: data.emailPembeli,
    harga: data.harga,
    tanggal_transaksi: data.tanggal,
  });
}

export async function deleteTransaksiAction(id: string) {
  try {
    await deleteTransaksi(id);
    
    // Revalidate path untuk refresh data
    revalidatePath('/dashboard-admin/penjualan-admin');
    
    return { 
      success: true, 
      message: 'Transaksi berhasil dihapus!' 
    };
  } catch (error) {
    console.error('Error in deleteTransaksiAction:', error);
    return { 
      success: false, 
      message: `Gagal menghapus transaksi: ${error instanceof Error ? error.message : 'Kesalahan tidak dikenal'}` 
    };
  }
}