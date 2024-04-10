import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";
export default function StoreData() {


    const [data , setdata] = useState([])
    useEffect(()=>{
        const getdata = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8889/auth/getcar/`,
                {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
            )
            setdata(response.data.cars)
            // console.log(response.data)
            }catch (error){
                console.log(error)
            }
        }
        getdata()
    },[])
 
  return (
<div className="p-6">
  <table className="table-auto w-full border-collapse border border-gray-200">
    <thead>
      <tr className="bg-slate-200 text-gray-900 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">เลขทะเบียน</th>
        <th className="py-3 px-6 text-left">ยี่ห้อรถ</th>
        <th className="py-3 px-6 text-left">รุ่นรถ</th>
        <th className="py-3 px-6 text-left">สีรถ</th>
        <th className="py-3 px-6 text-left">หมายเหตุ</th>
        <th className="py-3 px-6 text-left">เเก้ไขข้อมูล</th>
        <th className="py-3 px-6 text-left">ลบข้อมูล</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {data && data.map((item) => <Data key={item.id} data={item} />)}
    </tbody>
  </table>
</div>
  );
}

function Data({data}) {
    // console.log(data.id);
    const navigate = useNavigate();
    const linktoedit = () =>{
        navigate('/edit/'+data.id);
    }

    const[isDelete , setDelete] = useState()
    const hdlDelete =(e)=>{
        e.preventDefault();
        const deletecar = async () =>{
            try{
                const token = localStorage.getItem('token');
                const id = data.id
                const response = await axios.delete(`http://localhost:8889/auth/deletecar/${id}`,
                {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
            )
            alert('Delete was successful')
            window.location.reload();
            setDelete(!isDelete)
            }catch (error){
                console.log(error)
            }
        }
        deletecar()
    }

  return (
    <tr className="text-gray-800 items-center">
      <td className="py-3 px-6">{data.registrationnumber}</td>
      <td className="py-3 px-6">{data.brand}</td>
      <td className="py-3 px-6">{data.model}</td>
      <td className="py-3 px-6">{data.color}</td>
      <td className="py-3 px-6">{data.note}</td>
      <td>
        <button onClick={linktoedit} className="btn btn-outline btn-accent">เเก้ไขข้อมูล</button>
      </td>
      <td>
      <button className="btn btn-outline btn-error" onClick={hdlDelete}>ลบข้อมูล</button>
      </td>
    </tr>
    
  );
}