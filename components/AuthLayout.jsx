import React,{ useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({ children,authentication = true }) {
    const navigate = useNavigate()
    const [loader,setloader] = useState(null);
    const authStatus = useSelector(state => state.auth.status)
    // console.log("Auth",children);
    useEffect(() => {
        if (authentication && authStatus == false) {
            navigate('/login')
        }
        else if (!authentication && authStatus == true) {
            navigate('/')
        }
        setloader(false)
    },[authStatus,navigate,authentication])
    return (
        (loader ? <h1>Loading...</h1> : <>{children}</>)
    )
}