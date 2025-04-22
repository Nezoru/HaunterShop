import SideNav from '@/app/ui/dashboard/sidenav';
import Footer from '../ui/dashboard/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-black bg-gradient-to-b from-black to-gray-900">
            {/* Navbar - sekarang berada di posisi teratas */}
            <SideNav />
      
            {/* Main content - akan mengisi ruang yang tersedia */}
            <main className="flex-grow">{children}</main>
      
            {/* Footer - tetap di bawah */}
            <Footer />
        </div>
    );
}