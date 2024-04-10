import {Link , useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const guesnav =[
    {to : '/', text : 'เข้าสู่ระบบ'},
    {to : '/register', text : 'ลงทะเบียน'}
]

const usernav = [
    {to : '/', text : "เพิ่มข้อมูลรถ"},
    {to: '/data', text : 'ข้อมูลรถ'},
    
]
export default function Header() {
    const {user ,logout} = useAuth()
    const finalNev = user?.id? usernav : guesnav

    const navigate = useNavigate()
    const hdlLogout =()=>{
        logout()
        navigate('/')
        alert('You have logged out')
    }
  return (
    <div className="navbar bg-gray-400">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">{user?.id ? user.username : 'Guest'}</a>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal p-3">
        {finalNev.map (el => (
            <li key={el.to}><Link to={el.to}>{el.text}</Link>
            </li>
        ))}
        {user?.id && (
          <li>
            <Link to="#" onClick={hdlLogout}>ออกจากระบบ</Link>
          </li>
        )}

      </ul>
    </div>
  </div>
  )
}
