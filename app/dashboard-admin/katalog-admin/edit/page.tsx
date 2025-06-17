// app/dashboard-admin/katalog-admin/edit/page.tsx
import { notFound } from 'next/navigation';
import { getProdukById } from '@/app/lib/data';
import EditProdukForm from '@/app/ui/dashboard-admin/katalog/edit-form';
import Breadcrumbs from '@/app/ui/dashboard-admin/katalog/breadcrumbs';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) {
  // Await searchParams sebelum menggunakannya
  const resolvedSearchParams = await searchParams;
  const id = resolvedSearchParams?.id;
  
  if (!id) {
    notFound();
  }

  const produk = await getProdukById(parseInt(id));
  
  if (!produk) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Katalog', href: '/dashboard-admin/katalog-admin' },
          {
            label: 'Edit Produk',
            href: `/dashboard-admin/katalog-admin/edit?id=${id}`,
            active: true,
          },
        ]}
      />
      <EditProdukForm produk={produk} />
    </main>
  );
}