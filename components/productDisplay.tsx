import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import {
    delProduct, fetchProducts, openEdit, closeEdit, updateCurrentProductId,
    updateCurrentProductGroup, closeProductPage, closeAdded
} from '../redux/features/productsReducer';
import { getisAdmin } from '../redux/features/authReducer';
import axios from '../config/axios-firebase';
import productGroupData from "../shared/productGroup.json";
import { isMobile } from 'react-device-detect';
import styles from '../styles/productDisplay.module.scss'
import * as _ from 'lodash';
import { productsSlice, authSlice } from '../redux/store';
import type { Product } from "../redux/features/productsReducer";

type Props = {
    prodShow?: boolean;
    pin?: string;
    pid: string;
    currentGroupId?: string;
    currentArrSize?: number;
    modalClose?: Function;
}

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
}


const ProductDisplay = (props: Props) => {
    const [formIsValid, setFormIsValid] = useState(true);
    //const [currentArrSize, setCurrentArrSize] = useState(0);
    //const [current_product_index, setCurrent_product_index] = useState(null);
    //const [current_product_id, setCurrent_product_id] = useState(null);
    const [product, setProduct] = useState<Product>();
    const [isImageError, setIsImageError] = useState(false);

    const dispatch = useDispatch();
    const { productAdded, allProducts, currentProductGroup, prodShow, currentProductId } = useSelector(productsSlice);
    const { token, isAdmin, loading } = useSelector(authSlice);

    useEffect(() => {
        if (allProducts.length == 0) {
            dispatch(fetchProducts() as unknown as AnyAction);
        }
    }, []);

    useEffect(() => {
        if (prodShow && currentProductId != "") {
            const temp = allProducts.find((p: Product) => p.id === props.pid)
            console.log("temp", temp);
            setProduct(temp);
        }
        if (prodShow === false) {
            dispatch(updateCurrentProductId(""))
        }

    }, [currentProductId, prodShow, allProducts, productAdded]);

    // componentDidMount() {
    //     if(props.pin){
    //         setState({
    //             currentArrSize: props.currentArrSize,
    //             current_product_index: props.pin,
    //             current_product_id: props.pid,
    //             product: props.currentProductGroup[props.pin]
    //         })
    //     }
    // }

    const onError = () => {
        setIsImageError(true)
    }

    const closeProductModal = () => {
        dispatch(closeProductPage())
        dispatch(updateCurrentProductId(""))
        setProduct({} as Product)
    };


    // const prevProd = () => {
    //     if (parseInt(props.pin) >= 1) {

    //         dispatch(updateCurrentProductId((currentProductGroup[parseInt(props.pin) - 1].id)));
    //         setProduct({ ...currentProductGroup[parseInt(props.pin) - 1] })
    //     }
    // };

    // const nextProd = () => {
    //     if (parseInt(props.pin) < props.currentArrSize - 1) {
    //         dispatch(updateCurrentProductId((currentProductGroup[parseInt(props.pin) + 1].id)));
    //         setProduct({ ...currentProductGroup[parseInt(props.pin) + 1] })
    //     }
    // };

    const handleDelProd = (pid: string) => {
        dispatch(delProduct(pid) as unknown as AnyAction)
        dispatch<any>(fetchProducts())
        // props.modalClose();
    };

    const handleEditProd = (pid: string) => {
        dispatch(openEdit(pid));
    };



    // onError={(event: InputChangeEvent) => {event.target.src="/static/colors1.jpg"}}
    // current_product_index = props.pin,

    return <>
        {!_.isEmpty(product) && <div key={product.id}
            style={{ visibility: prodShow ? 'visible' : 'hidden' }}
            className={styles.productDetailsContainer}>

            {/*<div className={styles.productPager}>
                <button className={(parseInt(currentProductId) >= 1) ? styles.active : styles.disabled}
                    onClick={() => prevProd()}> <span className="glyphicon glyphicon-arrow-left"></span>
                    {isMobile ? "" : "Previous Product"}
                </button>
                <span className="grouptitle">Group: {productGroupData[parseInt(product.group_id) - 1].title}</span>
                <button className={(parseInt(props.pin) < props.currentArrSize - 1) ? styles.active : styles.disabled}
                    onClick={() => nextProd()}>{isMobile ? "" : "Next Product"}<span className="glyphicon glyphicon-arrow-right"></span></button>
</div>*/}

            {(isAdmin === true)
                ? <div className={styles.adminbtn}>
                    <button onClick={() => { if (window.confirm('Are you sure you want to delete this product?')) { handleDelProd(product.id) } }}>Delete This Product</button>
                    <button onClick={() => handleEditProd((product.id.toString()))}>Edit This Product {product.id}</button>
                    <span>index: {props.pin} - Name: {product.title} - Desc: {product.description} - pathern: {product.pattern_id}
                        Retail: {product.retail_price} - Wholesale {product.wholesale_price}</span>
                </div>
                : <></>}
            <div className={styles.productdetails}>
                <div className={styles.productImgContainer}>
                    <Image src={isImageError ? "/static/colors1.jpg" : "/static/" + product.photo_url}
                        onError={onError}
                        className={`media-object ${styles.prdimg}`}
                        width={150} height={150}
                        alt="Thai Sarong Orataiphathai" />
                </div>
                <div className={styles.productDescContainer}>
                    <p className={styles.productTitle}>Product Name: {product.title}</p>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
        }
    </>
}

export default ProductDisplay;