import { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import axios from "axios";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in');
      setName("");setemail("");setpassword("")
    } catch (e) {
      console.log("error :",e)
      alert('Registration failed. Please try again later');
    }
  }

  return (
    <div className=" flex grow items-center justify-around">
      <div className="mb-32">
        <h1 className="text-center font-bold text-3xl mb-4"> Register Now </h1>
        <form className="max-w-md mx-auto " onSubmit={registerUser}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="siddanth"
          />
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
          <div className="text-center text-lg mt-3 ">
            Already have an account? <br></br>
            <span>
              <Link to={"/login"} className=" underline text-lg font-bold">
                Login{" "}
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
