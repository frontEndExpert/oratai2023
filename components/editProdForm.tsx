'use client'

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from "redux";
import Button from './UI/Button';
//import axios from '../config/axios-firebase';
import Input from './UI/Input';
import { fetchProducts, closeEdit, editProduct, closeAdded, openAdded } from '../redux/features/productsReducer';
import type { Product } from '../redux/features/productsReducer';
import { getisAdmin } from '../redux/features/authReducer';
import { productsSlice, authSlice } from '../redux/store';
import type { RootState } from '../redux/store';
import { updateObject, checkValidity } from '../shared/utility';
import update from 'immutability-helper';
import productGroupData from '../shared/productGroup.json';
import _ from 'lodash';
import type { FormElementConfig } from '../shared/types';

type ProductForm = {
    [key: string]: FormElementConfig;
};

const initialState = {
    productForm: {
        title: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Product Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: true,
            touched: true
        },
        group_id: {
            elementType: 'select',
            elementConfig: {
                placeholder: 'Product Group',
                options: [
                    { value: '1', displayValue: productGroupData[0].title },
                    { value: '2', displayValue: productGroupData[1].title },
                    { value: '3', displayValue: productGroupData[2].title },
                    { value: '4', displayValue: productGroupData[3].title },
                    { value: '5', displayValue: productGroupData[4].title },
                    { value: '6', displayValue: productGroupData[5].title },
                    { value: '7', displayValue: productGroupData[6].title },
                    { value: '8', displayValue: productGroupData[7].title },
                    { value: '9', displayValue: productGroupData[8].title },
                    { value: '10', displayValue: productGroupData[9].title }
                ]
            },
            value: '1',
            name: 'group_id',
            validation: {
                required: true
            },
            valid: true,
            touched: true
        },
        pattern_id: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Pattern Id'
            },
            value: '',
            validation: {
                required: true
            },
            valid: true,
            touched: true
        },
        description: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                placeholder: 'Description'
            },
            value: '',
            validation: {
                required: true
            },
            valid: true,
            touched: true
        },
        retail_price: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Retail Price'
            },
            value: '',
            validation: {
                required: true,
                maxLength: 7,
                isNumeric: true
            },
            valid: true,
            touched: true
        },
        wholesale_price: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Wholesale Price'
            },
            value: '',
            validation: {
                required: true,
                maxLength: 7,
                isNumeric: true
            },
            valid: true,
            touched: true
        },
        photo_url: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'photo url'
            },
            value: '',
            validation: {
                required: true
            },
            valid: true,
            touched: true
        }
    },
    formIsValid: false,
    currentProduct: {} as Product,
    productId: "0",
};

