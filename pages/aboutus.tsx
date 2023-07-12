import React from 'react';
import AboutUs from '../components/AboutUs';
import Layout from '../components/Layout';
import { GetStaticPaths } from 'next';

const AboutPage = () => {
    return (
        <Layout title="About Orataiphathai Thai Sarong"
            description="Everything you need to know about OraTai Thai Sarong website: how to get the most out of our website or contact us with any question." >
            <AboutUs />
        </Layout>
    )
}

export default AboutPage


// export const getStaticPaths: GetStaticPaths = () => {
//     return {
//         paths: [{ params: { slug: 'aboutus' } }],
//         fallback: false //or "blocking"
//     };
// }