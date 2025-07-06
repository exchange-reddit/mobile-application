// navigators/AuthStack.tsx

import { AnimatedLinearGradient } from '@/components/background/AnimatedLinearGradient';
import { useBackgroundAnimation } from '@/hooks/useBackgroundAnimation';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import LoginScreen from '../screens/auth/LoginScreen';
import VerificationScreen from '../screens/auth/VerificationScreen';

export type AuthStackParamList = {
    Login: undefined;
    Verification: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const customFadeInterpolator = ({ current, next, layouts }: any) => {
    const opacity = current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    // This animates the screen that is *leaving* (outgoing screen)
    const exitingOpacity = next
        ? next.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0], // fade out the outgoing screen
          })
        : 1;

    return {
        cardStyle: {
            opacity: next ? exitingOpacity : opacity,
        },
    };
};

export default function AuthStack() {
    const animatedColors = useBackgroundAnimation();
    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

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
                    cardStyleInterpolator: customFadeInterpolator, // Use the new interpolator
                }}
            >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen
                    name="Verification"
                    component={VerificationScreen}
                />
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
