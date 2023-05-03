'use client';

import React, { useState, useContext, useEffect } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from "redux";
import { authClose, authLogout, authOpen } from '../redux/features/authReducer'
import { closeEdit, add2AllClose } from '../redux/features/productsReducer';
import styles from '../styles/nav.module.scss'
import 'setimmediate'
import { productsSlice, authSlice } from '../redux/store';
import LanguagueContext from '../contexts/languagueContext';
import { withReduxStore } from "../redux/withReduxStore";
import EditModal from "./UI/EditModal";
import EditProdForm from "./editProdForm";
import Add2AllForm from "./add2AllForm";

interface SelectChangeEvent extends React.ChangeEvent<HTMLSelectElement> {
  target: HTMLSelectElement & EventTarget;
}

const Nav = (props: any) => {
  const [myTimeout, setMyTimeout] = React.useState(1000)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const pathname = usePathname();
  const { editShow, add2AllShow } = useSelector(productsSlice);

  const { isAdmin, token } = useSelector(authSlice);
  const dispatch = useDispatch();

  const { currentLanguage, setCurrentLanguage } = useContext(LanguagueContext);

  useEffect(() => {
    console.log("isAuthenticated1", token.length > 0);
  }, []);

  useEffect(() => {
    console.log("nav currentLanguage", currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    console.log("isAuthenticated", token.length > 0);
    setIsAuthenticated(token.length > 0)
  }, [token]);

  const handleChangeLanguages = (event: SelectChangeEvent) => {
    const lang = event.target.value as "en" | "he" | "th"
    console.log("Lang", lang);
    setCurrentLanguage(lang);
  }

  function onAuthOpen() {
    dispatch(authOpen() as unknown as AnyAction)
  }

  function onAuthLogout() {
    dispatch(authClose() as unknown as AnyAction)
  }


  let authlinks = <></> as JSX.Element;
  if ((isAuthenticated === true) && (isAdmin === true)) {
    authlinks = (
      <ul className={`nav ${styles.navbarnav} navbar-right`} id="admin-bar">
        <li key="admin" className={styles.navitem}>
          <span className={`glyphicon glyphicon-wrench  ${styles.admin}`}></span><br />
          <span className={styles.menutext + " " + styles.admin}>Admin</span>
        </li>
        <li key="logout" role="listitem" aria-label="logout" className={styles.navitem}>
          <a id="logout" className={styles.navlink}
            onClick={onAuthLogout}>
            <span className={`glyphicon glyphicon-log-out ${styles.menuicon}`}></span><br />
            <span className={styles.menutext}>Log Out</span>
          </a>
        </li>
      </ul>
    );
  } else if (isAuthenticated === true) {
    authlinks = (
      <ul className={`nav ${styles.navbarnav + " " + styles.authbar} navbar-right`} id="auth-bar">
        <li key="lang" role="listitem" aria-label="lang" className={styles.navlang}>
          <select className={styles.navSelectLang} defaultValue={currentLanguage} onChange={handleChangeLanguages} >
            <option value="en"  >English</option>
            <option value="he"  >Hebrew</option>
            <option value="th"  >Thai</option>
          </select>
        </li>
        <li key="logout" role="listitem" aria-label="logout" className={styles.navitem}>
          <a id="logout" className={styles.navlink}
            onClick={onAuthOpen}>
            <span className={`glyphicon glyphicon-log-out ${styles.menuicon}`}></span><br />
            <span className={styles.menutext}>Log Out<br />&nbsp;</span>
          </a>
        </li>
      </ul>
    );
  } else {
    authlinks = (
      <ul className={`nav ${styles.navbarnav} ${styles.authbar} navbar-right`} id="auth-bar">
        <li key="lang" role="listitem" aria-label="lang" className={styles.navlang}>
          <select className={styles.navSelectLang} defaultValue={currentLanguage}
            onChange={handleChangeLanguages}>
            <option value="he">Hebrew</option>
            <option value="en">English</option>
            <option value="th"  >Thai</option>
          </select>
        </li>
        <li key="login" role="listitem" aria-label="login" className={styles.navitem}>
          <a id="logout" className="navlink"
            onClick={onAuthOpen}>
            <span className={`glyphicon glyphicon-user ${styles.menuicon}`}></span><br />
            <span className="menutext">Login<br /></span>
          </a>
        </li>
      </ul>
    );
  }
  //onClick={() => gotoLink('/')}
  return (
    <>
      <nav className={`navbar ${styles.navbar}`} id="main-navbar">
        <div className={styles.mynav}>
          <ul role="navigation list" className={`nav ${styles.navbarnav} ${styles.mynavbar}`} id="mynavbar">
            <li role="listitem" aria-label="home" className={styles.navitem}>

              <Link className={(pathname === '/') ? styles.active : ""}
                href={'/'}
              >
                <span className={`glyphicon glyphicon-home ${styles.menuicon}`}></span><br />
                <span className={styles.menutext}>Home<br />&nbsp;</span>
              </Link>

            </li>
            <li id="aboutus" role="listitem" aria-label="about us" className={styles.navitem}>


              <Link className={(pathname === '/aboutus/') ? styles.active : ""}
                href={{ pathname: "/aboutus/" }} >
                <span className={`glyphicon glyphicon-question-sign ${styles.menuicon}`}></span><br />
                <span className={styles.menutext}>About Us</span>
              </Link>

            </li>

            <li id="productscat" role="listitem" aria-label="product catalog" className={styles.navitem}>

              <Link className={(pathname === '/products/') ? styles.active : ""}
                href={{ pathname: "/products/" }}>
                <span className={`glyphicon glyphicon-shopping-cart ${styles.menuicon}`}></span><br />
                <span className={styles.menutext}>Products<br />&nbsp;</span>
              </Link>

            </li>
            <li id="reviews" role="listitem" aria-label="reviews" className={styles.navitem}>

              <Link className={(pathname === '/reviews/') ? styles.active : ""}
                href={{ pathname: "/reviews/" }}>
                <span className={`glyphicon glyphicon-thumbs-up ${styles.menuicon}`}></span><br />
                <span className={styles.menutext}>Reviews<br />&nbsp;</span>
              </Link>

            </li>
          </ul>
          {authlinks}
        </div>
      </nav>
      {(isAdmin === true) && <>
        <EditModal
          name="editProdModal"
          show={editShow}
          modalClosed={dispatch(closeEdit())}
          modalHeight={'600'}
        >
          <button className="btn btn-link" onClick={() => dispatch(closeEdit())}>
            X
          </button>
          <EditProdForm editModalClose={dispatch(closeEdit())} />
        </EditModal>

        <EditModal
          name="add2AllModal"
          show={add2AllShow}
          modalClosed={() => dispatch(add2AllClose())}
          modalHeight="600"
        >
          <button
            className="btn btn-link"
            onClick={() => dispatch(add2AllClose())}
          >
            X
          </button>
          <Add2AllForm />
        </EditModal>
      </>
      }
    </>
  )
}


export default withReduxStore(Nav);
