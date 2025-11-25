"use client"
import {useEffect, useState} from "react";
import AuthRegistration from "@/components/AuthRegistration";
import AuthLogin from "@/components/AuthLogin";

export default function Account(){
    const [mode, setMode] = useState<"signup" | "login" | "forgot">("login");
    const hashUpdate = () =>{
        const hash = window.location.hash;
        if(hash === "#signup"){
            setMode('signup')
        } else if(hash === "#forgotpass"){
            setMode("forgot")
        } else{
            setMode("login")
        }
    }
    useEffect(()=>{
        hashUpdate();
        window.addEventListener("hashchange", hashUpdate);
        return () => {
            window.removeEventListener("hashchange", hashUpdate);
        }
    }, [])

    if(mode === "signup"){
        return <AuthRegistration/>
    } else if(mode === "login"){
        return <AuthLogin/>
    }
};