'use client'
import { HomeIcon, Battery0Icon, Battery100Icon, FlagIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import React from "react";
import { Dropdown, DropdownItem } from "flowbite-react";


const links = [
  { name: 'Main', href: '/dashboard', icon: HomeIcon },
  { name: 'Alive (जिउँदो)', href: '/dashboard/alive', icon: Battery100Icon },
  { name: 'Minced (काटेको)', href: '/dashboard/minced', icon: Battery0Icon },
  { name: 'Banner', href: '/dashboard/banner', icon: FlagIcon },
  { name: 'Notice', href: '/dashboard/notice', icon: SpeakerWaveIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <>
            <Link key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          </>
        );
      })}
      <div className={clsx(
        'flex h-[48px] grow items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
        {
          'bg-sky-100 text-blue-600': pathname === "/dashboard/market/alive",
        },
      )}>
        <Dropdown label="Market" inline>
          <DropdownItem key='a' href="/dashboard/market/alive" >Alive Goat</DropdownItem>
          <DropdownItem key='b' href="/dashboard/market/minced">Minced Meat</DropdownItem>
        </Dropdown>
      </div>
    </>
  );
}
