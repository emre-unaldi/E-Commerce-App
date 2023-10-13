import {Box, Image, Button} from "@chakra-ui/react";
import React from "react";
import {Link} from "react-router-dom";
import moment from "moment"
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

interface CardProps {
    item: ProductData
}

const Card: React.FC<CardProps> = ({item}) => {
    const {addToBasket, items} = useBasket()

    const findBasketItem: ProductData | undefined = items
        .find((basketItem: ProductData): boolean => basketItem._id === item._id)

    return (
        <Box borderWidth={"1px"} borderRadius={"lg"} overflow={"hidden"} p={"3"}>
            <Link to={`/product/${item._id}`}>
                <Image src={item.photos[0]} alt={"product"} loading={"lazy"} />
                <Box p={"6"}>
                    <Box display={"flex"} alignItems={"baseline"} >
                        {moment(item.createdAt).format("DD/MM/YYYY")}
                    </Box>
                    <Box mt={"1"} fontWeight={"semibold"} as={"h4"} lineHeight={"tight"}>
                        {`${item.title} TL`}
                    </Box>
                    <Box>
                        {`${item.price} TL`}
                    </Box>
                </Box>
            </Link>
            <Button
                colorScheme={findBasketItem ? "pink" : "green"}
                onClick={() => addToBasket(item, findBasketItem)}
            >
                {findBasketItem ? "Remove from basket" : "Add to basket"}
            </Button>
        </Box>
    )
}

export default Card