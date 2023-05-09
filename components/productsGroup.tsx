'use client'

import React, { useState, useEffect, useContext, useCallback } from "react";
import Image from 'next/image';
import _ from "lodash";
import type { Product } from "../redux/features/productsReducer";
import LanguagueContext from '../contexts/languagueContext';
import { fetchProducts, updateAllProducts, add2AllOpen, openAdded, add2AllClose, closeProductPage, openProductPage, closeEdit, updateCurrentProductId, updateCurrentProductGroup, closeAdded } from '../redux/features/productsReducer';
import { productsSlice } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import useTranslations from "../hooks/useTranslations";
import { withReduxStore } from "../redux/withReduxStore";
import { AnyAction } from "redux";

const ProductsGroup = (props: { groupid: string }) => {
    const [currentProductGroup, setCurrentProductGroup] = useState([] as Product[]);
    const [currentArrSize, setCurrentArrSize] = useState(0);
    const [pin, setPin] = useState("");
    const [revealText, setRevealText] = useState(false);
    const { currentLanguage } = useContext(LanguagueContext);
    const { productAdded, allProducts, prodShow } = useSelector(productsSlice);
    //const currentLanguage = "en"
    const dispatch = useDispatch();

    const t = useCallback((key: string) => { return useTranslations(currentLanguage).t(key) }, [currentLanguage, useTranslations]);

    useEffect(() => {
        if (allProducts.length == 0) {
            dispatch(fetchProducts() as unknown as AnyAction);
        }
    }, []);

    useEffect(() => {
        setCurrentProductGroup([...allProducts.filter((item) => item.group_id == props.groupid)]);
    }, [props.groupid, allProducts]);

    useEffect(() => {
        if (productAdded) {
            console.log("productGroup fetchProducts",)
            dispatch(fetchProducts() as unknown as AnyAction);
            dispatch(openAdded() as unknown as AnyAction)
        }
    }, [productAdded]);

    const openProductModal = (pid: string, p_in: string) => {
        dispatch(updateCurrentProductId(pid))
        setPin(p_in);
        dispatch(openProductPage());
    };

    // const productGroup = (): JSX.Element => {
    //     let productMap = null;
    // if (!props.loading && props.currentProductGroup) {
    //     const group = (currentGroupId == 'all') ? [{ "id": 'all', "title": "", "description": "", "url": "/static/golden2951.jpg" }]
    //         : productGroupData.filter(item => item.id == currentGroupId);



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
            </div>
        </>
    )
}

export default withReduxStore(ProductsGroup);