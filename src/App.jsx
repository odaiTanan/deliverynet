import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./AUTH/Sign-in";
import { SignUp } from "./AUTH/Sign-up";
import AuthBack from "./AUTH/AuthBack";
import "./all.min.css";
import Home from "./pages/Home";
import Loading from "./Loading";
import Dashboard from "./dashboard/Dashboard";
import Users from "./dashboard/pages/Users";
import AddUser from "./dashboard/pages/AddUser";
import Menu from "./dashboard/pages/Menu";
import AddMenu from "./dashboard/pages/AddMenu";
import Requests from "./dashboard/pages/Requests";
import UpdateUser from "./dashboard/pages/UpdateUser";
import UpdateMenu from "./dashboard/pages/UpdateMenu";
import Cart from "./pages/Cart";
import Refresh from "./Refresh";
import AddRequest from "./pages/AddRequest";
import RequiredAuth from "./RequiredAuth";
import MyRequests from "./pages/MyRequests";
function App() {
  return (
    <div className=" flex justify-center w-full p-0 m-0 box-border">
      <BrowserRouter>
        <Routes>
          {/*Public Routes*/}
          <Route path="/loading" element={<Loading />} />
          <Route path="/auth" element={<AuthBack />}>
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
          </Route>
          <Route element={<Refresh />}>
            <Route path="/" element={<Home />} />

            {/*Private Routes*/}
            <Route element={<RequiredAuth />}>
              <Route path="/myrequests" element={<MyRequests />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="users" element={<Users />} />
                <Route path="users/update/:id" element={<UpdateUser />} />
                <Route path="menu/update/:id" element={<UpdateMenu />} />
                <Route path="adduser" element={<AddUser />} />
                <Route path="menu" element={<Menu />} />
                <Route path="addmenu" element={<AddMenu />} />
                <Route path="requests" element={<Requests />} />
              </Route>
              <Route path="/cart" element={<Cart />} />
              <Route path="/addrequest" element={<AddRequest />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
