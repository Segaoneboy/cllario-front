"use client"
import {usePathname} from "next/navigation";
import Link from "next/link";

export default function Header(){
    const pathname = usePathname();
    if( pathname === "/auth" || pathname === "/test") return <></>
    return(
        <header className="m-4">
            <nav>
                <ul className="text-[#5170FF] font-semibold text-sm md:text-xl flex justify-between items-center ">
                    <li className="flex items-center gap-1">
                        <img width={60} src="/Cllario-logo.jpg" alt="cllario logo"/>
                        <Link href="/">Cllario</Link>
                    </li>
                    <li>
                        <Link href="/test">Test</Link>
                    </li>
                    <li>
                        <Link href="/auth">Account</Link>
                    </li>
                    <li>
                        <Link href="/dashboard">Dashboard</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}