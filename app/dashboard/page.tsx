"use client";

import { useEffect, useState } from "react";
import UserProfile from "@/components/UserProfile";
export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/userinfo", {
            method: "GET",
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setUser(data.user);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl">
                Загружаем ваш кабинет...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
                Не удалось загрузить данные пользователя
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <UserProfile user={user}></UserProfile>
        </div>
    );
}
