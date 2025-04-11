import React, { useState, useEffect } from "react";
import "./AllCategories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import getAllCategoriesApi from "../../api/category/getAllCategoriesApi.api";
import { Link } from "react-router-dom";

const GetAllCategory = () => {
  const [error, setError] = useState("");
  const [AllCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllCategoriesAPI = () => {
    setLoading(true);
    getAllCategoriesApi(setError, setAllCategories, setLoading);
  };

  useEffect(() => {
    getAllCategoriesAPI();
  }, []);

  return (
    <div className="categories">
      <h3>جميع الاقسام</h3>
      <div className="categories_container">
        <div className="categories_list">
          {loading
            ? setLoading("Loading...")
            : AllCategories.map((item) => (
                <Link to="/prodcut" key={item._id}>
                  <div className="categories_item">
                    <h4>{item.name.ar}</h4>
                    <div className="categories_item_btns">
                      <button>تعديل</button>
                      <button>حذف</button>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default GetAllCategory;
