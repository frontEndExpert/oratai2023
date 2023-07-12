import Layout from '../../components/Layout';
import ProductsText from '../../components/productsText'
import GroupMenu from '../../components/groupMenu'
import { Product } from '@/redux/features/productsReducer';
import type { GetStaticProps } from 'next';
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import { useEffect, useState } from 'react';

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

export async function LoaderFunction() {


    return new Promise<Product[]>((resolve, reject) => {
        database.ref('allProducts').on('value', async (snapshot) => {
            const data = await snapshot.val();
            const keys = Object.keys(data);
            var fetchedProducts: Product[] = keys.map((key: string) => {
                return { id: key, ...data[key] };
            });
            const allProducts = [...fetchedProducts];
            resolve(allProducts);
        }, (error) => {
            console.error('getStaticProps', error);
            reject(error);
        });
    });
}

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
