import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full  border-t border-[#5170FF]/10 py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* Лого и слоган */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <img
                                width={40}
                                src="/Cllario-logo-site.png"
                                alt="cllario logo"
                                className="group-hover:rotate-3 transition-transform"
                            />
                            <span className="text-xl md:text-2xl font-semibold text-[#5170FF] tracking-tight">
                            Cllario
                        </span>
                        </Link>
                        <p className="text-[#5170FF]/60 text-sm font-medium">
                            Навигация в мире вашей карьеры.
                        </p>
                    </div>

                    {/* Навигация в футере */}
                    <div className="flex flex-wrap justify-center gap-8 text-[#5170FF] font-semibold">
                        <Link href="/test" className="hover:opacity-60 transition-opacity">Тест</Link>
                        <a href="https://t.me/cllario_news" className="hover:opacity-60 transition-opacity">Новости</a>
                        <a href="https://t.me/sycroll" className="hover:opacity-60 transition-opacity">Поддержка</a>
                    </div>

                    {/* Копирайт */}
                    <div className="text-[#5170FF]/40 text-sm font-medium">
                        © {new Date().getFullYear()} Cllario
                    </div>
                </div>
            </div>
        </footer>
    );
}