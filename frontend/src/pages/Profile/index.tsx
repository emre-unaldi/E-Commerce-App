import React from "react";
import {useAuth} from "../../context/AuthContext.tsx";
import {Button, Heading} from "@chakra-ui/react";
const Profile: React.FC = () => {
    const {user, logout} = useAuth()

    const handleLogout = async (): Promise<void> => {
        logout()
    }

    return (
        <div>
            <Heading>Profile</Heading>
            <code>
                {JSON.stringify(user)}
            </code>
            <br/>
            <Button colorScheme={"pink"} variant={"solid"} onClick={handleLogout}>
                Logout
            </Button>
        </div>
    )
}

export default Profile