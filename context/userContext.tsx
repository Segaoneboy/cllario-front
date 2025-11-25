"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type UserContextType = {
    authorized: boolean;
    name?: string;
    email?: string;
    plan?: any | null;
};

const UserContext = createContext<UserContextType>({
    authorized: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserContextType>({
        authorized: false,
    });

    useEffect(() => {
        fetch("/api/userinfo", {
            method: "GET",
            credentials: "include",
        })
            .then(async (res) => {
                if (res.status === 401) {
                    setUser({ authorized: false });
                    return;
                }

                const data = await res.json();
                const u = data.user;

                const lastTest = u?.test?.[0] ?? null;

                setUser({
                    authorized: true,
                    name: u.name,
                    email: u.email,
                    plan: lastTest?.plan ?? null,
                });
            })
            .catch(() => {
                setUser({ authorized: false });
            });
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
