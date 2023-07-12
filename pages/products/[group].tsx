'use client';

import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import ProductsGroup from "../../components/productsGroup";
import ProductsText from '../../components/productsText';
import GroupMenu from '../../components/groupMenu';
import { useRouter } from 'next/router';
import type { GetStaticProps, GetStaticPaths } from 'next'
import type { Product } from "../../redux/features/productsReducer";
import { LoaderFunction } from "../../redux/features/productsReducer";
import productGroupData from "../../shared/productGroup.json";


export default function ProductsPage(props: { allProducts: Product[] }) {
    const [groupId, setGroupID] = useState('1');
    const [groupTitle, setGroupTitle] = useState('');
    const [domLoaded, setDomLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
        const group = router.query.group as string;
        setGroupID(group);
        const title = productGroupData.find((item) => item.id == group)?.title || 'Golden Print';
        setGroupTitle(title);
    }, [router.isReady, router.query]);


    useEffect(() => {
        setDomLoaded(true);
    }, []);



    return <>
        {domLoaded && (<Layout title={`Order Your Orataiphathai Thai Sarong Products - ${groupTitle}`}
            description="Our Products catalog of Thai Sarong fabric. We have many patterns and even unique handmade items therefore you need to contact us to find out price and availability."
        >
            <div className="bg-black">
                <ProductsText />
                <GroupMenu allProducts={props.allProducts} />
                <ProductsGroup groupid={groupId} allProducts={props.allProducts} />
            </div>
        </Layout>
        )}
    </>
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { group: '1' } }, { params: { group: '2' } }, { params: { group: '3' } }, { params: { group: '4' } }, { params: { group: '5' } }, { params: { group: '6' } }, { params: { group: '7' } }, { params: { group: '8' } }, { params: { group: '9' } }, { params: { group: '10' } }],
        fallback: false, // false or "blocking"
    }
}



export const getStaticProps: GetStaticProps =
    async () => {
        try {
            const allProducts = await LoaderFunction()
            return { props: { allProducts: allProducts } }; //, revalidate: 30 * 60,

        } catch (error) {
            console.error('getStaticProps', error);
            return { props: { allProducts: [] } }; //, revalidate: 0 
        };
    };
