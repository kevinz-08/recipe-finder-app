import { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse, AccessTokenResponse, User } from "@/types/types";
import { API_URL } from "./constants";

// como funciona este sistema: 
// App inicia
//   ↓
// AuthProvider monta
//   ↓
// checkAuth corre
//   ↓
// Si hay refreshToken:
//   → genera accessToken
//   → obtiene usuario
//   → guarda sesión
//   ↓
// isAuthenticated = true
//   ↓
// ProtectedRoute deja pasar

interface AuthProviderProps{
    children: React.ReactNode;
}

//  Esta const es el contenedor global de toda la autenticacion, en el cual guarda diferentes cosas como:
const AuthContext = createContext({
    isAuthenticated: false, // isAuthenticated, la cual verifica si el usuario esta autenticado o no 
    loading: true, // si aun esta verificando sesion
    getAccessToken: () => {}, // obtiene el token
    saveUser: (_userData:AuthResponse) => {}, // guardar el usuario
    getRefreshToken: () => {},
    getUser:() => ({} as User | undefined), // obtener el usuario actual
    signOut: () => {}, // cerrar sesion
});

// authprovider es el componente que provee el contexto a toda la app
export function AuthProvider({children}: AuthProviderProps){

    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ accessToken, setAccessToken ] = useState<string>("");
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    // en base a que tiene este refresh token, le pide al backend un nuevo access token, lo que permite regenerar sesion y recargar la pagina sin que se pierda el token de sesion
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

    // llama a get /user y obtiene el usuario ya autenticado
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

    // con esta funcion se reconstruye la sesion cuando la app inicia, lo que hace es:
    // 1. busca refreshToken en el localStorage | 2. si no esta lo reconoce como un usuario no autenticado
    // 3. si esta: pide un nuevo accessToken, pide user info y guarda todo en estado
    // 4. cambia loading a false
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

    // esta funcion limpia todo, lo que quiere decir q es el destructor de sesion
    function signOut() {
        setIsAuthenticated(false);
        setAccessToken("");
        setUser(undefined);
        localStorage.removeItem("refreshToken");
    }

    // esta funcion guarda todo en memoria y localStorage
    function saveSessionInfo(userInfo:User, accessToken:string, refreshToken:string){
        setAccessToken(accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setIsAuthenticated(true);
        setUser(userInfo);
    }

    // esta funcion devuelve el accessToken actual, se utiliza para cuando se necesita hacer llamadas protegidas
    function getAccessToken() {
        return accessToken;
    }

    // esta funcion lee el localStorage
    function getRefreshToken(): string | null {
        return localStorage.getItem("refreshToken");
    }

    // esta funcion se usa para el login, lo que hace es recibir la respuesta del backend y luego llama saveSessionInfo
    function saveUser(userData: AuthResponse) {
        saveSessionInfo(
            userData.body.user,
            userData.body.accessToken,
            userData.body.refreshToken
        );
    }

    // esta funcion devuelve el usuario actual desde memoria.
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