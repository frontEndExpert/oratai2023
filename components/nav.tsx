'use client';

import React, { useContext, useEffect } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from "@reduxjs/toolkit";
import { authClose, authLogout, authOpen } from '../redux/features/authReducer'
import { closeEdit, add2AllClose, fetchProducts } from '../redux/features/productsReducer';
import styles from '@/styles/nav.module.scss';
import { productsSlice, authSlice } from '../redux/store';
import LanguagueContext from '../contexts/languagueContext';
import { withReduxStore } from "../redux/withReduxStore";
import EditModal from "./UI/EditModal";
import EditProdForm from "./editProdForm";
import Add2AllForm from "./add2AllForm";
import Image from "next/image";
import home from "@/public/static/home.svg";
import cart from "@/public/static/cart.svg";
import reviews from "@/public/static/person-hearts.svg";
import aboutus from "@/public/static/question-circle-fill.svg";
import login from "@/public/static/login.svg";
import logout from "@/public/static/logout.svg";
import gear from "@/public/static/gear.svg";

interface SelectChangeEvent extends React.ChangeEvent<HTMLSelectElement> {
  target: HTMLSelectElement & EventTarget;
}

const Nav = (props: any) => {
  const pathname = usePathname();

  const { editShow, add2AllShow, allProducts } = useSelector(productsSlice);
  const { isAdmin, isAuthenticated } = useSelector(authSlice);
  const dispatch = useDispatch();

  const { currentLanguage, setCurrentLanguage } = useContext(LanguagueContext);

  useEffect(() => {
    dispatch(fetchProducts() as unknown as AnyAction)
  }, []);

  useEffect(() => {
  }, [pathname]);

  const handleEditClose = () => {
    dispatch(closeEdit())
  };

  const handleAddClose = () => {
    dispatch(add2AllClose())
  };

  const handleChangeLanguages = (event: SelectChangeEvent) => {
    const lang = event.target.value as "en" | "he" | "th"
    setCurrentLanguage(lang);
  }

  function onAuthOpen() {
    dispatch(authOpen() as unknown as AnyAction)
  }

  function onAuthLogout() {
    dispatch(authLogout() as unknown as AnyAction)
  }


  let authlinks = <></> as JSX.Element;
  if (isAuthenticated && isAdmin) {
    authlinks = (
      <ul className={`nav ${styles.navbarnav} navbar-right`} id="admin-bar">
        <li key="admin" className="cursor-pointer flex flex-col flex-wrap  w-20 justify-center items-center" >
          <Image className="mx-auto" src={gear} width={30} height={30} alt="admin" />
          <span className="font-500 text-black text-center text-12px w-13 decoration-none">Admin</span>
        </li>
        <li key="logout" role="listitem" aria-label="logout" >
          <div id="logout" className="cursor-pointer flex flex-col flex-wrap w-20 justify-center items-center"
            onClick={onAuthLogout}>
            <span className="font-500 text-black text-center text-12px w-13 decoration-none">
              <Image className="mx-auto" src={logout} width={30} height={30} alt="logout" />
              <span className="link-text" >Log Out</span>
            </span>
          </div>
        </li>
      </ul>
    );
  } else if (isAuthenticated) {
    authlinks = (
      <ul className="flex flex-row flex-nowrap h-30 text-black w-50 justify-end items-center align-middle float-right" id="auth-bar">
        <li key="lang" role="listitem" aria-label="lang" className="p-2 inline-block ">
          <select className={styles.navSelectLang} defaultValue={currentLanguage} onChange={handleChangeLanguages} >
            <option value="en"  >English</option>
            <option value="he"  >Hebrew</option>
            <option value="th"  >Thai</option>
          </select>
        </li>
        <li key="logout" role="listitem" aria-label="logout">
          <div id="logout" className="cursor-pointer flex flex-col flex-wrap w-20 justify-center items-center"
            onClick={onAuthLogout}>
            <span className="font-500 text-black text-center text-12px w-13 decoration-none">
              <Image className="mx-auto" src={logout} width={30} height={30} alt="logout" />
              <span className="link-text" >Log Out</span>
            </span>
          </div>
        </li>
      </ul>
    );
  } else { //{`nav ${styles.navbarnav} ${styles.authbar} navbar-right`} 
    authlinks = (
      <ul className="flex flex-row flex-nowrap h-30 text-black w-35 justify-end items-center align-middle float-right" id="auth-bar">
        <li key="lang" role="listitem" aria-label="lang" className="p-0 text-12px inline-block ">
          <select className={styles.navSelectLang} defaultValue={currentLanguage}
            onChange={handleChangeLanguages}>
            <option value="he">Hebrew</option>
            <option value="en">English</option>
            <option value="th">Thai</option>
          </select>
        </li>
        <li key="login" role="listitem" className="h-15 my-0 mx-1 w-15" aria-label="login" >
          <div id="logout" className="cursor-pointer flex flex-col flex-wrap w-15 justify-center items-center"
            onClick={onAuthOpen}>
            <span className=" font-500 text-black text-center min-w-15 decoration-none">
              <Image className="mx-auto w-8 " src={login} width={30} height={30} alt="login" />
              <span className="link-text" >Login</span>
            </span>
          </div>
        </li>
      </ul>
    );
  }

  <span className=" font-500 text-black text-center text-12px w-13 decoration-none "></span>

  return (
    <>
      <div className="bg-gradient-to-b from-[#ad966c] via-[#f4eacf] to-[#ad966c]  m-0 w-full p-0 relative" id="main-navbar">
        <div className="flex flex-row flex-nowrap m-0 p-0 px-1 justify-between items-center">
          <ul role="navigation list" className="flex flex-row flex-nowrap h-15 my-1 w-60 justify-items-center items-center " id="mynavbar">
            <li role="listitem" aria-label="home" className="h-14 my-0 mx-1 w-15">
              <Link className="cursor-pointer font-500 text-black text-center w-13 decoration-none" href={'/'} //</li>styles.active 
              >
                <Image className="mx-auto" src={home} width={30} height={30} alt="home" />
                <span className={(pathname == '/') ? "text-[14px] decoration-0 font-bold" : "text-[14px] text-black decoration-0"} >Home</span>
              </Link>
            </li>
            <li id="aboutus" role="listitem" aria-label="about us" className="h-15 my-0 mx-1 w-18">
              <Link className=" cursor-pointer font-500 text-black text-center w-15 decoration-none "
                href={{ pathname: "/aboutus" }} >
                <span className=" font-500 text-black text-center  min-w-15 decoration-none">
                  <Image className="mx-auto" src={aboutus} width={30} height={30} alt="about us" />
                  <span className={(pathname == '/aboutus') ? "text-[14px] decoration-0 font-bold whitespace-nowrap" : "text-[14px] text-black decoration-0"} >About Us</span>
                </span>
              </Link>

            </li>

            <li id="productscat" role="listitem" aria-label="product catalog" className="h-15 my-0 mx-1 w-15">
              <Link className="cursor-pointer"
                href={{ pathname: "/products" }}>
                <span className=" font-500 text-black text-center w-13 decoration-none ">
                  <Image className="mx-auto" src={cart} width={30} height={30} alt="product catalog" />
                  <span className={(pathname == '/products') ? "text-[14px] decoration-0 font-bold" : "text-[14px] text-black decoration-0"} >Products</span>
                </span>
              </Link>

            </li>
            <li id="reviews" role="listitem" aria-label="reviews" className="h-15 my-0 mx-1 w-15">
              <Link className="cursor-pointer "
                href={{ pathname: "/reviews" }}>
                <span className=" font-500 text-black text-center w-13 decoration-none">
                  <Image className="mx-auto" src={reviews} width={30} height={30} alt="reviews" />
                  <span className={(pathname == '/reviews') ? "text-[14px] decoration-0 font-bold " : "text-[14px] text-black decoration-0"}>Reviews</span>
                </span>
              </Link>

            </li>
          </ul>
          {authlinks}
        </div>
      </div>
      {(isAdmin && editShow) && <EditModal
        name="editProdModal"
        show={editShow}
        modalClosed={handleEditClose}
      >
        <button className="text-black" onClick={handleEditClose}>
          X
        </button>
        <EditProdForm editModalClose={handleEditClose} />
      </EditModal>
      }
      {(isAdmin && add2AllShow) && <EditModal
        name="add2AllModal"
        show={add2AllShow}
        modalClosed={handleAddClose}
        modalHeight="600"
      >
        <button
          className="btn btn-link"
          onClick={handleAddClose}
        >
          X
        </button>
        <Add2AllForm />
      </EditModal>
      }
    </>
  )
}

export default withReduxStore(Nav);
