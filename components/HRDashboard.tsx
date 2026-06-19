"use client";

import {ChangeEvent, useRef} from "react";
import {useDemoIdpStore} from "@/store/useDemoIdpStore";

export default function HRDashboard() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {status, competencyMatrixFileName, draft, uploadCompetencyMatrix, approveDraft, resetDemo} = useDemoIdpStore();
  const matrixReady = Boolean(competencyMatrixFileName);
  const activeIdps = status === "approved" ? 1 : 0;
  const metricCards = [
    {label: "Сотрудников", value: "1", sub: "зарегистрирован"},
    {label: "Профилей", value: matrixReady ? "1" : "0", sub: matrixReady ? "данные загружены" : "ожидает данных"},
    {label: "Активных ИПР", value: String(activeIdps), sub: activeIdps ? "подтвержден HR" : "нет активных"},
    {label: "Средний прогресс", value: "0%", sub: activeIdps ? "стартовый цикл" : "план не запущен"},
  ];

  const handleMatrixUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if(file){
      uploadCompetencyMatrix(file.name);
    }
  };

  return (
    <div className="space-y-6">
      {/* <section className="rounded-lg border border-[#5170FF]/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-[#5170FF]">HR workspace</p>
            <h1 className="mt-1 text-2xl font-bold text-zinc-900 sm:text-3xl">Подготовка данных для ИПР</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#585858]">
              HR загружает матрицу компетенций, карьерный трек и результаты сотрудника. После этого сотрудник описывает опыт, а HR согласует черновик ИПР.
            </p>
          </div>
          <button
            type="button"
            onClick={resetDemo}
            className="min-h-10 rounded-md border border-[#5170FF]/25 px-4 text-sm font-semibold text-[#5170FF] transition-colors hover:bg-[#5170FF]/5"
          >
            Сбросить процесс
          </button>
        </div>
      </section> */}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((card) => (
          <div key={card.label} className="rounded-lg border border-[#5170FF]/15 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase text-[#585858]">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#5170FF]">{card.value}</p>
            <p className="mt-1 text-xs text-[#585858]">{card.sub}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[420px_1fr]">
        <div className="rounded-lg border border-[#5170FF]/10 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-zinc-900">Загрузка данных</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#585858]">
            Загрузите матрицу компетенций в формате Excel, чтобы Cllario подготовил контекст для индивидуального плана развития.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleMatrixUpload}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-5 min-h-11 w-full rounded-md bg-[#5170FF] px-5 text-sm font-bold text-white transition-colors hover:bg-[#3854d9]"
          >
            Загрузить Excel-файл
          </button>

          <div className={`mt-5 rounded-md border px-4 py-3 text-sm ${
            matrixReady
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-slate-200 bg-slate-50 text-slate-500"
          }`}>
            {matrixReady ? "Файл загружен и обработан" : "Файл не выбран"}
          </div>
        </div>

        <div className="rounded-lg border border-[#5170FF]/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-1 border-b border-[#5170FF]/10 pb-4">
            <h2 className="text-lg font-bold text-zinc-900">Сотрудник employ@cllario.tech</h2>
            <p className="text-sm text-[#585858]">
              Дашборд сотрудника: профиль сформирован, карьерный трек готов, план пока в реализации.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-[#5170FF]/[0.04] p-4">
              <p className="text-xs font-semibold uppercase text-[#585858]">Компетенции</p>
              <p className="mt-2 text-2xl font-bold text-[#5170FF]">{matrixReady ? "18" : "0"}</p>
            </div>
            <div className="rounded-md bg-[#5170FF]/[0.04] p-4">
              <p className="text-xs font-semibold uppercase text-[#585858]">Цель</p>
              <p className="mt-2 text-sm font-bold text-zinc-900">Middle Frontend</p>
            </div>
            <div className="rounded-md bg-[#5170FF]/[0.04] p-4">
              <p className="text-xs font-semibold uppercase text-[#585858]">Статус</p>
              <p className="mt-2 text-sm font-bold text-zinc-900">
                {status === "approved" ? "ИПР подтвержден" : status === "sent_to_hr" ? "На согласовании" : "План в реализации"}
              </p>
            </div>
          </div>

          {draft ? (
            <div className="mt-5 rounded-lg border border-[#5170FF]/10 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-[#5170FF]">
                    {status === "approved" ? "Подтвержденный ИПР" : "Черновик ИПР"}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-zinc-900">{draft.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#585858]">{draft.summary}</p>
                </div>

                {status === "sent_to_hr" && (
                  <button
                    type="button"
                    onClick={approveDraft}
                    className="min-h-10 shrink-0 rounded-md bg-emerald-600 px-4 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                  >
                    Подтвердить
                  </button>
                )}
              </div>

              <div className="mt-4 space-y-3">
                {draft.sprints.map((sprint) => (
                  <div key={sprint.title} className="rounded-md bg-slate-50 p-3">
                    <p className="font-semibold text-zinc-900">{sprint.title}</p>
                    <p className="text-xs font-semibold text-[#5170FF]">{sprint.period}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-lg border border-dashed border-[#5170FF]/20 p-5 text-sm text-[#585858]">
              Черновик появится здесь после того, как сотрудник опишет опыт, карьерные цели и отправит план HR.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
