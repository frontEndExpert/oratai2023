import Layout from '../../components/Layout';
import ProductsText from '../../components/productsText'
import GroupMenu from '../../components/groupMenu'
import type { Product } from "../../redux/features/productsReducer";
import { LoaderFunction } from "../../redux/features/productsReducer";
import type { GetStaticProps } from 'next';

import { useEffect, useState } from 'react';


export default function ProductsPage(props: { allProducts: Product[] }, { children }: { children: React.ReactNode }) {
    const [domLoaded, setDomLoaded] = useState(false);
    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return <>
        {domLoaded && (<Layout title="Order Your Orataiphathai Thai Sarong Products"
            description="Our Products catalog of Thai Sarong fabric. We have many patterns and even unique handmade items therefore you need to contact us to find out price and availability."
        >
            <div className="container bg-black">
                <ProductsText />
                <GroupMenu allProducts={props.allProducts} />
                {children}
            </div>
        </Layout>
        )}
    </>
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
