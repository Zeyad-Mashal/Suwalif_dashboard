import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Addproduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faX } from "@fortawesome/free-solid-svg-icons";
import addProduct from "../../api/product/addProduct.api";
const AddProduct = () => {
  const { CategoryID } = useParams();

  const [prevImages, setPrevImage] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [pices, setPices] = useState("");
  const [price, setPrice] = useState("");
  const [powerNum, setPowerNum] = useState("");
  const [arPower, setArPower] = useState("");
  const [enPower, setEnPower] = useState("");
  const [section, setSection] = useState("");
  const [ardescription, setArDescription] = useState("");
  const [endescription, setEnDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    setPices("");
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

  const flavorStrengthsar = [
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

  const addProductApi = () => {
    if (allFiles.length === 0) {
      setError("قم برفع صور المنتج اولا");
    } else {
      if (
        arName === "" ||
        enName === "" ||
        pices === "" ||
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
        productData.append("stock", pices);
        productData.append("flavorIntensity", powerNum);
        productData.append("arFlavorDescription", arPower);
        productData.append("enFlavorDescription", enPower);
        productData.append("category", CategoryID);
        addProduct(productData, setError, setLoading, setAllProducts);
      }
    }
  };

  return (
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
              value={pices}
              onChange={(e) => setPices(e.target.value)}
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
              {flavorStrengthsar.map((item) => (
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
  );
};

export default AddProduct;
