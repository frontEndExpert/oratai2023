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
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const Homepage = (props: any) => {
    const { currentLanguage } = useContext(LanguagueContext);

    const t = useCallback((key: string) => { return useTranslations(currentLanguage).t(key) }, [currentLanguage, useTranslations]);

    useEffect(() => {
        console.log("homepage currentLanguage", currentLanguage, t("homepage:focus"));

    }, [currentLanguage]);

    const handleDragStart = (e: any) => e.preventDefault();

    const items = [
        <img src="/static/slider/slider-0001.jpg" onDragStart={handleDragStart} role="presentation" alt="thailand sarong wholesale" />,
        <img src="/static/slider/slider-0002.jpg" onDragStart={handleDragStart} role="presentation" alt="thai sarong wholesale תאי סארונג בעברית" />,
        <img src="/static/slider/slider-0003.jpg" onDragStart={handleDragStart} role="presentation" alt="thai sarong wholesale תאי סארונג בעברית" />,
        <img src="/static/slider/slider-0004.jpg" onDragStart={handleDragStart} role="presentation" alt="thailand sarong wholesale" />,
        <img src="/static/slider/slider-0005.jpg" onDragStart={handleDragStart} role="presentation" alt="thai sarong wholesale תאי סארונג בעברית" />,
        <img src="/static/slider/slider-0006.jpg" onDragStart={handleDragStart} role="presentation" alt="thai sarong wholesale תאי סארונג בעברית" />,
        <img src="/static/slider/slider-0007.jpg" onDragStart={handleDragStart} role="presentation" alt="thailand sarong wholesale" />,

    ];

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
                <AliceCarousel mouseTracking items={items} />
                {/* <Swiper>
                    <div><Image src="/static/slider/slider-0001.jpg" className="h-auto mx-auto my-0 w-120 " width={480} height={300} priority={true} alt="Oratai Phathai Thai Sarong fabric" /></div>
                    <div><Image src="/static/slider/slider-0002.jpg" className="h-auto mx-auto my-0 w-120" width={480} height={300}
                        priority={true} alt="Oratai Phathai thai sarong wholesale" /></div>
                    <div><Image className="h-auto mx-auto my-0 w-120" src="/static/slider/slider-0003.jpg" width={480} height={300} alt="thailand sarong wholesale" priority={true} /></div>
                    <div><Image className="h-auto mx-auto my-0 w-120" src="/static/slider/slider-0003.jpg" width={480} height={300} alt="thailand sarong wholesale" priority={true} /></div>
                    <div><Image className="h-auto mx-auto my-0 w-120" src="/static/slider/slider-0003.jpg" width={480} height={300} alt="thailand sarong wholesale" priority={true} /></div>
                    <div><Image className="h-auto mx-auto my-0 w-120" src="/static/slider/slider-0003.jpg" width={480} height={300} alt="thailand sarong wholesale" priority={true} /></div>
                    <div><Image className="h-auto mx-auto my-0 w-120" src="/static/slider/slider-0003.jpg" width={480} height={300} alt="thailand sarong wholesale" priority={true} /></div>
                    <div><Image className="h-auto mx-auto my-0 w-120" src="/static/slider/slider-0004.jpg" width={480} height={300} alt="Oratai Phathai thailand sarong wholesale" priority={true} /></div>
                    <div><Image className="h-auto mx-auto my-0 w-120" src="/static/slider/slider-0005.jpg" width={480} height={300} alt="Oratai Phathai Thai Sarong" priority={true} /></div>
                    <div><Image className="h-auto mx-auto my-0 w-120" src="/static/slider/slider-0006.jpg" width={480} height={300} alt="Oratai Phathai Thai Sarong" priority={true} /></div>
                    <div><Image className="h-auto mx-auto my-0 w-120" src="/static/slider/slider-0007.jpg" width={480} height={300} alt="Oratai Phathai Thai Sarong" priority={true} /></div>
                </Swiper> */}
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

