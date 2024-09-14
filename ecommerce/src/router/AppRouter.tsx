import React from "react";
import { Route, Routes } from "react-router-dom";
import MainBoard from "../pages/main/Mainboard";
import ProductDetail from "../pages/productDetail/ProductDetail";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainBoard />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
};

export default AppRouter;
