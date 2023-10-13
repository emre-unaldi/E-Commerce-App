import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {fetchLogout, fetchMe} from "../api.ts";
import {Flex, Spinner} from "@chakra-ui/react";

interface UserResponseData {
    accessToken: string,
    refreshToken: string,
    user: {
        email: string,
        role: string,
        _id: string
    }
}

interface UserData {
    email: string,
    role: string,
    _id: string
}


interface AuthContextData {
    user: UserData | null,
    loggedIn: boolean,
    login: (data: UserResponseData) => void
    logout: () => void
}

const initialValues: AuthContextData = {
    user: null,
    loggedIn: false,
    login: (): void => {
    },
    logout: (): void => {
    }
}

const AuthContext: React.Context<AuthContextData> = createContext<AuthContextData>(initialValues)

export const useAuth = (): AuthContextData => useContext(AuthContext)
interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<UserData | null>(null)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            try {
                const me = await fetchMe()
                setLoggedIn(true)
                setUser(me)
                setLoading(false)
            } catch (e) {
                setLoading(false)
            }
        })()
    }, [])

    const login = (data: UserResponseData): void => {
        setLoggedIn(true)
        setUser(data.user)

        localStorage.setItem("access-token", data.accessToken)
        localStorage.setItem("refresh-token", data.refreshToken)
    }

    const logout = async (): Promise<void> => {
        setLoggedIn(false)
        setUser(null)

        await fetchLogout()

        localStorage.removeItem("access-token")
        localStorage.removeItem("refresh-token")
    }

    const values: AuthContextData = {
        loggedIn,
        user,
        login,
        logout
    }

    if (loading) {
        return (
            <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
                <Spinner
                    thickness={"4px"}
                    speed={"0.65s"}
                    emptyColor={"gray.200"}
                    size={"xl"}
                    color={"red.500"}
                />
            </Flex>
        )
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}