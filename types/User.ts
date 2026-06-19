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
enum UserRole {
    employee = "employee",
    teamlead = "teamlead",
    hr = "hr"
}
export interface AuthUser {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role?: UserRole;
}