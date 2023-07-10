import "../index.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/Usercontext";

export const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setredirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function checkUser(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post("/login", {email,password});
      setUser(data); // after login sending the data to header fetch the name

      alert("Login successful");
      setredirect(true);
    } catch (e) {
      console.log("error :", e);
      alert("Login failed. Please try again later");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className=" flex grow items-center justify-around">
      <div className="mb-32">
        <h1 className="text-center font-bold text-4xl mb-4"> Login </h1>
        <form className="max-w-md mx-auto " onSubmit={checkUser}>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="youremail@gmail.com"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="password"
          />
          <button className="primary">Submit</button>
        </form>

        <div className="text-center text-lg  mt-3">
          Dont have an account? <br></br>
          <Link to={"/register"} className=" underline text-lg font-bold">
            Register Now{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};
