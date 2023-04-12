import React from "react";
import Image from 'next/image';


const Header = () => (
  <div id='header'>
    <Image src='/static/orataiphathai_bg.jpg' width="1600px" height="270px"
     className='img-responsive myimg'
    alt="Orataiphathai Wholesale Thai Sarong" />
  
   <style jsx="true">{`
  @media (min-width: 601px) {
    #header {
      display: inline-block;
        width: 100%;
        height: 100%;
        min-height: 100px;
        max-width: 1600px;
        margin: 0px!important;
        padding: 0px!important;
        background-color: brown;
    }
    .myimg{
      margin: 0px!important;
      height: 100%!important;
      object-fit: fill;
    }

  }

  @media (max-width: 600px) {
    #header {
      display: inline-block;
      width: 100%;
      height: 100%;
      max-width: 1600px;
      background-color: brown;
      
    }

    .myimg{
      height: 100px!important;
      object-fit: cover;
    }
  }
 
  `}</style>
 </div>
)
export default Header;