import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
export default function EditCar() {
  const id = location.pathname.split("/")[2];

  const navigate = useNavigate();
  const [details, setDetails] = useState({
    registrationnumber: "",
    brand: "",
    model: "",
    color: "",
    note: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8889/auth/getcar/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDetails(response.data.cars);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8889/auth/updatecar/${id}`,
        details,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Car details updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating car details:", error);
      alert("Error updating car details. Please try again.");
    }
  };

  return (
    <div className="p-5 border-2 w-7 min-w-[500px] mx-auto rounded mt-5 bg-white flex justify-center items-center">
      <div className="w-full max-w-xs">
        <div className="text-xl mb-6 text-black text-center">แก้ไขข้อมูลรถ</div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label className="form-control">
            <span className="label-text text-black">เลขทะเบียน</span>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              name="registrationnumber"
              value={details.registrationnumber}
              onChange={handleInputChange}
            />
          </label>

          <label className="form-control">
            <span className="label-text text-black">ยี่ห้อรถ</span>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              name="brand"
              value={details.brand}
              onChange={handleInputChange}
            />
          </label>

          <label className="form-control">
            <span className="label-text text-black">รุ่นรถ</span>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              name="model"
              value={details.model}
              onChange={handleInputChange}
            />
          </label>
          <label className="form-control">
            <span className="label-text text-black">สีรถ</span>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              name="color"
              value={details.color}
              onChange={handleInputChange}
            />
          </label>

          <label className="form-control">
            <span className="label-text text-black">หมายเหตุ</span>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              name="note"
              value={details.note}
              onChange={handleInputChange}
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary bg-green-400 hover:bg-green-200 text-white px-3 py-2 md:px-4 md:py-3 rounded-md shadow-md transition-colors duration-300 text-lg md:text-xl mt-4"
          >
            บันทึกการแก้ไข
          </button>
        </form>
      </div>
    </div>
  );
}
