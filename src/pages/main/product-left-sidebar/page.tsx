import { Row } from 'react-bootstrap'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import ProductPage from '@/components/product-page/ProductPage'
import RelatedProduct from '@/components/product-page/related-product/RelatedProduct'
import ProductDetailsPage from "@/components/productDetailsPage/ProductDetailsPage.tsx";



const page = () => {


    return (
        <>
            <Breadcrumb title={"Product Page"} />
            <section className="gi-single-product padding-tb-40">
                <div className="container" >
                        <Row  >
                            <ProductDetailsPage/>
                        </Row>
                </div>
            </section>
            <RelatedProduct />

        </>
    )
}

export default page