const EditProdForm = (props: any) => {
    const [prodForm, setProdForm] = useState<ProductForm>(initialState.productForm);
    const [formIsValid, setFormIsValid] = useState(initialState.formIsValid);
    const [currentProduct, setCurrentProduct] = useState(initialState.currentProduct);
    const [productId, setProductId] = useState<string>("");

    const { productAdded, allProducts, globalformIsValid, currentProductId, error, editShow } = useSelector(productsSlice);
    const { token, isAdmin, loading } = useSelector(authSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        setProdForm({ ...initialState.productForm })

        if (token !== null) {
            dispatch<any>(getisAdmin(""));
        };
        if (currentProductId && currentProductId !== "0" && editShow) {
            if (currentProductId.length > 1 && productId !== currentProductId) {
                setProductId(currentProductId)
                setProductArray(allProducts, currentProductId)
            }
        };
    }, []);

    useEffect(() => {
        if (currentProductId && currentProductId !== "0" && editShow) {
            if (currentProductId.length > 1 && productId !== currentProductId) {
                setProductId(currentProductId)
                setProductArray(allProducts, currentProductId)
            }
        };
    }, [currentProductId, editShow]);

    useEffect(() => {
        setProductArray(allProducts, currentProductId)
    }, [allProducts, productId]);


    function setProductArray(productArray: Product[], prodId: string) {
        // let currentProdArray = productArray.filter(
        //     product => product.id === prodId
        // )
        // let currentProduct=currentProdArray[0];
        let currentProduct: Product = productArray.find(product => product.id === prodId) as Product

        if (currentProduct) {
            // const newProductForm = update(prodForm, {
            //     title: { value: { $set: currentProduct.title } },
            //     group_id: { value: { $set: currentProduct.group_id } },
            //     pattern_id: { value: { $set: currentProduct.pattern_id } },
            //     description: { value: { $set: currentProduct.description } },
            //     wholesale_price: { value: { $set: currentProduct.wholesale_price } },
            //     retail_price: { value: { $set: currentProduct.retail_price } },
            //     photo_url: { value: { $set: currentProduct.photo_url } }
            // });
            // setProdForm({ ...newProductForm })
            setProdForm({
                ...prodForm, title: { ...prodForm.title, value: currentProduct.title },
                group_id: { ...prodForm.group_id, value: currentProduct.group_id },
                pattern_id: { ...prodForm.pattern_id, value: currentProduct.pattern_id },
                description: { ...prodForm.description, value: currentProduct.description },
                wholesale_price: { ...prodForm.wholesale_price, value: currentProduct.wholesale_price },
                retail_price: { ...prodForm.retail_price, value: currentProduct.retail_price },
                photo_url: { ...prodForm.photo_url, value: currentProduct.photo_url }
            })
            setCurrentProduct({ ...currentProduct })
            setProductId(prodId)
        }
    }


    const productHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData: { [key: string]: any } = {};
        //let formElementIdentifier: string[] = Object.keys(prodForm);  
        //let formElementIdentifier = ['title', 'group_id', 'pattern_id', 'description', 'retail_price', 'wholesale_price', 'photo_url']         
        for (let formIdentifier in prodForm) {
            //for (let formIdentifier of formElementIdentifier) {
            formData[formIdentifier] = prodForm[formIdentifier].value;
        }

        dispatch<any>(editProduct({ id: productId, ...formData } as Product) as unknown as AnyAction);
        dispatch(openAdded());
        if (productAdded) {
            dispatch<any>(fetchProducts());

            setProductArray(allProducts, productId)
        }
        dispatch(closeEdit());
        // form.reset();
        setProdForm(initialState.productForm);
        setFormIsValid(initialState.formIsValid);
        setCurrentProduct(initialState.currentProduct);
        setProductId(currentProductId);

    };


    const inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>, inputIdentifier: string) => {
        const updatedFormElement = updateObject(prodForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, prodForm[inputIdentifier].validation),
            touched: true
        });
        const updatedProductForm: ProductForm = updateObject(prodForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedProductForm) {
            formIsValid = updatedProductForm[inputIdentifier].valid && formIsValid;
        }

        setProdForm({ ...updatedProductForm });
        setFormIsValid(formIsValid);
    };

    const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        let file = event.target.files && event.target.files[0];
        if (file) {
            const updatedFileName = updateObject(prodForm.photo_url, {
                value: file.name,
                valid: true,
                touched: true
            });
            const updatedProductForm = updateObject(prodForm, {
                photo_url: updatedFileName
            })
            let formIsValid = true;
            for (let inputIdentifier in updatedProductForm) {
                formIsValid = updatedProductForm[inputIdentifier].valid && formIsValid;
            }
            setProdForm({ ...updatedProductForm });
            setFormIsValid(formIsValid);
        }
    }

    const formElementsArray = [];
    for (let key in prodForm) {
        formElementsArray.push({
            id: key,
            config: prodForm[key]
        });
    }

    let form = (
        <form className="text-black" onSubmit={productHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    label={formElement.config.elementConfig.placeholder}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event: React.ChangeEvent<HTMLInputElement>) => inputChangedHandler(event, formElement.id)} />
            ))}

            <input type="file" name="myFile" onChange={uploadFile} />
            <Button type='submit' btnType='Success'
                disabled={!formIsValid}>Edit This Product</Button>
        </form>
    );
    if (loading) {
        form = <div className='Loader'>Loading...</div>;
    } else if (token === null) {
        form = <p key="errMsg">Please Login (Only Admin Can Add Products!)</p>
    } else if (!isAdmin) {
        form = <p key="errMsg">Only Admin Can Add Products!</p>
    }

    const form_height = '450px';

    return (
        <div className='text-black mx-auto my-0 sm:w-500 w-80% h-[${form_height}] text-center border-0 px-auto py-30px;'>
            <h4>Edit Product Here</h4>
            <div className='pro-form'>
                {form}
            </div>
        </div>
    );
}


export default EditProdForm;