"use client"
import { useEffect } from "react";
import fetchWithRefresh from "@/utils/fetchWithRefresh";

export default function FetchProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        fetchWithRefresh();
    }, []);

    return <>{children}</>
}