import { useParams } from "react-router"
import ProductForm from "../components/ProductForm"

function UpdateProductPage() {
    const {productId} = useParams()

    return (
        <ProductForm formType={'edit'} productId={productId}/>
    )
}
export default UpdateProductPage