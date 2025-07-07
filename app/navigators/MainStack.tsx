// navigators/AuthStack.tsx

import { AnimatedLinearGradient } from '@/components/background/AnimatedLinearGradient';
import { useBackgroundAnimation } from '@/hooks/useBackgroundAnimation';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from '../screens/main/HomeScreen';

export type MainStackParamList = {
    Home: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

export default function MainStack() {
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
