export type Plan = {
    summary?: string | null;
    strengths?: string[] | null;
    weaknesses?: string[] | null;
    developmentPlan?: string[] | null;
};

export type UserContextType = {
    authorized: boolean;
    name: string;
    email: string;
    test?: {
        results: any;
        plan?: Plan | null;
    }[];
};
