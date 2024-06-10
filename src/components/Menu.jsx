import React, { useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { fetchedProducts } from "../rtk/slices/products-slice";
import { addToCart, minusInCart } from "../rtk/slices/cart-slice";
import { baseU } from "../confing";
import { useNavigate } from "react-router";
const Menu = () => {
  const nav = useNavigate();
  const [activeMenu, setActiveMenu] = useState("");
  const [items, setItems] = useState([
    [{ id: "", name: "", type: "", price: "" }],
  ]);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  //get quantity for an item in cart
  function getQuantity(id) {
    const item = cart.find((item) => {
      return item.id == id;
    });
    if (item) {
      return item.quantity;
    }
  }
  //a function for activating an nav bar and give it a style
  function setActiveMenuFunc(e) {
    if (activeMenu === e.target.name) {
      setActiveMenu("");
    } else {
      setActiveMenu(e.target.name);
    }
  }
  // base url
  const baseUrl = baseU();
  //get product from api by rtk
  useEffect(() => {
    dispatch(fetchedProducts(baseUrl));
  }, []);
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user.user);
  //filter items depinded on user request
  useEffect(() => {
    if (activeMenu === "") {
      setItems([products]);
    } else {
      const filteredItems = products.filter((item) => {
        return item.type == activeMenu;
      });
      setItems([filteredItems]);
    }
  }, [products, activeMenu]);
  //get types from assesst file and show it
  const menu = menu_list.map((m, index) => {
    return (
      <li key={index}>
        <img
          src={m.menu_image}
          name={m.menu_name}
          onClick={setActiveMenuFunc}
          className={m.menu_name == activeMenu ? "activeMenu" : ""}
          alt=""
        />
        <h3 className="mt-2">{m.menu_name}</h3>
      </li>
    );
  });
  //show items (not type)
  const showItems = items[0].map((item, index) => {
    return (
      <div
        id="menu"
        key={index}
        className="flex flex-col justify-center shadow-form border-black rounded-xl w-[220px] mobile:w-[275px]"
      >
        <div className="relative">
          <img className="w-full rounded-t-xl" src={item.image} alt="" />
          <div className="flex cursor-pointer rounded-circle justify-center items-center  w-7 h-7 absolute right-6 bottom-2   text-orange-600">
            <i
              onClick={() => dispatch(minusInCart(item))}
              className="hidden fa fa-minus hover:bg-slate-400"
            ></i>
            <span className="hidden mx-3 bg-white px-2 rounded-circle justify-center items-center text-center">
              {getQuantity(item.id)}
            </span>

            <i
              onClick={(e) => {
                user?.token ? dispatch(addToCart(item)) : nav("/auth/signin");

                e.target.parentElement.style.right = "50px";
                e.target.previousSibling.style.display = "flex";
                e.target.previousSibling.previousSibling.style.display = "flex";
              }}
              className="fa fa-plus hover:bg-slate-400"
            ></i>
          </div>
        </div>
        <h1 className="my-4 ml-2 font-bold">{item.name}</h1>
        <p className="ml-2 text-gray-500 mb-2">{item.type}</p>
        <p className="ml-2 text-orange-600">{item.price}$</p>
      </div>
    );
  });
  return (
    <div className="mt-14 ">
      <h1 className="mb-5 font-bold text-2xl">Type </h1>
      <p>Choose Food Type From This List</p>
      <ul className="flex gap-14 flex-wrap tab:gap-5 justify-center my-7 ">
        {menu}
      </ul>
      <div className="my-11">
        <h1 className="my-1 font-bold text-2xl">Meals </h1>
        <p className="my-7">Choose Meal From This List</p>
      </div>
      <div className="w-full flex flex-wrap gap-11 pb-3 justify-center ">
        {showItems}
      </div>
    </div>
  );
};

export default Menu;
