"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import QuestionCard from "@/components/TestCard";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DashboardComponent from "@/components/DashboardComponent";
import { useUser } from "@/context/userContext";

export default function TestPage() {
    const { refreshUser } = useUser();
    const router = useRouter();
    const [resultPlan, setResultPlan] = useState<any | null>(null);

    // Добавляем control сюда, чтобы QuestionCard мог отслеживать выбор
    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting }
    } = useForm({
        shouldUnregister: false,
        mode: "onChange"
    });

    const [step, setStep] = useState(0);

    const questions = [
        {
            name: "q1",
            question: "Что для тебя важнее в работе?",
            options: [
                { value: "influence", label: "Влиять на результат" },
                { value: "stable", label: "Стабильность" },
                { value: "challenge", label: "Новые вызовы" },
                { value: "team", label: "Хорошая атмосфера" },
            ],
        },
        {
            name: "q2",
            question: "Что сильнее тебя мотивирует?",
            options: [
                { value: "recognition", label: "Признание" },
                { value: "result", label: "Результат" },
                { value: "process", label: "Процесс" },
                { value: "money", label: "Деньги" },
            ],
        },
        {
            name: "q3",
            question: "Как ты решаешь сложные задачи?",
            options: [
                { value: "analysis", label: "Анализирую всё" },
                { value: "intuition", label: "Делаю интуитивно" },
                { value: "ask", label: "Спрашиваю других" },
                { value: "try", label: "Пробую и корректирую" },
            ],
        },
        {
            name: "q4",
            question: "Как ты чувствуешь себя в группе?",
            options: [
                { value: "leader", label: "Я лидер" },
                { value: "listener", label: "Я слушаю" },
                { value: "team", label: "Участвую" },
                { value: "solo", label: "Предпочитаю быть один" },
            ],
        },
    ];

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch("/api/test/analysis", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message);

            if (result.saved) {
                await refreshUser();
                toast.success('Тест успешно пройден и сохранен');
                router.push("/dashboard");
            } else {
                localStorage.setItem("guestTestResult", JSON.stringify({
                    answers: result.dashboard.results,
                    plan: result.dashboard.plan,
                }));
                await refreshUser();
                toast.success('Тест успешно пройден');
                setResultPlan(result.dashboard.plan);
            }
        } catch (e) {
            toast.error("Произошла ошибка, повторите попытку позже");
            console.error(e);
        }
    };

    const next = () => { if (step < questions.length - 1) setStep(step + 1); };
    const prev = () => { if (step > 0) setStep(step - 1); };

    if (resultPlan !== null) {
        return (
            <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto animate-fade-in">
                <div className="bg-white border-2 border-[#5170FF]/10 rounded-[2.5rem] p-8 md:p-12 mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-[#5170FF] mb-2">
                            Привет, Гость 👋
                        </h1>
                        <p className="text-[#5170FF]/60 font-medium">Ваш временный результат готов. Создайте аккаунт, чтобы не потерять его.</p>
                    </div>
                    <button
                        onClick={() => router.push("/auth")}
                        className="px-8 py-4 rounded-2xl bg-[#5170FF] text-white font-bold text-lg shadow-xl shadow-[#5170FF]/20 hover:scale-105 transition-all"
                    >
                        Сохранить результат
                    </button>
                </div>
                <DashboardComponent plan={resultPlan}/>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center p-6 pt-24">
            {/* Индикатор прогресса */}
            <div className="w-full max-w-xl mb-8 flex gap-2">
                {questions.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-[#5170FF]' : 'bg-[#5170FF]/10'}`}
                    />
                ))}
            </div>

            <form
                onSubmit={(e) => {
                    if (step === questions.length - 1) {
                        handleSubmit(onSubmit)(e);
                    } else {
                        e.preventDefault();
                    }
                }}
                className="w-full max-w-2xl space-y-10"
            >
                <QuestionCard
                    key={questions[step].name}
                    register={register}
                    question={questions[step].question}
                    name={questions[step].name}
                    control={control} // Передаем control, теперь ошибки не будет
                    options={questions[step].options}
                />

                <div className="flex justify-between items-center gap-4 px-2">
                    <button
                        type="button"
                        onClick={prev}
                        disabled={step === 0 || isSubmitting}
                        className={`text-lg font-bold transition-all ${
                            step === 0 ? "opacity-0 pointer-events-none" : "text-[#5170FF] hover:opacity-60"
                        }`}
                    >
                        ← Назад
                    </button>

                    <div className="flex-1 flex justify-end">
                        {step === questions.length - 1 ? (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#5170FF] text-white px-10 py-4 rounded-2xl text-xl font-bold hover:shadow-2xl hover:shadow-[#5170FF]/30 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {isSubmitting ? "Анализ данных..." : "Завершить"}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={next}
                                className="bg-[#5170FF] text-white px-10 py-4 rounded-2xl text-xl font-bold hover:shadow-2xl hover:shadow-[#5170FF]/30 transition-all active:scale-95"
                            >
                                Далее →
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}