import {create} from 'zustand';

export type AdminCompanyRegistrationResult = {
    company: {
        id: string;
        name: string;
        taxId: string;
        subStatus: string;
        usersInSub: number;
    };
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        companyId: string;
    };
    role: {
        id: string;
        name: string;
        permissions: unknown;
    };
};

interface AdminCompanyState {
    lastResult: AdminCompanyRegistrationResult | null;
    setLastResult: (result: AdminCompanyRegistrationResult | null) => void;
}

export const useAdminCompanyStore = create<AdminCompanyState>((set) => ({
    lastResult: null,
    setLastResult: (result) => set({lastResult: result}),
}));
