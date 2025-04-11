import React, { useState, useEffect } from "react";
import "./Copoun.css";
import addCopounApi from "../../api/Copoun/addCopoun.api";
import getCopounApi from "../../api/Copoun/getCopounApi";
import deleteCopounApi from "../../api/Copoun/deleteCopounApi";
import updateCopounApi from "../../api/Copoun/updateCopounApi";
const Copoun = () => {
  useEffect(() => {
    getAllCopouns();
  }, []);
  const [allCopouns, setAllCopouns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copounName, setCopounName] = useState("");
  const [copounpercentage, setCopounPercentage] = useState("");
  const [copounStart, setCopounStart] = useState("");
  const [copounEnd, setCopounEnd] = useState("");
  const [CopounID, setCopounID] = useState("");
  const addCopoun = () => {
    setCopounName("");
    setCopounPercentage("");
    setCopounStart("");
    setCopounEnd("");
    document.querySelector(".add_copoun").style.display = "flex";
  };
  const closeAddCopoun = () => {
    document.querySelector(".add_copoun").style.display = "none";
  };
  const deleteCopoun = (CopounID) => {
    setCopounID(CopounID);
    document.querySelector(".delete_copoun").style.display = "flex";
  };
  const closeDeleteCopoun = () => {
    document.querySelector(".delete_copoun").style.display = "none";
  };
  const updateCopoun = (
    copounName,
    copounpercentage,
    copounStart,
    copounEnd,
    CopounID
  ) => {
    setCopounName(copounName);
    setCopounPercentage(copounpercentage);
    setCopounStart(copounStart);
    setCopounEnd(copounEnd);
    setCopounID(CopounID);
    document.querySelector(".update_copoun").style.display = "flex";
  };
  const closeUpdateCopoun = () => {
    document.querySelector(".update_copoun").style.display = "none";
  };
  const addCopounAPI = () => {
    const copounData = {
      code: copounName,
      discountPercentage: copounpercentage,
      startDate: copounStart,
      endDate: copounEnd,
    };
    addCopounApi(copounData, setError, setAllCopouns, setLoading);
  };
  const getAllCopouns = () => {
    getCopounApi(setError, setAllCopouns, setLoading);
  };
  const deleteCopounAPI = () => {
    deleteCopounApi(setError, setAllCopouns, setLoading, CopounID);
  };
  const updateCopoupAPI = () => {
    const copounData = {
      code: copounName,
      discountPercentage: copounpercentage,
      startDate: copounStart,
      endDate: copounEnd,
    };
    updateCopounApi(copounData, setError, setAllCopouns, setLoading, CopounID);
  };
  return (
    <section className="copoun">
      <div className="copoun_container">
        <button onClick={addCopoun}>إضافة كوبون خصم</button>
        <div className="add_copoun">
          <h3>إضافة خصم</h3>
          <div className="add_copoun_inputs">
            <input
              type="text"
              placeholder="أدخل كود الكوبون"
              value={copounName}
              onChange={(e) => setCopounName(e.target.value)}
            />
            <input
              type="text"
              placeholder="أدخل نسبة الخصم"
              value={copounpercentage}
              onChange={(e) => setCopounPercentage(e.target.value)}
            />
          </div>
          <div className="add_copoun_date">
            <input
              type="date"
              placeholder="بداية الخصم"
              value={copounStart}
              onChange={(e) => setCopounStart(e.target.value)}
            />
            <input
              type="date"
              placeholder="نهاية الخصم"
              value={copounEnd}
              onChange={(e) => setCopounEnd(e.target.value)}
            />
          </div>
          <div className="add_copoun_btns">
            {error}
            <button onClick={addCopounAPI}>
              {loading ? "Loading..." : "إضافة الخصم"}
            </button>
            <button onClick={closeAddCopoun}>إلغاء</button>
          </div>
        </div>
        <div className="delete_copoun">
          <h3>هل تريد حذف هذا الكوبون ؟</h3>
          <div className="delete_copoun_btns">
            <button onClick={deleteCopounAPI}>
              {loading ? "Loading..." : "نعم"}
            </button>
            <button onClick={closeDeleteCopoun}>لا</button>
          </div>
        </div>
        <div className="add_copoun update_copoun">
          <h3>تعديل خصم</h3>
          <div className="add_copoun_inputs">
            <input
              type="text"
              placeholder="أدخل كود الكوبون"
              value={copounName}
              onChange={(e) => setCopounName(e.target.value)}
            />
            <input
              type="text"
              placeholder="أدخل نسبة الخصم"
              value={copounpercentage}
              onChange={(e) => setCopounPercentage(e.target.value)}
            />
          </div>
          <div className="add_copoun_date">
            <input
              type="date"
              placeholder="بداية الخصم"
              value={copounStart}
              onChange={(e) => setCopounStart(e.target.value)}
            />
            <input
              type="date"
              placeholder="نهاية الخصم"
              value={copounEnd}
              onChange={(e) => setCopounEnd(e.target.value)}
            />
          </div>
          <div className="add_copoun_btns">
            {error}
            <button onClick={() => updateCopoupAPI()}>
              {loading ? "Loading..." : "تعديل الخصم"}
            </button>
            <button onClick={closeUpdateCopoun}>إلغاء</button>
          </div>
        </div>
        <div className="copoun_list">
          {loading
            ? "Loading..."
            : allCopouns.map((item) => {
                return (
                  <div className="copoun_item">
                    <h3>{item.code}</h3>
                    <span>{item.discountPercentage}% : نسبة الخصم</span>
                    <p>{item.startDate} : بداية الخصم</p>
                    <p>{item.endDate} : نهاية الخصم</p>
                    <button onClick={() => deleteCopoun(item._id)}>
                      حذف الخصم
                    </button>
                    <button
                      onClick={() =>
                        updateCopoun(
                          item.code,
                          item.percentage,
                          item.startDate,
                          item.endDate,
                          item._id
                        )
                      }
                    >
                      تعديل الخصم
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default Copoun;
