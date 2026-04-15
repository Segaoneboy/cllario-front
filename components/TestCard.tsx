"use client";

import { useWatch, Control } from "react-hook-form";

type Option = {
    value: string;
    label: string;
};

interface QuestionCardProps {
    question: string;
    name: string;
    register: any;
    options: Option[];
    control: Control<any>; // Уточняем тип для безопасности
}

export default function QuestionCard({ question, name, register, options, control }: QuestionCardProps) {
    // Подписываемся на изменения конкретного поля
    const selectedValue = useWatch({
        control,
        name,
    });

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 transition-all">
                <h2 className="text-3xl md:text-4xl font-bold text-[#5170FF] text-center mb-10 leading-tight">
                    {question}
                </h2>

                <div className="space-y-4">
                    {options.map((opt) => {
                        const isSelected = selectedValue === opt.value;

                        return (
                            <label
                                key={opt.value}
                                className={`
                                    group flex items-center gap-4 p-5 rounded-2xl cursor-pointer
                                    border-2 transition-all duration-300 active:scale-[0.98]
                                    ${isSelected
                                    ? "border-[#5170FF] bg-[#5170FF] text-white shadow-lg shadow-[#5170FF]/20"
                                    : "border-[#5170FF]/10 bg-white text-[#5170FF] hover:border-[#5170FF]/30 hover:bg-[#5170FF]/5"
                                }
                                `}
                            >
                                <input
                                    type="radio"
                                    value={opt.value}
                                    {...register(name, { required: true })}
                                    className="sr-only"
                                />

                                <div className={`
                                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                                    ${isSelected ? "border-white" : "border-[#5170FF]/30 group-hover:border-[#5170FF]"}
                                `}>
                                    {isSelected && (
                                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                                    )}
                                </div>

                                <span className="text-lg md:text-xl font-medium tracking-tight">
                                    {opt.label}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>
            <p className="text-center mt-6 text-[#5170FF]/30 text-xs font-bold uppercase tracking-[0.2em]">
                Выберите подходящий ответ
            </p>
        </div>
    );
}