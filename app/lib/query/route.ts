// app/lib/query/route.ts  
import { unstable_noStore as noStore } from 'next/cache';  

// Mock data penjualan sesuai contoh  
let mockPenjualan = [
  { id: 1, tanggal: '2024-03-23', harga: 250000, nama_pembeli: 'Jajang', produk_dibeli: 'Casper  ' },
  { id: 2, tanggal: '2024-03-22', harga: 400000, nama_pembeli: 'Udin', produk_dibeli: 'Michael Myers  ' },
  { id: 3, tanggal: '2024-03-21', harga: 500000, nama_pembeli: 'Berren', produk_dibeli: 'Annabelle  ' },
  { id: 4, tanggal: '2024-03-20', harga: 400000, nama_pembeli: 'Dadang', produk_dibeli: 'Joker  ' },
  { id: 5, tanggal: '2024-03-19', harga: 400000, nama_pembeli: 'Rina', produk_dibeli: 'Harley Quinn  ' },
  { id: 6, tanggal: '2024-03-18', harga: 300000, nama_pembeli: 'Wati', produk_dibeli: 'Chucky  ' },
  { id: 7, tanggal: '2024-03-17', harga: 320000, nama_pembeli: 'Dewi', produk_dibeli: 'Scream Mask' },
  { id: 8, tanggal: '2024-03-16', harga: 350000, nama_pembeli: 'Bambang', produk_dibeli: 'Freddy Krueger Glove' },
  { id: 9, tanggal: '2024-03-15', harga: 375000, nama_pembeli: 'Sinta', produk_dibeli: 'Saw Mask' },
  { id: 10, tanggal: '2024-03-14', harga: 390000, nama_pembeli: 'Yoga', produk_dibeli: 'Zombie Makeup Kit' }
];

export const mockKatalog = [
  {
    id: 1,
    name: 'Casper',
    price: 250000,
    image: '/casper.png',
  },
  {
    id: 2,
    name: 'Michael Myers',
    price: 400000,
    image: '/killer.png',
  },
  {
    id: 3,
    name: 'Annabelle',
    price: 500000,
    image: '/suitwhite.png',
  },
  {
    id: 4,
    name: 'Joker',
    price: 400000,
    image: '/joker.png',
  },
  {
    id: 5,
    name: 'Walter White',
    price: 380000,
    image: '/suityellow.png',
  },
  {
    id: 6,
    name: 'Terrifier',
    price: 500000,
    image: '/clown.png',
  },
  {
    id: 7,
    name: 'Harley Quin - Women Jumpsuit',
    price: 400000,
    image: '/suit1.png',
  },
  {
    id: 8,
    name: 'Harley Quin',
    price: 400000,
    image: '/suit2.png',
  },
];


// route.ts
export async function fetchPenjualan(query: string, page: number) {
  const itemsPerPage = 5;

  let filtered = mockPenjualan;
  if (query) {
    filtered = filtered.filter((item) =>
      item.nama_pembeli.toLowerCase().includes(query.toLowerCase())
    );
  }

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginated = filtered.slice(start, end);

  return {
    penjualan: paginated,
    totalPages: Math.ceil(filtered.length / itemsPerPage),
  };
}


export async function fetchKatalog(query: string, currentPage: number) {
  noStore();

  const rowsPerPage = 4;
  const offset = (currentPage - 1) * rowsPerPage;

  const filteredKatalog = mockKatalog.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const katalog = filteredKatalog.slice(offset, offset + rowsPerPage);
  const totalPages = Math.ceil(filteredKatalog.length / rowsPerPage);

  return {
    katalog,
    totalPages,
  };
}

export function getPenjualanById(id: number) {
  return mockPenjualan.find((item) => item.id === id);
}

export function getKatalogById(id: number) {
  return mockKatalog.find((item) => item.id === id);
}

export function addPenjualan(data: {
  tanggal: string;
  harga: number;
  nama_pembeli: string;
  produk_dibeli: string;
}) {
  const newId = mockPenjualan.length + 1;
  mockPenjualan.push({ id: newId, ...data });
}