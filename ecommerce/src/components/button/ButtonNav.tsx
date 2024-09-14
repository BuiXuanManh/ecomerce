import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ButtonNav = ({ name }: { name: string }) => {
  return (
    <div className="mx-4 justify-center my-4">
      <button className="text-xl font-semibold">
        {name === "noti" ? (
          <FontAwesomeIcon icon={faBell} />
        ) : name === "cart" ? (
          <FontAwesomeIcon icon={faShoppingCart} />
        ) : name === "Login" ? (
          name
        ) : name === "Sign up" ? (
          name
        ) : null}
      </button>
    </div>
  );
};

export default ButtonNav;
