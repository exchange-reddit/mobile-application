import * as SecureStore from 'expo-secure-store';

export const storeTokens = async (
    accessToken: string,
    refreshToken: string,
) => {
    const tokenData = JSON.stringify({ accessToken, refreshToken });
    await SecureStore.setItemAsync('authTokens', tokenData);
};

export const retrieveTokens = async () => {
    const result = await SecureStore.getItemAsync('authTokens');
    return result ? JSON.parse(result) : null;
};

export const removeTokens = async () => {
    await SecureStore.deleteItemAsync('authTokens');
};
