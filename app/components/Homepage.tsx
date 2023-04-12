import React from 'react';
import Link from 'next/link';
import useTranslations from '../hooks/useTranslations'
import Image from 'next/image';
import { connect } from 'react-redux';
import ReactPlayer from "react-player/lazy";


const Homepage = (props) =>{ 
    let currentLanguage = props.currentLanguage;
        var { t } = useTranslations(currentLanguage)
        
    return    (

    <div className='container-fluid home'>
        <div className="col-sm-12 ontop">
            <div id="welcome" className='col-12 ' >
                <h1 className='align-center'>{t("homepage:welcome")}{" "}<b> {t("homepage:sitename")}{" "}<br/>
                {t("homepage:focus")}</b>.
                </h1>
                <p style={{textAlign: 'center', color:'red'}} >{t("homepage:prefere")}{" "}
                </p>
                <p>{t("homepage:purpose1")}{" "}
                </p>
                <p>{t("homepage:traits2")}{" "}
                </p>
                <p>{t("homepage:data3")}{" "} 
                <Link href={'/products/' + currentLanguage}><a >{t("homepage:data3link")}{" "}</a></Link>.<br/>
                </p>

                <p>{t("homepage:4thai")}{" "} 
                </p>
                <p>
                <span>{t("homepage:contactus5")}{" "} </span> <Link  href={'/about/'  + currentLanguage}><a>{t("homepage:contactus5title")}{" "}</a></Link> <span>{t("homepage:contactus5wa")}{" "}</span>
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
                            width="800" height="500" 
                            alt="Oratai Phathai Thai Sarong fabric" />
                        </div>
                        <div className="text-center  item">
                            <Image src="/static/slider/slider-0002.jpg" width="800px" height="500px" alt="Oratai Phathai thai sarong wholesale" />
                        </div>
                        <div className="text-center  item">
                            <Image src="/static/slider/slider-0003.jpg" width="800px" height="500px" alt="thailand sarong wholesale" />
                        </div>
                        <div className="text-center  item">
                            <Image src="/static/slider/slider-0004.jpg" width="800px" height="500px" alt="Oratai Phathai thailand sarong wholesale" />
                        </div>
                        <div className="text-center  item">
                            <Image src="/static/slider/slider-0005.jpg" width="800px" height="500px" alt="Oratai Phathai Thai Sarong" />
                        </div>

                        <div className="text-center item">
                            <Image src="/static/slider/slider-0006.jpg" width="800px" height="500px" alt="Oratai Phathai Thai Sarong"/>
                        </div>

                        <div className="text-center item">
                            <Image src="/static/slider/slider-0007.jpg" width="800px" height="500px" alt="Oratai Phathai Thai Sarong" />
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
        <style jsx>{`
        .ontop{
            z-index: 10;
        }
        #welcome > p > a.flink,
        a {
            color: #ad966c;
            cursor: pointer;
            text-decoration: none;
        }
        #welcome > p > a.flink:hover, 
        #welcome > p > a.link:focus,
        a:hover, a:focus{
                color: #de4d0e;
            }

        .signup{
            text-align: center;
            font-size: 24px;
            margin: 40px 0px 0px 0px;
            padding: 0px;
        }
        
        .center-text{
            margin: 0 auto;
        }
        #myCarousel > div > div > img{
            margin: 0 auto;
        }
        #welcome > p{
            font-size: 18px;
        }
            .home {
            display: block;
            position: relative;
            margin: 0px;
            padding: 20px;
            background-color: #000000;
            color: white;
            width: 100%;
            height: 100%;
            }
            h1 {
            font-size: 34px;
            }
            
            h2 {
            font-size: 18px;
            }
            .align-center{
                text-align: center;
            }
        `}</style>
    <div className='align-center ads'>
        <Image className="hebrew-img" 
            src="/static/thaisarong.png" 
            width="560px" height="315px" 
            alt="thai sarong wholesale תאי סארונג בעברית" />

        <ReactPlayer width="560px" height="315px" url="https://www.youtube.com/embed/Te_DTmOt4Xw" light="/static/normal-sarong-0007.jpg"/>
        <ReactPlayer width="560px" height="315px" url="https://www.youtube.com/embed/ne25PfyH9L8" light="/static/batik-video.png" />
    </div>

    </div>
    )
}

const mapStateToProps = state => {
    return {
        currentLanguage: state.products.currentLanguage,
    };
};
      
export default connect(mapStateToProps)(Homepage);

