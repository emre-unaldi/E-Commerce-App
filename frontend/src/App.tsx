import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"
import './App.css'
import Navbar from "./components/Navbar";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./pages/ProtectedRoutes.tsx";
import Basket from "./pages/Basket";
import Error404 from "./pages/Error404";
import Admin from "./pages/Admin";
import Home from "./pages/Admin/Home";
import Orders from "./pages/Admin/Orders";
import AdminProducts from "./pages/Admin/Products";
import AdminProductDetail from "./pages/Admin/ProductDetail";
import AdminProductNew from "./pages/Admin/Products/NewProduct.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Navbar/>
                <div id={"content"}>
                    <Routes>
                        <Route path={"/"} element={<Products/>}/>
                        <Route path={"/product/:product_id"} element={<ProductDetail/>}/>
                        <Route path={"/signin"} element={<Signin/>}/>
                        <Route path={"/signup"} element={<Signup/>}/>
                        <Route path={"/profile"} element={<ProtectedRoutes><Profile/></ProtectedRoutes>}/>
                        <Route path={"/basket"} element={<Basket/>}/>
                        <Route path={"*"} element={<Error404/>}/>

                        <Route path="/admin" element={<ProtectedRoutes admin={true}><Admin/></ProtectedRoutes>}>
                            <Route index={true} element={<Home />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="products" element={<AdminProducts />} />
                            <Route path="products/new" element={<AdminProductNew />} />
                            <Route path="products/:product_id" element={<AdminProductDetail />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </Router>
    )
}
export default App
