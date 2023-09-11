import { IconBuildingStore } from '@tabler/icons-react';
import { IconChalkboard } from '@tabler/icons-react';
import { IconBuildingWarehouse } from '@tabler/icons-react';
import { IconBoxSeam } from '@tabler/icons-react';
import { IconMenuOrder } from '@tabler/icons-react';
import { IconSettings } from '@tabler/icons-react';
import { IconBoxMultiple } from '@tabler/icons-react';
import { IconLogout } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {signOut} from "next-auth/react";

export default function Navigation(){

    const inactiveLink = 'flex gap-1 p-1';
    const activeLink = inactiveLink+' bg-white text-blue-900 rounded';;
    const pathname = usePathname();

    return(
        <aside className='text-white p-4'>
            <Link href={'/'} className='flex gap-1 mb-4 mr-4'>
                <IconBuildingStore />
                <span className=''>
                    Ecommerce Admin
                </span>
            </Link>
            <nav className="flex flex-col gap-2">
                <Link href={'/'} className={pathname === '/dashboard' ? activeLink : inactiveLink}>
                    <IconChalkboard />
                    Dash Board
                </Link>
                <Link href={'/warehouse'} className={pathname.includes('/warehouse') ? activeLink : inactiveLink}>
                    <IconBuildingWarehouse />
                    Warehouse
                </Link>
                <Link href={'/categories'} className={pathname.includes('/categories') ? activeLink : inactiveLink}>
                    <IconBoxMultiple />
                    Categories
                </Link>
                <Link href={'/products'} className={pathname.includes('/products') ? activeLink : inactiveLink}>
                    <IconBoxSeam />
                    Product
                </Link>
                <Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
                    <IconMenuOrder />
                    Order
                </Link>
                <Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
                    <IconSettings />
                    Settings
                </Link>
                <button onClick={() => signOut()} className={inactiveLink}>
                    <IconLogout />
                    Logout
                </button>
            </nav>
        </aside>
    )
}