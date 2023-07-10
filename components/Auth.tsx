'use client'

import React, { useState, useEffect, useContext, useCallback, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from "redux";
import { useRouter, usePathname } from 'next/navigation';
import LanguagueContext from '../contexts/languagueContext';
import { auth, authClose, setError } from '../redux/features/authReducer'
import Input from './UI/Input';
import Button from './UI/Button';
import { updateObject, checkValidity } from '../shared/utility';
import useTranslations from "../hooks/useTranslations";
import { productsSlice, authSlice } from '../redux/store';
import type { ElementConfig } from '../shared/types';
import styles from '../styles/auth.module.scss';

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
}

const Auth = (props: any) => {
    const [email, setEmail] = useState<ElementConfig>({
        value: '',
        valid: false,
        touched: false,
    });
    const [password, setPassword] = useState<ElementConfig>({
        value: '',
        valid: false,
        touched: false,
    });
    const [isSignup, setSignup] = useState<boolean>(true);
    //const [form, setForm] = useState<JSX.Element>(<></>);
    //const [authRedirectPath, setAuthRedirectPath] = useState('/
    //const [currentLanguage, setCurrentLanguage] = useState('en');
    //const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const { currentLanguage, setCurrentLanguage } = useContext(LanguagueContext);
    const { t } = useTranslations(currentLanguage);

    const router: any = useRouter();
    const pathname = usePathname();

    const dispatch = useDispatch();
    const { isAuthenticated, loading, authShow, isAdmin, error } = useSelector(authSlice);

    useEffect(() => {
        setEmail({
            value: '',
            valid: false,
            touched: false,
        });
        setPassword({
            value: '',
            valid: false,
            touched: false,
        });
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(setError())
            dispatch(authClose())
            router.push("/products/");
        }
        //eslint-disable-next-line
    }, [currentLanguage, authShow, isAuthenticated]);


    const emailChangedHandler = (event: InputChangeEvent) => {
        const validation = {
            required: true,
            isNumeric: false,
            isEmail: true,
        }
        if (email.value !== event.target.value) {
            dispatch(setError())
        }
        setEmail({
            value: event.target.value,
            valid: checkValidity(event.target.value, validation),
            touched: true
        });
    }

    const passwordChangedHandler = (event: InputChangeEvent) => {
        const validation = {
            required: true,
            minLength: 6,
            maxLength: 24,
            isNumeric: false,
            isEmail: false,
        }
        if (password.value !== event.target.value) {
            dispatch(setError())
        }

        setPassword({
            value: event.target.value,
            valid: checkValidity(event.target.value, validation),
            touched: true
        });
    }

    const submitHandler = () => {
        if (email.valid && password.valid) {
            const authObj = {
                email: email?.value,
                password: password?.value,
                isSignup: isSignup
            };

            dispatch(auth(authObj) as unknown as AnyAction)

            if (isAuthenticated) {
                dispatch(authClose())
                router.replace('/products/');
            } else if (error != '') {
                console.log(error);
            }
        }
    }

    const switchAuthModeHandler = () => {
        setSignup(!isSignup);
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
                    <div className="text-left text-black w-full min-[480px]:px-2.5 box-border !border-slate  ">
                        <div className="font-bold m-2 mx-5 text-left text-black min-[480px]:w-[40%] w-full inline-block">
                            <label htmlFor="email" className="">Email</label>
                        </div>
                        <div className="text-left text-black w-full min-[480px]:px-2.5 box-border !border-slate  ">
                            <input name="email"
                                style={{ width: "100%", border: "1px solid slate", borderRadius: "10px" }}
                                className="outline-none w-full py-1.5 px-2.5 box-border !bg-slate !border-slate focus:bg-slate"
                                type="email"
                                placeholder={t("auth:email")}
                                value={email?.value}
                                onChange={emailChangedHandler}
                                required={true}
                            />
                            {(!email.valid && email.touched) && <p className="text-red-500">Please enter a valid email address</p>}
                        </div>
                    </div>
                    <div className="text-left text-black w-full min-[480px]:px-2.5 box-border !border-slate  ">
                        <div className="font-bold m-2 mx-5 text-left text-black min-[480px]:w-[40%] w-full inline-block">
                            <label htmlFor="email" className="">Password</label>
                        </div>
                        <div className="text-left text-black w-full min-[480px]:px-2.5 box-border !border-slate  ">
                            <input name="password"
                                style={{ width: "100%", border: "1px solid slate", borderRadius: "10px" }}
                                className="outline-none w-full py-1.5 px-2.5 box-border !bg-slate !border-slate focus:bg-slate"

                                type="password"
                                placeholder={t("auth:password")}
                                value={password?.value}
                                onChange={passwordChangedHandler}
                                required={true}
                            />
                            {(!password.valid && password.touched) && <p className="text-red-500">Please enter a valid password</p>}
                            {(error != '' && !isAuthenticated && password.valid && password.touched) && <p className="text-red-500">Password or email do not match</p>}
                        </div>
                    </div>
                </div>
                <div className={styles.btnDiv}>
                    <Button btnType="Success inline"
                        clicked={submitHandler}
                        disabled={!(email.valid && password.valid)}
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