"use client"
import {usePathname} from "next/navigation";
import Link from "next/link";
import {useUser} from "@/context/userContext";
function NavSkeleton() {
    return (
        <div className="h-4 w-18 md:h-6 md:w-28 rounded-md bg-gray-200 animate-pulse" />
    );
}

export default function Header(){
    const pathname = usePathname();
    const { authorized, loading } = useUser()
    if( pathname === "/auth") return <></>
    if(pathname === "/test"){
        return (
            <header className="m-4">
                <nav>
                    <ul className="text-[#5170FF] font-semibold text-sm md:text-xl flex justify-center items-center ">
                        <Link href="/">
                            <li className="flex items-center gap-1">
                                <img width={60} src="/Cllario-logo.jpg" alt="cllario logo"/>
                                <p className="hidden md:inline">Cllario</p>
                            </li>
                        </Link>
                    </ul>
                </nav>
            </header>
    );}
    return(
        <header className="m-4 ">
            <nav>
                <ul className="text-[#5170FF] font-semibold text-sm md:text-xl flex justify-between items-center ">
                    <Link href="/">
                        <li className="flex items-center gap-1">
                            <img width={60} src="/Cllario-logo.jpg" alt="cllario logo"/>
                            <p className="hidden md:inline">Cllario</p>
                        </li>
                    </Link>

                    <li>
                        <Link href="/test">Тест</Link>
                    </li>

                    <li>
                        <a href="https://t.me/sycroll">Поддержка</a>
                    </li>
                    { loading ? <NavSkeleton /> : authorized ? (
                        <li>
                            <Link href="/dashboard">Личный кабинет</Link>
                        </li>


                    ) : (
                        <li>
                            <Link href="/auth">Авторизация</Link>
                        </li>
                    )
                    }
                </ul>
            </nav>
        </header>
    )
}