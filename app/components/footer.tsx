import React from 'react';
import Link from 'next/link';

const Footer =  () => (
  <footer className="footer">
  <nav className="navbar navbar-default" >
    <div className="container-fluid">
      <div className="navbar-header">
        &copy; Orataiphathai 2014
      </div>
      <ul className="nav navbar-nav">
        <li >
          <Link href='/privacy'>
            <a>Privacy Policy</a>
          </Link>
        </li>
        <li >
          <Link href='/terms'>
            <a alt="Term of Use">Terms</a>
          </Link>
        </li>
      </ul>
    </div>
  </nav>  
    <style jsx >{`
    .footer{
      height: 50px;
      margin: 0px;
      padding: auto;
			
    }
    .footer > a {
        color: black!important; 
        background-color: #3d2115 !important; 
        text-decoration: none;
       
      }

      .footer > a:active, 
      .footer > a.active {
        color: #de4d0e !important; 
        font-weight: bold!important;
      }

      .footer > a:hover, 
      .footer > a:focus,
      .navbar .navbar-nav>li>a:hover,
      .navbar .navbar-nav>li>a:focus
      {
        color: ##de4d0e !important; // efa40d #de4d0e
        background-color: transparent!important;
      }  
      .navbar {
        margin-bottom: 0px!important;
        border: 0px!important;
      }
      .navbar-nav{
        display: inline-block;
      }
      .navbar .navbar-nav>li>a {
        padding: 15px!important;
      }
      .navbar-header {
        
        display: inline-block;
        padding: 15px 6px!important;
        margin-right: 50px!important; 
        vertical-align: middle;
        color: black!important; 

        background-color: transparent!important; 
        font-size: 1em!important;
        font-weight: bold!important;
      }  
      @media (max-width: 900px){
        .navbar-header {
          width: 170px;
          margin: 0px 10px!important;
        }
        .nav>li{
          display:inline-block;
          margin: 0px 5px;
        }
        .navbar .navbar-nav>li>a {
          padding: 15px!important;
        }
      }
      @media (max-width: 420px){
        .navbar-header {
          width: 140px;
          margin: 0px 0px!important;
          font-size: 12px!important;
        }
        .nav>li{
          display:inline-block;
          margin: 0px 5px;
        }
        .navbar .navbar-nav>li>a {
          padding: 8px!important;
          font-size: 12px!important;
        }
      }

    `}</style>
  </footer>
)

export default Footer;