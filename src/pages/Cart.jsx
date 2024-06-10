import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addToCart,
  minusInCart,
  removeFromCart,
} from "../rtk/slices/cart-slice";
import "../dashboard/dashboard.css";
import { Link, Outlet } from "react-router-dom";
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  //get total price
  const total = cart.reduce((acc, item) => {
    acc += item.price * item.quantity;
    return acc;
  }, 0);

  const dispatch = useDispatch();
  //show cart items variable
  const showCart = cart.map((cartItem, index) => {
    return (
      <tr key={index}>
        <td>{cartItem.name}</td>
        <td className="flex justify-center items-center">
          <img
            className="w-[50px] h-[50px] mobile:w-[40px] mobile:h[40px]"
            src={cartItem.image}
            alt=""
          />{" "}
        </td>
        <td>{cartItem.quantity}</td>
        <td>{cartItem.price * cartItem.quantity}$</td>

        <td className="  flex   justify-evenly  ">
          <i
            onClick={() => dispatch(addToCart(cartItem))}
            className="fa fa-plus "
          ></i>
          <i
            onClick={() => dispatch(minusInCart(cartItem))}
            className="fa fa-minus"
          ></i>
        </td>
        <td>
          <i
            onClick={() => dispatch(removeFromCart(cartItem.id))}
            className="fa fa-trash"
          ></i>
        </td>
      </tr>
    );
  });
  return (
    <div className="w-full flex flex-col justify-start items-center">
      {" "}
      <div className="flex justify-between items-center w-3/6 mobile:w-[90%] tab:w-[80%] mt-[50px]">
        <span className=" text-[20px] mobile:text-[15px] font-bold">
          total: <span className="text-orange-600">{total}$</span>{" "}
        </span>
        <Link to="/addrequest">
          <div className="btn !w-[200px] tab:!p-1   tab:!w-[150px] tab:!text-[15px] cursor-pointer !p-[2] !text-[18px]">
            Add Request
          </div>
        </Link>
      </div>
      <table className="mt-[50px]">
        <thead>
          <tr>
            <th>name</th>
            <th>image</th>
            <th>quantity</th>
            <th>Tprice</th>
            <th>+/- </th>
            <th>Delete </th>
          </tr>
        </thead>
        <tbody>{showCart}</tbody>
      </table>
      <Outlet />
    </div>
  );
};

export default Cart;
