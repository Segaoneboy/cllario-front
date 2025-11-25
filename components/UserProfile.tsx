"use client";

import React from "react";

type Plan = {
    summary?: string | null;
    strengths?: string[] | null;
    weaknesses?: string[] | null;
    developmentPlan?: string[] | null;
};

type UserData = {
    name: string;
    email: string;
    test?: {
        results: any;
        plan?: Plan | null;
    }[];
};

interface Props {
    user: UserData;
}

export default function UserProfile({ user }: Props) {
    const lastTest = user?.test?.[0];
    const plan = lastTest?.plan;

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

                {/* SUMMARY */}
                {plan?.summary && (
                    <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-semibold text-[#4a63df] mb-3">
                            Общий анализ
                        </h2>
                        <p className="text-gray-700 leading-relaxed">{plan.summary}</p>
                    </div>
                )}

                {/* STRENGTHS */}
                {plan?.strengths && (
                    <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-semibold text-[#4a63df] mb-3">
                            Твои сильные стороны 💪
                        </h2>

                        <ul className="space-y-2">
                            {plan.strengths.map((s, i) => (
                                <li
                                    key={i}
                                    className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-900"
                                >
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* WEAKNESSES */}
                {plan?.weaknesses && (
                    <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-semibold text-[#4a63df] mb-3">
                            Зоны роста 🎯
                        </h2>

                        <ul className="space-y-2">
                            {plan.weaknesses.map((w, i) => (
                                <li
                                    key={i}
                                    className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900"
                                >
                                    {w}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* DEVELOPMENT PLAN */}
                {plan?.developmentPlan && (
                    <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-semibold text-[#4a63df] mb-3">
                            Рекомендованный план развития 🚀
                        </h2>

                        <ul className="space-y-2">
                            {plan.developmentPlan.map((step, i) => (
                                <li
                                    key={i}
                                    className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900"
                                >
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
