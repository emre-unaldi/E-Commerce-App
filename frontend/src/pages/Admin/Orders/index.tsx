import React from "react";
import {useQuery} from "react-query";
import {fetchOrders} from "../../../api.ts";
import {AxiosError} from "axios";
import {Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";

interface ProductData {
    createdAt: string,
    description: string,
    photos: Array<string>,
    price: number,
    title: string,
    _v: number,
    _id: string
}

interface OrdersData {
    adress: string,
    createdAt: string,
    items: ProductData[],
    user: {
        role: string,
        _id: string,
        email: string
    },
    _v: number,
    _id: string
}

const Orders: React.FC = () => {
    const {isLoading, error, data} = useQuery<OrdersData[]>(
        "admin:orders",
         fetchOrders
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

    console.log(data)

    return (
        <div>
            <Text fontSize={"2xl"} p={5}>
                Orders
            </Text>

            <Table variant={"simple"}>
                <TableCaption>Orders List</TableCaption>
                <Thead>
                    <Tr>
                        <Th>User</Th>
                        <Th>Address</Th>
                        <Th isNumeric>Items</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data?.map((item: OrdersData) => (
                            <Tr key={item._id}>
                                <Td>{item.user.email}</Td>
                                <Td>{item.adress}</Td>
                                <Td isNumeric>{item.items.length}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>

        </div>
    )
}

export default Orders