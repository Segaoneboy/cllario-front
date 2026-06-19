"use client";

import {useMutation} from '@tanstack/react-query';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {apiFetch} from '@/utils/api';
import {useAdminCompanyStore, type AdminCompanyRegistrationResult} from '@/store/useAdminCompanyStore';

type CompanyRegistrationForm = {
    companyName: string;
    taxId: string;
    usersInSub: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

type CompanyRegistrationResponse = AdminCompanyRegistrationResult & {
    message: string;
};

const inputClassName = 'min-h-11 w-full rounded-md border border-[#5170FF]/20 bg-white px-3 text-sm text-zinc-800 outline-none transition-colors focus:border-[#5170FF]';
const labelClassName = 'mb-1.5 block text-sm font-semibold text-zinc-700';
const errorClassName = 'mt-1 text-xs text-red-500';

export default function AdminCompaniesPage() {
    const {lastResult, setLastResult} = useAdminCompanyStore();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<CompanyRegistrationForm>({
        defaultValues: {
            usersInSub: 10,
        },
    });

    const registerCompanyMutation = useMutation({
        mutationFn: (body: CompanyRegistrationForm) => apiFetch('/admin/company-register', {
            method: 'POST',
            body: JSON.stringify({
                ...body,
                usersInSub: Number(body.usersInSub),
            }),
        }) as Promise<CompanyRegistrationResponse>,
        onSuccess: (data) => {
            setLastResult({
                company: data.company,
                user: data.user,
                role: data.role,
            });
            reset({usersInSub: 10});
        },
    });

    const onSubmit: SubmitHandler<CompanyRegistrationForm> = (data) => {
        registerCompanyMutation.mutate(data);
    };

    return (
        <main className="min-h-screen bg-white px-4 py-8 text-zinc-900 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <header className="flex flex-col gap-2 border-b border-[#5170FF]/10 pb-6">
                    <p className="text-sm font-semibold uppercase text-[#5170FF]">Cllario Admin</p>
                    <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">Регистрация компаний</h1>
                    <p className="max-w-3xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                        Создайте компанию и первого администратора. Пользователь получит роль admin внутри своей компании.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="rounded-lg border border-[#5170FF]/10 bg-white p-5 shadow-sm sm:p-6"
                    >
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <section className="space-y-4">
                                <h2 className="text-lg font-bold text-[#5170FF]">Компания</h2>

                                <label className="block">
                                    <span className={labelClassName}>Название компании</span>
                                    <input
                                        className={inputClassName}
                                        {...register('companyName', {required: 'Укажите название компании'})}
                                        placeholder="ООО Компания"
                                    />
                                    <span className={errorClassName}>{errors.companyName?.message}</span>
                                </label>

                                <label className="block">
                                    <span className={labelClassName}>ИНН / Tax ID</span>
                                    <input
                                        className={inputClassName}
                                        {...register('taxId', {required: 'Укажите ИНН'})}
                                        placeholder="1234567890"
                                    />
                                    <span className={errorClassName}>{errors.taxId?.message}</span>
                                </label>

                                <label className="block">
                                    <span className={labelClassName}>Лимит пользователей</span>
                                    <input
                                        className={inputClassName}
                                        type="number"
                                        min={1}
                                        {...register('usersInSub', {
                                            required: 'Укажите лимит',
                                            valueAsNumber: true,
                                            min: {value: 1, message: 'Минимум 1 пользователь'},
                                        })}
                                    />
                                    <span className={errorClassName}>{errors.usersInSub?.message}</span>
                                </label>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-lg font-bold text-[#5170FF]">Первый администратор</h2>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <label className="block">
                                        <span className={labelClassName}>Имя</span>
                                        <input
                                            className={inputClassName}
                                            {...register('firstName', {required: 'Укажите имя'})}
                                            placeholder="Анна"
                                        />
                                        <span className={errorClassName}>{errors.firstName?.message}</span>
                                    </label>

                                    <label className="block">
                                        <span className={labelClassName}>Фамилия</span>
                                        <input
                                            className={inputClassName}
                                            {...register('lastName', {required: 'Укажите фамилию'})}
                                            placeholder="Иванова"
                                        />
                                        <span className={errorClassName}>{errors.lastName?.message}</span>
                                    </label>
                                </div>

                                <label className="block">
                                    <span className={labelClassName}>Email</span>
                                    <input
                                        className={inputClassName}
                                        type="email"
                                        {...register('email', {
                                            required: 'Укажите email',
                                            pattern: {
                                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                                                message: 'Некорректный email',
                                            },
                                        })}
                                        placeholder="admin@company.ru"
                                    />
                                    <span className={errorClassName}>{errors.email?.message}</span>
                                </label>

                                <label className="block">
                                    <span className={labelClassName}>Пароль</span>
                                    <input
                                        className={inputClassName}
                                        type="password"
                                        {...register('password', {
                                            required: 'Укажите пароль',
                                            minLength: {
                                                value: 6,
                                                message: 'Минимум 6 символов',
                                            },
                                        })}
                                        placeholder="Минимум 6 символов"
                                    />
                                    <span className={errorClassName}>{errors.password?.message}</span>
                                </label>
                            </section>
                        </div>

                        {registerCompanyMutation.error && (
                            <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {registerCompanyMutation.error.message}
                            </div>
                        )}

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                            <button
                                type="button"
                                className="min-h-11 rounded-md border border-[#5170FF]/25 px-5 text-sm font-semibold text-[#5170FF] transition-colors hover:bg-[#5170FF]/5"
                                onClick={() => reset({usersInSub: 10})}
                            >
                                Очистить
                            </button>
                            <button
                                type="submit"
                                disabled={registerCompanyMutation.isPending}
                                className="min-h-11 rounded-md bg-[#5170FF] px-5 text-sm font-bold text-white transition-colors hover:bg-[#3854d9] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {registerCompanyMutation.isPending ? 'Создание...' : 'Зарегистрировать компанию'}
                            </button>
                        </div>
                    </form>

                    <aside className="rounded-lg border border-[#5170FF]/10 bg-[#5170FF]/[0.03] p-5 sm:p-6">
                        <h2 className="text-lg font-bold text-zinc-900">Последняя регистрация</h2>
                        {lastResult ? (
                            <div className="mt-5 space-y-5 text-sm">
                                <div>
                                    <p className="font-semibold text-[#5170FF]">Компания</p>
                                    <p className="mt-1 text-zinc-800">{lastResult.company.name}</p>
                                    <p className="text-zinc-500">ИНН: {lastResult.company.taxId}</p>
                                    <p className="text-zinc-500">Лимит: {lastResult.company.usersInSub}</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-[#5170FF]">Администратор</p>
                                    <p className="mt-1 text-zinc-800">
                                        {lastResult.user.firstName} {lastResult.user.lastName}
                                    </p>
                                    <p className="break-all text-zinc-500">{lastResult.user.email}</p>
                                </div>

                                <div className="rounded-md border border-[#5170FF]/10 bg-white px-3 py-2 text-xs text-zinc-600">
                                    Роль создана: <span className="font-semibold text-[#5170FF]">{lastResult.role.name}</span>
                                </div>
                            </div>
                        ) : (
                            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                                После успешной регистрации здесь появятся данные созданной компании и первого администратора.
                            </p>
                        )}
                    </aside>
                </div>
            </div>
        </main>
    );
}
