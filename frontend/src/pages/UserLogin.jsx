import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  // now we are performing two way data binding issey react data dekh payega.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserdata] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserdata({email, password});
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 flex h-screen flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo-700x394.png"
          alt="uber-logo"
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            placeholder="Password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
          <p className="text-center">
            New here?
            <Link to="/signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link to='/captain-login' className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
          Sign In as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
