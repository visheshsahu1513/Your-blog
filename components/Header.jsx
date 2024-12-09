import React, { useEffect, useState } from "react";
import { LogoutBtn,Container,Logo } from '../index'
import { Link,useNavigate,NavLink } from 'react-router-dom'
import { useSelector } from "react-redux";
import authService from "../appWrite/auth";

export default function Header() {
    const authStatus = useSelector(state=>state.auth.status)
    // const authStatus = 1;
    const navigate = useNavigate()
    const [user,setuser] = useState('')

    useEffect(()=>{
        authService.getCurrentUser().then((data)=>{
            setuser(data.name)
        })
    },[authStatus])

    
    const NavItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "My Posts",
            slug: "/my-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]

    return (
        <>
            <header className="shadow py-4 bg-gray-500">
                <Container>
                    <nav className="flex">
                        <div className="mr-4">
                            <Link to='/'>
                                <Logo />
                            </Link>
                        </div>
                        <ul className="flex ml-auto">
                            {NavItems.map((item) => (
                                (item.active) ? (<li key={item.slug}>
                                   <NavLink
                                            to={item.slug}
                                            className={({ isActive }) => 
                                                `inline-block px-6 py-2 duration-200 rounded-full ${isActive ? 'bg-slate-200' : ''}`
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                </li>)
                                    : null
                            ))}
                            {
                                (authStatus&&(
                                    <li>
                                        <LogoutBtn name={user}  />
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </Container>
            </header>
        </>
    )
}