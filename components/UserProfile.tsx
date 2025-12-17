"use client";

import React from "react";
import DashboardComponent from "@/components/DashboardComponent";

type Plan = {
    summary?: string | null;
    strengths?: string[] | null;
    weaknesses?: string[] | null;
    developmentPlan?: string[] | null;
};

type UserData = {
    name: string;
    email: string;
    plan: Plan;
};

interface Props {
    user: UserData;
}

export default function UserProfile({ user }: Props) {
    return (
        <div className="min-h-screen  flex justify-center p-6">
            <div className="w-full max-w-3xl space-y-6">
                {/* HEADER */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                    <h1 className="text-3xl font-bold text-[#4a63df]">
                        Привет, {user.name} 👋
                    </h1>
                    <p className="text-gray-600 mt-1">{user.email}</p>
                </div>
                <DashboardComponent plan={user.plan}/>
            </div>
        </div>
    );
}
