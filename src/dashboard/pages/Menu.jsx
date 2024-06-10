import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../dashboard.css";
import Loading from "../../Loading";
import { baseU } from "../../confing";
import { useSelector } from "react-redux";
const Menu = () => {
  const [menu, setMenu] = useState([[""]]);
  const [menuDeleted, setMenuDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.user?.user?.token);
  const baseUrl = baseU();
  const nav = useNavigate();
  //show menu in dashboard api request
  useEffect(() => {
    const res = axios
      .get(`${baseUrl}show/menu.php`)

      .then((res) => {
        setMenu([res.data]);
      })

      .catch((e) => {
        nav("/auth/signIn");
      });
  }, [menuDeleted]);
  //show menu
  const showmenu = menu[0].map((menuJson, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{menuJson.name}</td>
        <td>{menuJson.price}</td>
        <td>{menuJson.type}</td>
        <td className="flex justify-center items-center">
          <img
            className="w-[50px] h-[50px] mobile:w-[40px] mobile:h[40px]"
            src={menuJson.image}
            alt=""
          />{" "}
        </td>

        <td className="  flex   justify-evenly  ">
          <Link to={`update/${menuJson.id}`}>
            <i className="fa-solid fa-pen"></i>
          </Link>

          <i
            className="fa-solid fa-trash"
            onClick={() => remove(menuJson.id)}
          ></i>
        </td>
      </tr>
    );
  });
  async function remove(id) {
    setLoading(true);
    const formData = new FormData();
    formData.append("token", token);
    const res = await axios
      .post(`${baseUrl}delete/menu.php?id=${id}`, formData)
      .then(() => setLoading(false))
      .catch((e) => nav("/auth/signIn"));
    setMenuDeleted(!menuDeleted);
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>price</th>
              <th>type</th>
              <th>image</th>
              <th>u/d</th>
            </tr>
          </thead>
          <tbody>{showmenu}</tbody>
        </table>
      )}
    </>
  );
};

export default Menu;
