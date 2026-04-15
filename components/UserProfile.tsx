"use client";

import React from "react";
import DashboardComponent from "@/components/DashboardComponent";
import { UserCircle, Mail } from "lucide-react";

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
        <div className="w-full max-w-5xl mx-auto space-y-12 animate-fade-in">
            {/* ВЕРХНЯЯ ПАНЕЛЬ ПРОФИЛЯ */}
            <div className="relative overflow-hidden bg-white rounded-[2.5rem] border-2 border-[#5170FF]/10 p-8 md:p-12 transition-all group">
                {/* Декоративный синий акцент на фоне */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#5170FF]/5 rounded-bl-[6rem] -z-0 group-hover:bg-[#5170FF]/10 transition-colors duration-500" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    {/* Аватар-заглушка в стиле Cllario */}
                    {/*<div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-[#5170FF] flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-2xl shadow-[#5170FF]/30">*/}
                    {/*    {user.name ? user.name[0].toUpperCase() : "U"}*/}
                    {/*</div>*/}

                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5170FF]/10 text-[#5170FF] text-xs font-bold uppercase tracking-wider mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#5170FF] animate-pulse" />
                            Активный профиль
                        </div>
                        <h1 className="text-4xl md:text-5xl font-semibold text-[#5170FF] mb-3 tracking-tight">
                            Привет, {user.name}
                        </h1>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-[#5170FF]/60 font-medium">
                            <Mail size={18} />
                            <span>{user.email}</span>
                        </div>
                    </div>

                    {/*<div className="flex flex-col gap-3 w-full md:w-auto">*/}
                    {/*    <button className="px-8 py-3 rounded-2xl bg-[#5170FF]/5 text-[#5170FF] font-bold border-2 border-[#5170FF]/10 hover:bg-[#5170FF] hover:text-white hover:border-[#5170FF] transition-all duration-300">*/}
                    {/*        Редактировать*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>

            {/* СЕКЦИЯ С АНАЛИТИКОЙ И ПЛАНОМ */}
            <div className="space-y-6">
                <div className="flex items-center gap-4 px-4">
                    <h2 className="text-2xl font-bold text-[#5170FF]">Результаты анализа</h2>
                    <div className="h-px bg-[#5170FF]/10 flex-1" />
                </div>
                <DashboardComponent plan={user.plan} />
            </div>
        </div>
    );
}