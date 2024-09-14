import { IonIcon } from "@ionic/react";
import React from "react";

const Seach = () => {
  return (
    <div className="mx-2">
      <div className="flex justify-center mt-2 ml-40 w-[40rem]">
        <input
          type="text"
          className="w-full border-2 border-gray-300 p-2"
          placeholder="Search"
        />
        <button className="bg-blue-500 text-white p-2">
          <IonIcon className=" text-white" name="search-outline" />
        </button>
      </div>
    </div>
  );
};

export default Seach;
