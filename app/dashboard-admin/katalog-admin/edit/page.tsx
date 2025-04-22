import { Suspense } from 'react';  
import EditKatalogForm from '@/app/dashboard-admin/katalog-admin/edit/editform';  

export default function EditKatalogPage() {  
  return (  
    <Suspense fallback={<div>Loading...</div>}>  
      <EditKatalogForm />  
    </Suspense>  
  );  
}  