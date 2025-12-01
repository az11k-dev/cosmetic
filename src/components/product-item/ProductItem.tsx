import {useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import ItemCard from "./ItemCard";
import {ProductContentType} from "@/types/data.types";
import Spinner from "../button/Spinner";
import {useSliceData} from "@/hooks/useSliceData";

const API_URL = "https://admin.beauty-point.uz/api/products";

function ProductAll({
                        statekey,
                        hasPaginate = false,
                    }: ProductContentType) {
    // const { data, error } = useSliceData(statekey);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected(!selected);
    };
    //
    // if (error) return <div>Failed to load products</div>;
    // if (!data)
    //     return (
    //         <div>
    //             <Spinner/>
    //         </div>
    //     );
    //
    // const getData = () => {
    //     if (hasPaginate) return data.data;
    //     else return data;
    // };

    useEffect(() => {
        const fetchProducts=async ()=>{
            try{
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                const apiData = result?.data?.data || [];
                setData(apiData);
                setError(null);}
            catch (e){
                console.error(e,"Failed to fetch categories:");
                setError("Ne udalos' zagruzit' kategorii.");
            }finally {
                setIsLoading(false);
            }

        };
        fetchProducts();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading)
        return (
            <div>
                <Spinner />
            </div>
        );

    return (
        <>
            {data?.map((item: any, index: number) => (
                <Col
                    key={index}
                    md={4}
                    className={`col-sm-6 gi-product-box gi-col-5 ${
                        selected ? "active" : ""
                    }`}
                    onClick={handleClick}
                >
                    <ItemCard data={item}/>
                </Col>
            ))}
        </>
    );
}

export default ProductAll;
