'use client'

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from "redux";
import { useRouter, usePathname } from 'next/navigation';
import LanguagueContext from '../contexts/languagueContext';
import { auth, authClose } from '../redux/features/authReducer'
import Input from './UI/Input';
import Button from './UI/Button';
import { updateObject, checkValidity } from '../shared/utility';
import useTranslations from "../hooks/useTranslations";
import { productsSlice, authSlice } from '../redux/store';
import type { FormElementConfig } from '../shared/types';
import styles from '../styles/auth.module.scss';


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
    const [controls, setControls] = useState<Controls>({ ...initialControls });
    const [isSignup, setSignup] = useState<boolean>(true);
    //const [currentLanguage, setCurrentLanguage] = useState('en');
    //const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const { currentLanguage, setCurrentLanguage } = useContext(LanguagueContext);
    const { t } = useTranslations(currentLanguage);

    const router: any = useRouter();
    const pathname = usePathname();

    const dispatch = useDispatch();
    const { isAuthenticated, loading, authShow, isAdmin } = useSelector(authSlice);

    // useEffect(() => {
    //     if (authRedirectPath !== '/') {
    //         dispatch(setAuthRedirectPath('/products/'))
    //     }
    // }, []);

    useEffect(() => {
        if (currentLanguage && authShow) {
            setControls({
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: t("auth:email") // "Email"
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
                        placeholder: t("auth:password")
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false
                }
            });
        }

        if (isAuthenticated) {
            router.push("/products/");
        }
    }, [currentLanguage, authShow, isAuthenticated]);


    const inputChangedHandler = (event: InputChangeEvent, controlName: string) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        });
        setControls({ ...updatedControls });
    }

    const submitHandler = () => {
        const authObj = {
            email: controls.email.value,
            password: controls.password.value,
            isSignup: isSignup
        };

        dispatch(auth(authObj) as unknown as AnyAction)
        dispatch(authClose())
        router.replace('/products/');
    }

    const switchAuthModeHandler = () => {
        setSignup(!isSignup);
    }

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        });
    }

    let form = <>{formElementsArray.map(formElement => (
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
            changed={(event: InputChangeEvent) => inputChangedHandler(event, formElement.id)} />
    ))}</>;



    if (loading) {
        form = <div className='Loader'>Loading...</div> as JSX.Element
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }

    return (
        <div className={styles.Auth}>
            {errorMessage}
            <form className={styles.loginForm} onSubmit={submitHandler}>
                <div className='flex flex-col flex-wrap formInput justify-around ' >
                    {form}
                </div>
                <div className={styles.btnDiv}>
                    <Button btnType="Success inline"
                        clicked={submitHandler}
                    >
                        {isSignup ? t("auth:signup") : t("auth:signin")}
                    </Button>

                    <Button
                        clicked={switchAuthModeHandler}
                        btnType="Danger inline right">{t("auth:switchto")}{" "} {isSignup ? t("auth:signin") : t("auth:signup")}
                    </Button>
                </div>
            </form>
        </div>
    );
};


export default Auth;