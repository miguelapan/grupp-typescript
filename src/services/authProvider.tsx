import { createContext, FC, useContext, useState } from 'react';
import { User } from '../types/types';
import { loginUser } from './crudService';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
isModerator: boolean;
  setIsModerator: (isModerator: boolean) => void;
    login: (userName: string, password: string) => Promise<{ success: boolean, message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isModerator, setIsModerator] = useState<boolean>(false);

    // LOGIN SERVICE 

    const login = async (userName: string, password: string) => {
        try{
            const user = await loginUser(userName, password);

            if(user) {
                setUser(user);
                setIsAuth(true);
                setIsModerator(user.isModerator || false);
                return { success: true, message: "You are logged in as: " + userName };
            } else {
                return { success: false, message: "Invalid username or password" };
            } 
            // VET EJ OM DET GÅR ATT SÄTTA ANNAT ÄN ANY? 
        } catch (error: any) {
            console.error("Error logging in: ", error);
            return { success: false, message: error.message};
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth, isModerator, setIsModerator, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
