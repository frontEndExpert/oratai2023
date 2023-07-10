'use client';

import React, { useState, useCallback, useContext } from 'react';
import useTranslations from "../hooks/useTranslations";
import LanguagueContext from '../contexts/languagueContext';


const ProductsText = () => {
    const [revealText, setRevealText] = useState(false);

    const { currentLanguage } = useContext(LanguagueContext);
    const { t } = useTranslations(currentLanguage);


    const toggleText = () => {
        setRevealText(!revealText)
    }


    return (
        <div className="mainbody" dir={currentLanguage == "he" ? "rtl" : "ltr"}>
            <div className="container desc">
                <div className="panel-body">
                    <div className={revealText ? "text-long" : "text-short"} onClick={toggleText}>
                        <p className='mb-3'>{t("products:body1")}{" "}</p>
                        <ul>
                            <li className='mb-3'>{t("products:body2")}{" "}</li>
                            <li className='mb-3'>{t("products:body3")}{" "}</li>
                            <li className='mb-3'>{t("products:body4")}{" "}</li>
                        </ul>
                    </div>
                </div>
                <div className="panel-body">
                    <span>{t("products:body5")}{" "}</span>
                    <h1 className="container centertext desc">{t("products:contact")}{" "}</h1>
                </div>
            </div>
        </div>
    );

}

export default ProductsText;