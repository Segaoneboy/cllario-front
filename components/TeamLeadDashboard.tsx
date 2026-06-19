"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/utils/api";

export default function TeamLeadDashboard() {
  const queryClient = useQueryClient();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: pendingUsers, isLoading } = useQuery({
    queryKey: ["pending-profiles"],
    queryFn: () => apiFetch("/lead/pending-profiles", { credentials: "include" }),
  });

  const approveMutation = useMutation({
    mutationFn: (onboardingId: string) => 
      apiFetch("/lead/approve-profile", { 
        method: "POST", 
        body: JSON.stringify({ onboardingId }),
        credentials: "include" 
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pending-profiles"] }),
  });

  if (isLoading) return <div className="p-8">Загрузка заявок...</div>;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#5170FF]">Панель управления Тимлида</h1>
      
      {pendingUsers?.map((item: any) => (
        <div key={item.id} className="bg-white border p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">{item.user.name || item.user.email}</h3>
              <p className="text-xs text-zinc-400">ID сессии: {item.id}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="text-sm text-[#5170FF] underline"
              >
                {expandedId === item.id ? "Скрыть ответы" : "Посмотреть ответы"}
              </button>
              <button
                onClick={() => approveMutation.mutate(item.id)}
                className="bg-[#5170FF] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#405fef]"
              >
                Утвердить
              </button>
            </div>
          </div>

          {/* Блок с ответами (появляется при клике) */}
          {expandedId === item.id && (
            <div className="mt-4 pt-4 border-t space-y-3">
              <h4 className="font-semibold text-sm">Ответы сотрудника:</h4>
              {item.aiQuestionsAndAnswers?.map((qa: any, index: number) => (
                <div key={index} className="bg-zinc-50 p-3 rounded text-sm">
                  <p className="font-medium text-zinc-700 mb-1">{qa.question}</p>
                  <p className="text-zinc-600 italic">"{qa.answer}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}