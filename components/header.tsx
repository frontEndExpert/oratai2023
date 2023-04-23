import React from "react";
import Image from 'next/image';


const Header = () => (
  <div id='header' className="h-full bg-red-800 m-0 w-full min-h-[100px] max-w-[1600px] p-0 <sm:h-full <sm:w-full <sm:max-w-[1600px]">
    <Image src='/static/orataiphathai_bg.jpg' 
     width={1600} height={270}
     className='h-full m-0 img-responsive myimg'
     alt="Orataiphathai Wholesale Thai Sarong"
     priority={true} />
 </div>
)
export default Header;