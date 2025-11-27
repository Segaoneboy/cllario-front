"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import QuestionCard from "@/components/TestCard";
import { useRouter } from "next/navigation";

export default function TestPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
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
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.message);

            console.log(data)
            router.push("/");
        } catch (e) {
            console.error(e);
        }
    };

    const next = () => {
        if (step < questions.length - 1) setStep(step + 1);
    };

    const prev = () => {
        if (step > 0) setStep(step - 1);
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-4">
            <form
                onSubmit={(e) => {
                    if (step === questions.length - 1) {
                        handleSubmit(onSubmit)(e);
                    } else {
                        e.preventDefault();
                    }
                }}
                className="w-full max-w-xl space-y-6"
            >
                <QuestionCard
                    key={questions[step].name}
                    register={register}
                    question={questions[step].question}
                    name={questions[step].name}
                    options={questions[step].options}
                />

                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={prev}
                        disabled={step === 0 || isSubmitting}
                        className={`px-6 py-2 rounded-xl border ${
                            step === 0
                                ? "opacity-40 cursor-not-allowed"
                                : "border-[#4a63df] text-[#4a63df]"
                        }`}
                    >
                        ← Назад
                    </button>

                    {step === questions.length - 1 ? (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 rounded-xl bg-[#4a63df] text-white shadow hover:bg-[#3d54c4] disabled:opacity-50"
                        >
                            {isSubmitting ? "Загрузка..." : "Завершить"}
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={next}
                            disabled={isSubmitting}
                            className="px-6 py-2 rounded-xl bg-[#4a63df] text-white shadow hover:bg-[#3d54c4]"
                        >
                            Далее →
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
