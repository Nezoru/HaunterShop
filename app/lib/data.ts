import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

interface Produk {
  id: string;
  nama_produk: string;
  harga_produk: number;
  image_produk: string;
  stok: number;
  id_transaksis_produk_id: string;
  // Add other fields as needed
}

interface TransaksiWithDetails {
  id: string;
  tanggal_transaksi: Date;
  harga: number;
  nama_produk: string;
  harga_produk: number;
  image_produk: string;
  nama_pembeli: string;
  email: string;
  image_url: string;
  // Add other fields as needed
}

interface CreateProdukData {
  nama_produk: string;
  harga_produk: number;
  image_produk: string;
  stok: number; // optional, default bisa 0
}

interface CreateTransaksiData {
  produk: string;
  namaPembeli: string;
  emailPembeli: string;
  harga: number;
  tanggal_transaksi: string;
}

export const dynamic = 'force-dynamic';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {    
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 1500));


    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

// Tambahkan fungsi ini ke file data.ts Anda

export async function fetchRevenueFromTransaksi() {
  try {
    console.log('Fetching revenue data from transactions...');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Query untuk mendapatkan revenue per bulan dari tabel transaksi
    const data = await sql`
      SELECT 
        TO_CHAR(tanggal_transaksi, 'Mon') as month,
        SUM(harga) as revenue
      FROM transaksi 
      WHERE tanggal_transaksi >= NOW() - INTERVAL '12 months'
      GROUP BY 
        EXTRACT(YEAR FROM tanggal_transaksi),
        EXTRACT(MONTH FROM tanggal_transaksi),
        TO_CHAR(tanggal_transaksi, 'Mon')
      ORDER BY 
        EXTRACT(YEAR FROM tanggal_transaksi),
        EXTRACT(MONTH FROM tanggal_transaksi)
    `;

    console.log('Revenue data fetch completed.');

    // Pastikan semua bulan ada (isi dengan 0 jika tidak ada transaksi)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const revenueMap = new Map();
    data.forEach(item => {
      revenueMap.set(item.month, Number(item.revenue));
    });

    const completeRevenue = months.map(month => ({
      month,
      revenue: revenueMap.get(month) || 0
    }));

    return completeRevenue;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data from transactions.');
  }
}

