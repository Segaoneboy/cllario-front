"use client"

import {useRouter} from "next/navigation";
import {SubmitHandler, useForm} from "react-hook-form";
import {Person} from "@/types/Person";
import toast from "react-hot-toast";
import {saveGuestTest} from "@/utils/saveTestData";
import {useUser} from "@/context/userContext";

export default function AuthRegistration(){
    const router = useRouter()
    const { refreshUser } = useUser();
    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<Person>();
    const obSubmit: SubmitHandler<Person> = async (data) => {
        console.log("Отправка данных", data );

        try{
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if(!res.ok) throw new Error(result.message);

            toast.success('Успешная регистрация!');
            const { saved } = await saveGuestTest();

            if(saved){
                await refreshUser();
                toast.success("Результат теста сохранен")
                router.push("/dashboard");
            } else{
                await refreshUser();
                toast.error("Возникла ошибка при сохранении теста. Попробуйте позже")
                router.push("/");
            }

        } catch(error){
            toast.error("Ошибка регистрации, повторите попытку позже");
            console.error("ошибка регистрации", error);
        }
    }


    return(
        <>
            <div className="flex min-h-screen items-center justify-center  px-4">
                <div className="w-full max-w-sm space-y-6 text-[#5170FF]">
                    <div className="flex flex-col items-center">
                        <img src="/Cllario-logo.jpg" alt="логотип" width={80} height={80} />
                        <h1 className="text-2xl mt-4 text-center font-semibold">Зарегистрировать аккаунт</h1>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(obSubmit)}>
                        <div className="flex flex-col gap-1">
                            <div>
                                <label htmlFor="name" className="block text-sm mb-1 ml-1 text-[#585858] font-semibold">
                                    Имя
                                </label>
                                <input
                                    {...register("name", {required: "Введите имя"})}
                                    id="name"
                                    className="w-full rounded  p-2 text-[#585858] border-[#5170FF] focus:outline-none focus:ring-1 focus:ring-[#5170FF] border-2"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm mb-1 ml-1 text-[#585858] font-semibold ">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Введите email",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Некорректный email",
                                        },
                                    })}
                                    id="email"
                                    className="w-full rounded p-2 text-[#585858] border-[#5170FF] border-2 focus:outline-none focus:ring-1 focus:ring-[#5170FF]"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1 ">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm mb-1 ml-1 text-[#585858] font-semibold">
                                    Пароль
                                </label>
                                <input
                                    type="password"
                                    {...register("password" as any, {
                                        required: "Введите пароль",
                                        minLength: {
                                            value: 8,
                                            message: "Минимум 8 символов",
                                        },
                                    })}
                                    id="password"
                                    className="w-full rounded p-2 text-[#585858] border-[#5170FF] border-2 focus:outline-none focus:ring-1 focus:ring-[#5170FF]"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded bg-[#4a63df] hover:bg-[#4356c0] text-white my-4 py-2 font-medium transition disabled:opacity-60"
                        >
                            {isSubmitting ? "Создание..." : "Создать"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-400">
                        Уже есть аккаунт?{" "}
                        <a href="#" className="text-[#5170FF] hover:text-[#4356c0]">
                            Войти в аккаунт
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}