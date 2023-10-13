import axios from "axios"

const BaseEndpoint: string = import.meta.env.VITE_BASE_ENDPOINT

axios.interceptors.request.use(
    function (config) {
        const {origin} = new URL(config.url!)
        const allowedOrigins: string[] = [BaseEndpoint]
        const token: string | null = localStorage.getItem("access-token")

        if (allowedOrigins.includes(origin)) {
            config.headers.authorization = token
        }

        return config
    }, function (error) {
        return Promise.reject(error)
    })

export const fetchProductList = async ({pageParam = 0}) => {
    const {data} = await axios.get(`${BaseEndpoint}/product?page=${pageParam}`)
    return data
}

export const fetchProduct = async (product_id: string | undefined) => {
    const {data} = await axios.get(`${BaseEndpoint}/product/${product_id}`)
    return data
}

export const postProduct = async (input: object) => {
    const {data} = await axios.post(`${BaseEndpoint}/product`, input)
    return data
}

export const fetchRegister = async (input: object) => {
    const {data} = await axios.post(`${BaseEndpoint}/auth/register`, input)
    return data
}

export const fetchLogin = async (input: object) => {
    const {data} = await axios.post(`${BaseEndpoint}/auth/login`, input)
    return data
}

export const fetchMe = async () => {
    const {data} = await axios.get(`${BaseEndpoint}/auth/me`)
    return data
}

export const fetchLogout = async () => {
    const {data} = await axios.post(`${BaseEndpoint}/auth/logout`,
        {
            refresh_token: localStorage.getItem("refresh-token")
        })
    return data
}

export const postOrder = async (input: object) => {
    const {data} = await axios.post(`${BaseEndpoint}/order`, input)
    return data
}

export const fetchOrders = async () => {
    const {data} = await axios.get(`${BaseEndpoint}/order`)
    return data
}

export const deleteProduct = async (productId: string) => {
    const {data} = await axios.delete(`${BaseEndpoint}/product/${productId}`)
    return data
}

export const updateProduct = async (input: object, productId: string ) => {
    const {data} = await axios.put(`${BaseEndpoint}/product/${productId}`, input)
    return data
}