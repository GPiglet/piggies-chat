import {createContext} from 'react';
export type UserType = {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}
type AuthContextType = {
    user?: UserType,
    signup: (user: UserType, subscriber: any, onError: any) => void,
    login: (email: string, password: string, isRemember: boolean, subscriber: any, onError: any) => void,
    setUser: (user: UserType) => void,
};

const AuthContextDefaultValues: AuthContextType = {
    signup: (user: UserType, subscriber: any, onError: any) => {},
    login: (email: string, password: string, isRemember: boolean, subscriber: any, onError: any) => {},
    setUser: (user: UserType) => {}
}
export const AuthContext = createContext<AuthContextType>(AuthContextDefaultValues);