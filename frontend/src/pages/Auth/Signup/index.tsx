import React from "react";
import {Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert} from "@chakra-ui/react";
import {useFormik} from "formik"
import validationSchema from "./validations.ts"
import {fetchRegister} from "../../../api.ts";
import {AxiosError} from "axios";
import {useAuth} from "../../../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

interface FormValues {
    email: string,
    password: string,
    passwordConfirm: string,
    general?: string
}

const Signup: React.FC = () => {
    const {login} = useAuth()
    const navigate = useNavigate()
    const formik = useFormik<FormValues>({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: ""
        },
        validationSchema,
        onSubmit: async (values, bag) => {
            try {
                const registerResponse = await fetchRegister({
                    email: values.email,
                    password: values.password
                })
                login(registerResponse)
                navigate("/profile")
            } catch (error) {
                if (error instanceof AxiosError) {
                    bag.setErrors({
                        general: error?.response?.data.message
                    })
                    return
                }
                console.error("Unexpected Error : ", error)
                return
            }
        }
    })

    return (
        <div>
            <Flex align={"center"} width={"full"} justifyContent={"center"}>
                <Box pt={10}>
                    <Box textAlign={"center"}>
                        <Heading>Sign Up</Heading>
                    </Box>
                    <Box my={5}>
                        {
                            formik.errors.general && (
                                <Alert status={"error"}>{formik.errors.general}</Alert>
                            )
                        }
                    </Box>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel>E-mail</FormLabel>
                            <Input
                                name={"email"}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                isInvalid={formik.touched.email && !!formik.errors.email}
                            />
                        </FormControl>
                        <FormControl mt={"4"}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                name={"password"}
                                type={"password"}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                isInvalid={formik.touched.password && !!formik.errors.password}
                            />
                        </FormControl>
                        <FormControl mt={"4"}>
                            <FormLabel>Password Confirm</FormLabel>
                            <Input
                                name={"passwordConfirm"}
                                type={"password"}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.passwordConfirm}
                                isInvalid={formik.touched.passwordConfirm && !!formik.errors.passwordConfirm}
                            />
                        </FormControl>
                        <Button mt={"4"} width={"full"} type={"submit"}>
                            Sign Up
                        </Button>
                    </form>
                </Box>
            </Flex>
        </div>
    )
}

export default Signup