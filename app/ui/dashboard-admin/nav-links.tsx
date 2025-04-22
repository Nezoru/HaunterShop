'use client';
import {
  HomeIcon,
  TagIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline'; // Mengganti DocumentIcon dengan TagIcon

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { poppins } from '@/app/ui/fonts';

const links = [
  { name: 'DASHBOARD', href: '/dashboard-admin', icon: HomeIcon },
  {
    name: 'KATALOG PRODUK',
    href: '/dashboard-admin/katalog-admin',
    icon: TagIcon, // Menggunakan TagIcon untuk katalog produk
  },
  {
    name: 'PENJUALAN',
    href: '/dashboard-admin/penjualan-admin',
    icon: ShoppingCartIcon
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              `flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-[#FFFFFF] p-3 text-sm font-medium ${poppins.className} text-black hover:bg-[#FFF5D7] md:flex-none md:justify-start md:p-2 md:px-3`,
              {
                'bg-[#FFF5D7] text-black': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6 text-black" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}