'use client';

import React, { useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from 'next/navigation';
import productGroupData from "../shared/productGroup.json";
import Link from 'next/link';
import Image from 'next/image';
import { authSlice, productsSlice } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { withReduxStore } from "../redux/withReduxStore";
import { AnyAction } from "redux";
import Modal from './UI/Modal'
import { fetchProducts, updateAllProducts, add2AllOpen, add2AllClose, closeProductPage, openProductPage, closeEdit, updateCurrentProductId, updateCurrentProductGroup, closeAdded } from '../redux/features/productsReducer';
import ProductDisplay from './productDisplay';
import { auth } from "@/redux/features/authReducer";

const GroupMenu = (props: any) => {
    const [currentGroupId, setCurrentGroupId] = useState("1");

    const router = useRouter();
    const { productAdded, allProducts, currentProductId, loading, prodShow } = useSelector(productsSlice);
    const { isAdmin } = useSelector(authSlice)
    const dispatch = useDispatch();


    useEffect(() => {
        if (allProducts.length == 0) {
            dispatch(fetchProducts() as unknown as AnyAction);
        }
    }, []);

    const OpenMenu = (id: string) => {
        setCurrentGroupId(id);
        router.push(`/products/${id}`);
    };

    const handleAddProduct = () => {
        dispatch(add2AllOpen());
    };
    // <Link href={{ pathname: `/products/${productGroup.id}` }}
    return (
        <div className="bg-black">
            {loading && <div className="text-white loading">Loading...</div>}
            <Modal
                name="productPage"
                show={prodShow}
                modalClosed={() => dispatch(closeProductPage())}
                modalHeight={'600'}
            >
                <button type="button" className="btn btn-link" onClick={() => dispatch(closeProductPage())}>
                    X
                </button>
                <ProductDisplay
                    prodShow={prodShow}
                    pid={currentProductId}
                />
            </Modal>
            <div id="menu-box" >
                <ul className="category-list">
                    {productGroupData.map((productGroup) => {
                        return <li
                            className={
                                currentGroupId === productGroup.id
                                    ? "category-btn activeted"
                                    : "category-btn"
                            }
                            key={`cat${productGroup.id}`}
                        >
                            <div
                                className="menu-cat" onClick={() => OpenMenu(productGroup.id)}>
                                <span className="menu-header">{productGroup.title}</span>
                                <Image className="img-class"
                                    src={productGroup.url}
                                    alt={productGroup.title}
                                    width={175}
                                    height={175}
                                />
                            </div>
                        </li>
                    })}

                </ul>
            </div>
            {isAdmin && <div className="" >
                <div className="border-white border-solid rounded cursor-pointer flex bg-orange-700 border-1 h-9 text-center w-60 justify-center items-center align-middle"
                    onClick={handleAddProduct}
                >Add New Product</div>
            </div>}
            <div className="bg-black strike">
                <Image
                    src={"/static/divider1.svg"}
                    className="img-responsive"
                    width="500"
                    height="50"

                    alt="orataiphathai Thai Sarong"
                />
            </div>
        </div>
    )
}

export default withReduxStore(GroupMenu);