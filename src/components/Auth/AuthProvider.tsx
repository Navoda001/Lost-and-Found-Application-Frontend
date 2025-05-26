import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Token } from "typescript";


interface AuthContextType {
    isAuthenticated: boolean;
    login: (Token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('trackMyItemToken')

        if (token) {
            setIsAuthenticated(!!token)
        }
    }, [])

    const login = (token: string) => {
        localStorage.setItem('trackMyItemToken', token);
        setIsAuthenticated(true);
    }
    const logout = () => {
        localStorage.removeItem('trackMyItemToken');
        setIsAuthenticated(false);
    }
    return(
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth should be used within an AuthProvider")
    }
    return context;
}
