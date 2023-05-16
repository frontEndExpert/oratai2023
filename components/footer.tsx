//'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="bg-gradient-to-b p-auto from-[#ad966c] via-[#f4eacf] to-[#ad966c] h-[60px] m-0 w-full p-0 relative">
      <nav className="border-0 text-black mb-0 navbar navbar-default" >
        <div className="container flex flex-row flex-nowrap justify-center">
          <div className="bg-transparent font-bold mr-14 text-black max-[900px]:w-[170px] max-[420px]:w-[140px] max-[420px]:m-0 p-0 text-12px navbar-header inline-block align-middle">
            &copy; Orataiphathai 2014
          </div>
          <ul className="flex flex-row flex-nowrap w-60 gap-2">
            <li className="max-[900px]:inline-block max-[900px]:mx-0 max-[900px]:my-5px" >
              <Link href='/privacy' className={"text-black max-[900px]:p-4 max-[420px]:p-2 max-[420px]:text-[12px] p-4 text-[14px] decoration-0 hover:font-bold  hover:text-[#de4d0e] " && (pathname == '/privacy/') ? "font-bold" : "font-normal"}>Privacy Policy</Link>
            </li>
            <li className="max-[900px]:inline-block max-[900px]:mx-0 max-[900px]:my-5px">
              <Link href='/terms' className={" text-black max-[900px]:p-4 max-[420px]:p-2 max-[420px]:text-[12px] p-4 text-[14px] decoration-0 hover:bg-transparent hover:font-bold hover:text-[#de4d0e] " &&
                (pathname == '/terms/') ? "font-bold" : "font-normal"} title="Term of Use">Terms</Link>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  )
}

export default Footer;