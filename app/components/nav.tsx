import React, { Component } from "react";
import Router from 'next/router';
import { connect } from 'react-redux';
import { authClose, authLogout, authOpen } from '../store/reducers/authReducer'
import { changeLanguages, setPathname } from '../store/reducers/productsReducer';
import styles from '../styles/nav.module.scss'
import 'setimmediate'

if (!global.setImmediate) {
  global.setImmediate = setTimeout
}

class Nav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lang: 'en',
      currentLanguage: 'en',
      myTimeout: 1000,
    }
}

  componentWillUnmount() {
    clearTimeout(this.myTimeout)
  }

  gotoLink(pathname) {
    this.props.onSetPathname(pathname) 
    Router.push({pathname: pathname})
  }
 
  changeLanguages = (event) => {
    const lang = event.target.value
    this.props.onChangeLanguages(lang)
  }
  
  
  render() {
    let isAdmin = this.props.isAdmin;
    let authlinks = '';
    if ( (this.props.isAuthenticated===true) && (isAdmin===true) ) {
      authlinks = (
      <ul className={`nav ${styles.navbarnav} navbar-right`}  id="admin-bar">
        <li key="admin" className={styles.navitem}>
              <span className={`glyphicon glyphicon-wrench  ${styles.admin}`}></span><br/>
              <span className={styles.menutext +" "+ styles.admin}>Admin</span> 
          </li>
          <li key="logout" role="listitem" aria-label="logout" className={styles.navitem}>
            <a  id="logout" className={styles.navlink}  
                onClick={this.props.onLogOut}>
              <span className={`glyphicon glyphicon-log-out ${styles.menuicon}`}></span><br/>
              <span className={styles.menutext}>Log Out</span>
            </a>
          </li>
        </ul>
      );
    }else if ( this.props.isAuthenticated===true ){
      authlinks = (
        <ul className={`nav ${styles.navbarnav +" "+ styles.authbar} navbar-right`}  id="auth-bar">
          <li key="lang" role="listitem" aria-label="lang" className={styles.navlang}>
            <select className={styles.navSelectLang} defaultValue={this.props.lang} onChange={this.changeLanguages} >
              <option value="en"  >English</option>
              <option value="he"  >Hebrew</option>
              <option value="th"  >Thai</option>
            </select>
          </li>
          <li key="logout" role="listitem" aria-label="logout" className={styles.navitem}>
            <a  id="logout" className={styles.navlink} 
                onClick={this.props.onLogOut}>
              <span className={`glyphicon glyphicon-log-out ${styles.menuicon}`}></span><br/>
              <span className={styles.menutext}>Log Out<br/>&nbsp;</span>
            </a>
          </li>
        </ul>
      );
    } else {
      authlinks = (
        <ul className={`nav ${styles.navbarnav} ${styles.authbar} navbar-right`}  id="auth-bar">
          <li key="lang" role="listitem" aria-label="lang" className={styles.navlang}>
            <select className={styles.navSelectLang} defaultValue={this.props.lang} 
            onChange={this.changeLanguages}>
              <option value="he">Hebrew</option>
              <option value="en">English</option>
              <option value="th"  >Thai</option>
            </select>
          </li>
          <li key="login" role="listitem" aria-label="login" className={styles.navitem}>
            <a id="logout" className="navlink" 
                onClick={this.props.onAuthOpen}>
              <span className={`glyphicon glyphicon-user ${styles.menuicon}`}></span><br/>
              <span className="menutext">Login<br/></span>
            </a>
          </li>
        </ul>
      );
    }

      return (
  <nav className={`navbar ${styles.navbar}`} id="main-navbar">
    <div className={styles.mynav}>
      <ul name="navigation bar" role="navigation list" className={`nav ${styles.navbarnav} ${styles.mynavbar}`}  id="mynavbar">
        <li name="home" role="listitem" aria-label="home" className={styles.navitem }>
          
            <a className={(this.props.pathname==='/')? styles.active : null }
              onClick={() => this.gotoLink('/')}>
              <span className={`glyphicon glyphicon-home ${styles.menuicon}`}></span><br/>
              <span className={styles.menutext}>Home<br/>&nbsp;</span>
            </a>
          
          </li>
          <li name="about_us" id="aboutus" role="listitem" aria-label="about us" className={styles.navitem }>

          
            <a className={(this.props.pathname === '/about/')? styles.active : null } 
            onClick={() => this.gotoLink('/about/' )}>
              <span className={`glyphicon glyphicon-question-sign ${styles.menuicon}`}></span><br/>
              <span className={styles.menutext}>About Us</span>
            </a>
          
          </li>

          <li name="products-catalog" id="productscat" role="listitem" aria-label="product catalog" className={styles.navitem }>

          <a className={(this.props.pathname==='/products/') ? styles.active : null }
              onClick={() => this.gotoLink('/products/')}>
              <span className={`glyphicon glyphicon-shopping-cart ${styles.menuicon}`}></span><br/>
              <span className={styles.menutext}>Products<br/>&nbsp;</span>
            </a>
       
          </li>
          <li name="reviews" id="reviews" role="listitem" aria-label="reviews" className={styles.navitem }>
        
          <a  className={(this.props.pathname==='/reviews/') ? styles.active : null }
              onClick={() => this.gotoLink('/reviews/')}>
              <span className={`glyphicon glyphicon-thumbs-up ${styles.menuicon}`}></span><br/>
              <span className={styles.menutext}>Reviews<br/>&nbsp;</span>
            </a>
          
          </li>
      </ul>
      {authlinks}
    </div>
 </nav>
)
  }
}    
  
const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token !== null,
      isAdmin: state.auth.isAdmin,
      expiresIn: state.auth.expiresIn,
      pathname: state.products.pathname,
      lang: state.products.currentLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onAuthClose: () => dispatch (authClose() ),
      onLogOut: () => dispatch ( authLogout() ),
      onAuthOpen: () => dispatch ( authOpen() ),
      onSetPathname: (path) => dispatch ( setPathname(path) ),
      onChangeLanguages: (lang) => dispatch ( changeLanguages(lang) ),
  };
};

export default connect( mapStateToProps, mapDispatchToProps)( Nav );
