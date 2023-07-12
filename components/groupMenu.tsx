'use client';

import React, { useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from 'next/navigation';
import productGroupData from "../shared/productGroup.json";
import Image from 'next/image';
import { authSlice, productsSlice } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { withReduxStore } from "../redux/withReduxStore";
import { AnyAction } from "redux";
import Modal from './UI/Modal'
import { fetchProducts, updateAllProducts, add2AllOpen, add2AllClose, updateCurrentProductGroup, closeProductPage, openProductPage, closeEdit, updateCurrentProductId, closeAdded, Product } from '../redux/features/productsReducer';
import ProductDisplay from './productDisplay';

const GroupMenu = (props: { allProducts: Product[] }) => {
    const [currentGroupId, setCurrentGroupId] = useState("1");

    const router = useRouter();
    const { productAdded, currentProductId, currentProductGroup, loading, prodShow } = useSelector(productsSlice);
    const { isAdmin } = useSelector(authSlice)
    const dispatch = useDispatch();

    const allProducts = props.allProducts


    const OpenMenu = (id: string) => {
        setCurrentGroupId(id);
        dispatch(updateCurrentProductGroup([...allProducts.filter((item) => item.group_id == id)]));
        router.push(`/products/${id}/#divider1`);
    };

    const handleAddProduct = () => {
        dispatch(add2AllOpen());
    };

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
                    allProducts={allProducts}
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
            <div id="divider1" className="bg-black strike">
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