// Alternatif: Jika Anda ingin revenue berdasarkan tahun tertentu
export async function fetchRevenueFromTransaksiByYear(year: number = new Date().getFullYear()) {
  try {
    console.log(`Fetching revenue data from transactions for year ${year}...`);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const data = await sql`
      SELECT 
        TO_CHAR(tanggal_transaksi, 'Mon') as month,
        EXTRACT(MONTH FROM tanggal_transaksi) as month_num,
        SUM(harga) as revenue
      FROM transaksi 
      WHERE EXTRACT(YEAR FROM tanggal_transaksi) = ${year}
      GROUP BY 
        EXTRACT(MONTH FROM tanggal_transaksi),
        TO_CHAR(tanggal_transaksi, 'Mon')
      ORDER BY month_num
    `;

    // Pastikan semua bulan ada (isi dengan 0 jika tidak ada transaksi)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const revenueMap = new Map();
    data.forEach(item => {
      revenueMap.set(item.month, Number(item.revenue));
    });

    const completeRevenue = months.map(month => ({
      month,
      revenue: revenueMap.get(month) || 0
    }));

    return completeRevenue;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch revenue data from transactions for year ${year}.`);
  }
}

// Fungsi untuk mendapatkan statistik revenue tambahan
export async function fetchRevenueStats() {
  try {
    console.log('Fetching revenue statistics...');
    
    const stats = await sql`
      SELECT 
        COUNT(*) as total_transactions,
        SUM(harga) as total_revenue,
        AVG(harga) as average_transaction,
        MIN(harga) as min_transaction,
        MAX(harga) as max_transaction,
        EXTRACT(YEAR FROM MIN(tanggal_transaksi)) as first_transaction_year,
        EXTRACT(YEAR FROM MAX(tanggal_transaksi)) as last_transaction_year
      FROM transaksi
    `;

    const monthlyStats = await sql`
      SELECT 
        TO_CHAR(tanggal_transaksi, 'YYYY-MM') as year_month,
        COUNT(*) as transactions_count,
        SUM(harga) as monthly_revenue
      FROM transaksi 
      WHERE tanggal_transaksi >= NOW() - INTERVAL '12 months'
      GROUP BY TO_CHAR(tanggal_transaksi, 'YYYY-MM')
      ORDER BY year_month DESC
      LIMIT 12
    `;

    return {
      overview: stats[0],
      monthlyBreakdown: monthlyStats
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue statistics.');
  }
}

export async function fetchCardData() {
  try {
    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 1500));

    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');
    
    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
    
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType[]>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

// Produk

export async function getAllProduk(): Promise<Produk[]> {
  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const data = await sql<Produk[]>`
      SELECT * FROM produk ORDER BY id ASC
    `;
    
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function searchProduk(query: string): Promise<Produk[]> {
  try {
    // If no query provided, return all products
    if (!query || query.trim() === '') {
      return await getAllProduk();
    }

    // Use sql instead of db.query, consistent with other functions (Stok gak kedeteksi)
    const data = await sql<Produk[]>`
      SELECT 
        *
      FROM produk
      WHERE nama_produk ILIKE ${`%${query}%`}
      ORDER BY nama_produk ASC
    `;
    
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to search products.');
  }
}

export async function getPaginatedSearchProduk(
  query: string, 
  currentPage: number = 1, 
  itemsPerPage: number = 5
): Promise<{
  products: Produk[];
  totalPages: number;
  totalItems: number;
}> {
  try {
    // Get search results
    const searchResults = await searchProduk(query);
    
    // Calculate pagination
    const totalItems = searchResults.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Get items for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const products = searchResults.slice(startIndex, endIndex);
    
    return {
      products,
      totalPages,
      totalItems
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch paginated search results.');
  }
}

export async function getProdukById(id: number): Promise<Produk | null> {
  try {
    const produk = await sql<Produk[]>`
      SELECT * FROM produk 
      WHERE id = ${id}
    `;
    return produk[0] || null;
  } catch (error) {
    console.error('Error fetching produk by ID:', error);
    throw new Error(`Gagal mengambil produk dengan ID ${id}`);
  }
}

export async function createProduk(data: CreateProdukData) {
  try {
    // Generate ID sebagai string
    const newId = await generateNextProdukId();

    // Validasi panjang gambar
    if (data.image_produk.length > 1000000) {
      throw new Error('Gambar terlalu besar. Maksimal 1MB.');
    }

    // Insert produk
    const result = await sql`
      INSERT INTO produk (
        id,
        nama_produk, 
        harga_produk, 
        image_produk, 
        stok
      )
      VALUES (
        ${newId},
        ${data.nama_produk}, 
        ${data.harga_produk}, 
        ${data.image_produk}, 
        ${data.stok}
      )
      RETURNING *
    `;
    
    return result[0];
  } catch (error) {
    console.error('Detailed Database Error:', {
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : 'No stack trace',
      inputData: {
        nama_produk: data.nama_produk,
        harga_produk: data.harga_produk,
        image_produk_length: data.image_produk.length,
        stok: data.stok
      }
    });

    throw new Error(`Gagal membuat produk: ${error instanceof Error ? error.message : 'Kesalahan tidak dikenal'}`);
  }
}

export async function generateNextProdukId() {
  try {
    // Ambil semua ID dan process di JavaScript (lebih aman)
    const allIds = await sql`SELECT id FROM produk`;
    
    if (allIds.length === 0) {
      return "1"; // Return string
    }

    // Convert ke array angka, filter yang valid
    const numericIds = allIds
      .map(row => parseInt(row.id, 10))
      .filter(id => !isNaN(id) && id > 0);

    if (numericIds.length === 0) {
      return "1";
    }

    const maxId = Math.max(...numericIds);
    return (maxId + 1).toString(); // Return sebagai string
  } catch (error) {
    console.error('Error generating next ID:', error);
    throw new Error('Gagal generate ID produk');
  }
}
// Update

export interface UpdateProdukData {
  id: number;
  nama_produk: string;
  harga_produk: number;
  image_produk?: string; // Optional, only if the image is being updated
  stok: number;
}

export async function updateProduk(data: UpdateProdukData) {
  try {
    // Validate input
    if (!data.nama_produk || data.nama_produk.trim() === '') {
      throw new Error('Nama produk tidak boleh kosong');
    }

    if (data.harga_produk <= 0) {
      throw new Error('Harga produk harus lebih dari 0');
    }

    if (data.stok < 0) {
      throw new Error('Stok tidak boleh negatif');
    }

    // Check if the product exists
    const existingProduk = await sql`
      SELECT * FROM produk WHERE id = ${data.id}
    `;

    if (existingProduk.length === 0) {
      throw new Error(`Produk dengan ID ${data.id} tidak ditemukan`);
    }

    // Prepare the update query
    const updateQuery = data.image_produk 
      ? sql`
          UPDATE produk 
          SET 
            nama_produk = ${data.nama_produk}, 
            harga_produk = ${data.harga_produk}, 
            image_produk = ${data.image_produk}, 
            stok = ${data.stok}
          WHERE id = ${data.id}
          RETURNING *
        `
      : sql`
          UPDATE produk 
          SET 
            nama_produk = ${data.nama_produk}, 
            harga_produk = ${data.harga_produk}, 
            stok = ${data.stok}
          WHERE id = ${data.id}
          RETURNING *
        `;

    // Execute the update
    const result = await updateQuery;

    return result[0]; // Return the updated product
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error(`Gagal memperbarui produk: ${error instanceof Error ? error.message : 'Kesalahan tidak dikenal'}`);
  }
}


// Transaksi

export async function getAllTransaksiWithDetails() {
  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const timestamp = Date.now();
    console.log(`Fetching transactions at ${timestamp}`);
    const data = await sql<TransaksiWithDetails[]>`
      SELECT 
        transaksi.id,
        transaksi.tanggal_transaksi,
        transaksi.harga,
        produk.nama_produk,
        produk.harga_produk,
        produk.image_produk,
        customers.name AS nama_pembeli,
        customers.email,
        customers.image_url
      FROM transaksi
      JOIN produk ON transaksi.produk_id = produk.id
      JOIN customers ON transaksi.customer_id = customers.id
      ORDER BY transaksi.id ASC
    `;
    
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transactions with details.');
  }
}

export async function searchTransaksiWithDetails(query: string): Promise<TransaksiWithDetails[]> {
  try {
    // Jika tidak ada query, return semua transaksi
    if (!query || query.trim() === '') {
      return await getAllTransaksiWithDetails();
    }

    console.log('Searching transactions...');
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const data = await sql<TransaksiWithDetails[]>`
      SELECT 
        transaksi.id,
        transaksi.tanggal_transaksi,
        transaksi.harga,
        produk.nama_produk,
        produk.harga_produk,
        produk.image_produk,
        customers.name AS nama_pembeli,
        customers.email,
        customers.image_url
      FROM transaksi
      JOIN produk ON transaksi.produk_id = produk.id
      JOIN customers ON transaksi.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        produk.nama_produk ILIKE ${`%${query}%`} OR
        transaksi.harga::text ILIKE ${`%${query}%`} OR
        transaksi.tanggal_transaksi::text ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
      ORDER BY transaksi.tanggal_transaksi DESC
    `;
    
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to search transactions.');
  }
}

export async function fetchFilteredTransaksi(
  query: string,
  currentPage: number,
): Promise<TransaksiWithDetails[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const transaksi = await sql<TransaksiWithDetails[]>`
      SELECT 
        transaksi.id,
        transaksi.tanggal_transaksi,
        transaksi.harga,
        produk.nama_produk,
        produk.harga_produk,
        produk.image_produk,
        customers.name AS nama_pembeli,
        customers.email,
        customers.image_url
      FROM transaksi
      JOIN produk ON transaksi.produk_id = produk.id
      JOIN customers ON transaksi.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR          
        produk.nama_produk ILIKE ${`%${query}%`} OR     
        transaksi.harga::text ILIKE ${`%${query}%`} OR
        transaksi.tanggal_transaksi::text ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
      ORDER BY transaksi.tanggal_transaksi DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return transaksi;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered transactions.');
  }
}

