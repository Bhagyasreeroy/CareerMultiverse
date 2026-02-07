import React, { createContext, useContext, useEffect, useState } from 'react';
import { StudentProfile } from '@/types/career';
import { AuthService } from '@/services/AuthService';

interface AuthContextType {
    user: StudentProfile | null;
    isLoading: boolean;
    login: (email: string, passwordHash: string) => Promise<void>;
    signup: (name: string, email: string, passwordHash: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<StudentProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, passwordHash: string) => {
        try {
            const user = await AuthService.login(email, passwordHash);
            setUser(user);
        } catch (error) {
            throw error;
        }
    };

    const signup = async (name: string, email: string, passwordHash: string) => {
        try {
            const user = await AuthService.signup(name, email, passwordHash);
            setUser(user);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
