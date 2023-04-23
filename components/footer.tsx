//'use client';

import React from 'react';
import Link from 'next/link';

const Footer =  () => (
  <footer className="p-auto h-[50px] m-0">
  <nav className="border-0 mb-0 navbar navbar-default" >
    <div className="container-fluid">
      <div className="bg-transparent font-bold mt-3 mr-14 text-black text-base max-[900px]:w-[170px] max-[420px]:w-[140px] max-[420px]:m-0 max-[420px]:text-[12px] p-4 text-[14px] navbar-header inline-block align-middle">
        &copy; Orataiphathai 2014
      </div>
      <ul className="nav navbar-nav ">
        <li className="max-[900px]:inline-block max-[900px]:mx-0 max-[900px]:my-5px" >
          <Link href='/privacy' className="text-black max-[900px]:p-4 max-[420px]:p-2 max-[420px]:text-[12px] p-4 text-[14px] decoration-0 hover:font-bold  hover:text-[#de4d0e] active:font-bold active:text-[#de4d0e]">Privacy Policy</Link>
        </li>
        <li className="max-[900px]:inline-block max-[900px]:mx-0 max-[900px]:my-5px">
          <Link href='/terms' className="text-black max-[900px]:p-4 max-[420px]:p-2 max-[420px]:text-[12px] p-4 text-[14px] decoration-0 hover:bg-transparent hover:font-bold hover:text-[#de4d0e] active:font-bold active:text-[#de4d0e]" title="Term of Use">Terms</Link>
        </li>
      </ul>
    </div>
  </nav> 
  </footer>
)

export default Footer;