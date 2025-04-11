import React, { useState, useEffect } from "react";
import "./Discount.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import addDiscountApi from "../../api/discount/addDiscountApi";
import getByCategory from "../../api/product/getByCategory.api";
import getAllCategoriesApi from "../../api/category/getAllCategoriesApi.api";
import getDiscountApi from "../../api/discount/getDiscountApi";
import deleteDiscountApi from "../../api/discount/deleteDiscountApi";
const Discount = () => {
  const [error, setError] = useState("");
  const [AllCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allDiscount, setAllDiscount] = useState([]);
  const [discountName, setDiscountName] = useState("");
  const [discountPercentage, setdiscountPercentage] = useState("");
  const [discountStart, setDiscountStart] = useState("");
  const [discountEnd, setDiscountEnd] = useState("");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [discountId, setDiscountId] = useState("");
  useEffect(() => {
    getAllCategories();
    getAllDiscounts();
  }, []);
  const openProducts = () => {
    document.querySelector(".products_list").style.display = "flex";
  };
  const closeProducts = () => {
    document.querySelector(".products_list").style.display = "none";
  };
  const openAddDiscount = () => {
    setDiscountName("");
    setdiscountPercentage("");
    setDiscountStart("");
    setDiscountEnd("");
    document.querySelector(".add_discount").style.display = "flex";
  };
  const closeAddDiscount = () => {
    document.querySelector(".add_discount").style.display = "none";
  };
  const openDeleteDiscount = (discountId) => {
    setDiscountId(discountId);
    document.querySelector(".deleteDiscount").style.display = "flex";
  };
  const closeDeleteDiscount = () => {
    document.querySelector(".deleteDiscount").style.display = "none";
  };
  const addDiscountAPI = () => {
    const discountData = {
      name: discountName,
      discountPercentage: discountPercentage,
      startDate: discountStart,
      endDate: discountEnd,
      products: products,
    };
    addDiscountApi(discountData, setError, setLoading, setAllDiscount);
  };
  const checkProduct = (productId) => {
    if (products.includes(productId)) {
      setProducts(products.filter((item) => item !== productId));
    } else {
      setProducts([...products, productId]);
    }
  };
  const getProductsByCategory = (category) => {
    if (category === "الفئة التي تتم عليها الخصم") {
      setError("يجب اختيار الفئة اولا");
    } else {
      const categoryId = AllCategories.filter((e) => e.name.ar == category)[0]
        ._id;
      if (categoryId) {
        getByCategory(setError, setAllProducts, setLoading, categoryId);
      } else {
        setError("لا يوجد فئة بهذا الاسم");
      }
    }
  };
  const getAllCategories = () => {
    getAllCategoriesApi(setError, setAllCategories, setLoading);
  };
  const getAllDiscounts = () => {
    getDiscountApi(setError, setAllDiscount, setLoading);
  };
  const deleteDiscount = () => {
    deleteDiscountApi(setError, setAllDiscount, setLoading, discountId);
  };
  return (
    <section className="discount">
      <div className="discount_container">
        <button onClick={openAddDiscount}>إضافة خصم علي المنتاجات</button>
        <div className="add_discount">
          <FontAwesomeIcon icon={faX} onClick={closeAddDiscount} />
          <h3>إضافة خصم</h3>
          <div className="add_discount_content">
            <div className="add_discount_content_inputs">
              <input
                type="text"
                placeholder="اسم الخصم"
                value={discountName}
                onChange={(e) => setDiscountName(e.target.value)}
              />
              <input
                type="number"
                placeholder="قيمة الخصم"
                value={discountPercentage}
                onChange={(e) => setdiscountPercentage(e.target.value)}
              />
              <input
                type="date"
                placeholder="start"
                value={discountStart}
                onChange={(e) => setDiscountStart(e.target.value)}
              />
              <input
                type="date"
                placeholder="end"
                value={discountEnd}
                onChange={(e) => setDiscountEnd(e.target.value)}
              />
              <select onChange={(e) => getProductsByCategory(e.target.value)}>
                <option value="all">الفئة التي تتم عليها الخصم</option>
                {AllCategories?.map((item) => {
                  return <option value={item.name.ar}>{item.name.ar}</option>;
                })}
              </select>
            </div>
            <div className="add_discount_content_products">
              <button onClick={openProducts}>منتجات الخصم</button>
              <div className="products_list">
                <FontAwesomeIcon icon={faX} onClick={closeProducts} />
                {loading
                  ? "Loading..."
                  : allProducts.map((item) => {
                      return (
                        <div className="products_item">
                          <input
                            type="checkbox"
                            onChange={() => checkProduct(item._id)}
                          />
                          <img src={item.images[0]} alt="product image" />
                          <div className="products_item_info">
                            <p>{item.name.ar}</p>
                            <span>{item.price} ريال</span>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
            <p>{error}</p>
            <button className="addDiscount_btn" onClick={addDiscountAPI}>
              {loading ? "Loading..." : " إضافة الخصم"}
            </button>
          </div>
        </div>
        <div className="discount_list">
          <div className="deleteDiscount">
            <h3>هل تريد حذف الخصم ؟</h3>
            <div className="deleteDiscount_btns">
              {error}
              <button onClick={deleteDiscount}>
                {loading ? "Loading..." : "نعم"}
              </button>
              <button onClick={closeDeleteDiscount}>لا</button>
            </div>
          </div>
          {loading
            ? "Loading..."
            : allDiscount?.map((item) => {
                return (
                  <div className="discount_item">
                    <h3>{item.name}</h3>
                    <span>نسبة الخصم : %{item.discountPercentage}</span>
                    <p>تاريخ البداية : {item.startDate}</p>
                    <p>تاريخ الانتهاء :{item.endDate}</p>
                    <button onClick={() => openDeleteDiscount(item._id)}>
                      حذف
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default Discount;
