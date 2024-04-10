import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function LoginForm() {
  const { setUser } = useAuth()
  const [input, setInput] = useState({
    username : '', 
    password : ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      
      const rs = await axios.post('http://localhost:8889/auth/login', input)
      console.log(rs.data.token)
      if (rs.status === 200) {
        alert('Login successful');
      }
      localStorage.setItem('token', rs.data.token)
      const rs1 = await axios.get('http://localhost:8889/auth/me', {
        headers : { Authorization : `Bearer ${rs.data.token}` }
      })
      // console.log(rs1.data)
      setUser(rs1.data)
      
    }catch(err) {
      console.log( err.message)
    }
  }

  return (
    <div className="p-9 border-2  w-10 min-w-[500px] mx-auto rounded mt-20 bg-gradient-to-b from-white flex justify-center items-center">
      <div className="w-full max-w-xs">
        <div
          className="text-2xl font-black mb-5 text-black"
        >
          Login Form
        </div>
        <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
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
            <span className="label-text text-black">Passwrod</span>
            <input
              type="password"
              className="input input-bordered w-full"
              name="password"
              value={input.password}
              onChange={hdlChange}
            />
          </label>
          <div className="flex justify-center">
        <button type="submit" className="btn btn-primary w-full bg-green-400 hover:bg-green-200 text-white px-3 py-2 md:px-4 md:py-3 rounded-md shadow-md transition-colors duration-300 text-lg md:text-xl mt-4">
          Login
        </button>
      </div>


        </form>
      </div>
    </div>
  );
}
