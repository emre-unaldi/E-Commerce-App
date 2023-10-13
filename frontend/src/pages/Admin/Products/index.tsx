import React, {useMemo} from "react";
import {useQuery, useMutation, useQueryClient} from "react-query";
import {fetchProductList, deleteProduct} from "../../../api.ts";
import {AxiosError} from "axios";
import {Button, Flex, Text} from "@chakra-ui/react";
import {Popconfirm, Table} from "antd"
import {Link} from "react-router-dom";

interface ProductData {
    createdAt: string,
    description: string,
    photos: Array<string>,
    price: number,
    title: string,
    _v: number,
    _id: string
}
const Products: React.FC = () => {
    const queryClient = useQueryClient()
    const {isLoading, error, data} = useQuery<ProductData[]>(
        "admin:products",
        fetchProductList
    )

    const deleteMutation = useMutation(deleteProduct, {
        onSuccess: () => queryClient.invalidateQueries("admin:products")
    })

    const columns = useMemo(() => {
        return [
            {
                title: "Title",
                dataIndex: "title",
                key: "title"
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price"
            },
            {
                title: "Created At",
                dataIndex: "createdAt",
                key: "createdAt"
            },
            {
                title: "Action",
                key: "action",
                render: (text: string, record: ProductData) => (
                    <>
                        <Link to={`/admin/products/${record._id}`} style={{marginRight: "10px"}} >Edit</Link>
                        <Popconfirm
                            title={"Are you sure ?"}
                            onConfirm={() => {
                                deleteMutation.mutate(record._id, {
                                    onSuccess: () => {
                                        console.log("success")
                                    }
                                })
                            }}
                            onCancel={() => {
                                console.log(text)
                                alert("iptal edildi")
                            }}
                            okText={"Yes"}
                            cancelText={"No"}
                            placement={"right"}
                        >
                            <a href="#">Delete</a>
                        </Popconfirm>
                    </>
                )
            }
        ]
    }, [])

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
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"2xl"} p={"5"}>
                    Products
                </Text>
                <Link to={"/admin/products/new"}>
                    <Button>New Product</Button>
                </Link>
            </Flex>

            <Table dataSource={data} columns={columns} rowKey={"_id"} />
        </div>
    )
}

export default Products