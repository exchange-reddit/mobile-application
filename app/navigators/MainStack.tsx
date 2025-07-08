// navigators/AuthStack.tsx

import { AnimatedLinearGradient } from '@/components/background/AnimatedLinearGradient';
import { useBackgroundAnimation } from '@/hooks/useBackgroundAnimation';
import { useIsAuthenticated } from '@/libs/isAuthenticatedStore';
import { isTokenExpired } from '@/utils/authTokens';
import { retrieveTokens } from '@/utils/secureStorage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from '../screens/main/HomeScreen';
import { RootStackParamList } from './RootNavigator';

export type MainStackParamList = {
    Home: undefined;
};

type Nav = NativeStackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<MainStackParamList>();

export default function MainStack() {
    const navigation = useNavigation<Nav>();
    const updateIsAuthenticated = useIsAuthenticated(
        (state) => state.updateIsAuthenticated,
    );

    useEffect(() => {
        const checkAuthStatus = async () => {
            const refreshToken = await retrieveTokens().then(
                (tokens) => tokens?.refreshToken,
            );

            if (!refreshToken || isTokenExpired(refreshToken)) {
                navigation.navigate('Auth', { screen: 'Login' });
            } else {
                updateIsAuthenticated(true);
            }
        };

        checkAuthStatus();
    }, []);

    const animatedColors = useBackgroundAnimation();
    return (
        <View style={styles.container}>
            <AnimatedLinearGradient
                colors={animatedColors}
                style={styles.gradient}
            />

            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
});
