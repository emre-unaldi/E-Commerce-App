import React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {Box, Button, Text} from "@chakra-ui/react";
import {fetchProduct} from "../../api.ts";
import {AxiosError} from "axios";
import moment from "moment";
import ImageGallery from "react-image-gallery";
import {useBasket} from "../../context/BasketContext.tsx";

interface ProductData {
    createdAt: string,
    description: string,
    photos: Array<string>,
    price: number,
    title: string,
    _v: number,
    _id: string
}

type ImageUrl = {
    original: string
}

const ProductDetail: React.FC = () => {
    const {product_id} = useParams()
    const {addToBasket, items} = useBasket()

    const {isLoading, error, data} = useQuery<ProductData>(
        ["product", product_id],
        () => fetchProduct(product_id)
    )

    if (isLoading) return <div>Loading...</div>

    if (error) {
        const axiosError = error as AxiosError;

        return (
            <div>
                {`Error has occurred : ${axiosError.message}`}
            </div>
        )
    }

    const findBasketItem: ProductData | undefined = items
        .find((item: ProductData): boolean => item._id === product_id)

    const images: ImageUrl[] = (data?.photos ?? [])
        .map((url: string): ImageUrl => ({original: url}));

    return (
        <div>
            <Button colorScheme={findBasketItem ? "pink" : "green"} onClick={() => addToBasket(data!, findBasketItem)}>
                {findBasketItem ? "Remove from basket" : "Add to basket"}
            </Button>
            <Text as={"h2"} fontSize={"2xl"}>
                {data?.title}
            </Text>
            <Text>
                {moment(data?.createdAt).format("DD/MM/YYYY")}
            </Text>
            <p>{data?.description}</p>
            <Box margin={"10"}>
                <ImageGallery items={images} showThumbnails={false}/>
            </Box>
        </div>
    )
}

export default ProductDetail