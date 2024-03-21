import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  message: string;
}

const Tooltip = ({ message, children }: TooltipProps) => {
  return (
    <>
      {/*      <!-- Component: Top base sized tooltip --> */}
      <span
        className='relative overflow-hidden cursor-pointer group hover:overflow-visible focus-visible:outline-none'
        aria-describedby='tooltip-01'
      >
        {/*        <!-- Tooltip trigger --> */}
        {children}
        {/*        <!-- End Tooltip trigger --> */}
        <span
          role='tooltip'
          id='tooltip-01'
          className="invisible absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 rounded bg-slate-700 p-4 text-sm text-white opacity-0 transition-all before:invisible before:absolute before:left-1/2 before:top-full before:z-10 before:mb-2 before:-ml-2 before:border-x-8 before:border-t-8 before:border-x-transparent before:border-t-slate-700 before:opacity-0 before:transition-all before:content-[''] group-hover:visible group-hover:block group-hover:opacity-100 group-hover:before:visible group-hover:before:opacity-100"
        >
          {message}
        </span>
      </span>
      {/*      <!-- End Top base sized tooltip --> */}
    </>
  );
};

export { Tooltip };
