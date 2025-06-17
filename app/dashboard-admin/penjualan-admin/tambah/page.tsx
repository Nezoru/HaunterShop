import TambahPenjualanPage from './page-client';
import { getAllProduk } from '@/app/lib/data';

export default async function Page() {
  const produkList = await getAllProduk();

  return (
    <TambahPenjualanPage produkList={produkList} />
  );
}