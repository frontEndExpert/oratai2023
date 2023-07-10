'use client'

import React, { useContext } from 'react';
import Link from 'next/link';
import useTranslations from '../hooks/useTranslations'
import Image from 'next/image';
import LanguagueContext from '../contexts/languagueContext';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const Homepage = (props: any) => {
    const { currentLanguage } = useContext(LanguagueContext);
    const { t } = useTranslations(currentLanguage);

    const handleDragStart = (e: any) => e.preventDefault();

    const items = [
        <Image src="/static/slider/slider-0001.jpg"
            className="h-auto mx-auto my-0 w-120"
            width={800} height={500}
            onDragStart={handleDragStart} key="1"
            role="presentation"
            alt="thailand sarong wholesale" />,
        <Image width={800} height={500} src="/static/slider/slider-0002.jpg" className="h-auto mx-auto my-0 w-120" onDragStart={handleDragStart} key="2" role="presentation" alt="thai sarong wholesale תאי סארונג בעברית" />,
        <Image width={800} height={500} src="/static/slider/slider-0003.jpg" className="h-auto mx-auto my-0 w-120" onDragStart={handleDragStart} key="3" role="presentation" alt="thai sarong wholesale תאי סארונג בעברית" />,
        <Image width={800} height={500} src="/static/slider/slider-0004.jpg" className="h-auto mx-auto my-0 w-120" onDragStart={handleDragStart} key="4" role="presentation" alt="thailand sarong wholesale" />,
        <Image width={800} height={500} src="/static/slider/slider-0005.jpg" className="h-auto mx-auto my-0 w-120" onDragStart={handleDragStart} key="5" role="presentation" alt="thai sarong wholesale תאי סארונג בעברית" />,
        <Image width={800} height={500} src="/static/slider/slider-0006.jpg" className="h-auto mx-auto my-0 w-120" onDragStart={handleDragStart} key="6" role="presentation" alt="thai sarong wholesale תאי סארונג בעברית" />,
        <Image width={800} height={500} src="/static/slider/slider-0007.jpg" className="h-auto mx-auto my-0 w-120" onDragStart={handleDragStart} key="7" role="presentation" alt="thailand sarong wholesale" />,
        <Image width={800} height={500} src="/static/slider/slider-0008.jpg" className="h-auto mx-auto my-0 w-120" onDragStart={handleDragStart} key="7" role="presentation" alt="thailand sarong wholesale" />,
        <Image width={800} height={500} src="/static/slider/slider-0009.jpg" className="h-auto mx-auto my-0 w-120" onDragStart={handleDragStart} key="7" role="presentation" alt="thailand sarong wholesale" />,
        <Image width={800} height={500} src="/static/slider/slider-0010.jpg" className="h-auto mx-auto my-0 w-120" onDragStart={handleDragStart} key="7" role="presentation" alt="thailand sarong wholesale" />,
        <Image width={800} height={500} src="/static/slider/slider-0011.jpg" className="h-auto mx-auto my-0 w-120" onDragStart={handleDragStart} key="7" role="presentation" alt="thailand sarong wholesale" />
    ];


    return (
        <div className='container bg-black h-full m-0 text-white w-full p-20px home relative'>
            <div className="z-10 grid-cols-12">
                <div id="welcome" className="bg-black text-lg text-white" >
                    <h1 className='text-center text-red-900 text-3xl'>{t("homepage:welcome")}{" "}<b> {t("homepage:sitename")}{" "}<br />
                        {t("homepage:focus")}</b>.
                    </h1>

                    <p className="my-2 text-center text-lg text-red-600">{t("homepage:prefere")}{" "}
                    </p>

                    <p className='mt-9'>{t("homepage:purpose1")}{" "}
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
                    <p className='mb-9'>{t("homepage:join")} <a className="flink" href="https://www.facebook.com/pages/category/Clothing-Store/%E0%B8%AD%E0%B8%A3%E0%B8%97%E0%B8%B1%E0%B8%A2%E0%B8%9C%E0%B9%89%E0%B8%B2%E0%B9%84%E0%B8%97%E0%B8%A2-937874942959104/?locale2=th_TH"
                        target="_new">{t("homepage:Facebook")} </a> {t("homepage:promotions")}
                    </p>

                </div>
                <AliceCarousel mouseTracking items={items} />
            </div>

            <div className='flex flex-row flex-nowrap m-10 text-center gap-3 ads '>
                <Image className="h-auto hebrew-img"
                    src="/static/thaisarong1.png "
                    width={550} height={520}
                    alt="thai sarong wholesale תאי סארונג בעברית" />

                <video
                    className="h-auto w-full z-2 relative sm:w-150"
                    src="/static/batik.mp4"
                    autoPlay
                    controls
                >
                </video>

            </div>
        </div >

    )
}

export default Homepage;
