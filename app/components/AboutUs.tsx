import React from 'react';
import Image from 'next/image';
import useTranslations from '../hooks/useTranslations';
import { useSelector  } from 'react-redux';
import {productsSlice } from '../redux/store';


const AboutUs = (props: any) => {
    //const currentLanguage = props.currentLanguage;
    const { currentLanguage } = useSelector(productsSlice);
    var { t } = useTranslations(currentLanguage)

    return (
<div className="mainbody" dir={currentLanguage=="he"?"rtl":"ltr"}> 
    <div id="about-page" className="container-fluid">
        <div className="header">
            <h1 >orataiphathai.work (formaly .com)</h1>
            <h2 >{t("aboutus:heading")}{" "}</h2>
        </div>
        <Image src="/static/thai_sarong900.jpg" 
        className="img-responsive" 
        width={1000} height={200}
        alt="Fashionable Thai Sarong Fabric" />
        <div className="col-sm-12 body" >
            <div >
                <h2>{t("aboutus:aboutus")}{" "}</h2>

                <h2>{t("aboutus:heading1")}{" "}</h2>
                <h2>{t("aboutus:heading2")}{" "}</h2>
                <br/>
                <p >{t("aboutus:love")}{" "}</p>
                
                <p >{t("aboutus:supply")}{" "}
                    </p>
                <p >{t("aboutus:sample")}{" "}</p>
                <p >{t("aboutus:better")}{" "}</p>
                <p >{t("aboutus:believe")}{" "}</p>
                <p >{t("aboutus:approve")}{" "}</p>
                
                <p >{t("aboutus:technical")}{" "}</p>
            </div>
            <div className="contact-us">
                <div  className="contact-headline">
                    <h2 >{t("aboutus:contactus")}{" "}</h2>
                </div>
                    
                <div  className="contact-left">
                    <div  className="media-pair">
                        <Image src="/static/mail.png" width={40} height={40} className="img-icon" alt="orataiphathai Thai Sarong Email" />
                        <a  href="mailto:orataiphathai@gmail.com" className="info-text">
                    orataiphathai@gmail.com</a>
                    </div>
                     <div  className="media-pair">
                        <Image src="/static/facebook_icon.png" width={40} height={40} className="img-icon" alt="orataiphathai Email Thai Sarong" />
                        <a  href="https://www.facebook.com/%E0%B8%AD%E0%B8%A3%E0%B8%97%E0%B8%B1%E0%B8%A2%E0%B8%9C%E0%B9%89%E0%B8%B2%E0%B9%84%E0%B8%97%E0%B8%A2-937874942959104/" 
                        target="_new" className="info-text">
                        Orataiphathai - Facebook Page</a>
                    </div>
                    <div  className="media-pair">
                        <Image src="/static/line.gif" width={40} height={40} className="img-icon" alt="orataiphathai on LINE Thai Sarong" />
                        <a  href="line://ti/p/@bcj6324n" className="info-text" target="_new" >{t("aboutus:click1")}{" "}</a>
                    </div>
                    <div  className="media-pair">
                        <Image src="/static/wa-logo.png" width={40} height={40} className="img-icon" alt="orataiphathai on WhatsApp Thai Sarong" />
                        <a  href="https://bit.ly/orataiphathai" className="info-text" target="_new" >{t("aboutus:click2")}{" "}</a>
                    </div>
                </div>
                <div className="contact-right">
                    <div  className="media-pair">
                        <Image src="/static/line.gif" width={40} height={40} className="img-responsive img-icon" alt="Thai Sarong Orataiphathai on LINE QR code" />
                        <p  className="info-text">{t("aboutus:qrcode")}{" "}</p>
                    </div>
                    <div  className="code-img">
                        <Image src="/static/LINE_QR_CODE1.jpg" width={160} height={160} className="img-responsive" alt="Thai Sarong Orataiphathai on LINE QR code" />
                    </div>
                </div>
            </div> 

        </div>

        <style jsx>{`
            div.contact-right > div.code-img > Image{
                margin-left: 60px;
            }
            .contact-us{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
            .contact-headline{
                flex: 0 1 100%;
            }
            .contact-left{
                flex: 0 1 50%;
            }
            .contact-right{
                flex: 0 1 50%;
            }
            #about-page{
                display: block;
                color: white;
                padding: 15px;
                
            }
            
            @media (min-width: 541px){
                #about-page > div > h1, h1{
                font-size: 3.5em!important;
                font-weight: 500!important;
                }
                #about-page > div > div > h2,
                #about-page > div > h2, h2 {
                    font-size: 28px!important;
                    font-weight: 100!important;
                }
                a.info-text{
                    width: 350px!important;
                }
                p.info-text{
                    width: 450px!important;
                }
                
            }
            @media (max-width: 540px){
                #about-page > div > div > h1, h1{
                font-size: 36px!important;
                font-weight: 500!important;
                }
                #about-page > div > div > h2,
                #about-page > div > h2, h2 {
                    font-size: 26px!important;
                    font-weight: 100!important;
                }
                a.info-text{
                    order: 2;
                    width: 200px!important;
                }
                p.info-text{
                order: 2;
                width: 200px!important;
                }
                

            }

            

            #about-page > div.body, 
            #about-page > div > p {
                font-size: 18px!important;
                font-weight: 300!important;
            }

            #about-page > .header{
                 text-align: center
            }

            .media-pair{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin: 10px; 
            }
            .img-icon{
                order: 1;
                width: 50px;
                margin: 5px 10px 5px 0;
                vertical-align: middle;
            }
            a.info-text,p.info-text{
                order: 2;
                width: 100%;
                margin: 0px;
                vertical-align: middle;
                margin: auto 0;
                background-color: #000000!important;
                color: white;
            }

        `}</style>
    </div>
</div>
)
}


export default AboutUs;