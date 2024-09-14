import React, { useState } from "react";
import Seach from "./Seach";
import ButtonNav from "../../../components/button/ButtonNav";
type ButtonType = { name: string };
const Navbar = () => {
  const [data, setData] = useState<ButtonType[]>([
    { name: "noti" },
    { name: "cart" },
    { name: "Login" },
    { name: "Sign up" },
  ]);
  return (
    <div>
      <div className="flex justify-between border-b-4 shadow-md">
        <div className="flex">
          <p className="my-4 text-xl ml-28 font-semibold">Ecommerce</p>
          <Seach />
        </div>
        <div className="flex mr-28">
          {data?.map((d) => {
            return <ButtonNav name={d?.name} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
