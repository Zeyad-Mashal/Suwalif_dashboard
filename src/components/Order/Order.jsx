import React from "react";
import "./Order.css";
const Order = () => {
  const openDetails = () => {
    document.querySelector(".order_details").style.display = "flex";
  };
  const closeDetails = () => {
    document.querySelector(".order_details").style.display = "none";
  };
  return (
    <section className="order">
      <div className="order_contanier">
        <h2>الطلبات</h2>
        <div className="order_list">
          <div className="order_details">
            <h3>اسم العميل: زياد احمد نشعل</h3>
            <p>رقم العميل: 01205222331</p>
            <p>رقم الطلب: 123456</p>
            <p>تاريخ الطلب: 2022-01-01</p>
            <p>مكان الشحن: ش 15 سيدي بشر قبلي</p>
            <p>تفاصيل الطلب: 2 شاي احمر 3 شاي اسود 1 شاي اخضر</p>
            <p>المبلغ: 1000 جنيه</p>
            <div className="order_details_btns">
              <button>تم التسليم</button>
              <button onClick={closeDetails}>إلغاء</button>
            </div>
          </div>
          <div className="order_item" onClick={openDetails}>
            <div className="item_header">
              <h3>أسم العميل</h3>
              <span>01205222331</span>
            </div>
            <span>سموحة الاسكندرية</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              dolor doloremque provident quia perferendis inventore similique
              qui rerum animi cumque dicta voluptatem odit modi deserunt amet
              quaerat sapiente minima. Quam.
            </p>
          </div>
          <div className="order_item" onClick={openDetails}>
            <div className="item_header">
              <h3>أسم العميل</h3>
              <span>01205222331</span>
            </div>
            <span>سموحة الاسكندرية</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              dolor doloremque provident quia perferendis inventore similique
              qui rerum animi cumque dicta voluptatem odit modi deserunt amet
              quaerat sapiente minima. Quam.
            </p>
          </div>
          <div className="order_item" onClick={openDetails}>
            <div className="item_header">
              <h3>أسم العميل</h3>
              <span>01205222331</span>
            </div>
            <span>سموحة الاسكندرية</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              dolor doloremque provident quia perferendis inventore similique
              qui rerum animi cumque dicta voluptatem odit modi deserunt amet
              quaerat sapiente minima. Quam.
            </p>
          </div>
          <div className="order_item" onClick={openDetails}>
            <div className="item_header">
              <h3>أسم العميل</h3>
              <span>01205222331</span>
            </div>
            <span>سموحة الاسكندرية</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              dolor doloremque provident quia perferendis inventore similique
              qui rerum animi cumque dicta voluptatem odit modi deserunt amet
              quaerat sapiente minima. Quam.
            </p>
          </div>
          <div className="order_item" onClick={openDetails}>
            <div className="item_header">
              <h3>أسم العميل</h3>
              <span>01205222331</span>
            </div>
            <span>سموحة الاسكندرية</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              dolor doloremque provident quia perferendis inventore similique
              qui rerum animi cumque dicta voluptatem odit modi deserunt amet
              quaerat sapiente minima. Quam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
