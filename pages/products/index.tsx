import Layout from '../../components/Layout';
import ProductsText from '../../components/productsText'
import GroupMenu from '../../components/groupMenu'
import { Product } from '@/redux/features/productsReducer';

import type { GetStaticProps } from 'next';
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


export default function ProductsPage(props: { allProducts: Product[] }, { children }: { children: React.ReactNode }) {

    return (
        <Layout title="Order Your Orataiphathai Thai Sarong Products"
            description="Our Products catalog of Thai Sarong fabric. We have many patterns and even unique handmade items therefore you need to contact us to find out price and availability."
        >
            <div className="container bg-black">
                <ProductsText />
                <GroupMenu allProducts={props.allProducts} />
                {children}
            </div>
        </Layout>
    )
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