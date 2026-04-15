"use client"

import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const features = [
        {
            title: "Цифровой профиль",
            description: "Формируем глубокий профиль навыков с долгосрочной памятью (Memory Layer).",
            detail: "Анализ опыта"
        },
        {
            title: "Живая адаптация",
            description: "План развития меняется в реальном времени в зависимости от ваших успехов.",
            detail: "Real-time AI"
        },
        {
            title: "Стоп-выгорание",
            description: "Фиксируем микро-маркеры стагнации и вовремя предлагаем смену вектора.",
            detail: "Предиктивная аналитика"
        }
    ];

    return (
        <main className="min-h-screen bg-white text-[#5170FF]">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center pt-24 pb-20 px-4">
                <div className="relative mb-8">
                    <img
                        width={220}
                        src="/Cllario-logo-site.png"
                        alt="cllario logo"
                        className="relative z-10"
                    />
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight mb-6 tracking-tight">
                    Cllario
                </h1>

                <p className="text-xl md:text-2xl font-medium max-w-2xl mb-12 opacity-90">
                    AI-платформа для управления личностным и профессиональным ростом без выгорания.
                </p>

                <button
                    className="bg-[#5170FF] text-white rounded-2xl px-12 py-4 text-2xl font-bold hover:bg-white hover:text-[#5170FF] border-2 border-[#5170FF] transition-all duration-300 shadow-xl shadow-[#5170FF]/20"
                    onClick={() => router.push('/test')}
                >
                    Пройти тест
                </button>
            </section>

            {/* Короткая статистика */}
            <section className=" py-20">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-around items-center gap-12 text-center">
                    <div>
                        <div className="text-5xl font-bold mb-2">43%</div>
                        <div className="text-lg opacity-70 text-[#585858]">испытывали выгорание</div>
                    </div>
                    <div className="w-px h-12 bg-[#5170FF]/20 hidden md:block" />
                    <div>
                        <div className="text-5xl font-bold mb-2 ">70%</div>
                        <div className="text-lg opacity-70 text-[#585858]">считают труд бесполезным</div>
                    </div>
                    <div className="w-px h-12 bg-[#5170FF]/20 hidden md:block" />
                    <div className="max-w-[300px] text-left">
                        <p className="text-lg font-semibold italic">«Мы решаем проблему стагнации через умную навигацию»</p>
                    </div>
                </div>
            </section>

            {/* Почему мы (Блоки из презентации) */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Почему именно Cllario?</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((f, i) => (
                        <div key={i} className="group p-8 rounded-3xl border-2 border-[#5170FF]/10 hover:border-[#5170FF] transition-all duration-500">
                            <div className="text-xs font-bold uppercase tracking-widest mb-4 opacity-60">
                                {f.detail}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                            <p className="text-lg leading-relaxed opacity-80 text-[#585858]">
                                {f.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

        </main>
    );
}