import { create } from 'zustand';
import { apiFetch } from '../utils/api';

interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  role: 'employee' | 'teamlead' | 'hr';
  companyId: string;
  isDemo?: boolean;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  loginDemoEmployee: () => void;
  loginDemoHr: () => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const demoEmployee: User = {
  id: 'demo-employee',
  firstName: 'Сотрудник',
  lastName: 'Cllario',
  email: 'employ@cllario.tech',
  role: 'employee',
  companyId: 'demo-company',
  isDemo: true,
};

const demoHr: User = {
  id: 'demo-hr',
  firstName: 'HR',
  lastName: 'Cllario',
  email: 'hr@cllario.tech',
  role: 'hr',
  companyId: 'demo-company',
  isDemo: true,
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false, // Изменили на false, чтобы избежать бесконечного лоадера при старте

  setUser: (user) => {
    if (typeof window !== 'undefined') {
      if (user?.isDemo) {
        localStorage.setItem('cllarioDemoUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('cllarioDemoUser');
      }
    }

    set({ user, isLoading: false });
  },

  loginDemoEmployee: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cllarioDemoUser', JSON.stringify(demoEmployee));
    }

    set({ user: demoEmployee, isLoading: false });
  },

  loginDemoHr: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cllarioDemoUser', JSON.stringify(demoHr));
    }

    set({ user: demoHr, isLoading: false });
  },

  checkAuth: async () => {
    set({ isLoading: true }); // Включаем лоадер только в момент реального запроса
    if (typeof window !== 'undefined') {
      const savedDemoUser = localStorage.getItem('cllarioDemoUser');

      if (savedDemoUser) {
        set({ user: JSON.parse(savedDemoUser), isLoading: false });
        return;
      }
    }

    try {
      const data = await apiFetch('/auth/me'); 
      if (data && data.user) {
        set({ user: data.user, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (err) {
      // Если сервер ответил ошибкой (например, 401), сбрасываем юзера и тушим лоадер
      set({ user: null, isLoading: false });
    } finally {
    set({ isLoading: false });
  }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error("Ошибка при логауте на сервере", e);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cllarioDemoUser');
      }
      // В любом случае очищаем состояние на клиенте
      set({ user: null, isLoading: false });
    }
  }
}));
