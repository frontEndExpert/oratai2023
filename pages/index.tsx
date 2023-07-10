import React from 'react';
import Layout from '../components/Layout';
import Homepage from '../components/Homepage'


export default function Index() {
    return (
        <Layout title="Orataiphathai Thai Sarong Home"
            description="Orataiphathai Wholesale Thai Sarong. Our door for your pleasant shopping experience 
        of Thai Sarong and fashionable fabric which you can wear every day."
            url="http://www.orataiphathai.work">
            <Homepage />
        </Layout>
    )
}