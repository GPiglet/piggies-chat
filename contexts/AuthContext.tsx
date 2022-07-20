import {createContext} from 'react';
export type UserType = {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}
type AuthContextType = {
    user: UserType | null,
    signup: (user: UserType, subscriber: any, onError: any) => void,
    login: (email: string, password: string, isRemember: boolean, subscriber: any, onError: any) => void,
    logout: () => void,
    setUser: (user: UserType) => void,
};

const AuthContextDefaultValues: AuthContextType = {
    user: null,
    signup: (user: UserType, subscriber: any, onError: any) => {},
    login: (email: string, password: string, isRemember: boolean, subscriber: any, onError: any) => {},
    logout: () => {},
    setUser: (user: UserType) => {}
}
export const AuthContext = createContext<AuthContextType>(AuthContextDefaultValues);