// app/dashboard/penjualan/edit/page.tsx  
import { Suspense } from 'react';  
import EditPenjualanForm from '@/app/dashboard-admin/penjualan-admin/edit/editform'

export default function EditPenjualanPage() {  
  return (  
    <Suspense fallback={<div>Loading...</div>}>  
      <EditPenjualanForm />  
    </Suspense>  
  );  
}  