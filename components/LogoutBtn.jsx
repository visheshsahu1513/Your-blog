import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import authService from "../appWrite/auth";

export default function LogoutBtn({name}){
    const dispatch = useDispatch();

    const logoutHandler = ()=>{
        authService
        .logout()
        .then(()=>{
            dispatch(logout())
        })
        .catch((error)=>{
            throw error;
        })
    }

    return (
        <button 
        onClick={logoutHandler}
        className="rounded-sm p-1 bg-slate-300 hover:bg-blue-400 inline-block"
        >
            Logout 
        {(name&&<div className="bg-green-400">{name}</div>)}
        </button>
    )
}