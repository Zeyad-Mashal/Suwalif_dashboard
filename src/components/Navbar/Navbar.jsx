import React from "react";
import { Outlet, Link } from "react-router-dom";
const Navbar = () => {
  const logOut = () => {
    localStorage.removeItem("USER_TOKEN");
    window.location.reload();
  };
  const person = [
    {
      id: 1,
      name: "Zeyad",
      age: 22,
    },
    {
      id: 2,
      name: "Ahmed",
      age: 22,
    },
    {
      id: 3,
      name: "Mashaal",
      age: 22,
    },
  ];
  person[2].salary = "10000";
  // person.id2.name = "omar";
  console.log(person);

  return (
    <>
      <nav class="navbar navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src="/images/logo.png" width={84} />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="offcanvas offcanvas-end text-bg-dark"
            tabindex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Suwalif
              </h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link" href="/order">
                    الطلبات
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/category">
                    الاقسام و المنتاجات
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/discount">
                    إضافة خصومات
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/contact">
                    أراء العملاء
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/copoun">
                    الكوبونات
                  </a>
                </li>
              </ul>
              <button onClick={logOut} className="mt-5">
                تسجيل خروج
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
