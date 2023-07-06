'use client'

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from "redux";
import Input from './UI/Input';
import { fetchProducts, closeEdit, editProduct, closeAdded, openAdded } from '../redux/features/productsReducer';
import type { Product, FireProduct } from '../redux/features/productsReducer';
import { productsSlice, authSlice } from '../redux/store';
import { updateObject, checkValidity } from '../shared/utility';
import productGroupData from '../shared/productGroup.json';
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
    const { isAuthenticated, isAdmin, loading } = useSelector(authSlice);
    const dispatch = useDispatch();


    useEffect(() => {
        setProdForm({ ...initialState.productForm })

        if (currentProductId && currentProductId !== "0" && editShow) {
            if (currentProductId.length > 1 && productId !== currentProductId) {
                setProductId(currentProductId)
                setProductArray(allProducts, currentProductId)
            }
        };
        // eslint-disable-next-line        
    }, []);


    useEffect(() => {
        if (currentProductId && currentProductId !== "0" && editShow) {
            if (currentProductId.length > 1 && productId !== currentProductId) {
                setProductId(currentProductId)
                setProductArray(allProducts, currentProductId)
            }
        };
        // eslint-disable-next-line
    }, [currentProductId, editShow, allProducts, productId]);


    useEffect(() => {
        setProductArray(allProducts, currentProductId)
        // eslint-disable-next-line    
    }, [allProducts, currentProductId]);


    function setProductArray(productArray: Product[], prodId: string) {
        let currentProduct: Product = productArray.find(product => product.id === prodId) as Product

        if (currentProduct) {
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
        const formData: FireProduct = {
            description: "",
            group_id: "",
            pattern_id: "",
            photo_url: "",
            retail_price: "",
            title: "",
            wholesale_price: ""
        };

        for (let formIdentifier in prodForm) {
            formData[formIdentifier] = prodForm[formIdentifier].value;
        }

        dispatch(editProduct({ id: productId, fireProduct: { ...formData } } as { id: string, fireProduct: FireProduct }) as unknown as AnyAction);
        dispatch(openAdded());
        if (productAdded) {
            dispatch(fetchProducts() as unknown as AnyAction);

            setProductArray(allProducts, productId)
        }
        dispatch(closeEdit());
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
        <form onSubmit={productHandler}>
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
            <button type='submit' className='Button Success'
                disabled={!formIsValid}>Edit This Product</button>
        </form>
    );
    if (loading) {
        form = <div className='Loader'>Loading...</div>;
    } else if (!isAuthenticated) {
        form = <p key="errMsg">Please Login (Only Admin Can Add Products!)</p>
    } else if (!isAdmin) {
        form = <p key="errMsg">Only Admin Can Add Products!</p>
    }

    return (
        <div className='mx-auto border-0 h-120 my-0 text-black text-center max-w-80 py-30px; px-10 sm:max-w-90'>
            <h4>Edit Product Here</h4>
            <div className='text-black px-10 pro-form'>
                {form}
            </div>
        </div>
    );
}


export default EditProdForm;