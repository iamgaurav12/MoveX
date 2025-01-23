import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignUp = () => {
    const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [userData, setUserdata] = useState({});
    
      const submitHandler = (e) => {
        e.preventDefault();
        setUserdata({
          fullName: {
            firstName,
            lastName,
          },
          password,
          email,
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      };
  return (
    <div>
      <div className="py-5 px-5 flex h-screen flex-col justify-between">
        <div>
          <img
            className="w-16 mb-10"
            src="https://imgs.search.brave.com/kO5ey-ytmAXJo3CuOB2tQVdrPOP5r8RMFokGpj5KlK4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2l0eXBuZy5jb20v/cHVibGljL3VwbG9h/ZHMvcHJldmlldy91/YmVyLXRheGktYmxh/Y2stbG9nby1wbmct/NzAxNzUxNjk0NzA3/MjE2bmRxemhyZXVi/bC5wbmc_dj0yMDI1/MDExMTEx"
          alt="uber-driver-logo"
          />
          <form onSubmit={(e) => submitHandler(e)}>
            <h3 className="text-lg w-full font-medium mb-2">What's our Captain's name</h3>
            <div className="flex gap-4 mb-6">
              <input
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border texlg placeholder:text-base"
                type="name"
                required
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
                type="name"
                required
                placeholder="Last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <h3 className="text-lg font-medium mb-2">What's our Captain's email</h3>
            <input
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              required
              placeholder="email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
              Login
            </button>
            <p className="text-center">
              Already have an account?
              <Link to="/captain-login" className="text-blue-600">
                Login here
              </Link>
            </p>
          </form>
        </div>
        <div>
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignUp;
