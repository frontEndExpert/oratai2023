'use client'

import React, { useContext, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import useTranslations from '../hooks/useTranslations'
//import { useSelector, useDispatch  } from 'react-redux';
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import Image from 'next/image';
import { productsSlice, authSlice } from '../redux/store';
import ReactPlayer from "react-player/lazy";
import YouTube from 'react-youtube';
import LanguagueContext from '../contexts/languagueContext';


const Homepage = (props: any) => {
    const { currentLanguage } = useContext(LanguagueContext);

    const t = useCallback((key: string) => { return useTranslations(currentLanguage).t(key) }, [currentLanguage, useTranslations]);

    useEffect(() => {
        console.log("homepage currentLanguage", currentLanguage, t("homepage:focus"));

    }, [currentLanguage]);


    return (
        <div className='container bg-black h-full m-0 text-white w-full p-20px home relative'>
            <div className="z-10 grid-cols-12">
                <div id="welcome" className="bg-black text-lg text-white" >
                    <h1 className='text-center text-red-900 text-3xl'>{t("homepage:welcome")}{" "}<b> {t("homepage:sitename")}{" "}<br />
                        {t("homepage:focus")}</b>.
                    </h1>
                    <p className="text-center text-lg text-red-600">{t("homepage:prefere")}{" "}
                    </p>
                    <p>{t("homepage:purpose1")}{" "}
                    </p>
                    <p>{t("homepage:traits2")}{" "}
                    </p>
                    <p>{t("homepage:data3")}{" "}
                        <Link href={{ pathname: '/products/' }}>{t("homepage:data3link")}{" "}</Link>.<br />
                    </p>

                    <p>{t("homepage:4thai")}{" "}
                    </p>
                    <p>
                        <span>{t("homepage:contactus5")}{" "} </span> <Link href={{ pathname: '/aboutus/' }}>{t("homepage:contactus5title")}{" "}</Link> <span>{t("homepage:contactus5wa")}{" "}</span>
                    </p>
                    <p>{t("homepage:join")} <a className="flink" href="https://www.facebook.com/pages/category/Clothing-Store/%E0%B8%AD%E0%B8%A3%E0%B8%97%E0%B8%B1%E0%B8%A2%E0%B8%9C%E0%B9%89%E0%B8%B2%E0%B9%84%E0%B8%97%E0%B8%A2-937874942959104/?locale2=th_TH"
                        target="_new">{t("homepage:Facebook")} </a> {t("homepage:promotions")}
                    </p>

                </div>
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                        <li data-target="#myCarousel" data-slide-to="3"></li>
                        <li data-target="#myCarousel" data-slide-to="4"></li>
                        <li data-target="#myCarousel" data-slide-to="5"></li>
                        <li data-target="#myCarousel" data-slide-to="6"></li>
                    </ol>

                    <div className="carousel-inner">

                        <div className="text-center item active">
                            <Image src="/static/slider/slider-0001.jpg"
                                className="h-auto mx-auto my-0 w-120 "
                                width={480} height={300}
                                priority={true}
                                alt="Oratai Phathai Thai Sarong fabric" />
                        </div>
                        <div className="text-center  item">
                            <Image src="/static/slider/slider-0002.jpg"
                                className="h-auto mx-auto my-0 w-120" width={480} height={300}
                                priority={true}
                                alt="Oratai Phathai thai sarong wholesale" />
                        </div>
                        <div className="text-center  item">
                            <Image className="h-auto mx-auto my-0 w-120" src="/static/slider/slider-0003.jpg" width={480} height={300} alt="thailand sarong wholesale" priority={true} />
                        </div>
                        <div className="text-center  item">
                            <Image className="h-auto mx-auto my-0 w-120" src="/static/slider/slider-0004.jpg" width={480} height={300} alt="Oratai Phathai thailand sarong wholesale" priority={true} />
                        </div>
                        <div className="text-center  item">
                            <Image className="h-auto mx-auto my-0 w-120" src="/static/slider/slider-0005.jpg" width={480} height={300} alt="Oratai Phathai Thai Sarong" priority={true} />
                        </div>

                        <div className="text-center item">
                            <Image className="h-auto mx-auto my-0 w-120" src="/static/slider/slider-0006.jpg" width={480} height={300} alt="Oratai Phathai Thai Sarong" priority={true} />
                        </div>

                        <div className="text-center item">
                            <Image className="h-auto mx-auto my-0 w-120" src="/static/slider/slider-0007.jpg" width={480} height={300} alt="Oratai Phathai Thai Sarong" priority={true} />
                        </div>
                    </div>


                    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control" href="#myCarousel" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>

            <div className='flex flex-row flex-nowrap m-10 text-center gap-3 ads '>
                <Image className="h-auto hebrew-img"
                    src="/static/thaisarong1.png "
                    width={530} height={520}
                    alt="thai sarong wholesale תאי סארונג בעברית" />
                <div className="flex flex-col flex-wrap gap-3">
                    <Image className="h-auto"
                        src="/static/normal-sarong-0007.jpg"
                        width={530} height={300}
                        alt="thai sarong wholesale תאי סארונג בעברית" />
                    <Image className="h-auto"
                        src="/static/batik-video.png"
                        width={500} height={300}
                        alt="thai sarong wholesale תאי סארונג בעברית" />
                </div>
            </div>
        </div>

    )
}


export default Homepage;

