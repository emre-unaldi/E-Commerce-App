import React from 'react'
import ReactDOM from 'react-dom/client'
import {ChakraProvider} from "@chakra-ui/react"
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import App from './App.tsx'
import {AuthProvider} from "./context/AuthContext.tsx";
import {BasketProvider} from "./context/BasketContext.tsx";
import './reset.css'

const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <AuthProvider>
                    <BasketProvider>
                        <App/>
                    </BasketProvider>
                </AuthProvider>
            </ChakraProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>,
)
