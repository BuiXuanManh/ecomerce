import React, { useState } from "react";
import { topsearchdata } from "./topsearchdata";
type TopFindItem = { url: string; name: string; quantity: number };
const TopFind = () => {
  const [topfind, setTopFind] = useState<Array<TopFindItem>>(topsearchdata);
  return (
    <div className="mx-28 mt-10">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Top Search Products</h2>
        <div className="text-orange-500">See all</div>
      </div>
      <div className="grid grid-cols-6 gap-2 justify-center mt-5">
        {topfind?.map((d, index) => {
          return (
            <div
              key={index}
              className="justify-center hover:bg-slate-50 hover:border-2 hover:border-blue-200 cursor-pointer"
            >
              <img src={d.url} className="w-full " alt="" />
              <div className="mt-2 justify-center text-center">
                <h2 className="font-semibold text-lg ml-2">{d.name}</h2>
                <p className="">{d.quantity}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopFind;
