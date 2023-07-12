// 'use client';

import React from 'react';
import Reviews from '../components/Reviews'
import Layout from '../components/Layout'
import { GetStaticPaths } from 'next';

const ReviewsPage = () => {

    return (
        <Layout title="Customer Reviews of Orataiphathai Thai Sarong"
            description="Customers reviews of our service and reviews of some of our customers and the possibilities of end products from our Thai Sarong fabric."  >
            <Reviews />
        </Layout>
    )
}

export default ReviewsPage


// export const getStaticPaths: GetStaticPaths = () => {
//     return {
//         paths: [{ params: { slug: 'reviews' } }],
//         fallback: false
//     };
// }