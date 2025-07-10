import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
    exp: number;
    [key: string]: any;
};

export const isTokenExpired = (token: string): boolean => {
    try {
        const { exp } = jwtDecode<JwtPayload>(token);
        return Date.now() >= exp * 1000;
    } catch {
        return true; // treat invalid token as expired
    }
};

export const getRefreshToken = async (): Promise<string | null> => {
    try {
        const json = await SecureStore.getItemAsync('authTokens');
        if (!json) return null;

        const { refreshToken } = JSON.parse(json);
        return refreshToken;
    } catch {
        return null;
    }
};
