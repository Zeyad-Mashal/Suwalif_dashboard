import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import AdminLogin from "../../api/AdminLogin.api";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = () => {
    if (email == "" && password == "") {
      setError("يجب ملئ الخانات للدخول");
    } else {
      const data = {
        email,
        password,
      };
      AdminLogin(data, setError);
    }
  };
  return (
    <section className="login">
      <div className="login_container">
        <img src="/images/logo.png" />
        <div className="login_Auth">
          <input
            type="email"
            placeholder="الايميل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p>{error}</p>
        <button onClick={handleLogin}>تسجيل</button>
      </div>
    </section>
  );
};

export default Login;
