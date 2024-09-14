import React, { useState } from "react";
import { data } from "./data";
import { useNavigate } from "react-router-dom";
type Product = {
  name: string;
  img: Array<Image>;
  price: number;
  color: Array<number>;
  size: Array<number>;
  description: string;
};
type Image = {
  url: string;
  type: string;
};
const ListProduct = () => {
  const [products, setProducts] = useState<Array<Product>>(data);
  const navigate = useNavigate();
  function handleDetail(name: string) {
    navigate("/product/" + name);
  }
  return (
    <div className="mx-28 mt-10">
      <div>
        <h2 className="text-xl font-semibold">Product List</h2>
      </div>
      <div className="grid grid-cols-4 gap-2 justify-center mt-5">
        {products?.map((d, index) => {
          return (
            <div
              key={index}
              onClick={() => handleDetail(d.name)}
              className="justify-center cursor-pointer hover:border-2 hover:border-blue-200"
            >
              <img src={d.img[0].url} className="w-full " alt="" />
              {/* <video src={d.img[1]}></video> */}
              <div className="mt-2 justify-center text-center">
                <h2 className="font-semibold mx-2 text-lg">{d.name}</h2>
                {/* <p>{d.description}</p> */}
                <p>{d.price}</p>
                <div>
                  <p>Size</p>
                  {d?.size?.map((s, idx) => (
                    <span key={idx}>{s}</span>
                  ))}
                </div>
                <div>
                  <p>Color</p>
                  {d?.color?.map((c, idx) => (
                    <span key={idx}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
