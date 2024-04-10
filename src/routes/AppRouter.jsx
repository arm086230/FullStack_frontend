import {createBrowserRouter , RouterProvider , Outlet} from 'react-router-dom'
import LoginForm from '../layouts/LoginForm'
import Registerfrom from '../layouts/Registerfrom'
import useAuth from '../hooks/useAuth'
import Header from '../layouts/Header'
import InputDetails from '../layouts/InputDetails'
import StoreData from '../layouts/StoreData'
import Edit from '../layouts/Edit'

const guestRouter = createBrowserRouter([
     {
        path: '/',
        element: <>
        <Header/>
        <Outlet/>
        </>,
        children: [
            {index : true, element: <LoginForm/>},
            {path : '/register', element: <Registerfrom/>}
            
        ]
     }
])

const userRouter = createBrowserRouter([
     {
        path: '/',
        element: <>
        <Header/>
        <Outlet/>
        </>,
        children: [
            {index : true, element: <InputDetails />},
            {path : '/Data', element: <StoreData/>},
            {path : '/edit/*', element: <Edit/>}

            
        ]
     }
])

export default function AppRouter() {
    const {user} = useAuth()
    const finalRouter = user?.id ? userRouter : guestRouter
  return (
    <RouterProvider router ={finalRouter} />
  )
}
