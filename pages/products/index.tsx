import App from '../../components/App';
import ProductsText from '../../components/productsText'
import GroupMenu from '../../components/groupMenu'


export default function ProductsPage({ children }: { children: React.ReactNode }) {

    return (
        <App title="Order Your Orataiphathai Thai Sarong Products"
            description="Our Products catalog of Thai Sarong fabric. We have many patterns and even unique handmade items therefore you need to contact us to find out price and availability."
        >
            <div className="container bg-black">
                <ProductsText />
                <GroupMenu />
                {children}
            </div>
        </App>
    )
}