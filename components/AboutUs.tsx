'use client';

import React, { useContext, useCallback } from 'react';
import Image from 'next/image';
import useTranslations from '../hooks/useTranslations';
import styles from '../styles/aboutus.module.scss'
import LanguagueContext from '../contexts/languagueContext';

const AboutUs = (props: any) => {
    const { currentLanguage } = useContext(LanguagueContext);
    const { t } = useTranslations(currentLanguage);

    return (
        <div className="mainbody" dir={currentLanguage == "he" ? "rtl" : "ltr"}>
            <div id="about-page" className={`container ${styles.aboutPage}`}>
                <div className={styles.header}>
                    <h1 >orataiphathai.work (formaly .com)</h1>
                    <h2 >{t("aboutus:heading")}{" "}</h2>
                </div>
                <Image src="/static/thai_sarong900.jpg"
                    className="img-responsive"
                    width={1000} height={200}
                    alt="Fashionable Thai Sarong Fabric" />
                <div className="bg-black col-sm-12" >
                    <div className={styles.content}>
                        <h2>{t("aboutus:aboutus")}{" "}</h2>

                        <h2>{t("aboutus:heading1")}{" "}</h2>
                        <h2>{t("aboutus:heading2")}{" "}</h2>
                        <br />
                        <p >{t("aboutus:love")}{" "}</p>

                        <p >{t("aboutus:supply")}{" "}</p>

                        <p >{t("aboutus:sample")}{" "}</p>
                        <p >{t("aboutus:better")}{" "}</p>
                        <p >{t("aboutus:believe")}{" "}</p>
                        <p >{t("aboutus:approve")}{" "}</p>

                        <p >{t("aboutus:technical")}{" "}</p>
                    </div>
                    <div className={styles.contactUs}>
                        <div className={styles.contactHeadline}>
                            <h2 >{t("aboutus:contactus")}{" "}</h2>
                        </div>

                        <div className={styles.contactLeft}>
                            <div className={styles.mediaPair}>
                                <Image src="/static/mail.png" width={40} height={40} className="img-icon" alt="orataiphathai Thai Sarong Email" />
                                <a href="mailto:orataiphathai@gmail.com" className={styles.aInfoText}>
                                    orataiphathai@gmail.com</a>
                            </div>
                            <div className={styles.mediaPair}>
                                <Image src="/static/facebook_icon.png" width={40} height={40} className="img-icon" alt="orataiphathai Email Thai Sarong" />
                                <a href="https://www.facebook.com/%E0%B8%AD%E0%B8%A3%E0%B8%97%E0%B8%B1%E0%B8%A2%E0%B8%9C%E0%B9%89%E0%B8%B2%E0%B9%84%E0%B8%97%E0%B8%A2-937874942959104/"
                                    target="_new" className={styles.aInfoText}>
                                    Orataiphathai - Facebook Page</a>
                            </div>
                            <div className={styles.mediaPair}>
                                <Image src="/static/line.gif" width={40} height={40} className={styles.imgIcon} alt="orataiphathai on LINE Thai Sarong" />
                                <a href="line://ti/p/@bcj6324n" className={styles.aInfoText} target="_new" >{t("aboutus:click1")}{" "}</a>
                            </div>
                            <div className={styles.mediaPair}>
                                <Image src="/static/wa-logo.png" width={40} height={40} className={styles.imgIcon} alt="orataiphathai on WhatsApp Thai Sarong" />
                                <a href="https://bit.ly/orataiphathai" className={styles.aInfoText} target="_new" >{t("aboutus:click2")}{" "}</a>
                            </div>
                        </div>
                        <div className="styles.contact-right">
                            <div className={styles.mediaPair}>
                                <Image src="/static/line.gif" width={40} height={40} className={styles.imgIcon} alt="Thai Sarong Orataiphathai on LINE QR code" />
                                <p className="styles.p-info-text">{t("aboutus:qrcode")}{" "}</p>
                            </div>
                            <div className="code-img">
                                <Image src="/static/LINE_QR_CODE1.jpg" width={160} height={160} className={styles.codeImg} alt="Thai Sarong Orataiphathai on LINE QR code" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default AboutUs;