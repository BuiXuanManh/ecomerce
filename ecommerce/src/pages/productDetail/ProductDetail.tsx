import React from "react";

const ProductDetail = () => {
  return (
    <div className="mx-28 mt-10">
      <div className="">
        <div className="flex justify-between">
          <div className="w-1/2">
            <img src="https://via.placeholder.com/400" alt="product" />
          </div>
          <div className="w-1/2">
            <h1 className="text-4xl font-bold">Product Name</h1>
            <p className="text-xl font-semibold">Price: $100</p>
            <p className="text-xl font-semibold">
              Description: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
            </p>
            <button className="bg-blue-500 text-white p-2 mt-4">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
