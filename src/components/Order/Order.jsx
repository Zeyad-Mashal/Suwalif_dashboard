import React, { useState, useEffect } from "react";
import "./Order.css";
import GetOrders from "../../api/order/GetOrders";
import GetOrderDetails from "../../api/order/GetOrderDetails";
import OrderSucess from "../../api/order/OrderSucess";
import DeleteOrder from "../../api/order/DeleteOrder";
const Order = () => {
  useEffect(() => {
    getAllOrders();
  }, []);

  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [statusType, setStatusType] = useState("New");

  const [orderDetails, setOrderDetails] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const getAllOrders = () => {
    GetOrders(setError, setAllOrders, setLoading, pageNumber, statusType);
  };

  const openDetails = (id) => {
    setOrderId(id);
    setShowDetails(true);
    GetOrderDetails(setError, setOrderDetails, setDetailsLoading, id);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setOrderDetails(null);
  };

  const orderCompleted = (orderId) => {
    OrderSucess(setError, setLoading, orderId, setShowDetails, getAllOrders);
  };
  const deleteOrder = (orderId) => {
    DeleteOrder(setError, setShowDetails, setLoading, orderId, getAllOrders);
  };
  return (
    <section className="order">
      <div className="order_contanier">
        <h2>الطلبات</h2>

        <div className="order_list">
          {loading
            ? "جاري تحميل الطلبات..."
            : allOrders.map((item) => (
                <div
                  key={item._id}
                  className="order_item"
                  onClick={() => openDetails(item._id)}
                >
                  <div className="item_header">
                    <h3>اسم العميل: {item.userName}</h3>
                    <span>رقم الهاتف: {item.userPhone}</span>
                  </div>
                  <span className="address"> :العنوان</span>
                  <h6>
                    {item.city}-{item.neighborhood}-{item.street}
                  </h6>
                </div>
              ))}
        </div>
      </div>

      {/* مودال التفاصيل */}
      {showDetails && (
        <div className="modal_overlay" onClick={closeDetails}>
          <div className="modal_content">
            {detailsLoading ? (
              <p className="loading_text">جاري تحميل تفاصيل الطلب...</p>
            ) : orderDetails ? (
              <>
                <h2 className="modal_title">تفاصيل الطلب</h2>

                <div className="modal_body">
                  <p>
                    <strong>رقم الطلب:</strong> {orderDetails.orderId}
                  </p>
                  <p>
                    <strong>الحالة:</strong> {orderDetails.orderStatus}
                  </p>
                  <p>
                    <strong>المدينة:</strong> {orderDetails.city}
                  </p>
                  <p>
                    <strong>العنوان:</strong>
                    {orderDetails.neighborhood}-{orderDetails.street}
                  </p>
                  <p>
                    <strong>طريقة الدفع:</strong> {orderDetails.paymentWay}
                  </p>
                  <p>
                    <strong>البريد:</strong> {orderDetails.user.email}
                  </p>
                </div>

                {/* 🛒 تفاصيل السلة */}
                <h3 className="cart_title">محتويات السلة</h3>
                <div className="cart_items">
                  {orderDetails.cartItems &&
                    orderDetails.cartItems.map((item, i) => (
                      <div key={i} className="cart_item">
                        <img src={item.image} alt={item.name.ar} />
                        <div className="cart_info">
                          <h4>{item.name.ar}</h4>
                          <p>السعر: {item.price} ريال</p>
                          <p className="quantity">الكمية: {item.quantity}</p>
                          <p>
                            <strong>الإجمالي: {item.totalPrice} ريال</strong>
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* 💰 الإجمالي */}
                <div className="cart_total">
                  <h3>الإجمالي الكلي: {orderDetails.totalAmount} ريال</h3>
                </div>

                <div className="modal_actions">
                  <button
                    className="btn_success"
                    onClick={() => orderCompleted(orderDetails.orderId)}
                  >
                    {loading ? "جاري تنفيذ الطلب" : "✅ تم التسليم"}
                  </button>
                  <button className="btn_cancel" onClick={closeDetails}>
                    ❌ إلغاء
                  </button>
                  <button
                    className="btn_cancel"
                    onClick={() => deleteOrder(orderDetails.orderId)}
                  >
                    {loading ? "جاري حذف الطلب" : "حذف الطلب"}
                  </button>
                </div>
              </>
            ) : (
              <p className="loading_text">لم يتم العثور على تفاصيل الطلب</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Order;
