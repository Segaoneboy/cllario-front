"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { SubmitHandler, useForm } from "react-hook-form";

import { AuthUser } from "@/types/User";
import { apiFetch } from "@/utils/api";


export default function AuthLogin({ onToggleView }: { onToggleView: () => void }) {

  const setUser = useAuthStore((state) => state.setUser);
  const loginDemoEmployee = useAuthStore((state) => state.loginDemoEmployee);
  const loginDemoHr = useAuthStore((state) => state.loginDemoHr);
  const router = useRouter(); 
  const {register, handleSubmit, formState: { errors } } = useForm<AuthUser>();


  const loginMutation = useMutation({
    mutationFn: (body: AuthUser) =>
      apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: (data) => {
      if (data && data.user) {
        setUser(data.user);
        router.push("/dashboard"); 
      }
    },
  });

  const onSubmit: SubmitHandler<AuthUser> = (data) =>{
    if (data.email.trim().toLowerCase() === 'employ@cllario.tech') {
      loginDemoEmployee();
      router.push('/dashboard');
      return;
    }

    if (data.email.trim().toLowerCase() === 'hr@cllario.tech') {
      loginDemoHr();
      router.push('/dashboard');
      return;
    }

    loginMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
      <h2 className="text-[26px] font-semibold text-[#5170FF] text-center mb-6 tracking-wide">
        Войти в учетную запись
      </h2>

      <div className="mb-4 flex flex-col text-left w-full">
        <label className="text-sm text-zinc-600 font-medium mb-1">Email</label>
        <input
          type="email"
          {...register("email", {pattern:{value:/^[a-z0-9._%+-]+\@[a-z0-9.-]+\.[a-z]{2,}$/i, message: "Неккоректный email"}, required:"Поле обязательное"})}
          className="w-full bg-[#FFFDE0] border-2 border-[#5170FF] rounded-[5px] px-3 py-2 text-[16px] text-zinc-800 focus:outline-none"
          
        />
        <p className="text-red-500 mt-1">{errors.email?.message}</p>
      </div>

      <div className="mb-6 flex flex-col text-left w-full">
        <label className="text-sm text-zinc-600 font-medium mb-1">Password</label>
        <input
          type="password"
          {...register("password", {
            minLength: {
              value: 8,
              message: "Минимальная длина пароля 8 символов"
            }, 
            required:"Поле обязательное"
          })}
          className="w-full bg-[#FFFDE0] border-2 border-[#5170FF] rounded-[5px] px-3 py-2 text-[16px] text-zinc-800 focus:outline-none"
        />
        <p className="text-red-500 mt-1">{errors.password?.message}</p>
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full bg-[#5170FF] hover:bg-[#405fef] text-white font-normal py-3 rounded-[5px] text-[16px] transition-colors cursor-pointer text-center"
      >
        {loginMutation.isPending ? "Секунду..." : "Авторизоваться"}
      </button>

      <p className="text-center text-[14px] text-zinc-800 mt-8">
        Нет аккаунта?{" "}
        <span
          onClick={onToggleView}
          className="text-[#637dff] hover:underline cursor-pointer"
        >
          Зарегистрировать аккаунт
        </span>
      </p>
    </form>
  );
}
