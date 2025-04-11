import React, { useState, useEffect } from "react";
import "./Contact.css";
import customerReview from "../../api/review/customerReview.api";
import showFeedBack from "../../api/review/showFeedBack.api";
import deleteFeedBack from "../../api/review/deleteFeedBack.api";
const Contact = () => {
  useEffect(() => {
    feedBack();
  }, []);
  const openDeleteContact = (feedbackId) => {
    setfeedbackId(feedbackId);
    document.querySelector(".contact_delete").style.display = "flex";
  };
  const closeDeleteContact = () => {
    document.querySelector(".contact_delete").style.display = "none";
  };
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleLoading, setvisibleLoading] = useState(false);
  const [deleteloading, setDeleteLoading] = useState(false);
  const [allFeedBacks, setAllFeedbacks] = useState([]);
  const [feedbackId, setfeedbackId] = useState("");

  const feedBack = () => {
    customerReview(setError, setAllFeedbacks, setLoading);
  };
  const visiblityCheck = (isVisible, feedbackId) => {
    if (isVisible) {
      const feedbackData = {
        isVisible: false,
      };
      showFeedBack(
        feedbackData,
        setError,
        setAllFeedbacks,
        setvisibleLoading,
        feedbackId
      );
    } else {
      const feedbackData = {
        isVisible: true,
      };
      showFeedBack(
        feedbackData,
        setError,
        setAllFeedbacks,
        setvisibleLoading,
        feedbackId
      );
    }
  };
  const deleteFeedBackApi = () => {
    deleteFeedBack(setError, setAllFeedbacks, setDeleteLoading, feedbackId);
  };
  return (
    <section className="contact">
      <div className="contact_container">
        <h2>أراء العملاء</h2>
        <div className="contact_list">
          <div className="contact_delete">
            <h3>هل تريد حذف هذا الرأي ؟</h3>
            <div className="delete_contact_btns">
              <button onClick={deleteFeedBackApi}>
                {deleteloading ? "Loading..." : "نعم"}
              </button>
              <button onClick={closeDeleteContact}>لا</button>
            </div>
          </div>
          {loading
            ? "Loading..."
            : allFeedBacks?.map((item) => {
                return (
                  <div className="contact_item">
                    <h3>{item.name}</h3>
                    <p>عدد النجوم : {item.rating}/5</p>
                    <textarea>{item.comment}</textarea>
                    <div className="contact_btns">
                      {!item.isVisible ? (
                        <button
                          className="show"
                          onClick={() =>
                            visiblityCheck(item.isVisible, item._id)
                          }
                        >
                          {visibleLoading ? "Loading..." : "إظهار"}
                        </button>
                      ) : (
                        <button
                          className="hide"
                          onClick={() =>
                            visiblityCheck(item.isVisible, item._id)
                          }
                        >
                          {visibleLoading ? "Loading..." : "إخفاء"}
                        </button>
                      )}
                      <button onClick={() => openDeleteContact(item._id)}>
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

export default Contact;
