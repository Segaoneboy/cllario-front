"use client";

import React from "react";
import { Lightbulb, Rocket, Target, ShieldCheck } from "lucide-react";

export type Plan = {
    summary?: string | null;
    strengths?: string[] | null;
    weaknesses?: string[] | null;
    developmentPlan?: string[] | null;
};

interface DashboardComponentProps {
    plan?: Plan | null;
}

export default function DashboardComponent({ plan }: DashboardComponentProps) {

    // Функция для парсинга жирного текста и превращения его в заголовки
    const formatText = (text: string) => {
        if (!text) return null;

        // Разбиваем текст по паттерну **текст**
        const parts = text.split(/(\*\*.*?\*\*)/g);

        return parts.map((part, index) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                // Убираем звездочки и оборачиваем в стилизованный заголовок
                const cleanText = part.slice(2, -2);
                return (
                    <span key={index} className="block mt-4 mb-2 text-xl font-bold text-[#5170FF]">
                        {cleanText}
                    </span>
                );
            }
            // Обычный текст с цветом #585858
            return (
                <span key={index} className="text-[#585858] font-normal leading-relaxed">
                    {part}
                </span>
            );
        });
    };

    if (!plan) {
        return (
            <div className="bg-[#5170FF]/5 border-2 border-dashed border-[#5170FF]/20 rounded-[2.5rem] p-12 text-center text-[#5170FF]/60 font-medium">
                Анализируем ваши данные... Скоро здесь появится ваш план.
            </div>
        );
    }

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div className="space-y-8 animate-fade-in">

            {/* 1. ОБЩИЙ АНАЛИЗ */}
            {plan.summary && (
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-[#5170FF]/10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <Lightbulb size={120} className="text-[#5170FF]" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#5170FF]/10 rounded-lg">
                                <ShieldCheck className="text-[#5170FF]" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-[#5170FF]">
                                Ваш цифровой профиль
                            </h2>
                        </div>
                        {/* Применяем парсинг к summary */}
                        <div className="text-lg">
                            {formatText(plan.summary)}
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 2. СИЛЬНЫЕ СТОРОНЫ */}
                {plan.strengths && (
                    <div className="bg-white p-8 rounded-[2.5rem] border-2 border-[#5170FF]/10">
                        <h2 className="text-xl font-bold text-[#5170FF] mb-6 flex items-center gap-2">
                            Сильные стороны
                        </h2>
                        <ul className="space-y-3">
                            {plan.strengths.map((s, i) => (
                                <li key={i} className="p-4 rounded-2xl bg-[#5170FF]/5 border border-[#5170FF]/10">
                                    {formatText(s)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* 3. ЗОНЫ РОСТА */}
                {plan.weaknesses && (
                    <div className="bg-white p-8 rounded-[2.5rem] border-2 border-[#5170FF]/10">
                        <h2 className="text-xl font-bold text-[#5170FF] mb-6 flex items-center gap-2">
                            Точки внимания
                        </h2>
                        <ul className="space-y-3">
                            {plan.weaknesses.map((w, i) => (
                                <li key={i} className="p-4 rounded-2xl border-2 border-[#5170FF]/5">
                                    {formatText(w)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* 4. ПЛАН РАЗВИТИЯ */}
            {/* 4. ПЛАН РАЗВИТИЯ (РЕДИЗАЙН В ВАШЕМ СТИЛЕ) */}
            {plan.developmentPlan && (
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border-2 border-[#5170FF]/10 shadow-sm relative overflow-hidden">

                    {/* Фоновый декоративный элемент в тон */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#5170FF]/5 rounded-full -mr-48 -mt-48 blur-3xl" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-[#5170FF]/10 rounded-2xl">
                                <Rocket size={32} className="text-[#5170FF]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#5170FF]">
                                    Roadmap развития
                                </h2>
                                <p className="text-[#585858]/70 font-medium">Ваш пошаговый план действий</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {plan.developmentPlan.map((step, i) => (
                                <div
                                    key={i}
                                    className="group flex gap-6 p-6 rounded-[2rem] bg-white border-2 border-[#5170FF]/5 hover:border-[#5170FF]/20 transition-all duration-300"
                                >
                                    {/* Индикатор шага */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 shrink-0 rounded-xl bg-[#5170FF]/10 text-[#5170FF] flex items-center justify-center font-bold text-lg group-hover:bg-[#5170FF] group-hover:text-white transition-colors">
                                            {i + 1}
                                        </div>
                                        {/* Пунктирная линия между шагами */}
                                        {// @ts-ignore
                                            i !== plan.developmentPlan.length - 1 && (
                                            <div className="w-0.5 h-full border-l-2 border-dashed border-[#5170FF]/20 mt-4" />
                                        )}
                                    </div>

                                    <div className="pt-1 pb-4">
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5170FF]/50 mb-2">
                                            ЭТАП {i + 1}
                                        </div>
                                        <div className="text-lg text-[#585858] leading-relaxed">
                                            {step.split(/(\*\*.*?\*\*)/g).map((p, idx) =>
                                                    p.startsWith("**") ? (
                                                        <span key={idx} className="text-[#5170FF] font-bold">
                                            {p.slice(2, -2)}
                                        </span>
                                                    ) : (
                                                        p
                                                    )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}