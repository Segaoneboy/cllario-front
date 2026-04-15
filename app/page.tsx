"use client"
import {useState} from "react";

export default function Home() {
    const [modalState, setModalState] = useState(false)
    return (
        <main className="text-[#5170FF]  min-h-screen flex flex-col items-center">
            {modalState ? (
                <div className="fixed w-screen h-screen ">
                    <h1 className="text-3xl">Cllario находится в бета-тестировании</h1>
                    <p>На данный момент, проект Cllario находится в закрытом бета-тестировании</p>
                </div>
            ):(<></>)}

            <section className="flex flex-col items-center justify-center text-center mt-20 px-4">
                <img width={200} src="/Cllario-logo-site.png" alt="cllario logo"/>
                <h1 className="text-5xl sm:text-6xl font-semibold leading-tight mb-6">
                    Cllario
                </h1>
                <p className="text-lg text-[#5170FF] max-w-xl mb-8">
                    AI-платформа для управления личностным и профессиональным ростом. тест
                </p>
                <button
                    className="border-3 bg-[#5170FF] text-white rounded-2xl px-8 py-3 text-xl font-semibold hover:bg-white hover:text-[#5170FF] transition"
                    onClick={()=>{setModalState(true)}}
                >
                    Пройти тест
                </button>
            </section>
            <section>

            </section>

        </main>
    );
}
