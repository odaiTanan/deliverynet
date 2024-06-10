import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../dashboard.css";
import Loading from "../../Loading";
import { useSelector } from "react-redux";
import { baseU } from "../../confing";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const nav = useNavigate();
  const [users, setUsers] = useState([[""]]);
  const [userDeleted, setUserDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.user?.user?.token);
  const baseUrl = baseU();
  useEffect(() => {
    const formData = new FormData();
    formData.append("token", token);
    //show users in dashboard api request
    axios
      .post(`${baseUrl}show/users.php`, formData)

      .then((res) => {
        console.log(res);
        setUsers([res.data]);
      })

      .catch((e) => {
        nav("/auth/signIn");
      });
  }, [userDeleted, token]);
  //remove user
  async function remove(id) {
    setLoading(true);
    const deletToken = new FormData();
    deletToken.append("token", token);
    const res = await axios
      .post(`${baseUrl}delete/user.php?id=${id}`, deletToken)
      .then(() => setLoading(false))
      .catch((e) => nav("/auth/signIn"));
    setUserDeleted(!userDeleted);
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
              <th>email</th>
              <th>rule</th>
              <th>u/d</th>
            </tr>
          </thead>
          <tbody>
            {token &&
              users[0].map((userJson, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{userJson.name}</td>
                    <td>{userJson.email}</td>
                    <td>
                      {userJson.rule == 97
                        ? "user"
                        : userJson.rule == 98
                        ? "status man"
                        : userJson.rule == 99
                        ? "admin"
                        : ""}
                    </td>
                    <td className="  flex   justify-evenly  ">
                      <Link to={`update/${userJson.id}`}>
                        <i className="fa-solid fa-pen"></i>
                      </Link>

                      <i
                        className="fa-solid fa-trash"
                        onClick={() => remove(userJson.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
