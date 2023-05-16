import React from "react";
import Image from 'next/image';


const Header = () => (
  <div id='header' className="object-cover bg-red-800 m-0 w-full p-0 <sm:w-full ">
    <Image src='/static/orataiphathai_bg.jpg'
      width={1600} height={270}
      className='h-full m-0 img-responsive myimg'
      alt="Orataiphathai Wholesale Thai Sarong"
      priority={true} />
  </div>
)
export default Header;