'use client';

import React, { useContext, useCallback } from 'react';
import Image from 'next/image';
import useTranslations from '../hooks/useTranslations';
import LanguagueContext from '../contexts/languagueContext';

const AboutUs = (props: any) => {
    const { currentLanguage } = useContext(LanguagueContext);
    const { t } = useTranslations(currentLanguage);

    return (
        <div className="mainbody" dir={currentLanguage == "he" ? "rtl" : "ltr"}>
            <div id="about-page" className="container">
                <div className='mb-5'>
                    <h1 className="text-6xl">orataiphathai.work</h1>
                    <p className="text-14px">(formaly orataiphathai.com)</p>
                    <h2 className="text-4xl">{t("aboutus:heading")}{" "}</h2>
                </div>
                <Image src="/static/thai_sarong900.jpg"
                    className="mb-5 img-responsive"
                    width={1000} height={200}
                    alt="Fashionable Thai Sarong Fabric" />
                <div className="bg-black col-sm-12" >
                    <div className="mb-5 block">
                        <h2 className='text-2xl'>{t("aboutus:aboutus")}{" "}</h2>

                        <h2 className='text-2xl'>{t("aboutus:heading1")}{" "}</h2>
                        <h2 className='text-2xl'>{t("aboutus:heading2")}{" "}</h2>
                        <br />
                        <p className='text-14px'>{t("aboutus:love")}{" "}</p>

                        <p className='text-14px'>{t("aboutus:supply")}{" "}
                        </p>
                        <p className='text-14px'>{t("aboutus:sample")}{" "}</p>
                        <p className='text-14px'>{t("aboutus:better")}{" "}</p>
                        <p className='text-14px'>{t("aboutus:believe")}{" "}</p>
                        <p className='text-14px'>{t("aboutus:approve")}{" "}</p>

                        <p className='text-14px'>{t("aboutus:technical")}{" "}</p>
                    </div>
                    <div className="flex flex-row flex-wrap w-full justify-between">
                        <div className="text-center mb-4 w-full ">
                            <h2 className='text-2xl'>{t("aboutus:contactus")}{" "}</h2>
                        </div>

                        <div className="w-full sm:w-1/2 ">
                            <div className="flex flex-row flex-nowrap justify-between ">
                                <Image src="/static/mail.png" width={40} height={40} className="order-1 my-1 mr-2 ml-0 w-50px" alt="orataiphathai Thai Sarong Email" />
                                <a href="mailto:orataiphathai@gmail.com" className="bg-black my-auto order-2 mx-0 text-white w-full ">
                                    orataiphathai@gmail.com</a>
                            </div>
                            <div className="flex flex-row flex-nowrap justify-between">
                                <Image src="/static/facebook_icon.png" width={40} height={40} className="order-1 my-1 mr-2 ml-0 w-50px" alt="orataiphathai Email Thai Sarong" />
                                <a href="https://www.facebook.com/%E0%B8%AD%E0%B8%A3%E0%B8%97%E0%B8%B1%E0%B8%A2%E0%B8%9C%E0%B9%89%E0%B8%B2%E0%B9%84%E0%B8%97%E0%B8%A2-937874942959104/"
                                    target="_new" className="bg-black my-auto order-2 mx-0 text-white w-full ">
                                    Orataiphathai - Facebook Page</a>
                            </div>
                            <div className="flex flex-row flex-nowrap justify-between">
                                <Image src="/static/line.gif" width={40} height={40} className="order-1 my-1 mr-2 ml-0 w-50px" alt="orataiphathai on LINE Thai Sarong" />
                                <a href="line://ti/p/@bcj6324n" className="bg-black my-auto order-2 mx-0 text-white w-full " target="_new" >{t("aboutus:click1")}{" "}</a>
                            </div>
                            <div className="flex flex-row flex-nowrap justify-between">
                                <Image src="/static/wa-logo.png" width={40} height={40} className="order-1 my-1 mr-2 ml-0 w-50px" alt="orataiphathai on WhatsApp Thai Sarong" />
                                <a href="https://bit.ly/orataiphathai" className="bg-black my-auto order-2 mx-0 text-white w-full " target="_new" >{t("aboutus:click2")}{" "}</a>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <div className="flex flex-row flex-nowrap justify-between">
                                <Image src="/static/line.gif" width={40} height={40} className="order-1 my-1 mr-2 ml-0 w-50px" alt="Thai Sarong Orataiphathai on LINE QR code" />
                                <p className="bg-black my-auto order-2 mx-0 text-white w-full ">{t("aboutus:qrcode")}{" "}</p>
                            </div>
                            <div className="flex flex-row flex-nowrap justify-between">
                                <Image src="/static/LINE_QR_CODE1.jpg"
                                    width={160} height={160}
                                    className="order-1 my-1 mr-2 ml-0 w-50px"
                                    alt="Thai Sarong Orataiphathai on LINE QR code" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default AboutUs;