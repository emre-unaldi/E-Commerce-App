import React from "react";
import {Alert, AlertDescription, AlertIcon, AlertTitle} from "@chakra-ui/react";

const Error404: React.FC = () => {
    return (
        <div>
            <Alert status={"error"}>
                <AlertIcon/>
                <AlertTitle mr={2}>Error 404</AlertTitle>
                <AlertDescription>
                    This page was not found
                </AlertDescription>
            </Alert>
        </div>
    )
}

export default Error404