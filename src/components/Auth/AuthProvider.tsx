import { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse, AccessTokenResponse, User } from "@/types/types";
import { API_URL } from "./constants";

interface AuthProviderProps{
    children: React.ReactNode;
}

const AuthContext = createContext({
    isAuthenticated: false,
    loading: true,
    getAccessToken: () => {},
    saveUser: (userData:AuthResponse) => {},
    getRefreshToken: () => {},
    getUser:() => ({} as User | undefined),
    signOut: () => {},
});

export function AuthProvider({children}: AuthProviderProps){
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ accessToken, setAccessToken ] = useState<string>("");
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);
    // const [ refreshToken, setRefreshToken ] = useState<string>("");

    useEffect(() => {
        checkAuth();
    }, []);
    async function requestNewAccessToken(refreshToken:string){
        try {
            const response = await fetch(`${API_URL}/refresh-token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${refreshToken}`
                },
            });

            if(response.ok) {
                const json = await response.json() as AccessTokenResponse;

                if(json.error) {
                    throw new Error(json.error);
                }
                return json.body.accessToken;
            }else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async function getUserInfo(accessToken:string) {
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
            });

            if(response.ok) {
                const json = await response.json();

                if(json.error) {
                    throw new Error(json.error);
                }
                return json.body;
            }else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async function checkAuth() {

        const refreshToken = getRefreshToken();

        if (!refreshToken) {
            setLoading(false);
            return;
        }

        const newAccessToken = await requestNewAccessToken(refreshToken);
        if (!newAccessToken) {
            setLoading(false);
            return;
        }

        const userInfo = await getUserInfo(newAccessToken);

        if (!userInfo) {
            setLoading(false);
            return;
        }

        saveSessionInfo(userInfo, newAccessToken, refreshToken);
        setLoading(false);
    }

    function signOut() {
        setIsAuthenticated(false);
        setAccessToken("");
        setUser(undefined);
        localStorage.removeItem("refreshToken");
    }

    function saveSessionInfo(userInfo:User, accessToken:string, refreshToken:string){
        setAccessToken(accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setIsAuthenticated(true);
        setUser(userInfo);
    }

    function getAccessToken() {
        return accessToken;
    }
    function getRefreshToken(): string | null {
        return localStorage.getItem("refreshToken");
    }

    function saveUser(userData: AuthResponse) {
        saveSessionInfo(
            userData.body.user,
            userData.body.accessToken,
            userData.body.refreshToken
        );
    }

    function getUser() {
        return user;
    }

    return( 
        <AuthContext.Provider 
        value={{
            isAuthenticated,
            loading,
            getAccessToken,
            saveUser,
            getRefreshToken,
            getUser,
            signOut,
            }}
        >
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)