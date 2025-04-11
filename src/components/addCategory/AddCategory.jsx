import React, { useState, useEffect } from "react";
import "./AddCategory.css";
import "../AllCategory/AllCategories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import addCategoryApi from "../../api/category/addCategoryApi.api";
import getAllCategoriesApi from "../../api/category/getAllCategoriesApi.api";
import { Link } from "react-router-dom";
import updateCategoryApi from "../../api/category/updateCategoryApi.api";
import deleteCategoryApi from "../../api/category/deleteCategoryApi.api";
import { useNavigate } from "react-router-dom";
const AddCategory = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategoriesAPI();
  }, []);
  const openAddCategory = () => {
    document.querySelector(".addCategory_content").style.display = "flex";
  };
  const closeAddCategory = () => {
    document.querySelector(".addCategory_content").style.display = "none";
  };
  const [error, setError] = useState("");
  const [AllCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryAr, setCategoryAr] = useState("");
  const [categoryEn, setCategoryEn] = useState("");
  const [CategoryID, setCategoryID] = useState("");
  const getAllCategoriesAPI = () => {
    getAllCategoriesApi(setError, setAllCategories, setLoading);
  };
  const AddCaregoryApi = () => {
    if (categoryAr == "" && categoryEn == "") {
      setError("يجب ملئ جميع الخانات ");
    } else {
      const data = {
        nameAr: categoryAr,
        nameEn: categoryEn,
      };
      addCategoryApi(data, setError, setAllCategories, setLoading);
    }
  };
  const openDeleteCategory = (id) => {
    setCategoryID(id);
    document.querySelector(".delete_category").style.display = "flex";
  };
  const closeDeleteCategory = () => {
    document.querySelector(".delete_category").style.display = "none";
  };
  const openUpdateCatregory = (id, categoryAr, categoryEn) => {
    setCategoryID(id);
    setCategoryAr(categoryAr);
    setCategoryEn(categoryEn);
    document.querySelector(".update_category").style.display = "flex";
  };
  const closeUpdateCatregory = () => {
    document.querySelector(".update_category").style.display = "none";
  };
  const updateCategoryAPI = () => {
    if (categoryAr == "" && categoryEn == "") {
      setError("يجب ملئ الخانات اولا");
    } else {
      const data = {
        nameAr: categoryAr,
        nameEn: categoryEn,
      };
      updateCategoryApi(
        data,
        setError,
        setAllCategories,
        setLoading,
        CategoryID
      );
    }
  };
  const deleteCategoryAPI = () => {
    deleteCategoryApi(setError, setAllCategories, setLoading, CategoryID);
  };
  const handleCategoryClick = (id) => {
    setCategoryID(id);
    navigate(`/${id}/prodcut`);
  };
  return (
    <div className="addCategory">
      <div className="addCategory_container">
        <button onClick={openAddCategory}>إضافة فئة جديدة</button>
        <div className="addCategory_content">
          <h3>إضافة فئة جديدة</h3>
          <FontAwesomeIcon icon={faX} onClick={closeAddCategory} />
          <div className="addCategory_content_inputs">
            <input
              type="text"
              placeholder="اسم الفئة"
              value={categoryAr}
              onChange={(e) => setCategoryAr(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category Name"
              value={categoryEn}
              onChange={(e) => setCategoryEn(e.target.value)}
            />
          </div>
          <p>{error}</p>
          <button onClick={AddCaregoryApi}>
            {loading ? "loading..." : "إضافة الفئة"}
          </button>
        </div>
      </div>
      <div className="categories">
        <h3>جميع الاقسام</h3>
        <div className="categories_container">
          <div className="categories_list">
            {loading ? (
              <p className="loading">Loading...</p>
            ) : (
              AllCategories.map((item) => {
                return (
                  <div className="categories_item" key={item._id}>
                    <Link to={`/product/${item._id}`}>
                      <h4 key={item._id}>{item.name.ar}</h4>
                    </Link>
                    <div className="categories_item_btns">
                      <button
                        onClick={() =>
                          openUpdateCatregory(
                            item._id,
                            item.name.ar,
                            item.name.en
                          )
                        }
                      >
                        تعديل
                      </button>
                      <button onClick={() => openDeleteCategory(item._id)}>
                        حذف
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="delete_category">
        <h3>هل تريد حذف فئة؟</h3>
        <div className="delete_content">
          <button onClick={deleteCategoryAPI}>
            {loading ? "Loading..." : "نعم"}
          </button>
          <button onClick={closeDeleteCategory}>لا</button>
        </div>
      </div>
      <div className="update_category">
        <h3>تعديل فئة</h3>
        <div className="update_content">
          <input
            type="text"
            value={categoryAr}
            onChange={(e) => setCategoryAr(e.target.value)}
            placeholder="اسم الفئة"
          />
          <input
            type="text"
            value={categoryEn}
            onChange={(e) => setCategoryEn(e.target.value)}
            placeholder="category name"
          />
        </div>
        <div className="update_btns">
          <button onClick={updateCategoryAPI}>
            {loading ? "Loading..." : "تعديل الفئة"}
          </button>
          <button onClick={closeUpdateCatregory}>إلغاء</button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
