import "./Product.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../addProduct/Addproduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faX } from "@fortawesome/free-solid-svg-icons";
import addProduct from "../../api/product/addProduct.api";
import getByCategory from "../../api/product/getByCategory.api";
import deleteProduct from "../../api/product/deleteProduct.api";
import updateProduct from "../../api/product/updateProduct.api";
const Product = () => {
  const { CategoryID } = useParams();
  useEffect(() => {
    getProductsByCategory();
  }, []);
  const [prevImages, setPrevImage] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [picesAr, setPicesAr] = useState("");
  const [picesEn, setPicesEn] = useState("");
  const [price, setPrice] = useState("");
  const [powerNum, setPowerNum] = useState("");
  const [arPower, setArPower] = useState("");
  const [enPower, setEnPower] = useState("");
  const [section, setSection] = useState("");
  const [ardescription, setArDescription] = useState("");
  const [endescription, setEnDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [productID, setproductID] = useState("");
  const [category_id, setCategory_id] = useState("");
  const openDeleteProduct = (productID) => {
    setproductID(productID);
    document.querySelector(".delete_product").style.display = "flex";
  };
  const closeDeleteProduct = () => {
    document.querySelector(".delete_product").style.display = "none";
  };
  const openUpdateProduct = (
    productID,
    prevImage,
    arName,
    enName,
    picesAr,
    picesEn,
    price,
    powerNum,
    arPower,
    enPower,
    section,
    ardescription,
    endescription,
    category_id
  ) => {
    setproductID(productID);
    setPrevImage(prevImage);
    setArName(arName);
    setEnName(enName);
    setPicesAr(picesAr);
    setPicesEn(picesEn);
    setPrice(price);
    setPowerNum(powerNum);
    setArPower(arPower);
    setEnPower(enPower);
    setSection(section);
    setArDescription(ardescription);
    setEnDescription(endescription);
    setCategory_id(category_id);
    document.querySelector(".updateProduct_content").style.display = "flex";
  };
  const closeUpdateProduct = () => {
    document.querySelector(".updateProduct_content").style.display = "none";
  };

  const selectImage = (e) => {
    const allImages = e.target.files;
    const imagesArr = Array.from(allImages);
    const prevImage = [];
    const allFiles = [];
    for (let i = 0; i < imagesArr.length; i++) {
      prevImage.push(URL.createObjectURL(imagesArr[i]));
      allFiles.push(imagesArr[i]);
    }
    setPrevImage(prevImage);
    setAllFiles(allFiles);
  };

  const openAddProduct = () => {
    setArName("");
    setEnName("");
    setPicesAr("");
    setPicesEn("");
    setPrice("");
    setPowerNum("");
    setArPower("");
    setEnPower("");
    setSection("");
    setArDescription("");
    setEnDescription("");
    setError("");
    setLoading(false);
    setPrevImage([]);
    setImageURLs([]);
    setAllFiles([]);

    document.querySelector(".addProduct_content").style.display = "flex";
  };

  const closeAddProduct = () => {
    document.querySelector(".addProduct_content").style.display = "none";
  };

  const FlavorStrengthsAr = [
    "قوي ومكثف النكهة",
    "قوي النكهة",
    "متوسط النكهة",
    "خفيفة النكهة",
    "خفيفة النكهة جداً",
  ];

  const FlavorStrengthsEn = [
    "Strong and intense flavour",
    "Strong flavour",
    "Average flavour",
    "Mild flavour",
    "Very mild flavour",
  ];
  const sections = ["topSale", "offers", "topRated"];

  const addProductApi = () => {
    if (allFiles.length === 0) {
      setError("قم برفع صور المنتج اولا");
    } else {
      if (
        arName === "" ||
        enName === "" ||
        picesAr === "" ||
        picesEn === "" ||
        price === "" ||
        powerNum === "" ||
        arPower === "" ||
        enPower === "" ||
        ardescription === "" ||
        endescription === ""
      ) {
        setError("قم بملئ جميع البيانات");
      } else {
        let productData = new FormData();
        for (let i = 0; i < allFiles.length; i++) {
          productData.append("image", allFiles[i]);
        }
        productData.append("arName", arName);
        productData.append("enName", enName);
        productData.append("enDescription", endescription);
        productData.append("arDescription", ardescription);
        productData.append("price", price);
        productData.append("arPackaging", picesAr);
        productData.append("enPackaging", picesEn);
        productData.append("flavorIntensity", powerNum);
        productData.append("arFlavorDescription", arPower);
        productData.append("enFlavorDescription", enPower);
        productData.append("category", CategoryID);
        if (section != "" || section != "أختر القسم")
          productData.append("section", section);
        addProduct(productData, setError, setLoading, setAllProducts);
      }
    }
  };
  const getProductsByCategory = () => {
    getByCategory(setError, setAllProducts, setLoading, CategoryID);
  };
  const deleteProductByCategory = () => {
    deleteProduct(setError, setAllProducts, setLoading, productID);
  };
  const updateProductByCategory = () => {
    if (allFiles.length === 0) {
      setError("قم برفع صور المنتج اولا");
    } else {
      if (
        arName === "" ||
        enName === "" ||
        picesAr === "" ||
        picesEn === "" ||
        price === "" ||
        ardescription === "" ||
        endescription === ""
      ) {
        setError("قم بملئ جميع البيانات");
      } else {
        console.log(
          arName,
          enName,
          endescription,
          ardescription,
          picesAr,
          picesEn,
          price,
          powerNum,
          arPower,
          enPower,
          section,
          CategoryID
        );
        let productData = new FormData();
        for (let i = 0; i < allFiles.length; i++) {
          productData.append("image", allFiles[i]);
        }
        productData.append("arName", arName);
        productData.append("enName", enName);
        productData.append("enDescription", endescription);
        productData.append("arDescription", ardescription);
        productData.append("arPackaging", picesAr);
        productData.append("enPackaging", picesEn);
        productData.append("price", price);
        productData.append("flavorIntensity", powerNum);
        productData.append("arFlavorDescription", arPower);
        productData.append("enFlavorDescription", enPower);
        productData.append("category", CategoryID);
        if (section != "" || section != "أختر القسم")
          productData.append("section", section);
        updateProduct(
          productData,
          setError,
          setAllProducts,
          setLoading,
          productID
        );
      }
    }
  };
  return (
    <section className="product">
      <section className="addProduct">
        <button onClick={openAddProduct}>اضافة منتج جديد</button>
        <div className="addProduct_container">
          <div className="addProduct_content ">
            <FontAwesomeIcon icon={faX} onClick={closeAddProduct} />
            <div className="add_images">
              {prevImages.length > 0 ? (
                prevImages.map((image, index) => (
                  <img src={image} key={index} alt={`Preview ${index}`} />
                ))
              ) : (
                <label>
                  <div className="add_container">
                    <FontAwesomeIcon icon={faCamera} />
                    <p>اختر صور جديدة</p>
                  </div>
                  <input
                    className="select-input"
                    type="file"
                    name="images"
                    accept=".png, .jpg, .jpeg, .webp"
                    multiple
                    onChange={selectImage}
                  />
                </label>
              )}
            </div>
            <div className="add_product_inputs">
              <input
                type="text"
                placeholder="اسم المنتج"
                value={arName}
                onChange={(e) => setArName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Product Name"
                value={enName}
                onChange={(e) => setEnName(e.target.value)}
              />
            </div>
            <div className="add_product_price">
              <input
                type="text"
                placeholder="عدد القطع"
                value={picesAr}
                onChange={(e) => setPicesAr(e.target.value)}
              />
              <input
                type="text"
                placeholder="عدد القطع"
                value={picesEn}
                onChange={(e) => setPicesEn(e.target.value)}
              />
              <input
                type="text"
                placeholder="سعر المنتج"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="قوة المنتج من 1 الي 5"
                value={powerNum}
                onChange={(e) => setPowerNum(e.target.value)}
              />
            </div>
            <div className="add_product_select">
              <select
                value={arPower}
                onChange={(e) => setArPower(e.target.value)}
              >
                <option value="قوة المنتج">قوة المنتج</option>
                {FlavorStrengthsAr.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                value={enPower}
                onChange={(e) => setEnPower(e.target.value)}
              >
                <option value="Product Power">Product Power</option>
                {FlavorStrengthsEn.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                <option value="أختر القسم">أختر القسم</option>
                {sections.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="add_product_desc">
              <textarea
                placeholder="وصف المنتج"
                value={ardescription}
                onChange={(e) => setArDescription(e.target.value)}
              ></textarea>
              <textarea
                placeholder="product Description"
                value={endescription}
                onChange={(e) => setEnDescription(e.target.value)}
              ></textarea>
            </div>
            <p>{error}</p>
            <button className="add_btn" onClick={addProductApi}>
              {loading ? "Loading..." : "إضافة المنتج"}
            </button>
          </div>
        </div>
      </section>
      <div className="product_container">
        <h2>منتاجات الفئة</h2>
        <div className="addProduct_container">
          <div className="addProduct_content updateProduct_content">
            <FontAwesomeIcon icon={faX} onClick={closeUpdateProduct} />
            <div className="add_images">
              {prevImages.map((image, index) => (
                <img src={image} key={index} alt={`Preview ${index}`} />
              ))}
              <input
                className="select-input"
                type="file"
                name="images"
                accept=".png, .jpg, .jpeg, .webp"
                multiple
                onChange={selectImage}
              />
            </div>
            <div className="add_product_inputs">
              <input
                type="text"
                placeholder="اسم المنتج"
                value={arName}
                onChange={(e) => setArName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Product Name"
                value={enName}
                onChange={(e) => setEnName(e.target.value)}
              />
            </div>
            <div className="add_product_price">
              <input
                type="text"
                placeholder="عدد القطع"
                value={picesAr}
                onChange={(e) => setPicesAr(e.target.value)}
              />
              <input
                type="text"
                placeholder="Pices"
                value={picesEn}
                onChange={(e) => setPicesEn(e.target.value)}
              />
              <input
                type="text"
                placeholder="سعر المنتج"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="قوة المنتج من 1 الي 5"
                value={powerNum}
                onChange={(e) => setPowerNum(e.target.value)}
              />
            </div>
            <div className="add_product_select">
              <select
                value={arPower}
                onChange={(e) => setArPower(e.target.value)}
              >
                <option value="قوة المنتج">قوة المنتج</option>
                {FlavorStrengthsAr.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                value={enPower}
                onChange={(e) => setEnPower(e.target.value)}
              >
                <option value="Product Power">Product Power</option>
                {FlavorStrengthsEn.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                <option value="أختر القسم">أختر القسم</option>
                {sections.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="add_product_desc">
              <textarea
                placeholder="وصف المنتج"
                value={ardescription}
                onChange={(e) => setArDescription(e.target.value)}
              ></textarea>
              <textarea
                placeholder="product Description"
                value={endescription}
                onChange={(e) => setEnDescription(e.target.value)}
              ></textarea>
            </div>
            <p>{error}</p>
            <button className="add_btn" onClick={updateProductByCategory}>
              {loading ? "Loading..." : "تعديل المنتج"}
            </button>
          </div>
        </div>
        <div className="product_list">
          <div className="delete_product">
            <h3>هل تريد حذف المنتج ؟</h3>
            <div className="delete_product_btns">
              <p>{error}</p>
              <button onClick={deleteProductByCategory}>
                {loading ? "Loading..." : "نعم"}
              </button>
              <button onClick={closeDeleteProduct}>لا</button>
            </div>
          </div>
          {loading
            ? "Loading..."
            : allProducts.map((item) => {
                return (
                  <div className="porduct_item">
                    <img src={item.images[0]} />
                    <div className="product_content">
                      <h3>{item.name.ar}</h3>
                      <span>{item.price} ريال</span>
                    </div>
                    <div className="product_btns">
                      <button
                        onClick={() =>
                          openUpdateProduct(
                            item._id,
                            item.images,
                            item.name.ar,
                            item.name.en,
                            item?.packaging?.ar,
                            item?.packaging?.en,
                            item.price,
                            item.flavorIntensity,
                            item.flavorDescription.ar,
                            item.flavorDescription.en,
                            item.section,
                            item.description.ar,
                            item.description.en,
                            item.category._id
                          )
                        }
                      >
                        تعديل
                      </button>
                      <button onClick={() => openDeleteProduct(item._id)}>
                        حذف
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default Product;
