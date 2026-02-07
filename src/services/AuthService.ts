import { StudentProfile } from "@/types/career";
import { CareerManager } from "./CareerManager";

const AUTH_USER_KEY = 'career_multiverse_user';

export class AuthService {
    /**
     * Simulates login by checking credentials.
     * For now, accepts any non-empty input or specific test accounts.
     */
    static async login(email: string, passwordHash: string): Promise<StudentProfile> {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network

        // In a real app, we'd hash the password and check the DB.
        // Here we just fetch the local profile.
        const profile = CareerManager.getProfile();

        if (profile.email === email) {
            // Success
            this.setSession(profile);
            return profile;
        }

        // Allow "demo" login
        if (email === 'alex@example.com' && passwordHash === 'password') {
            this.setSession(profile);
            return profile;
        }

        throw new Error("Invalid credentials");
    }

    /**
     * Simulates registration.
     */
    static async signup(name: string, email: string, passwordHash: string): Promise<StudentProfile> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Create a fresh profile with a default Reality
        const defaultRealityId = crypto.randomUUID();
        const newProfile: StudentProfile = {
            id: crypto.randomUUID(),
            name,
            email,
            passwordHash,
            year: 'Freshman',
            gpaHistory: [],
            activeRealityId: defaultRealityId,
            realities: [
                {
                    id: defaultRealityId,
                    parentId: null,
                    name: "Origin Reality",
                    description: "My current timeline based on actual choices.",
                    createdAt: new Date().toISOString(),
                    lastModifiedAt: new Date().toISOString(),
                    targetRoles: ["Software Engineer"],
                    skills: [],
                    milestones: [],
                    metrics: {
                        weeklyHours: 40,
                        projectedMonths: 48,
                        employabilityScore: 50,
                        salaryRange: [60000, 90000]
                    },
                    attributes: {
                        learningStyle: 'Mixed',
                        interviewFocus: ['DSA', 'Behavioral'],
                        companyType: ['Product']
                    },
                    resumeData: {
                        personalInfo: {
                            fullName: name,
                            email: email,
                            phone: "",
                            summary: "Aspiring software engineer...",
                            location: "",
                            links: []
                        },
                        sections: []
                    }
                }
            ]
        };

        // Reset realities to default if it's a new signup
        // (For simplicity in this demo, we might just overwrite the single local storage key)
        CareerManager.saveProfile(newProfile);
        this.setSession(newProfile);

        return newProfile;
    }

    static logout() {
        localStorage.removeItem(AUTH_USER_KEY);
    }

    static getCurrentUser(): StudentProfile | null {
        const data = localStorage.getItem(AUTH_USER_KEY);
        return data ? JSON.parse(data) : null;
    }

    private static setSession(user: StudentProfile) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    }
}
