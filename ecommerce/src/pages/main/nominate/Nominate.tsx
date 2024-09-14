import React, { useState } from "react";
import { nominatedata } from "./nominateData";
type ImgType = { url: string; type: string };
type NominateItem = {
  img: Array<ImgType>;
  name: string;
  quantity: number;
  price: number;
};
const Nominate = () => {
  const [nominate, setNominate] = useState<Array<NominateItem>>(nominatedata);
  return (
    <div className="mx-28 mt-10">
      <div>
        <h2 className="text-xl font-semibold">Nominate</h2>
      </div>
      <div className="grid grid-cols-6 gap-5 justify-center mt-5">
        {nominate?.map((d, index) => {
          return (
            <div
              key={index}
              className="justify-center hover:bg-slate-50 hover:border-2 hover:border-blue-200 cursor-pointer"
            >
              <img src={d.img[0].url} className="w-full " alt="" />
              {/* <video src={d.img[1]}></video> */}
              <div className="mt-2 justify-center text-center">
                <h2 className="font-semibold text-lg mx-2">{d.name}</h2>
                <div className="flex justify-between mx-2 mt-2">
                  <div className="font-semibold text-lg">{d?.price}</div>
                  <div>Đã bán {d.quantity}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Nominate;
