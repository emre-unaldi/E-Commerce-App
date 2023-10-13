import React from "react";
import Card from "../../components/Card";
import {Box, Flex, Grid, Button} from "@chakra-ui/react";
import {useInfiniteQuery} from "react-query";
import {fetchProductList} from "../../api.ts";
import {AxiosError} from "axios";

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
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useInfiniteQuery<ProductData[]>(
        "products",
        fetchProductList,
        {
            getNextPageParam: (lastGroup, allGroups) => {
                const morePageExist = lastGroup?.length === 12

                if (!morePageExist) return

                return allGroups.length + 1
            }
        }
    )

    if (status === "loading") return <div>Loading...</div>

    if (status === "error") {
        const axiosError = error as AxiosError;

        return (
            <div>
                {`Error has occurred : ${axiosError.message}`}
            </div>
        )
    }

    return (
        <div>
            <Grid templateColumns={"repeat(3, 1fr)"} gap={4}>
                {data?.pages.map((group: ProductData[], i: number) => (
                    <React.Fragment key={i}>
                        {group.map((item: ProductData) => (
                            <Box w={"100%"} key={item._id}>
                                <Card item={item}/>
                            </Box>
                        ))}
                    </React.Fragment>
                ))}
            </Grid>
            <Flex mt={"10"} justifyContent={"center"}>
                <Button
                    isLoading={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? "Loading more..."
                        : hasNextPage
                            ? "Load More"
                            : "Nothing more to load"}
                </Button>
                <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
            </Flex>
        </div>
    )
}

export default Products