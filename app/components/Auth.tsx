import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { AnyAction } from "redux";
import Router from 'next/router';
import { auth, authClose, authOpen, authLogout, setAuthRedirectPath } from '../redux/features/authReducer'
import Input from './UI/Input';
import Button from './UI/Button';
import { updateObject, checkValidity } from '../shared/utility';
import useTransitions from "../hooks/useTranslations";
import {productsSlice, authSlice } from '../redux/store';
import type { FormElementConfig } from '../shared/types';

type Controls = {
    [key: string]: FormElementConfig;
  };

const initialControls: Controls = {
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: "Mail Address"
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: "Password"
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
    }
};

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

const Auth = (props: any) => {
    const [controls, setControls] = useState<Controls>({...initialControls});
    const [isSignup, setSignup] = useState<boolean>(true);
    //const [currentLanguage, setCurrentLanguage] = useState('en');

    const { currentLanguage } = useSelector(productsSlice);
    const {t} = useTransitions(currentLanguage);
    
    const dispatch = useDispatch();
    const { token, loading, authRedirectPath, authShow, isAdmin } = useSelector(authSlice);
    

    useEffect(() => {
        if (  props.authRedirectPath !== '/' ) {
            props.onSetAuthRedirectPath();
        }
        //setCurrentLanguage( { Router.query.lang.toString()})
    }, []);

   
    // componentDidUpdate(prevProps, prevState) {
    //     if(prevState.currentLanguage !== state.currentLanguage){
    //         setState( { currentLanguage: Router.query.lang})

    //         setState({ controls: {
    //             email: {
    //                 elementType: 'input',
    //                 elementConfig: {
    //                     type: 'email',
    //                     placeholder: props.t("auth:email") // "Email"
    //                 },
    //                 value: '',
    //                 validation: {
    //                     required: true,
    //                     isEmail: true
    //                 },
    //                 valid: false,
    //                 touched: false
    //             },
    //             password: {
    //                 elementType: 'input',
    //                 elementConfig: {
    //                     type: 'password',
    //                     placeholder: props.t("auth:password") // "password"
    //                 },
    //                 value: '',
    //                 validation: {
    //                     required: true,
    //                     minLength: 6
    //                 },
    //                 valid: false,
    //                 touched: false
    //             }
    //         } })
    //     }
    //     if ( prevProps.isAuthenticated === false && props.isAuthenticated === 'true' ) {
    //         Router.push('/products/');
    //     }
    // }

    const inputChangedHandler = ( event: InputChangeEvent, controlName: string ) => {
        const updatedControls = updateObject( controls, {
            [controlName]: updateObject( controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, controls[controlName].validation ),
                touched: true
            } )
        } );
        setControls( { ...updatedControls } );
    }

    const submitHandler = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        const authObj = {
            email: controls.email.value, 
            password: controls.password.value, 
            isSignup: isSignup 
        };

        dispatch( auth( authObj ) as unknown as AnyAction )
        props.onAuth(authObj );
        dispatch ( authClose())
        Router.replace('/products/');
    }

    const switchAuthModeHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setSignup( !isSignup );
    }

        const formElementsArray = [];
        for ( let key in controls ) {
            formElementsArray.push( {
                id: key,
                config: controls[key]
            } );
        }

        let form = <>{formElementsArray.map( formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                label={formElement.config.elementConfig.placeholder}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                inline='true'
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                autoC={formElement.config.elementConfig.type}
                changed={( event: InputChangeEvent ) => inputChangedHandler( event, formElement.id )} />
        ) )}</> ;



        if ( props.loading ) {
            form = <div className='Loader'>Loading...</div> as JSX.Element
        }

        let errorMessage = null;

        if ( props.error ) {
            errorMessage = (
                <p>{props.error.message}</p>
            );
        }

        return (
            <div className='Auth'>
                {errorMessage}
                <form className="login-form" onSubmit={submitHandler}>
                    {form}
                    <div className="btn-div">
                        <Button btnType="Success inline">
                            {isSignup ? t("auth:signup") : t("auth:signin")}
                        </Button>
                    
                        <Button
                            clicked={switchAuthModeHandler}
                            btnType="Danger inline right">{t("auth:switchto")}{" "} {isSignup ? t("auth:signin") : t("auth:signup")}
                        </Button>
                    </div>
                </form>
            <style jsx>{`
            .Auth {
                position: relative;
                margin: 0px auto;
                width: 100%;
                display: block;
                text-align: center;
                border: 0px;
                padding: 10px;
                box-sizing: border-box;
                z-index: 30;
            }
            .login-form{
                position: relative;
                z-index: 31;
            }
            .btn-div{
                width: 100%;
                text-align: center;
            }
            .inline{
                display: inline-block;
            }
            
            @media (min-width: 401px) {
                .Auth {
                    width: 360px;
                }
            }
            @media (max-width: 400px) {
                .Auth {
                    width: 300px;
                    margin: 0px;
                }
            }
        
            `}</style>
        </div>
        );
};


// const mapStateToProps = state => {
//     return {
//         loading: state.auth.loading,
//         error: state.auth.error,
//         isAuthenticated: state.auth.token !== null,
//         authRedirectPath: state.auth.authRedirectPath,
//         authShow: state.auth.authShow,
//         isAdmin: state.auth.isAdmin
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onAuthClose: () => dispatch ( authClose()),
//         onAuth: ( authObj ) => dispatch( auth( authObj) ),
//         onSetAuthRedirectPath: () => dispatch( setAuthRedirectPath( '/products/en' ) )

//     };
// };

export default Auth;