import React from "react";
import { catedata } from "./catedata";
type cateItem = { url: string; name: string };
const Categogy = () => {
  const [cate, setCate] = React.useState<Array<cateItem>>(catedata);
  return (
    <div className="mx-28 mt-10">
      <div>
        <h2 className="text-xl font-semibold">Category</h2>
      </div>
      <div className="grid grid-cols-8 gap-2 justify-center mt-5">
        {cate?.map((d, index) => {
          return (
            <div
              key={index}
              className="justify-center hover:bg-slate-100 cursor-pointer"
            >
              <img src={d.url} className="w-full " alt="" />
              <div className="mt-2 justify-center text-center">
                <h2 className="font-semibold text-lg">{d.name}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categogy;
