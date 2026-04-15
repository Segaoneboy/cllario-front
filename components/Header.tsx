"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/userContext";

export default function Header() {
    const pathname = usePathname();
    const { authorized, loading } = useUser();

    if (pathname === "/auth") return null;

    return (
        <header className=" top-0 w-full z-50 ">
            <nav className="max-w-7xl mx-auto px-4 md:px-8 h-20 relative flex items-center justify-between">

                {/* 2. Левый блок */}
                <div className="flex items-center gap-6 z-10 text-md md:text-lg lg:text-xl ">
                    <Link href="/test" className="text-[#5170FF] font-semibold hover:opacity-60 transition-opacity">
                        Тест
                    </Link>
                    <a
                        href="https://t.me/sycroll"
                        target="_blank"
                        className="text-[#5170FF] font-semibold hover:opacity-60 transition-opacity hidden sm:block"
                    >
                        Поддержка
                    </a>
                </div>

                {/* 3. Центральный блок */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <img
                            width={64}
                            src="/Cllario-logo-site.png"
                            alt="cllario logo"
                            className="group-hover:rotate-3 transition-transform"
                        />
                        <span className="text-xl md:text-2xl font-semibold text-[#5170FF] tracking-tight">
                            Cllario
                        </span>
                    </Link>
                </div>

                {/* 4. Правый блок */}
                <div className="flex items-center gap-6 z-10  text-md md:text-lg lg:text-xl ">
                    <a
                        href="https://t.me/cllario"
                        target="_blank"
                        className="text-[#5170FF] font-semibold hover:opacity-60 transition-opacity hidden md:block"
                    >
                        Соц. сети
                    </a>

                    {loading ? (
                        <div className="h-5 w-12 bg-gray-100 animate-pulse rounded-full" />
                    ) : (
                        <Link
                            href={authorized ? "/dashboard" : "/auth"}
                            className="text-[#5170FF] font-semibold hover:opacity-60 transition-opacity"
                        >
                            {authorized ? "Кабинет" : "Вход"}
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}