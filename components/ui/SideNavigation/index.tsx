import Link from 'next/link';
import React, { useState } from 'react';
import { FaDolly } from 'react-icons/fa6';
import { FaUserPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { PrivateComponent } from '@/components/PrivateComponent';
import { SiBookstack } from 'react-icons/si';

interface SideNavigationProps {
  name: string;
  image: string;
  email: string;
  handleLogout: () => Promise<void>;
}

const SideNavigation = ({
  name,
  image,
  email,
  handleLogout,
}: SideNavigationProps) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const buttonClasses = `visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
    isSideNavOpen
      ? 'visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 '
      : ''
  }`;

  return (
    <>
      {/*  <!-- Component: Side navigation menu with user profile and alert message --> */}
      {/*  <!-- Mobile trigger --> */}
      <button
        title='Side navigation'
        type='button'
        className={buttonClasses}
        aria-haspopup='menu'
        aria-label='Side navigation'
        aria-expanded={isSideNavOpen ? 'true' : 'false'}
        aria-controls='nav-menu-4'
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className='absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform'>
          <span
            aria-hidden='true'
            className='absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300'
          ></span>
          <span
            aria-hidden='true'
            className='absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300'
          ></span>
          <span
            aria-hidden='true'
            className='absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300'
          ></span>
        </div>
      </button>

      {/*  <!-- Side Navigation --> */}
      <aside
        id='nav-menu-4'
        aria-label='Side navigation'
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col bg-black bg-opacity-80 transition-transform lg:translate-x-0 ${
          isSideNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          title='Side navigation'
          type='button'
          className={buttonClasses}
          aria-haspopup='menu'
          aria-label='Side navigation'
          aria-expanded={isSideNavOpen ? 'true' : 'false'}
          aria-controls='nav-menu-4'
          onClick={() => setIsSideNavOpen(!isSideNavOpen)}
        >
          <div className='absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform'>
            <span
              aria-hidden='true'
              className='absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300'
            ></span>
            <span
              aria-hidden='true'
              className='absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300'
            ></span>
            <span
              aria-hidden='true'
              className='absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300'
            ></span>
          </div>
        </button>
        <div className='flex flex-col items-center gap-4 border-b border-slate-600 p-6'>
          <div className='shrink-0'>
            <Link
              href='/profile'
              className='relative flex h-12 w-12 items-center justify-center rounded-full text-white'
            >
              <img
                src={image}
                alt='user name'
                title='user name'
                width={48}
                height={48}
                className='max-w-full rounded-full'
              />
              <span className='absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-indigo-500 p-1 text-sm text-white'>
                <span className='sr-only'> online </span>
              </span>
            </Link>
          </div>
          <div className='flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0 text-center'>
            <h4 className='w-full truncate text-base text-white'>{name}</h4>
            <p className='w-full truncate text-sm text-white'>{email}</p>
          </div>
        </div>
        <nav
          aria-label='side navigation'
          className='flex-1 divide-y divide-slate-700 overflow-auto'
        >
          <div>
            <ul className='flex flex-1 flex-col gap-1 py-3'>
              <PrivateComponent roleName='ADMIN'>
                <NavbarLink
                  href='/usuarios'
                  title='Usuarios'
                  icon={<FaUserPlus />}
                />
              </PrivateComponent>
              <NavbarLink
                href='/materiales'
                title='materiales'
                icon={<SiBookstack />}
              />
              <NavbarLink
                href='/inventories'
                title='inventario'
                icon={<FaDolly />}
              />
            </ul>
          </div>
        </nav>

        <footer className='border-t border-slate-600 p-3'>
          <Link
            href='/'
            onClick={handleLogout}
            className='flex items-center gap-3 rounded p-3 text-white transition-colors hover:text-indigo-500 '
          >
            <div className='flex items-center self-center '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-6 w-6'
                aria-label='Dashboard icon'
                role='graphics-symbol'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div className='flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium'>
              Logout
            </div>
          </Link>
        </footer>
      </aside>

      {/*  <!-- Backdrop --> */}
      <button
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsSideNavOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsSideNavOpen(false);
          }
        }}
      ></button>
      {/*  <!-- End Side navigation menu with user profile and alert message --> */}
    </>
  );
};

interface NavbarLinkProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

const NavbarLink = ({ href, title, icon }: NavbarLinkProps) => {
  const router = useRouter();
  return (
    <li className='px-3'>
      <Link
        href={href}
        className={`
             flex items-center gap-3 rounded p-3
           hover:bg-indigo-50 hover:text-indigo-500
             ${router.asPath === href ? 'bg-indigo-100 text-indigo-700' : 'bg-black text-white'}
        `}
      >
        <div className='flex items-center self-center '>{icon}</div>
        <div className='flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm'>
          {title}
        </div>
      </Link>
    </li>
  );
};

export { SideNavigation };
