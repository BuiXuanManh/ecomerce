import React from "react";
import Navbar from "./navbar/Navbar";
import ListProduct from "./listProduct/ListProduct";
import Categogy from "./category/Categogy";
import TopFind from "./topfind/TopFind";
import Nominate from "./nominate/Nominate";

const MainBoard = () => {
  return (
    <div>
      <Navbar />
      <Categogy />
      <ListProduct />
      <TopFind />
      <Nominate />
    </div>
  );
};

export default MainBoard;
