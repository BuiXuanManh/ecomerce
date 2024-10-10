import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook.js";

import ProductPortfolio from "./ProductPortfolio/ProductPortfolio";

import "./Category.css";
import Filter from "./Filter/Filter";
import AttachProduct from "./AttachProduct/AttachProduct";
import NewFeed from "./NewFeed/NewFeed";
import Overlay from "../../shared/components/UIElements/Overlay";
import ProductsList from "../Main/Products/ProductList";
import QuickSearch from "../Main/QuickSearch/QuickSearch.js";

import { convertToDate } from "../../shared/util/convertTime.js";
import Spinner from "../../shared/components/UIElements/Spinner.js";
import Modal from "../../shared/components/UIElements/Modal.js";

const CATEGORIES = {
  "dien-thoai": "Điện thoại",
  tablet: "Tablet",
  laptop: "Laptop",
  "phu-kien": "Phụ kiện",
  "cu-gia-re": "Cũ giá rẻ",
  "khuyen-mai": "Khuyến mãi",
};

const Category = (props) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [showSideBar, setShowSideBar] = useState(false);
  const [products, setProducts] = useState([]);
  const [temp, setTemp] = useState([]);
  const { isLoading, error, statusCode, sendRequest, clearError, setError } =
    useHttpClient();
  const activeCategory = CATEGORIES[category];

  const fetchData = useCallback(async () => {
    try {
      const data = await sendRequest(
        `http://localhost:2000/api/v1/shop/categories/${activeCategory}`
      );
      if (statusCode >= 500) {
        navigate("/error");
        return;
      }
      setProducts(data.data);
      setTemp(data.data);
    } catch (error) {
      setError(error.message);
    }
  }, [activeCategory, sendRequest, navigate]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showSideBarHandler = () => {
    setShowSideBar((prev) => !prev);
  };
  const filterItemByPrice = (data) => {
    setTemp(data);
  };
  const selectChangeHandler = (e) => {
    let pr = [];
    switch (e.target.value) {
      case "1":
        pr = [...temp].sort((a, b) => {
          const dateA = convertToDate(a.createdAt);
          const dateB = convertToDate(b.createdAt);
          return dateA - dateB;
        });
        break;
      case "2":
        pr = [...temp].sort(
          (a, b) =>
            +(
              ((100 - (a.Promotion !== null ? a.Promotion.discount_value : 0)) /
                100) *
              a.product_price
            ) -
            +(
              ((100 - (b.Promotion !== null ? b.Promotion.discount_value : 0)) /
                100) *
              b.product_price
            )
        );
        break;
      case "3":
        pr = [...temp].sort(
          (a, b) =>
            +(
              ((100 - (b.Promotion !== null ? b.Promotion.discount_value : 0)) /
                100) *
              b.product_price
            ) -
            +(
              ((100 - (a.Promotion !== null ? a.Promotion.discount_value : 0)) /
                100) *
              a.product_price
            )
        );
        break;
      default:
        pr = [...products];
    }
    setTemp(pr);
  };
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (error) {
    navigate("/");
  }
  return (
    <>
      {!error && (
        <>
          {showSideBar && <Overlay onCancel={showSideBarHandler} />}
          {error && (
            <Modal
              onCancel={clearError}
              message={error}
              error
              title='Có lỗi'
              action={
                <>
                  <button className='btn btn-danger' onClick={clearError}>
                    Đóng
                  </button>{" "}
                </>
              }></Modal>
          )}
          <div className='category p-2'>
            <div className='container'>
              <div className='d-flex justify-content-between align-items-center mb-3 flex-column-md'>
                {category !== "khuyen-mai" && (
                  <>
                    <p className='m-0'>
                      TRANG CHỦ / <b>{activeCategory}</b>
                    </p>
                    <p
                      className='d-lg-none mb-1 mt-1'
                      onClick={showSideBarHandler}>
                      Lọc
                    </p>
                    <div className='d-flex align-items-center gap-4'>
                      <p className='m-0 d-none d-lg-block'>
                        Xem tất cả {temp.length} kết quả
                      </p>
                      <select onChange={selectChangeHandler}>
                        <option value='0'>Thứ tự mặc định</option>
                        <option value='1'>Thứ tự theo sản phẩm mới</option>
                        <option value='2'>Thứ tự theo giá: thấp đến cao</option>
                        <option value='3'>
                          Thứ tự theo giá: cao xuống thấp
                        </option>
                      </select>
                    </div>
                  </>
                )}
              </div>
              <div className='row'>
                <div
                  className={`col-lg-3  col-0 sidebar d-lg-block ${
                    showSideBar === true ? "d-block" : " d-none"
                  }`}>
                  <ProductPortfolio category={category} />
                  {category !== "khuyen-mai" && (
                    <Filter
                      ranges={[1000000, 40000000]}
                      items={products}
                      filterItemByPrice={filterItemByPrice}
                    />
                  )}
                  <AttachProduct />
                  <NewFeed />
                </div>
                <div className='col-12 col-lg-9  '>
                  {temp.length === 0 && <p>Không có sản phẩm thích hợp</p>}

                  <ProductsList
                    items={temp}
                    classNameItem='boxShadow'
                    row='row g-3'
                    col='col-6 col-md-3'
                  />
                </div>
              </div>
            </div>
          </div>
          <QuickSearch className='container' />
        </>
      )}
    </>
  );
};

export default Category;
