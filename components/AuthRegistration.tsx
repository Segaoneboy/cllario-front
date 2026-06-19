"use client";

import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/utils/api";

import { AuthUser } from "@/types/User";

export default function AuthRegistration({ onToggleView }: { onToggleView: () => void }) {
  const {register, handleSubmit, formState: { errors } } = useForm<AuthUser>();

  const registerMutation = useMutation({
    mutationFn: (body: any) =>
      apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      onToggleView();
    },
  });

  const onSubmit: SubmitHandler<AuthUser> = (data) =>{
    registerMutation.mutate(data)
  }
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
      <h2 className="text-[26px] font-semibold text-[#5170FF] text-center mb-6 tracking-wide">
        Регистрация аккаунта
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex flex-col text-left">
          <label className="text-sm text-zinc-600 font-medium mb-1">Имя</label>
          <input
            type="text"
            {...register("firstName", {
              required:"Поле обязательное"
            })}
            className="w-full bg-[#FFFDE0] border-2 border-[#5170FF] rounded-[5px] px-3 py-2 text-[14px] text-zinc-800 focus:outline-none"
            
          />
          <p className="text-red-500 mt-1">{errors.firstName?.message}</p>
        </div>
        <div className="flex flex-col text-left">
          <label className="text-sm text-zinc-600 font-medium mb-1">Фамилия</label>
          <input
            type="text"
            {...register("lastName", {
              required:"Поле обязательное"
            })}
            className="w-full bg-[#FFFDE0] border-2 border-[#5170FF] rounded-[5px] px-3 py-2 text-[14px] text-zinc-800 focus:outline-none"
            
          />
          <p className="text-red-500 mt-1">{errors.lastName?.message}</p>
        </div>
      </div>

      <div className="mb-4 flex flex-col text-left w-full">
        <label className="text-sm text-zinc-600 font-medium mb-1">Email</label>
        <input
          type="email"
          {...register("email", {pattern:{value:/^[a-z0-9._%+-]+\@[a-z0-9.-]+\.[a-z]{2,}$/i, message: "Неккоректный email"}, required:"Поле обязательное"})}
          className="w-full bg-[#FFFDE0] border-2 border-[#5170FF] rounded-[5px] px-3 py-2 text-[16px] text-zinc-800 focus:outline-none"
          
        />
        <p className="text-red-500 mt-1">{errors.email?.message}</p>
      </div>

      <div className="mb-4 flex flex-col text-left w-full">
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

      <div className="mb-6 flex flex-col text-left w-full">
        <label className="text-sm text-zinc-600 font-medium mb-1">Роль в системе</label>
        <select
          {...register("role", {required:"Поле обязательное"})}
          className="w-full bg-[#FFFDE0] border-2 border-[#5170FF] rounded-[5px] px-3 py-2 text-[15px] text-zinc-800 focus:outline-none cursor-pointer appearance-none"
        >
          <option value="employee">Сотрудник</option>
          <option value="teamlead">Тимлид</option>
          <option value="hr">HR Директор</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full bg-[#5170FF] hover:bg-[#405fef] text-white font-normal py-3 rounded-[5px] text-[16px] transition-colors cursor-pointer text-center"
      >
        {registerMutation.isPending ? "Создание..." : "Зарегистрироваться"}
      </button>

      <p className="text-center text-[14px] text-zinc-800 mt-6">
        Уже есть аккаунт?{" "}
        <span
          onClick={onToggleView}
          className="text-[#637dff] hover:underline cursor-pointer"
        >
          Войти
        </span>
      </p>
    </form>
  );
}