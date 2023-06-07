'use client';

import React, { useContext, useCallback } from 'react';
import useTranslations from '../hooks/useTranslations'
import Image from 'next/image';
// import { LanguagueContextProvider } from '../contexts/languagueContext'
import LanguagueContext from '../contexts/languagueContext';
import styles from '../styles/reviews.module.scss';

const Reviews = (props: any) => {
    const { currentLanguage } = useContext(LanguagueContext);
    const { t } = useTranslations(currentLanguage);

    return (
        <>
            <div className={`container ${styles.reviews}`} >
                <h2>{t("reviews:header")}{" "}</h2>
                <p>{t("reviews:miniheader")}{" "}</p>
                <div className={styles.countries}>
                    <Image className={styles.flag} src="/static/Spain.jpg" title="Spain" alt="Spain" width={100} height={60} />
                    <Image className={styles.flag} src="/static/Australia.png" title="Australia" alt="Australia" width={100} height={60} />
                    <Image className={styles.flag} src="/static/Poland.png" title="Poland" alt="Poland" width={100} height={60} />
                    <Image className={styles.flag} src="/static/Israel.jpg" title="Israel" alt="Israel" width={100} height={60} />
                    <Image className={styles.flag} src="/static/Thailand.png" title="Thailand" alt="Thailand" width={100} height={60} />
                    <Image className={styles.flag} src="/static/Unitedstates.png" title="Unitedstates" alt="Unitedstates" width={100} height={60} />
                </div>
                <div className={styles.reviewslist}>
                    <div className={styles.review}>
                        <div className={styles.customerImg}>
                            <Image src="/static/customer_0001.jpg"
                                className={styles.customerImg}
                                title="Thai Sarong fashion fusion"
                                alt="Thai Sarong fashion fusion"
                                width={200} height={200} /></div>
                        <div className={styles.customerText}><span>This fashion designer has made a great fusion of Thai Sarong Fabric with his modern wear set.</span></div>
                    </div>
                    <div className={styles.review}>
                        <Image src="/static/customer_0002.jpg"
                            className={styles.customerImg}
                            title="Thai Sarong Bed Covers"
                            alt="Thai Sarong Bed Covers"
                            width={200} height={200} />
                        <div className={styles.customerText}><span>This spa with its traditional Thai massage used Thai sarong fabric to add a clean and traditional look to its massage suites.</span></div>
                    </div>
                    <div className={styles.review}>
                        <Image src="/static/customer_0003.jpg"
                            className={styles.customerImg}
                            title="Sarong kitchen wear"
                            alt="Thai Sarong kitchen wear"
                            width={200} height={200} />
                        <div className={styles.customerText}><span>In Europe, they love Thai sarong fabric for kitchen wear.</span></div>
                    </div>
                    <div className={styles.review}>
                        <Image src="/static/customer_0004.jpg"
                            className={styles.customerImg}
                            title="Sarong elephant figurine"
                            alt="Thai Sarong elephant figurine"
                            width={200} height={200} />
                        <div className={styles.customerText}><span>This customer has taken the Sarong  Fabric to another level with its Sarong elephant figurine.</span>
                            <br /><span className="yellow">credit by: </span>
                            <span>A-Zig.</span>
                        </div>
                    </div>
                    <div className={styles.review}>
                        <Image src="/static/customer_00051.jpg"
                            className={styles.customerImg}
                            title="Kids Fashion Sarong"
                            alt="Kids Fashion Thai Sarong"
                            width={200} height={200} />
                        <div className={styles.customerText}>
                            <span>Kids Fashion Sarong.</span>
                            <br /><span className={styles.yellow}>credit by: </span>
                            <span>Yada Baby Shop.</span>
                        </div>
                    </div>
                    <div className={styles.review}>
                        <Image src="/static/aimtam.jpg"
                            className={styles.customerImg}
                            title="AimTam thaibaby clothes"
                            alt="AimTam thaibaby clothes Thai Sarong"
                            width={200} height={200} />
                        <div className={styles.customerText}>
                            <span>Baby Clothes.</span>
                            <br /><span className={styles.yellow}>credit by: </span>
                            <span>AimTam thaibaby clothes.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`container ${styles.reviews}`}>
                <h2>Customers Reviews</h2>
                <div className={styles.reviewslist}>
                    <div className={styles.review}>
                        <Image src="/static/rapin.jpg"
                            className={styles.customerImg}
                            title="" alt=""
                            width={560} height={300} />
                        <div className={styles.customerText}>
                            <span>Name: Rapin Sanyapan</span><br />
                            <span>Review: ส่งไวค่ะ สีสวยถูกใจ</span><br />
                            <span>Translation: Product was sent fast with beautiful colors. </span><br />
                            <span className="glyphicon glyphicon-thumbs-up"></span><span className="glyphicon glyphicon-thumbs-up"></span><span className="glyphicon glyphicon-thumbs-up"></span>
                        </div>
                    </div>
                    <div className={styles.review}>
                        <Image src="/static/ong.jpg"
                            className={styles.customerImg}
                            title="" alt=""
                            width={560} height={300} />
                        <div className={styles.customerText}>
                            <span>Name: อนงค์ บุญเอี่ยม</span><br />
                            <span>Review: ผ้าสวยมากคะ ถูกใจมากแม่ก็ชมว่าผ้าสวยขอแบ่งไปตั้ง6ผืน</span><br />
                            <span>Translation: Very nice fabric. Very affordable. I also noticed that the fabric is very beautiful. I ordered 6 blocks of 40m each. </span><br />
                            <span className="glyphicon glyphicon-thumbs-up"></span><span className="glyphicon glyphicon-thumbs-up"></span><span className="glyphicon glyphicon-thumbs-up"></span>
                        </div>
                    </div>
                    <div className={styles.review}>
                        <Image src="/static/sujit.jpg"
                            className={styles.customerImg}
                            title="" alt=""
                            width={560} height={300} />
                        <div className={styles.customerText}>
                            <span>Name: Saisamorn Sujit</span><br />
                            <span>Review: ส่งไวส่งจริงผ้าดีมากสั่งมาหลายรอบแล้วค่ะ</span><br />
                            <span>Translation: Fast delivery. Very good fabric. Ordered many times. </span><br />
                            <span className="glyphicon glyphicon-thumbs-up"></span><span className="glyphicon glyphicon-thumbs-up"></span><span className="glyphicon glyphicon-thumbs-up"></span>
                        </div>
                    </div>
                    <div className={styles.review}>
                        <Image src="/static/surin.jpg"
                            className={styles.customerImg}
                            title="" alt="" width={560} height={300} />
                        <div className={styles.customerText}>
                            <span>Name: Laongdow Surin</span><br />
                            <span>Review: ของถึงแล้วน่ะค่ะบริการดีมากค่ะทีนี้ครั้งแรกทีใช้บริการประทับใจมากเร็วมากเพิ่งสั่งของเมื่อวานวันี้้เช้าของถึงแล้ว</span><br />
                            <span>Translation: Items have just arrived. Very good service. It&apos;s the first time I use this service. Very impressed. I ordered it only yesterday and it arrived this morning. </span><br />
                            <span className="glyphicon glyphicon-thumbs-up"></span><span className="glyphicon glyphicon-thumbs-up"></span><span className="glyphicon glyphicon-thumbs-up"></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Reviews; 