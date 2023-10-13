import React from "react";
import {Link, Outlet} from "react-router-dom";
import styles from "./styles.module.css"
import {Box} from "@chakra-ui/react";

const Admin: React.FC = () => {
    return(
        <div>
            <nav>
                <ul className={styles.adminMenu}>
                    <li>
                        <Link to={"/admin"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/admin/orders"}>Orders</Link>
                    </li>
                    <li>
                        <Link to={"/admin/products"}>Products</Link>
                    </li>
                </ul>
            </nav>

            <Box mt={"10"}>
                <Outlet/>
            </Box>
        </div>
    )
}

export default Admin