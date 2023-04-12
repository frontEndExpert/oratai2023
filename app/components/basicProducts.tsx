import React, { useState, useEffect } from "react";
import { useSelector, useDispatch  } from 'react-redux';
import { AnyAction } from "redux";
import axios from "../config/axios-firebase";
// import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import {fetchProducts, updateAllProducts, add2AllOpen, add2AllClose, closeProductPage, openProductPage, closeEdit, updateCurrentProductId, updateCurrentProductGroup, closeAdded} from '../redux/features/productsReducer';
import EditModal from "./UI/EditModal"
import Modal from "./UI/Modal";
import Add2AllForm from "./add2AllForm";
import EditProdForm from "./editProdForm";
import ProductDisplay from "./productDisplay";
import productGroupData from "../shared/productGroup.json";
import Image from 'next/image';
import _ from "lodash";
import type { Product } from "../redux/features/productsReducer";
import {productsSlice, authSlice } from '../redux/store';
import useTransitions from "../hooks/useTranslations";
import Auth from './Auth';


const BasicProducts = (props: any) => {
//const [localProducts, setAllProducts] = useState([...props.allProducts]);
//const [prodShow, setProdShow] = useState(false);
const [loading, setLoading] = useState(false);
const [currentGroupId, setCurrentGroupId] = useState("all");
const [currentArrSize, setCurrentArrSize] = useState(0);
const [pin, setPin] = useState("");
const [revealText, setRevealText] = useState(false);

const dispatch = useDispatch();
const { productAdded, allProducts, currentProductGroup, prodShow, currentLanguage} = useSelector(productsSlice);

const {t} = useTransitions(currentLanguage);


useEffect(() => {
  dispatch<any>(fetchProducts())
}, []);

useEffect(() => {
  if(!allProducts || allProducts.length === 0 || productAdded) {
    dispatch<any>(fetchProducts())
  }
  if(currentProductGroup.length > 0 && productAdded) {
    let filteredProductArr = allProducts.filter(
      (product: Product) => product.group_id === currentGroupId
    );
    filteredProductArr = filteredProductArr.sort((product1: Product, product2: Product) => {
      var textA = product1.title.toUpperCase();
      var textB = product2.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    dispatch(updateCurrentProductGroup([...filteredProductArr]))
    setCurrentArrSize(filteredProductArr.length);
    setPin("");
  }
  if (currentProductGroup ) {
    let filteredProductArr = props.allProducts.filter(
      (product: Product) => product.group_id === currentGroupId
    );
    filteredProductArr = filteredProductArr.sort((product1: Product, product2: Product) => {
      var textA = product1.title.toUpperCase();
      var textB = product2.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    
    dispatch(updateCurrentProductGroup([...filteredProductArr]))
    setCurrentArrSize(filteredProductArr.length);
    setPin("");
    dispatch(closeAdded());
  }

}, [allProducts, productAdded, currentProductGroup]);


  const OpenMenu = (type_id: string) => {
    let filteredProductArr = [] as Product[]; 
    if (type_id === "all") {
      filteredProductArr = []; 
    } else {
      filteredProductArr = allProducts.filter(
        (product: Product) => {
          return product.group_id == type_id
        }
      );
      filteredProductArr = filteredProductArr.sort((product1: Product, product2: Product) => {
        var textA = product1.title.toUpperCase();
        var textB = product2.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      }) as Product[];
    }
    dispatch(updateCurrentProductId(""))
    dispatch(updateCurrentProductGroup([...filteredProductArr]));
    setCurrentGroupId(type_id);
    setCurrentArrSize(filteredProductArr.length);
    setPin("");
  };

  const handleAdd = () => {
    dispatch(add2AllOpen());
  };

  const openProductModal = (pid: string, p_in: string) => {
    dispatch(updateCurrentProductId(pid))
    setPin(p_in);
    openProductPage();
  };

  const closeProductPage = () => {
    setPin("");
    closeProductPage();
  };

  const handleEditClose = () => {
    dispatch(closeEdit())
    props.onCloseEdit();
  };

  const handleProductClose = () => {
    dispatch(closeProductPage() as unknown as AnyAction)
  }; 

  const toggleText = () => {
    setRevealText(!revealText)
  }


    let AdminModals: any;
    if (props.isAdmin === true) {
      AdminModals = (
        <>
          <EditModal
            name="editProdModal"
            show={props.editShow}
            modalClosed={props.onCloseEdit}
            modalHeight={'600'}
          >
            <button className="btn btn-link" onClick={props.onCloseEdit}>
              X
            </button>
            <EditProdForm editModalClose={handleEditClose} />
          </EditModal>

          <EditModal
            name="add2AllModal"
            show={props.add2AllShow}
            modalClosed={props.onAdd2AllClose}
            modalHeight="600"
          >
            <button
              className="btn btn-link"
              onClick={props.onAdd2AllClose}
            >
              X
            </button>
            <Add2AllForm  />
          </EditModal>
        </>
      );
    } else {
      AdminModals = "";
    }

    let addButton: JSX.Element = (<></>);
    if (props.isAdmin === true) {
      addButton = (
        <div
          id="add-button"
          key={"addproduct"}
          className="productMenuButton"
          onClick={() => handleAdd()}
        >
          <Image
            className="add-button-img"
            src={"/static/add.png"}
            alt="Thai Sarong"
            sizes="10vw"
            width="80"
            height="80"
          />
          <br />
          <p>Add Product</p>
        </div>
      );
    }

    const productGroup = (): JSX.Element => {
      let productMap = null;
      if (!props.loading && props.currentProductGroup) {
          const group = (currentGroupId=='all') ? [{"id":'all', "title":"",  "description":"",  "url":"/static/golden2951.jpg"}]
          : productGroupData.filter(item => item.id==currentGroupId)
          
        
          productMap = (
                  <div className="group-container">
                    <h2 className="group-title">{t(`products:description${group[0].id}`)}{" "}</h2>
                    <div className="button-group" id="the2nd-menu">
                        {props.currentProductGroup.map((product: Product, index: number) => (
                        <div
                          key={product.id}
                          className="productMenuButton"
                          onClick={() => openProductModal(product.id, index.toString())}
                        >
                          <span>{product.title}</span>
                          <Image width="97" height="97"
                            src={"/static/" + product.photo_url}
                            alt={'Thai Sarong-' + product.title}
                            sizes="10vw"
                          />
                          
                        </div>
                      ))}
                    </div>
                  </div>
          )
      }
      
      return (
        <div className="prod-btns-container">
          {productMap}
        </div>
      )
    };


    let thePage = () => {
      return (
        <>
          {AdminModals}
          <Modal
            name="productPage"
            show={prodShow}
            modalClosed={closeProductPage}
            modalHeight={'600'}
          >
            <button className="btn btn-link" onClick={closeProductPage}>
              X
            </button>
            <ProductDisplay
              prodShow={prodShow}
              modalClose={closeProductPage}
              pin={pin}
              pid={props.productId}
              currentGroupId={currentGroupId}
              currentArrSize={currentArrSize}
            />
          </Modal>
          <div id="menu-box">
            <ul className="category-list">
              <li
                className={
                  currentGroupId === "1"
                    ? "category-btn activeted"
                    : "category-btn"
                }
                key="cat1"
              >
                <a className="menu-cat" onClick={() => OpenMenu("1")}>
                  <span className="menu-header">{productGroupData[0].title}</span>
                  <Image className="img-class"
                    src={productGroupData[0].url}
                    alt={productGroupData[0].title}
                    width="175"
                    height="175"
                  />
                </a>
              </li>
              <li
                className={
                  currentGroupId === "2"
                    ? "category-btn activeted"
                    : "category-btn"
                }
                key="cat2"
              >
                <a className="menu-cat" onClick={() => OpenMenu("2")}>
                  <span className="menu-header">{productGroupData[1].title}</span>
                  <Image className="img-class"
                    src={productGroupData[1].url}
                    alt={productGroupData[1].title}
                    width="175"
                    height="175"
                  />
                </a>
              </li>
              <li
                className={
                  currentGroupId === "3"
                    ? "category-btn activeted"
                    : "category-btn"
                }
                key="cat3"
              >
                <a className="menu-cat" onClick={() => OpenMenu("3")}>
                  <span className="menu-header">{productGroupData[2].title}</span>
                  <Image className="img-class"
                    src={productGroupData[2].url}
                    alt={productGroupData[2].title}
                    width="175"
                    height="175"
                  />
                </a>
              </li>
              <li
                className={
                  currentGroupId === "4"
                    ? "category-btn activeted"
                    : "category-btn"
                }
                key="cat4"
              >
                <a className="menu-cat" onClick={() => OpenMenu("4")}>
                  <span className="menu-header">{productGroupData[3].title}</span>
                  <Image className="img-class"
                    src={productGroupData[3].url}
                    alt={productGroupData[3].title}
                    width="175"
                    height="175"
                  />
                </a>
              </li>
              <li
                className={
                  currentGroupId === "5"
                    ? "category-btn activeted"
                    : "category-btn"
                }
                key="cat5"
              >
                <a className="menu-cat" onClick={() => OpenMenu("5")}>
                  <span className="menu-header">{productGroupData[4].title}</span>
                  <Image className="img-class"
                    src={productGroupData[4].url}
                    alt={productGroupData[4].title}
                    width="175"
                    height="175"
                  />
                </a>
              </li>
              <li
                className={
                  currentGroupId === "6"
                    ? "category-btn activeted"
                    : "category-btn"
                }
                key="cat6"
              >
                <a className="menu-cat" onClick={() => OpenMenu("6")}>
                  <span className="menu-header">{productGroupData[5].title}</span>
                  <Image className="img-class"
                    src={productGroupData[5].url}
                    alt={productGroupData[5].title}
                    width="175"
                    height="175"
                  />
                </a>
              </li>
              <li
                className={
                  currentGroupId === "7"
                    ? "category-btn activeted"
                    : "category-btn"
                }
                key="cat7"
              >
                <a className="menu-cat" onClick={() => OpenMenu("7")}>
                  <span className="menu-header">{productGroupData[6].title}</span>
                  <Image className="img-class"
                    src={productGroupData[6].url}
                    alt={productGroupData[6].title}
                    width="175"
                    height="175"
                  />
                </a>
              </li>
              <li
                className={
                  currentGroupId === "8"
                    ? "category-btn activeted"
                    : "category-btn"
                }
                key="cat8"
              >
                <a className="menu-cat" onClick={() => OpenMenu("8")}>
                  <span className="menu-header">{productGroupData[7].title}</span>
                  <Image className="img-class"
                    src={productGroupData[7].url}
                    alt={productGroupData[7].title}
                    width="175"
                    height="175"
                  />
                </a>
              </li>
              <li
                className={
                  currentGroupId === "9"
                    ? "category-btn activeted"
                    : "category-btn"
                }
                key="cat9"
              >
                <a className="menu-cat" onClick={() => OpenMenu("9")}>
                  <span className="menu-header">{productGroupData[8].title}</span>
                  <Image className="img-class"
                    src={productGroupData[8].url}
                    alt={productGroupData[8].title}
                    width="175"
                    height="175"
                    object-fit= "contain"
                  />
                </a>
              </li>
              <li
                className={
                  currentGroupId === "10"
                    ? "category-btn activeted"
                    : "category-btn"
                }
                key="cat10"
              >
                <a className="menu-cat" onClick={() => OpenMenu("10")}>
                  <span className="menu-header">{productGroupData[9].title}</span>
                  <Image className="img-class"
                    src={productGroupData[9].url}
                    alt={productGroupData[9].title}
                    width="175"
                    height="175"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="strike">
            <Image
              src={"/static/divider1.svg"}
              className="img-responsive"
              width="500"
              height="50"
              
              alt="orataiphathai Thai Sarong"
            />
          </div>
          <div className="product-group">
            {productGroup()}
            {addButton}
          </div>
          
        </>
      );
    };

    return <div className="mainbody" dir={props.currentLanguage=="he"?"rtl":"ltr"}> 
    {props.authShow && <Modal 
              name="authFormModal" 
              show={props.authShow} 
              modalClosed={props.onAuthClose}>
              <button className="btn btn-link auth-btn" onClick={props.onAuthClose}>X</button>
            <Auth t={t} />
        </Modal>}
  <h1 className="container centertext desc">Orataiphathai - {t("products:wholesale")}{" "}</h1>
  <div className="container desc">
        <div className="panel-body">
          <div className={revealText? "text-long":"text-short"} onClick={toggleText}>
            <p>{t("products:body1")}{" "}</p>
            <ul>
              <li>{t("products:body2")}{" "}</li>
              <li>{t("products:body3")}{" "}</li>
              <li>{t("products:body4")}{" "}</li>
            </ul>
          </div>
        </div>
        <div className="panel-body">
          <span>{t("products:body5")}{" "}</span>
          <h1 className="container centertext desc">{t("products:contact")}{" "}</h1>
       </div>
  </div>
    {thePage()} 
    </div>;
}

// const mapStateToProps = (state) => {
//   return {
//     userId: auth.userId,
//     isAdmin: auth.isAdmin,
//     productAdded: products.productAdded,
//     loading: products.loading,
//     add2AllShow: products.add2AllShow,
//     prodShow: products.prodShow,
//     editShow: products.editShow,
//     productId: products.currentProductId,
//     currentProductGroup: products.currentProductGroup,
//     allProducts: products.allProducts
//   };
// };

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     onFetchAllProducts: () => dispatch(fetchProducts()),
//     onAdd2AllOpen: () => dispatch(add2AllOpen()),
//     onAdd2AllClose: () => dispatch(add2AllClose()),
//     onCloseProductPage: () => dispatch(closeProductPage()),
//     onOpenProductPage: () => dispatch(openProductPage()),
//     onCloseEdit: () => dispatch(closeEdit()),
//     onUpdateCurrentProductId: (id: string) => dispatch(updateCurrentProductId(id)),
//     onUpdateProductGroup: (productGroup) => dispatch(updateCurrentProductGroup(productGroup)),
//     onUpdateAllProducts: (products: Product[]) => dispatch(updateAllProducts(products)),
//     onCloseAdded: () => dispatch(closeAdded()),
//   };
// };


export default BasicProducts;
//  connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(BasicProducts);
//withErrorHandler