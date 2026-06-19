"use client";

import { useState } from "react";
import AuthLogin from "@/components/AuthLogin";
import AuthRegistration from "@/components/AuthRegistration";

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-sans selection:bg-[#5170FF]/20">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        
        {/* Логотип по центру */}
        <div className="mb-4">
          <img
            src="/Cllario-logo-site.png"
            alt="cllario logo"
            className="w-24 h-auto object-contain"
          />
        </div>

        {/* Рендеринг нужной формы */}
        {isLoginView ? (
          <AuthLogin onToggleView={() => setIsLoginView(false)} />
        ) : (
          <AuthRegistration onToggleView={() => setIsLoginView(true)} />
        )}
      </div>
    </div>
  );
}