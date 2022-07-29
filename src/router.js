import { Route, Routes } from "react-router-dom";
import Checkout from "./pages/checkout";
import HomePage from "./pages/home";
import ProductDetails from "./pages/productDetails";

const AppRouter = () => (
  <Routes>
    <Route exact path="/" element={<HomePage />} />
    <Route path=":id" element={<ProductDetails />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/checkout/:id" element={<Checkout />} />
  </Routes>
);

export default AppRouter;
