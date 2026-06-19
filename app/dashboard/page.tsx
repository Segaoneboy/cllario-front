"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

import EmployeeDashboard from "@/components/EmployeeDashboard";
import TeamLeadDashboard from "@/components/TeamLeadDashboard";
import HRDashboard from "@/components/HRDashboard";

import SpinLoading from "@/components/ui/SpinLoading";

export default function DashboardPage() {
  const { user, isLoading, checkAuth, logout } = useAuthStore();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function initSession() {
      await checkAuth();
      setIsReady(true); 
    }
    initSession();
  }, [checkAuth]);

  useEffect(() => {
    if (isReady && !isLoading && !user) {
      router.push("/auth");
    }
  }, [user, isLoading, isReady, router]);

  if (!isReady || isLoading) {
    return (
      <SpinLoading text='Проверка доступа Cllario'/>
    );
  }
  if (!user) return null;

  return (
    <div className="min-h-screen bg-white text-zinc-800 flex flex-col font-sans">
      <header className="w-full border-b border-[#5170FF]/20 bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/Cllario-logo-site.png" alt="logo" className="w-10 h-auto object-contain" />
          <div>
            <span className="font-bold tracking-tight text-xl text-[#5170FF]">Cllario</span>
            <span className="text-xs text-[#585858] block -mt-1 font-medium">Talent Management</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-zinc-800">{user.firstName}</p>
            <span className="text-xs text-[#585858] font-medium uppercase tracking-wider">
              {user.role === "employee" && "Сотрудник"}
              {user.role === "teamlead" && "Тимлид"}
              {user.role === "hr" && "HR Директор"}
            </span>
          </div>

          <div className="h-8 w-px bg-[#5170FF]/20 hidden sm:block"></div>

          <button
            onClick={() => logout()}
            className="text-sm font-semibold text-[#5170FF] hover:opacity-60 transition-opacity bg-transparent border border-[#5170FF] px-4 py-1.5 rounded-[5px] cursor-pointer"
          >
            Выйти
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        {(() => {
          switch (user.role) {
            case "employee":
              return <EmployeeDashboard />;
            case "teamlead":
              return <TeamLeadDashboard />;
            case "hr":
              return <HRDashboard />;
            default:
              return (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <h3 className="text-lg font-bold text-[#5170FF]">Ошибка доступа</h3>
                  <p className="text-sm text-[#585858] max-w-xs">Роль не распознана.</p>
                </div>
              );
          }
        })()}
      </main>
    </div>
  );
}