export default function Home() {
    return (
        <main className="text-[#5170FF] bg-white min-h-screen flex flex-col items-center">
            <section className="flex flex-col items-center justify-center text-center mt-20 px-4">
                <h1 className="text-5xl sm:text-6xl font-semibold leading-tight mb-6">
                    Найди и пойми себя.
                </h1>
                <p className="text-lg text-gray-500 max-w-xl mb-8">
                    Cllario помогает осознать свои сильные стороны, зоны роста и личные паттерны поведения.
                </p>
                <a
                    href="/test"
                    className="bg-[#4a63df] text-white rounded-2xl px-8 py-3 text-xl font-semibold hover:bg-[#3d54c4] transition"
                >
                    Понять себя
                </a>
            </section>

            {/* About section */}
            <section className="mt-24 rounded-2xl p-8 max-w-4xl text-center mx-4">
                <h2 className="text-3xl font-semibold mb-4">Что такое Cllario?</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Cllario — это динамическая AI-платформа для управления личным и профессиональным ростом. В отличие от стандартных психологических тестов, которые дают «застывший» результат, Cllario создает живую карту развития. Мы превращаем разовый анализ личности в непрерывный цикл улучшений: от выявления скрытых талантов до еженедельного трекинга реальных изменений.
                </p>
            </section>
        </main>
    );
}
