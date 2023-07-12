'use client';

import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import ProductsGroup from "../../components/productsGroup";
import ProductsText from '../../components/productsText';
import GroupMenu from '../../components/groupMenu';
import { useRouter } from 'next/router';
import type { GetStaticProps, GetStaticPaths } from 'next'
import { Product } from "../../redux/features/productsReducer";

import firebase from 'firebase/compat/app';
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
// Initialize Realtime Database and get a reference to the service
const database = firebase.database();



export default function ProductsPage(props: { allProducts: Product[] }) {
    const [groupId, setGroupID] = useState('1');
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
        const group = router.query.group as string;
        setGroupID(group);
    }, [router.isReady, router.query]);

    return (
        <Layout title="Order Your Orataiphathai Thai Sarong Products"
            description="Our Products catalog of Thai Sarong fabric. We have many patterns and even unique handmade items therefore you need to contact us to find out price and availability."
        >
            <div className="bg-black">
                <ProductsText />
                <GroupMenu allProducts={props.allProducts} />
                <ProductsGroup groupid={groupId || 1} allProducts={props.allProducts} />
            </div>
        </Layout>

    )

}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        // The paths to be pre-rendered at build time. E.g. /post/1, /post/2, etc
        paths: [{ params: { group: '1' } }, { params: { group: '2' } }, { params: { group: '3' } }, { params: { group: '4' } }, { params: { group: '5' } }, { params: { group: '6' } }, { params: { group: '7' } }, { params: { group: '8' } }, { params: { group: '9' } }, { params: { group: '10' } }],
        fallback: false, // false or "blocking"
    }
}



export const getStaticProps: GetStaticProps<{ allProducts: Product[] }> = async (): Promise<{ props: { allProducts: Product[] } }> => {
    return new Promise<{ props: { allProducts: Product[] } }>((resolve, reject) => {
        database.ref('allProducts').on('value', async (snapshot) => {
            const data = await snapshot.val();
            const keys = Object.keys(data);
            const fetchedProducts: Product[] = keys.map((key: string) => {
                return { id: key, ...data[key] };
            });
            const allProducts = [...fetchedProducts];

            resolve({ props: { allProducts: allProducts } });
        }, (error) => {
            console.error('getStaticProps', error);
            reject(error);
        });
    });
};
