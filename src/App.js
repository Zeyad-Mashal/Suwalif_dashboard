import './App.css';
import Contact from './components/Contact/Contact';
import Copoun from './components/Copoun/Copoun';
import Discount from './components/Discount/Discount';
import Login from './components/Login/Login';
import Navbar from "./components/Navbar/Navbar"
import Order from './components/Order/Order';
import Product from './components/Product/Product';
import AddCategory from "./components/addCategory/AddCategory"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddProduct from './components/addProduct/AddProduct';
function App() {
  const isAuth = localStorage.getItem("USER_TOKEN")
  return (
    <div className="App">
      {isAuth ? <Navbar /> : null}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuth ? <Navigate to='/category' /> : <Login />} />
          <Route path="/category" element={isAuth ? <AddCategory /> : <Navigate to='/' />} />
          <Route path="/product/:CategoryID" element={isAuth ? <Product /> : <Navigate to='/' />} />
          <Route path="/discount" element={isAuth ? <Discount /> : <Navigate to='/' />} />
          <Route path="/contact" element={isAuth ? <Contact /> : <Navigate to='/' />} />
          <Route path="/copoun" element={isAuth ? <Copoun /> : <Navigate to='/' />} />
          <Route path="/order" element={isAuth ? <Order /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
