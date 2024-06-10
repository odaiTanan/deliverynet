import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
export default function AddRequest() {
  const nav = useNavigate();
  const cart = useSelector((state) => state.cart);
  const baseUrl = useSelector((state) => state.baseUrl);
  const token = useSelector((state) => state.user.user.token);
  const [loading, setLoading] = useState(false);
  const lengthError = () =>
    toast.error("country and street name must be more than toe letters");
  const phoneError = () =>
    toast.error("phone must be 10 numbers and not contain letters");
  const buildingError = () =>
    toast.error("building number must be number and more than 0 char");
  let inputs = useRef({
    country: "",
    street: "",
    buildingId: "",
    phone: "",
    items: cart,
  });
  //get value of total items in cart
  const total = cart.reduce((acc, item) => {
    acc += item.price * item.quantity;
    return acc;
  }, 0);

  function handleInputs(e) {
    inputs.current = { ...inputs.current, [e.target.name]: e.target.value };
    e.target.setAttribute("value", e.target.value);
  }

  async function submit() {
    //handling data format befor post it
    const address =
      inputs.current.country +
      "," +
      inputs.current.street +
      "," +
      " building " +
      inputs.current.buildingId;
    const phone = inputs.current.phone;
    const items = cart.reduce((acc, item) => {
      acc += item.name + " " + item.quantity;
      return acc + ",";
    }, "");
    const inp = inputs.current;
    if (inp.country.length < 3 || inp.street.length < 3) {
      lengthError();
    } else if (!phone.match(/^\d{10}/i)) {
      phoneError();
    } else if (!inp.buildingId.match(/^\d+/i)) {
      buildingError();
    } else {
      let formData = new FormData();
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("items", items);
      formData.append("price", total);
      formData.append("token", token);
      setLoading(true);
      //add request
      const res = await axios
        .post(baseUrl + "add/request.php", formData)
        .catch((E) => {
          // if (E.response.status == 401) {
          setLoading(false);
          nav("/auth/signIn");
          //}
        });
      setLoading(false);
      window.location.pathname = "/myrequests";
    }
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="addrequestcon py-12 gap-6 w-full flex flex-col items-center">
          <div className="inp">
            <input
              className="input "
              type="text"
              name="country"
              placeholder=""
              id="country"
              onChange={handleInputs}
              required
            />
            <span className="title">country</span>
          </div>
          <div className="inp">
            <input
              className="input "
              type="text"
              name="street"
              id="street"
              placeholder=""
              onChange={handleInputs}
              required
            />{" "}
            <span className="title">street</span>
          </div>
          <div className="inp">
            <input
              className="input "
              type="text"
              name="buildingId"
              id="buildingId"
              placeholder=""
              onChange={handleInputs}
              required
            />{" "}
            <span className="title">building</span>
          </div>
          <div className="inp">
            <input
              className="input "
              type="text"
              name="phone"
              id="phone"
              placeholder=""
              onChange={handleInputs}
              required
            />{" "}
            <span className="title">phone</span>
          </div>
          <div className="w-full  flex justify-center">
            <div
              onClick={submit}
              className="btn mt-2 !w-[200px]    tab:!w-[200px] tab:!text-[15px] cursor-pointer !p-[2] !text-[18px]"
            >
              Add Request
            </div>
          </div>{" "}
          <ToastContainer />
        </div>
      )}
    </>
  );
}
