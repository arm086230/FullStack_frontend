import axios from 'axios';
import { useState } from 'react'

export default function InputDetails() {
    const [details, setDetails] = useState({
        registrationnumber: '',
        brand: '',
        model: '',
        color: '',
        note: '',

    });
    const hdlChange = (e) => {
        setDetails((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    }
    const hdlSubmit = async (e) => {
        try {
            e.preventDefault();
            const token = localStorage.getItem('token');
            console.log(details)
            const rs = await axios.post('http://localhost:8889/auth/createcar',details , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(rs.status === 200){
                alert('Registration Successful');
                window.location.reload();
            }

        }catch (err) {
            console.log(err)
        }
    }
  return (
<div className='p-5 border-2 w-7 min-w-[500px] mx-auto rounded mt-5 bg-white flex justify-center items-center'>
    <div className='w-full max-w-xs'>
        <div className='text-xl mb-6 text-black text-center'>กรอกข้อมูลรถของคุณ</div>
        <form className='flex flex-col gap-2' onSubmit={hdlSubmit}>
        <label className='form-control'>
              <span className='label-text text-black'>เลขทะเบียน</span>
              <input
                type='text'
                className='input input-bordered w-full max-w-xs'
                name='registrationnumber'
                value={details.registrationnumber}
                onChange={hdlChange}
              />
          </label>

          <label className='form-control'>
              <span className='label-text text-black'>ยี่ห้อรถ</span>
              <input
                type='text'
                className='input input-bordered w-full max-w-xs'
                name='brand'
                value={details.brand}
                onChange={hdlChange}
              />
          </label>

             <label className='form-control'>
              <span className='label-text text-black'>รุ่นรถ</span>
              <input
                type='text'
                className='input input-bordered w-full max-w-xs'
                name='model'
                value={details.model}
                onChange={hdlChange}
              />
          </label>
          <label className='form-control'>
              <span className='label-text text-black'>สีรถ</span>
              <input
                type='text'
                className='input input-bordered w-full max-w-xs'
                name='color'
                value={details.color}
                onChange={hdlChange}
              />
          </label>

          <label className='form-control'>
              <span className='label-text text-black'>หมายเหตุ</span>
              <input
                type='text'
                className='input input-bordered w-full max-w-xs'
                name='note'
                value={details.note}
                onChange={hdlChange}
              />
          </label>
          <button type='submit'className="btn btn-primary bg-green-400 hover:bg-green-200 text-white px-3 py-2 md:px-4 md:py-3 rounded-md shadow-md transition-colors duration-300 text-lg md:text-xl mt-4">เพิ่มข้อมูลรถ</button>
        </form>
    </div>
</div>
  )
}
