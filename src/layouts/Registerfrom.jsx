import { useState } from "react";
import axios from "axios";

export default function Registerfrom() {
  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        !input.name ||
        !input.username ||
        !input.email ||
        !input.phone ||
        !input.password ||
        !input.confirmPassword
      ) {
        alert("Please fill all fields");
      } else if (input.password !== input.confirmPassword) {
        alert("Passwords do not match");
      }

      const rs = await axios.post("http://localhost:8889/auth/register", input);
      console.log(rs);
      if (rs.statusCode !== 200) {
        alert("Register Successful");
      }
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5 bg-gradient-to-b from-white  flex justify-center items-center">
      <div className="w-full max-w-xs">
        <div className="text-2xl font-black mb-5 text-black">Register Form</div>
        <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
          <label className="form-control">
            <span className="label-text text-black">
              FirsName/lastName
            </span>
            <input
              type="text"
              className="input input-bordered w-full"
              name="name"
              value={input.name}
              onChange={hdlChange}
            />
          </label>

          <label className="form-control">
            <span className="label-text text-black">UserName</span>
            <input
              type="text"
              className="input input-bordered w-full"
              name="username"
              value={input.username}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control">
            <span className="label-text text-black">Email</span>
            <input
              type="email"
              className="input input-bordered w-full"
              name="email"
              value={input.email}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control">
            <span className="label-text text-black">phone</span>
            <input
              type="text"
              className="input input-bordered w-full"
              name="phone"
              maxLength={10}
              value={input.phone}
              onChange={hdlChange}
            />
          </label>

          <label className="form-control">
            <span className="label-text text-black">Passwrod</span>
            <input
              type="password"
              className="input input-bordered w-full"
              name="password"
              value={input.password}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control">
            <span className="label-text text-black">Confirm Password</span>
            <input
              type="password"
              className="input input-bordered w-full"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={hdlChange}
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary bg-green-400 hover:bg-green-200 text-white px-3 py-2 md:px-4 md:py-3 rounded-md shadow-md transition-colors duration-300 text-lg md:text-xl mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
