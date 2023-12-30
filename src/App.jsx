import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/common/layout/Layout";
import { setIsUserLoggedIn } from "./redux/reducers/AuthSlice";
const Home = lazy(() => import("./components/common/Home"));
const SignUp = lazy(() => import("./components/pages/shared/SignUp"));
const CartList = lazy(() => import("./components/pages/shared/CartList"));
const Profile = lazy(() => import("./components/pages/shared/Profile"));
const NotFound = lazy(() => import("./components/pages/shared/NotFound"));
const ProductDetails = lazy(() =>
  import("./components/pages/products/ProductDetails")
);
const Products = lazy(() => import("./components/pages/products/Products"));
const Login = lazy(() => import("./components/pages/shared/Login"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
      dispatch(setIsUserLoggedIn(true));
    }
  }, [dispatch]);
  return (
    <>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products/:productId" element={<Products />} />
            <Route
              path="productDetails/:productId/:id"
              element={<ProductDetails />}
            />
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="cart" element={<CartList />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