export async function fetchTransaksiPages(query: string): Promise<number> {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM transaksi
      JOIN produk ON transaksi.produk_id = produk.id
      JOIN customers ON transaksi.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        produk.nama_produk ILIKE ${`%${query}%`} OR
        transaksi.harga::text ILIKE ${`%${query}%`} OR
        transaksi.tanggal_transaksi::text ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of transactions.');
  }
}

export async function getPaginatedSearchTransaksi(
  query: string, 
  currentPage: number = 1, 
  itemsPerPage: number = ITEMS_PER_PAGE
): Promise<{
  transactions: TransaksiWithDetails[];
  totalPages: number;
  totalItems: number;
}> {
  try {
    // Get search results count
    const countData = await sql`
      SELECT COUNT(*)
      FROM transaksi
      JOIN produk ON transaksi.produk_id = produk.id
      JOIN customers ON transaksi.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        produk.nama_produk ILIKE ${`%${query}%`} OR
        transaksi.harga::text ILIKE ${`%${query}%`} OR
        transaksi.tanggal_transaksi::text ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
    `;
    
    const totalItems = Number(countData[0].count);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Get paginated results
    const offset = (currentPage - 1) * itemsPerPage;
    const transactions = await sql<TransaksiWithDetails[]>`
      SELECT 
        transaksi.id,
        transaksi.tanggal_transaksi,
        transaksi.harga,
        produk.nama_produk,
        produk.harga_produk,
        produk.image_produk,
        customers.name AS nama_pembeli,
        customers.email,
        customers.image_url
      FROM transaksi
      JOIN produk ON transaksi.produk_id = produk.id
      JOIN customers ON transaksi.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        produk.nama_produk ILIKE ${`%${query}%`} OR
        transaksi.harga::text ILIKE ${`%${query}%`} OR
        transaksi.tanggal_transaksi::text ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
      ORDER BY transaksi.tanggal_transaksi DESC
      LIMIT ${itemsPerPage} OFFSET ${offset}
    `;
    
    return {
      transactions,
      totalPages,
      totalItems
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch paginated search results for transactions.');
  }
}

export async function getTransaksiById(id: string): Promise<TransaksiWithDetails | null> {
  try {
    const data = await sql<TransaksiWithDetails[]>`
      SELECT 
        transaksi.id,
        transaksi.tanggal_transaksi,
        transaksi.harga,
        produk.nama_produk,
        produk.harga_produk,
        produk.image_produk,
        customers.name AS nama_pembeli,
        customers.email,
        customers.image_url
      FROM transaksi
      JOIN produk ON transaksi.produk_id = produk.id
      JOIN customers ON transaksi.customer_id = customers.id
      WHERE transaksi.id = ${id}
    `;
    
    return data[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transaction by ID.');
  }
}

export async function deleteProduk(id: string) {
  try {
    // Check if product exists
    const existingProduk = await sql`
      SELECT * FROM produk WHERE id = ${id}
    `;

    if (existingProduk.length === 0) {
      throw new Error(`Produk dengan ID ${id} tidak ditemukan`);
    }

    // Check if product is referenced in transactions
    const referencedTransactions = await sql`
      SELECT COUNT(*) FROM transaksi WHERE produk_id = ${id}
    `;

    if (Number(referencedTransactions[0].count) > 0) {
      throw new Error('Produk tidak dapat dihapus karena sudah memiliki transaksi');
    }

    // Delete the product
    await sql`
      DELETE FROM produk WHERE id = ${id}
    `;

    console.log(`Produk dengan ID ${id} berhasil dihapus`);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Gagal menghapus produk: ${error instanceof Error ? error.message : 'Kesalahan tidak dikenal'}`);
  }
}

export async function createTransaksiLangsung(data: CreateTransaksiData) {
  try {
    const { produk, namaPembeli, harga, tanggal_transaksi, emailPembeli } = data;

    if (!produk || !namaPembeli || !harga || !tanggal_transaksi) {
      throw new Error("Data transaksi tidak lengkap");
    }

    const produkRes = await sql`
      SELECT id FROM produk WHERE id = ${produk}
    `;
    if (produkRes.length === 0)
      throw new Error(`Produk '${produk}' tidak ditemukan`);
    const produk_id = produkRes[0].id;

    let customer_id;
    const customerRes = await sql`
      SELECT id FROM customers WHERE name ILIKE ${namaPembeli}
    `;
    if (customerRes.length === 0) {
      if (!emailPembeli) {
        throw new Error("Email diperlukan untuk pelanggan baru");
      }
      const insertCustomer = await sql`
        INSERT INTO customers (name, email)
        VALUES (${namaPembeli}, ${emailPembeli})
        RETURNING id
      `;
      customer_id = insertCustomer[0].id;
    } else {
      customer_id = customerRes[0].id;
    }

   const newId = (Date.now() % 100).toString().padStart(2, '0');
// Hasil: 67, 23, 45, dll (selalu 2 digit)

    const insertRes = await sql`
      INSERT INTO transaksi (
        id,
        produk_id,
        customer_id,
        harga,
        tanggal_transaksi
      )
      VALUES (
        ${newId},
        ${produk_id},
        ${customer_id},
        ${harga},
        ${tanggal_transaksi}
      )
      RETURNING *
    `;

    return insertRes[0];
  } catch (error) {
    console.error("Detailed Database Error saat membuat transaksi:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack",
      input: data,
    });

    throw new Error(
      `Gagal membuat transaksi: ${
        error instanceof Error ? error.message : "Kesalahan tidak dikenal"
      }`
    );
  }
}

export async function deleteTransaksi(id: string) {
  try {
    // Check if transaction exists
    const existingTransaksi = await sql`
      SELECT * FROM transaksi WHERE id = ${id}
    `;

    if (existingTransaksi.length === 0) {
      throw new Error(`Transaksi dengan ID ${id} tidak ditemukan`);
    }

    // Delete the transaction
    const result = await sql`
      DELETE FROM transaksi WHERE id = ${id}
      RETURNING *
    `;

    console.log(`Transaksi dengan ID ${id} berhasil dihapus`);
    return result[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Gagal menghapus transaksi: ${error instanceof Error ? error.message : 'Kesalahan tidak dikenal'}`);
  }
}