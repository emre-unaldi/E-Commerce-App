import React, {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";

interface ProtectedRoutesProps {
    children: ReactNode,
    admin?: boolean
}
const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({children, admin}) => {
    const {loggedIn, user} = useAuth()

    if (admin && user?.role !== "admin") {
        return <Navigate to={"/"} />
    }

    if (!loggedIn) {
        return <Navigate to={"/"} />
    }

    return children
}

export default ProtectedRoutes