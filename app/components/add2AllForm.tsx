import React, { useState , useEffect, PropsWithChildren} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from './UI/Button';
import axios from '../config/axios-firebase';
import Input from './UI/Input';
import { addProduct } from '../redux/features/productsReducer'
import { updateObject, checkValidity } from '../shared/utility';
import productGroupData from '../shared/productGroup.json';
import type { RootState } from '../redux/store';
import type { FormElementConfig } from '../shared/types';
import {productsSlice, authSlice } from '../redux/store';


  type ProductForm = {
    [key: string]: FormElementConfig;
  };

// type ThisState = {
//     productForm: ProductForm
//     formIsValid: boolean,
//         productData: Object,
//         productAdded: boolean,
//         productId: string
// }

//type Props = PropsFromRedux & ThisState & PropsWithChildren;

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
            valid: false,
            touched: false
        },
        group_id: {
            elementType: 'select',
            elementConfig: {
                placeholder: 'Product Group',
                options: [ 
                    {value:'1', displayValue: productGroupData[0].title},
                    {value:'2', displayValue: productGroupData[1].title},
                    {value:'3', displayValue: productGroupData[2].title},
                    {value:'4', displayValue: productGroupData[3].title},
                    {value:'5', displayValue: productGroupData[4].title},
                    {value:'6', displayValue: productGroupData[5].title},
                    {value:'7', displayValue: productGroupData[6].title},
                    {value:'8', displayValue: productGroupData[7].title},
                    {value:'9', displayValue: productGroupData[8].title},
                    {value:'10', displayValue: productGroupData[9].title}
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
            valid: false,
            touched: false
        },
        description: {
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'Description'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
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
            valid: false,
            touched: false
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
            valid: false,
            touched: false
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
            valid: false,
            touched: false
        }
    },
    formIsValid: false,
    productData: {},
    productAdded: false,
    productId: '0'
};


const Add2AllForm = (props: any) => {
    const [prodForm, setProdForm] = useState<ProductForm>(initialState.productForm);
    const [formIsValid, setFormIsValid] = useState(initialState.formIsValid);
    const [productId, setProductId] = useState<string>("");

    const dispatch = useDispatch();
    const { productAdded, allProducts, globalformIsValid, currentProductId, error, editShow } = useSelector(productsSlice);

    
    // state = {...initialState}

    // useEffect(() => {

    // }, []);

    // componentDidUpdate = (prevProps: Props) => {
    //     if(prevProps.productAdded !==props.productAdded){
    //         setState({productAdded: props.productAdded})
    //     }
    // };


    const productHandler = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        
        const formData: {[key: string]: any} = {};
        for (let formElementIdentifier in prodForm) {
            formData[formElementIdentifier] = prodForm[formElementIdentifier].value;
        }
        
        props.onAddProduct2All(formData); 
        setProdForm({...initialState.productForm})
        setProductId("");
        setFormIsValid(false);
    };

   
    const inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>, inputIdentifier: string) => {
        const updatedFormElement = updateObject(prodForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, prodForm[inputIdentifier].validation),
            touched: true
        });
        const updatedProductForm = updateObject(prodForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedProductForm) {
            formIsValid = updatedProductForm[inputIdentifier].valid && formIsValid;
        }
        setProdForm({...updatedProductForm});
        setFormIsValid(formIsValid);
    };

    const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        let file = event.target.files && event.target.files[0];
        if (file) {
           // updateObject(prodForm.photo_url, {value:file.name})
            const updatedFileName = updateObject(prodForm.photo_url, {
                value: file.name,
                valid: true,
                touched: true
            });
            const updatedProductForm = updateObject(prodForm, {
                photo_url: updatedFileName})
            let formIsValid = true;
            for (let inputIdentifier in updatedProductForm) {
                formIsValid = updatedProductForm[inputIdentifier].valid && formIsValid;
            }
            setProdForm({...updatedProductForm});
            setFormIsValid(formIsValid);    
         // let data = new FormData();
         // data.append('file', file);
          // axios.post('/files', data)...
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
            <form className="pro-form" onSubmit={productHandler}>
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
                
                <input type="file"  name="myFile" onChange={uploadFile} />
                <Button type='submit' btnType='Success' 
                disabled={!formIsValid}>Add This Product</Button>
            </form>
        );
        
        if ( props.loading ) {
            form = <div className='Loader'>Loading...</div>;
        } else if (props.token === null) {
            form = <p key="errMsg">Please Login (Only Admin Can Add Products!)</p>
        } else if (!props.isAdmin) {
            form = <p key="errMsg">Only Admin Can Add Products!</p>
        }

        const form_height = '450px';

        return (
            <div className='ProductData'>
                <h4>Add Product Here</h4>
                <div className='pro-form'>
                {form}
                </div>
            <style jsx >{`
            .pro-form {
                color: black;
            }
            .ProductData {
                color: black!important;
                margin: 0px auto 0px auto;
                width: 80%;
                height: ${form_height};
                text-align: center;
                border: none;
                padding: 30px auto;
                box-sizing: border-box;
            }
            
            @media (min-width: 600px) {
                .ProductData {
                    width: 500px;
                }
            }
            `}
            </style>
            </div>
        );
}

// 
// const mapStateToProps = (state: RootState) => {
//     return {
//         productAdded: state.products.productAdded,
//         allProducts: state.products.allProducts,
//         formIsValid: state.products.formIsValid,
//         token: state.auth.token,
//         userId: state.auth.userId,
//         isAdmin: state.auth.isAdmin
//     }
// };
// // product, props.token
// const mapDispatchToProps = dispatch => {
//     return {
//         onAddProduct2All: (newProduct) => dispatch(addProduct(newProduct))
//     };
// };

// const connector = connect(mapStateToProps, mapDispatchToProps);
// type PropsFromRedux = ConnectedProps<typeof connector>;

export default Add2AllForm;

// export default connect(mapStateToProps, mapDispatchToProps)(Add2AllForm, axios);