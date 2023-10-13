import React from "react";
import {FieldArray, Formik} from "formik";
import {Box, Button, FormControl, FormLabel, Input, Text, Textarea} from "@chakra-ui/react";
import {message } from "antd"
import validationScheme from "./validations.ts"
import {useMutation, useQueryClient} from "react-query";
import {postProduct} from "../../../api.ts";

interface ProductData {
    createdAt?: string,
    description: string,
    photos: Array<string>,
    price: number,
    title: string,
    _v?: number,
    _id?: string
}

const NewProduct: React.FC = () => {
    const queryClient = useQueryClient()
    const newProductMutation = useMutation(postProduct, {
        onSuccess: () => queryClient.invalidateQueries("admin:product")
    })
    const handleSubmit = async (values: ProductData): Promise<void> => {
        console.log(values)
        message.loading({content: "Loading...", key:"product_create"})

        const photosAsString:string = JSON.stringify(values.photos);
        const updatedValues = {
            ...values,
            photos: photosAsString,
        }
        newProductMutation.mutate(updatedValues, {
            onSuccess: () => {
                console.log("success")
                message.success({
                    content:"The product successfully created",
                    key: "product_create",
                    duration: 2
                })
            }
        })
    }

    return (
        <div>
            <Text fontSize={"2xl"}>New Product</Text>
            <Formik
                initialValues={{
                    title: "test",
                    description: "test",
                    price: 100,
                    photos: []
                }}
                validationSchema={validationScheme}
                onSubmit={handleSubmit}
            >
                {
                    ({
                         handleSubmit,
                         errors,
                         touched,
                         handleChange,
                         handleBlur,
                         values,
                         isSubmitting
                     }) => (
                        <>
                            <Box>
                                <Box my={"5"} textAlign={"left"}>
                                    <form onSubmit={handleSubmit}>
                                        <FormControl>
                                            <FormLabel>Title</FormLabel>
                                            <Input
                                                name={"title"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.title}
                                                disabled={isSubmitting}
                                                isInvalid={touched.title && !!errors.title}
                                            />
                                            {
                                                touched.title && !!errors.title && (
                                                    <Text color={"red.500"}>{errors.title}</Text>
                                                )
                                            }
                                        </FormControl>
                                        <FormControl mt={"4"}>
                                            <FormLabel>Description</FormLabel>
                                            <Textarea
                                                name={"description"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.description}
                                                disabled={isSubmitting}
                                                isInvalid={touched.description && !!errors.description}
                                            />
                                            {
                                                touched.description && !!errors.description && (
                                                    <Text color={"red.500"}>{errors.description}</Text>
                                                )
                                            }
                                        </FormControl>
                                        <FormControl mt={"4"}>
                                            <FormLabel>Price</FormLabel>
                                            <Input
                                                name={"price"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.price}
                                                disabled={isSubmitting}
                                                isInvalid={touched.price && !!errors.price}
                                            />
                                            {
                                                touched.price && !!errors.price && (
                                                    <Text color={"red.500"}>{errors.price}</Text>
                                                )
                                            }
                                        </FormControl>
                                        <FormControl mt={"4"}>
                                            <FormLabel>Photos</FormLabel>
                                            <FieldArray
                                                name={"photos"}
                                                render={(arrayHelpers) => (
                                                    <div>
                                                        {
                                                            values.photos && values.photos.map((photo, index) => (
                                                                <div key={index}>
                                                                    <Input
                                                                        name={`photos.${index}`}
                                                                        value={photo}
                                                                        disabled={isSubmitting}
                                                                        onChange={handleChange}
                                                                        width={"3xl"}
                                                                    />
                                                                    <Button
                                                                        ml={"4"}
                                                                        type={"button"}
                                                                        colorScheme={"red"}
                                                                        onClick={() => arrayHelpers.remove(index)}
                                                                    >
                                                                        Remove
                                                                    </Button>
                                                                </div>
                                                            ))
                                                        }
                                                        <Button
                                                            mt={"5"}
                                                            onClick={() => arrayHelpers.push("")}
                                                        >
                                                            Add a Photo
                                                        </Button>
                                                    </div>
                                                )}
                                            />
                                        </FormControl>
                                        <Button
                                            mt={"4"}
                                            width={"full"}
                                            type={"submit"}
                                            isLoading={isSubmitting}
                                        >
                                            Save
                                        </Button>
                                    </form>
                                </Box>
                            </Box>
                        </>
                    )
                }
            </Formik>
        </div>
    )
}

export default NewProduct