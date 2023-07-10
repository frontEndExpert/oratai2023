'use client';

import Layout from '../../components/Layout';
import ProductsGroup from "../../components/productsGroup";
import ProductsText from '../../components/productsText';
import GroupMenu from '../../components/groupMenu';
import { useRouter } from 'next/router';

export default function ProductsPage() {
    const router = useRouter();

    return (
        <Layout title="Order Your Orataiphathai Thai Sarong Products"
            description="Our Products catalog of Thai Sarong fabric. We have many patterns and even unique handmade items therefore you need to contact us to find out price and availability."
        >
            <div className="bg-black">
                <ProductsText />
                <GroupMenu />
                <ProductsGroup groupid={router.query.group || 1} />
            </div>
        </Layout>

    )

}