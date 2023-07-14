'use client'

import React, { useState, useEffect, useContext, useCallback } from "react";
import Image from 'next/image';
import type { Product } from "../redux/features/productsReducer";
import LanguagueContext from '../contexts/languagueContext';
import { fetchProducts, updateAllProducts, add2AllOpen, openAdded, add2AllClose, closeProductPage, openProductPage, closeEdit, updateCurrentProductId, updateCurrentProductGroup, closeAdded } from '../redux/features/productsReducer';
import { productsSlice } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import useTranslations from "../hooks/useTranslations";
import { withReduxStore } from "../redux/withReduxStore";
import { AnyAction } from "redux";

const ProductsGroup = (props: { groupid: string, allProducts: Product[] }) => {
    const [currentProductGroup, setCurrentProductGroup] = useState([] as Product[]);
    const [pin, setPin] = useState(0);
    const { currentLanguage } = useContext(LanguagueContext);
    const { productAdded, prodShow } = useSelector(productsSlice);
    const dispatch = useDispatch();
    const { t } = useTranslations(currentLanguage);

    useEffect(() => {
        if (props.allProducts.length == 0) {
            dispatch(fetchProducts() as unknown as AnyAction);
        }
        if (props.groupid != "" && props.allProducts.length > 0) {
            setCurrentProductGroup([...props.allProducts.filter((item) => item.group_id == props.groupid)]);
            dispatch(updateCurrentProductGroup([...props.allProducts.filter((item) => item.group_id == props.groupid)]));
        }
        // eslint-disable-next-line 
    }, []);

    useEffect(() => {
        setCurrentProductGroup([...props.allProducts.filter((item) => item.group_id == props.groupid)]);
        dispatch(updateCurrentProductGroup([...props.allProducts.filter((item) => item.group_id == props.groupid)]));
        // eslint-disable-next-line 
    }, [props.groupid, props.allProducts]);

    useEffect(() => {
        if (productAdded) {
            dispatch(fetchProducts() as unknown as AnyAction);
            dispatch(openAdded() as unknown as AnyAction)
        }
        // eslint-disable-next-line 
    }, [productAdded]);

    const openProductModal = (pid: string) => {
        dispatch(updateCurrentProductId(pid))
        let p_in = currentProductGroup.findIndex(product => product.id == pid);
        setPin(p_in);
        dispatch(openProductPage());
    };


    return (
        <>
            <div className="prod-btns-container">
                <div className="group-container">
                    <h2 className="group-title">{t(`products:description${props.groupid}`)}{" "}</h2>
                    <div className="button-group" id="the2nd-menu">
                        {currentProductGroup.map((product: Product, index: number) => (
                            <div
                                key={product.id}
                                className="productMenuButton"
                                onClick={() => openProductModal(product.id)}
                            >
                                <span>{product.title}</span>
                                <Image width={100} height={100}
                                    src={"/static/images/" + product.photo_url}
                                    alt={'Thai Sarong-' + product.title}
                                    sizes="10vw"
                                />

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default withReduxStore(ProductsGroup);