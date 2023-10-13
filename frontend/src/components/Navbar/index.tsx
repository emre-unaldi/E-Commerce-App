import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@chakra-ui/react";
import styles from "./styles.module.css"
import {useAuth} from "../../context/AuthContext.tsx";
import {useBasket} from "../../context/BasketContext.tsx";

const Navbar: React.FC = () => {
    const {loggedIn, user} = useAuth()
    const {items} = useBasket()

    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <Link to={"/"}>E-Commerce</Link>
                </div>
                <ul className={styles.menu}>
                    <li>
                        <Link to={"/"}>Products</Link>
                    </li>
                </ul>
            </div>

            <div className={styles.right}>
                {
                    loggedIn ?
                        (
                            <>
                                {
                                    items.length > 0 && (
                                        <Link to={"/basket"}>
                                            <Button colorScheme={"pink"} variant={"outline"}>
                                                Basket ({items.length})
                                            </Button>
                                        </Link>
                                    )
                                }
                                {
                                    user?.role === "admin" && (
                                        <Link to={"/admin"}>
                                            <Button colorScheme={"pink"} variant={"outline"}>
                                                Admin
                                            </Button>
                                        </Link>
                                    )
                                }
                                <Link to={"/profile"}>
                                    <Button colorScheme={"pink"}>Profile</Button>
                                </Link>
                            </>
                        )
                        :
                        (
                            <>
                                <Link to={"/signin"}>
                                    <Button colorScheme={"pink"}>Login</Button>
                                </Link>
                                <Link to={"/signup"}>
                                    <Button colorScheme={"pink"}>Register</Button>
                                </Link>
                            </>
                        )
                }
            </div>
        </nav>
    )
}

export default Navbar