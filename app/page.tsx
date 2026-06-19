"use client"
import {useRef, useState} from 'react';
import type {FormEvent} from 'react';

export default function Home() {
    const bottomRef = useRef<HTMLDivElement>(null);
    const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
    const [isTrialSent, setIsTrialSent] = useState(false);

    const handleTrialSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsTrialSent(true);
    };

    const closeTrialModal = () => {
        setIsTrialModalOpen(false);
        setIsTrialSent(false);
    };

    const features = [
        {
            title: "Цифровой профиль",
            description: "Формируем глубокий профиль навыков с долгосрочной памятью (Memory Layer).",
            detail: "Анализ опыта"
        },
        {
            title: "Индивидуальный подход",
            description: "Разрабатываем план развития, который подходит именно вам",
            detail: "Персонализация"
        },
        {
            title: "Живая адаптация",
            description: "План развития меняется в реальном времени в зависимости от ваших успехов.",
            detail: "Real-time AI"
        }
        
    ];

    return (
        <main className="min-h-screen bg-white text-[#5170FF]">
            <section className="border-b-2 border-[#5170FF]/10 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                        <img
                            src="/Cllario-logo-site.png"
                            alt="Cllario logo"
                            className="h-28 w-28 object-contain sm:h-36 sm:w-36 lg:h-44 lg:w-44"
                        />
                        <h1 className="mt-3 text-4xl font-bold sm:text-5xl lg:text-6xl">Cllario</h1>
                    </div>

                    <div className="flex min-w-0 flex-col items-center text-center md:items-start md:text-left">
                        <h2 className="max-w-4xl text-3xl font-bold leading-tight text-[#585858] sm:text-4xl lg:text-5xl">
                            AI-платформа для работы над индивидуальными планами развития
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-[#585858]/80 sm:text-xl">
                            Автоматизируем создание адаптивных планов развития сотрудников.
                        </p>
                        <button 
                            className="mt-6 min-h-12 rounded-full bg-[#5170FF] px-7 py-3 font-bold text-white transition-colors duration-300 hover:bg-[#3854d9] focus:outline-none focus:ring-4 focus:ring-[#5170FF]/25"
                            onClick={() => setIsTrialModalOpen(true)}
                        >
                            Попробовать
                        </button>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
                <h2 className="mb-10 text-center text-3xl font-bold sm:text-4xl lg:mb-14 lg:text-5xl">Cllario это</h2>

                <div ref={bottomRef} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="group rounded-lg border-2 border-[#5170FF]/10 p-6 transition-all duration-300 hover:border-[#5170FF] sm:p-7 lg:p-8">
                            <div className="mb-4 text-xs font-bold uppercase opacity-60">
                                {f.detail}
                            </div>
                            <h3 className="mb-4 text-xl font-bold sm:text-2xl">{f.title}</h3>
                            <p className="text-base leading-relaxed text-[#585858] opacity-80 sm:text-lg">
                                {f.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-y-2 border-[#5170FF]/5 px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl lg:text-5xl">ИИ-помощник</h2>
                    <p className="mx-auto mb-10 max-w-2xl text-center text-lg leading-relaxed text-[#585858] sm:mb-14 sm:text-xl">
                        Cllario использует технологию RAG и работает как автономный координатор, а не просто генератор текста.
                    </p>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-8">
                        <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                            <h4 className="mb-3 text-xl font-bold text-[#5170FF]">RAG-интервью</h4>
                            <p className="text-[#585858] leading-relaxed">
                                ИИ проводит интерактивные блиц-опросы сотрудника строго по материалам вашей внутренней базы знаний (Notion, Confluence), проверяя реальное понимание теории.
                            </p>
                        </div>
                        <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                            <h4 className="mb-3 text-xl font-bold text-[#5170FF]">Текстовый Action Review</h4>
                            <p className="text-[#585858] leading-relaxed">
                                Для подтверждения практики ИИ анализирует отчеты сотрудников о выполненных кейсах, сопоставляет результаты со SMART-целями и выявляет слепые зоны.
                            </p>
                        </div>
                        <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                            <h4 className="mb-3 text-xl font-bold text-[#5170FF]">Интеграция контекста</h4>
                            <p className="text-[#585858] leading-relaxed">
                                Платформа связывается с таск-трекерами (Jira, Яндекс Трекер), верифицируя выполнение реальных рабочих задач и автоматически обновляя граф навыков.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {isTrialModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 py-6">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl sm:p-8">
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-2xl font-bold text-[#585858]">
                                    {isTrialSent ? 'Заявка отправлена' : 'Попробовать Cllario'}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-[#585858]/75">
                                    {isTrialSent
                                        ? 'Мы получили ваши контакты и скоро свяжемся для демонстрации.'
                                        : 'Оставьте контакты, чтобы мы показали платформу и помогли выбрать сценарий запуска.'}
                                </p>
                            </div>
                            <button
                                type="button"
                                aria-label="Закрыть"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#5170FF]/15 text-xl leading-none text-[#5170FF] transition-colors hover:bg-[#5170FF]/10"
                                onClick={closeTrialModal}
                            >
                                ×
                            </button>
                        </div>

                        {isTrialSent ? (
                            <button
                                type="button"
                                className="min-h-12 w-full rounded-full bg-[#5170FF] px-6 py-3 font-bold text-white transition-colors hover:bg-[#3854d9]"
                                onClick={closeTrialModal}
                            >
                                Готово
                            </button>
                        ) : (
                            <form className="space-y-4" onSubmit={handleTrialSubmit}>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#585858]">Имя</span>
                                    <input
                                        required
                                        name="name"
                                        type="text"
                                        className="min-h-12 w-full rounded-lg border border-[#5170FF]/20 px-4 text-[#585858] outline-none transition-colors focus:border-[#5170FF]"
                                        placeholder="Анна"
                                    />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#585858]">Email</span>
                                    <input
                                        required
                                        name="email"
                                        type="email"
                                        className="min-h-12 w-full rounded-lg border border-[#5170FF]/20 px-4 text-[#585858] outline-none transition-colors focus:border-[#5170FF]"
                                        placeholder="name@company.ru"
                                    />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#585858]">Телефон</span>
                                    <input
                                        required
                                        name="phone"
                                        type="tel"
                                        className="min-h-12 w-full rounded-lg border border-[#5170FF]/20 px-4 text-[#585858] outline-none transition-colors focus:border-[#5170FF]"
                                        placeholder="+7 900 000-00-00"
                                    />
                                </label>
                                <button
                                    type="submit"
                                    className="min-h-12 w-full rounded-full bg-[#5170FF] px-6 py-3 font-bold text-white transition-colors hover:bg-[#3854d9] focus:outline-none focus:ring-4 focus:ring-[#5170FF]/25"
                                >
                                    Отправить
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
