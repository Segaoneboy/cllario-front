"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

export type UserContextType = {
    authorized: boolean;
    loading: boolean;
    name?: string;
    email?: string;
    plan?: any | null;
    refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
    authorized: false,
    loading: true,
    refreshUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Omit<UserContextType, "refreshUser">>({
        authorized: false,
        loading: true,
    });

    const fetchUser = useCallback(async () => {
        try {
            setUser(prev => ({ ...prev, loading: true }));

            const res = await fetch("/api/userinfo", {
                credentials: "include",
            });

            if (res.status === 401) {
                setUser({ authorized: false, loading: false });
                return;
            }

            const data = await res.json();
            const u = data.user;
            const lastTest = u?.test?.[0] ?? null;

            setUser({
                authorized: true,
                loading: false,
                name: u.name,
                email: u.email,
                plan: lastTest?.plan ?? null,
            });
        } catch {
            setUser({ authorized: false, loading: false });
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const value = useMemo(
        () => ({ ...user, refreshUser: fetchUser }),
        [user, fetchUser]
    );

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
