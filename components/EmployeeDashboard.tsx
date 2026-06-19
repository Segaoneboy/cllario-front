"use client";

import {FormEvent, useState} from "react";
import {useDemoIdpStore} from "@/store/useDemoIdpStore";

export default function EmployeeDashboard() {
  const {status, competencyMatrixFileName, draft, createDraft, sendDraftToHr} = useDemoIdpStore();
  const [experience, setExperience] = useState("");
  const [careerGoals, setCareerGoals] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGenerating(true);

    window.setTimeout(() => {
      createDraft({experience, goals: careerGoals});
      setIsGenerating(false);
    }, 800);
  };

  const isApproved = status === "approved";
  const isSentToHr = status === "sent_to_hr";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="rounded-lg border border-[#5170FF]/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-2 border-b border-[#5170FF]/10 pb-5">
          <p className="text-sm font-semibold uppercase text-[#5170FF]">Профиль сотрудника</p>
          <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">employ@cllario.tech</h1>
          <p className="max-w-3xl text-sm leading-relaxed text-[#585858] sm:text-base">
            Опишите прошлый опыт и карьерные цели. Cllario подготовит черновик ИПР для роста до Middle Frontend Developer.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-[#5170FF]/[0.04] p-4">
            <p className="text-xs font-semibold uppercase text-[#585858]">Матрица компетенций</p>
            <p className="mt-2 text-sm font-bold text-zinc-900">
              {competencyMatrixFileName ? "Загружена HR" : "Ожидает загрузки HR"}
            </p>
          </div>
          <div className="rounded-md bg-[#5170FF]/[0.04] p-4">
            <p className="text-xs font-semibold uppercase text-[#585858]">Целевой трек</p>
            <p className="mt-2 text-sm font-bold text-zinc-900">Middle Frontend</p>
          </div>
          <div className="rounded-md bg-[#5170FF]/[0.04] p-4">
            <p className="text-xs font-semibold uppercase text-[#585858]">Статус ИПР</p>
            <p className="mt-2 text-sm font-bold text-zinc-900">
              {isApproved ? "Подтвержден HR" : isSentToHr ? "Отправлен HR" : draft ? "Черновик готов" : "План в реализации"}
            </p>
          </div>
        </div>

        {!isApproved && !isSentToHr && (
          <form className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-zinc-700">Прошлый опыт</span>
              <textarea
                required
                value={experience}
                onChange={(event) => setExperience(event.target.value)}
                className="min-h-48 w-full resize-none rounded-md border border-[#5170FF]/20 px-4 py-3 text-sm leading-relaxed text-zinc-800 outline-none transition-colors focus:border-[#5170FF]"
                placeholder="Например: 1.5 года frontend-разработки, React, TypeScript, участие в ревью, самостоятельная разработка небольших фич..."
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-zinc-700">Карьерные цели</span>
              <textarea
                required
                value={careerGoals}
                onChange={(event) => setCareerGoals(event.target.value)}
                className="min-h-48 w-full resize-none rounded-md border border-[#5170FF]/20 px-4 py-3 text-sm leading-relaxed text-zinc-800 outline-none transition-colors focus:border-[#5170FF]"
                placeholder="Например: хочу вырасти до middle, увереннее вести задачи end-to-end, лучше декомпозировать работу и помогать junior-разработчикам..."
              />
            </label>

            <div className="flex flex-col gap-3 lg:col-span-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="submit"
                disabled={isGenerating}
                className="min-h-11 rounded-md bg-[#5170FF] px-5 text-sm font-bold text-white transition-colors hover:bg-[#3854d9] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isGenerating ? "Генерация..." : draft ? "Сгенерировать заново" : "Отправить"}
              </button>
            </div>
          </form>
        )}
      </section>

      {isGenerating && (
        <section className="rounded-lg border border-[#5170FF]/10 bg-[#5170FF]/[0.03] p-5 text-sm font-semibold text-[#5170FF]">
          Генерируем черновик ИПР до Middle Frontend Developer...
        </section>
      )}

      {draft && (
        <section className="rounded-lg border border-[#5170FF]/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 border-b border-[#5170FF]/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className={`text-sm font-semibold uppercase ${isApproved ? "text-emerald-600" : "text-[#5170FF]"}`}>
                {isApproved ? "ИПР подтвержден" : isSentToHr ? "Отправлено HR" : "Черновик ИПР"}
              </p>
              <h2 className="mt-1 text-2xl font-bold text-zinc-900">{draft.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#585858]">{draft.summary}</p>
            </div>

            {!isSentToHr && !isApproved && (
              <button
                type="button"
                onClick={sendDraftToHr}
                className="min-h-11 shrink-0 rounded-md bg-emerald-600 px-5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
              >
                Сохранить план?
              </button>
            )}
          </div>

          {isSentToHr && (
            <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
              Черновик отправлен HR на подтверждение.
            </div>
          )}

          {isApproved && (
            <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
              HR подтвердил ИПР. План можно брать в работу.
            </div>
          )}

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
            <aside className="rounded-lg bg-[#5170FF]/[0.04] p-4">
              <h3 className="font-bold text-[#5170FF]">Фокус развития</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#585858]">
                {draft.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>

            <div className="space-y-4">
              {draft.sprints.map((sprint) => (
                <article key={sprint.title} className="rounded-lg border border-slate-100 p-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-bold text-zinc-900">{sprint.title}</h3>
                    <span className="text-sm font-semibold text-[#5170FF]">{sprint.period}</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-[#585858]">
                    {sprint.tasks.map((task) => (
                      <li key={task} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5170FF]" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
