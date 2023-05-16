
import ProductsGroup from "../../../../components/productsGroup";


export default function Page({ params }: { params: { group: string }; }) {

    return (
        <div className="bg-black">
            <ProductsGroup groupid={params.group} />
        </div>
    )

}
