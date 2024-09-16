'use client'
import {
  HomeIcon, Battery0Icon, Battery100Icon, HomeModernIcon,
  MegaphoneIcon, PhoneIcon, ShoppingBagIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


const links = [
  { name: 'Home', href: '/', icon: HomeModernIcon },
  { name: 'About Us', href: '#about', icon: MegaphoneIcon },
  { name: 'Contact Us', href: '#contact', icon: PhoneIcon },
  { name: 'Market', href: '#m', icon: ShoppingBagIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow w-auto items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-sky-300 md:flex-none md:justify-start  mx-5 md:p-2 md:px-3',
              {
                ' text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
